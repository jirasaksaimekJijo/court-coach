import {defaultProfile,validateProfile,validateEntry,validDate,type Profile,type Entry} from './coach';
export type LocalData={profile:Profile|null;logs:Record<string,Entry>};
export type LocalEnvelope=LocalData&{format:'court-coach';version:1;revision:string;exportedAt:string};
type Store=Pick<Storage,'getItem'|'setItem'>;
const object=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const profileKeys=['weight','height','age','start','adjustment','baselineWeight','bodyFat','baselineDate','planRevision','paceStart','paceWeight'];
const entryKeys=['weight','bodyFat','sleep','soreness','pain','extra','calories','protein','carbs','fat','cardio','cardioOther','notes','done','lifts','sets','loads','activityComplete','foodComplete','meals','nutritionTarget'];
function pick(o:Record<string,unknown>,keys:string[]){return Object.fromEntries(keys.filter(k=>Object.hasOwn(o,k)).map(k=>[k,o[k]]));}
export function parseData(text:string):LocalData{
 if(text.length>5_000_000)throw Error('ไฟล์ใหญ่เกิน 5 MB');
 let value:unknown;try{value=JSON.parse(text, (key,v)=>{if(['__proto__','prototype','constructor'].includes(key))throw Error('invalid key');return v})}catch{throw Error('ไฟล์ JSON ไม่ถูกต้อง ข้อมูลเดิมยังอยู่');}
 if(!object(value)||!Object.hasOwn(value,'profile')||!object(value.logs))throw Error('ต้องเป็นข้อมูล Court Coach ที่มี profile และ logs');
 if(('version' in value&&value.version!==1)||('format' in value&&value.format!=='court-coach'))throw Error('ไม่รองรับรุ่นข้อมูลนี้');
 if(value.profile!==null&&(!object(value.profile)||!validateProfile(value.profile)))throw Error('ข้อมูลส่วนตัวในไฟล์ไม่ถูกต้อง');
 if(Object.keys(value.logs).length>10000)throw Error('จำนวนวันในไฟล์มากเกินไป');
 const logs:Record<string,Entry>={};
 for(const [date,entry] of Object.entries(value.logs)){
  if(!validDate(date)||!object(entry)||!validateEntry(entry))throw Error('บันทึกวันที่ '+date+' ไม่ถูกต้อง ตรวจตัวเลขและยอดรวมมื้ออาหาร');
  logs[date]=pick(entry,entryKeys) as Entry;
 }
 return {profile:value.profile===null?null:pick(value.profile as Record<string,unknown>,profileKeys) as Profile,logs};
}
export const storageKey=(path:string)=>'court-coach:local:v1:'+path;
export function readLocal(storage:Store,key:string):{data:LocalData;raw:string|null}{
 let raw:string|null;try{raw=storage.getItem(key)}catch{throw Error('เบราว์เซอร์ไม่อนุญาตให้เก็บข้อมูล ดูแผนได้ แต่ยังบันทึกไม่ได้');}
 return {raw,data:raw===null?{profile:null,logs:{}}:parseData(raw)};
}
export function encodeBackup(data:LocalData):string{return JSON.stringify({...data,format:'court-coach',version:1,revision:crypto.randomUUID(),exportedAt:new Date().toISOString()},null,2)}
export function writeLocal(storage:Store,key:string,data:LocalData,expected:string|null):string{
 const raw=encodeBackup(data);parseData(raw);
 try{if(storage.getItem(key)!==expected)throw Error('CONFLICT');storage.setItem(key,raw)}catch(e){if((e as Error).message==='CONFLICT')throw Error('มีข้อมูลใหม่จากอีกแท็บ ส่งออกสิ่งที่ค้างไว้ก่อน แล้วโหลดข้อมูลล่าสุดเพื่อแก้ต่อ');throw Error('บันทึกไม่สำเร็จ พื้นที่เบราว์เซอร์อาจเต็มหรือถูกปิดกั้น ข้อมูลที่กรอกยังอยู่ในหน้านี้ ส่งออกสำรองได้');}
 return raw;
}
export function mergeImport(existing:LocalData,incoming:LocalData,overwrite:boolean,useProfile:boolean):LocalData{
 return {profile:useProfile&&incoming.profile?incoming.profile:existing.profile,logs:overwrite?{...existing.logs,...incoming.logs}:{...incoming.logs,...existing.logs}};
}
export function displayProfile(p:Profile|null):Profile{return p?{...p}:{...defaultProfile};}
