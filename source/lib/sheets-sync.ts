import type {Entry,Profile} from './coach';
export const sheetUrl='https://docs.google.com/spreadsheets/d/1t8s8k8cOQHQ4QdlZJeZmvSQZcPBIfxcT8fRIcHkyWdE/edit';
const configKey='court-coach:sheets:connection:v1',queueKey='court-coach:sheets:queue:v1';
export type Pending={date:string;entry:Entry;profile:Profile;updatedAt:string;requestId:string};
type Config={endpoint:string;token:string};
type Ack={requestId:string;ok:boolean;error?:string};
export const syncEndpoint='https://script.google.com/macros/s/AKfycbzHmddAP6vHoVCiVg9B_hlYEAdJkVamSb5atLIL8zOvIZOJhZXXloK_fFNwcCa2-2jZ/exec';
export function validConnection(c:Config){return c.endpoint===syncEndpoint&&/^[a-f0-9]{64}$/.test(c.token)}
export function connection():Config|null{try{const c=JSON.parse(localStorage.getItem(configKey)||'null');return c&&validConnection(c)?c:null}catch{return null}}
export function acceptConnection(){const params=new URLSearchParams(location.hash.slice(1));if(!params.has('sheetsEndpoint'))return false;const c={endpoint:params.get('sheetsEndpoint')||'',token:params.get('sheetsToken')||''};history.replaceState(null,'',location.pathname+location.search);if(!validConnection(c))throw Error('ลิงก์เชื่อมชีตไม่ถูกต้อง');localStorage.setItem(configKey,JSON.stringify(c));return true}
export function pending():Record<string,Pending>{const raw=localStorage.getItem(queueKey);return raw?JSON.parse(raw):{}}
export function enqueue(date:string,entry:Entry,profile:Profile){const all=pending();all[date]={date,entry,profile,updatedAt:new Date().toISOString(),requestId:crypto.randomUUID()};localStorage.setItem(queueKey,JSON.stringify(all))}
function acknowledge(endpoint:string,requestId:string):Promise<Ack|null>{return new Promise((resolve,reject)=>{
 const callback='ccAck_'+crypto.randomUUID().replaceAll('-',''),script=document.createElement('script');
 const globals=window as unknown as Record<string,unknown>;
 const cleanup=()=>{clearTimeout(timer);delete globals[callback];script.remove()};
 const timer=setTimeout(()=>{cleanup();reject(Error('ติดต่อ Google ไม่สำเร็จ'))},15000);
 globals[callback]=(value:Ack|null)=>{cleanup();if(value&&value.requestId!==requestId)reject(Error('คำยืนยันไม่ตรงกับรายการ'));else resolve(value)};
 script.onerror=()=>{cleanup();reject(Error('ติดต่อ Google ไม่สำเร็จ'))};
 script.src=endpoint+'?ack='+encodeURIComponent(requestId)+'&callback='+callback+'&t='+Date.now();document.head.append(script);
})}
let active:Promise<number>|null=null;
export function flushQueue():Promise<number>{if(active)return active;active=sendQueue().finally(()=>{active=null});return active}
async function sendQueue(){const c=connection();if(!c)return Object.keys(pending()).length;
 for(const record of Object.values(pending()).sort((a,b)=>a.updatedAt.localeCompare(b.updatedAt))){
  // Opaque POST completion is NOT treated as success. Poll a receipt written after Sheets.flush().
  // Google may commit the write even when its redirect never completes in the browser.
  // Always check the receipt, including after a POST timeout/network error.
  try{await fetch(c.endpoint,{method:'POST',mode:'no-cors',credentials:'omit',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({...record,token:c.token}),signal:AbortSignal.timeout(10000)})}catch{}
  let ack:Ack|null=null;
  for(let i=0;i<5&&!ack;i++){if(i)await new Promise(r=>setTimeout(r,1500));ack=await acknowledge(c.endpoint,record.requestId)}
  if(!ack)throw Error('ยังไม่ได้รับคำยืนยันจากชีต รายการยังอยู่ในคิว');
  if(!ack.ok)throw Error(ack.error||'ชีตปฏิเสธการบันทึก');
  const current=pending();if(current[record.date]?.requestId===record.requestId){delete current[record.date];localStorage.setItem(queueKey,JSON.stringify(current))}
 }
 return Object.keys(pending()).length;
}
