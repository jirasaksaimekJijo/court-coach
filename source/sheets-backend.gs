// Bound Apps Script for the owner's existing spreadsheet. Never put connection tokens in GitHub.
const SHEET_ID='1t8s8k8cOQHQ4QdlZJeZmvSQZcPBIfxcT8fRIcHkyWdE';
const APP_URL='https://jirasaksaimekjijo.github.io/court-coach/';
const TAB='Court Coach Daily';
function onOpen(){SpreadsheetApp.getUi().createMenu('Court Coach').addItem('เชื่อมเว็บเครื่องนี้','connectCourtCoach').addToUi();}
function connectCourtCoach(){
 const props=PropertiesService.getScriptProperties();let token=props.getProperty('SYNC_TOKEN');
 if(!token){token=(Utilities.getUuid()+Utilities.getUuid()).replace(/-/g,'');props.setProperty('SYNC_TOKEN',token);}
 const endpoint='https://script.google.com/macros/s/AKfycbzHmddAP6vHoVCiVg9B_hlYEAdJkVamSb5atLIL8zOvIZOJhZXXloK_fFNwcCa2-2jZ/exec';
 const link=APP_URL+'#sheetsEndpoint='+encodeURIComponent(endpoint)+'&sheetsToken='+token;
 SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput('<p>เชื่อมเฉพาะเครื่องของคุณ ลิงก์นี้เป็นกุญแจส่งข้อมูลลงชีต อย่าส่งต่อ</p><p><a target="_blank" rel="noreferrer" href="'+link+'">เชื่อม Court Coach เครื่องนี้</a></p>'),'เชื่อม Court Coach');
}
function doGet(e){
 const p=e.parameter||{};
 if(p.ack&&/^[a-f0-9-]{36}$/.test(p.ack)&&/^ccAck_[a-f0-9]{32}$/.test(p.callback||'')){
  const receipt=CacheService.getScriptCache().get('ack:'+p.ack)||'null';
  return ContentService.createTextOutput(p.callback+'('+receipt+');').setMimeType(ContentService.MimeType.JAVASCRIPT);
 }
 return ContentService.createTextOutput('Court Coach sync endpoint. No spreadsheet data is exposed.');
}
function doPost(e){let id='';try{
 const text=e.postData&&e.postData.contents;if(!text||text.length>45000)throw Error('Payload too large');
 const data=JSON.parse(text);id=data.requestId;
 if(!/^[a-f0-9-]{36}$/.test(id||''))throw Error('Invalid request');
 const expected=PropertiesService.getScriptProperties().getProperty('SYNC_TOKEN');
 if(!expected||data.token!==expected)throw Error('กุญแจเชื่อมต่อไม่ถูกต้อง เปิดเมนู Court Coach ในชีตเพื่อเชื่อมใหม่');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(data.date)||new Date(data.date+'T00:00:00Z').toISOString().slice(0,10)!==data.date)throw Error('Invalid date');
 if(!data.entry||!data.profile||typeof data.entry!=='object'||typeof data.profile!=='object'||!/^\d{4}-\d{2}-\d{2}T/.test(data.updatedAt)||!Number.isFinite(Date.parse(data.updatedAt)))throw Error('Invalid record');
 const lock=LockService.getScriptLock();lock.waitLock(20000);
 try{writeDay_(data);SpreadsheetApp.flush()}finally{lock.releaseLock()}
 receipt_(id,true);
 }catch(error){if(/^[a-f0-9-]{36}$/.test(id))receipt_(id,false,String(error.message).slice(0,200));}
 return ContentService.createTextOutput('Received');
}
function receipt_(id,ok,error){CacheService.getScriptCache().put('ack:'+id,JSON.stringify({requestId:id,ok:ok,error:error||undefined}),600)}
function safe_(v){if(v===undefined||v===null)return '';if(typeof v==='string')return /^[=+\-@\t\r]/.test(v)?"'"+v:v;if(typeof v==='number'&&!Number.isFinite(v))throw Error('Invalid number');return v}
function writeDay_(d){
 const ss=SpreadsheetApp.openById(SHEET_ID);let sh=ss.getSheetByName(TAB);if(!sh)sh=ss.insertSheet(TAB);
 const e=d.entry,p=d.profile;
 const fields=['weight','bodyFat','sleep','soreness','pain','extra','cardio','cardioOther','activityComplete','foodComplete','calories','protein','carbs','fat','notes'];
 const headers=['วันที่','แก้ไขจากเว็บเมื่อ','รับเข้า Google เมื่อ','Request ID','น้ำหนัก (กก.)','Body Fat (%)','นอน (ชม.)','ล้า (0–10)','เจ็บผิดปกติ','แบต (นาที)','คาร์ดิโอเดิม (นาที)','คาร์ดิโออื่น (นาที)','กิจกรรมครบ','อาหารครบ','พลังงาน (kcal)','โปรตีน (g)','คาร์บ (g)','ไขมัน (g)','หมายเหตุ'];
 const row=[d.date,d.updatedAt,new Date().toISOString(),d.requestId].concat(fields.map(k=>safe_(e[k])));
 const slots={breakfast:'เช้า',lunch:'เที่ยง',preworkout:'ก่อนซ้อม',dinner:'เย็น',snack:'มื้อเสริม',legacy:'อาหารยอดเดิม'};
 Object.keys(slots).forEach(key=>{['note','calories','protein','carbs','fat'].forEach((field,i)=>{headers.push(slots[key]+' '+['รายละเอียด','kcal','โปรตีน g','คาร์บ g','ไขมัน g'][i]);row.push(safe_((e.meals&&e.meals[key]||{})[field]))})});
 ['done','sets','loads','lifts','nutritionTarget'].forEach((key,i)=>{headers.push(['ท่าที่ทำครบ JSON','เซ็ตจริง JSON','น้ำหนักเวท JSON','บันทึกเซ็ตเดิม JSON','เป้าอาหารของวัน JSON'][i]);row.push(JSON.stringify(e[key]===undefined?null:e[key]))});
 headers.push('ข้อมูลตั้งค่าแผน JSON','ข้อมูลวันครบถ้วน JSON');row.push(JSON.stringify(p),JSON.stringify(e));
 if(sh.getMaxColumns()<headers.length)sh.insertColumnsAfter(sh.getMaxColumns(),headers.length-sh.getMaxColumns());
 if(sh.getLastRow()===0){sh.getRange(1,1,1,headers.length).setValues([headers]).setFontWeight('bold').setBackground('#174c42').setFontColor('#ffffff').setWrap(true);sh.setFrozenRows(1);sh.setColumnWidths(1,headers.length,150);sh.setColumnWidth(19,300);sh.getRange(1,1,1,headers.length).setWrap(true)}
 const last=sh.getLastRow();let index=last+1;
 if(last>1){const dates=sh.getRange(2,1,last-1,2).getDisplayValues();const at=dates.findIndex(r=>r[0]===d.date);if(at>=0){index=at+2;if(dates[at][1]>d.updatedAt)throw Error('มีบันทึกวันที่นี้ใหม่กว่าในชีต คิวเก่ายังอยู่ กรุณาตรวจข้อมูลก่อนส่งทับ')}}
 if(index>sh.getMaxRows())sh.insertRowsAfter(sh.getMaxRows(),1);
 sh.getRange(index,1,1,4).setNumberFormat('@');sh.getRange(index,1,1,row.length).setValues([row]);
}

