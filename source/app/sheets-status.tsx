import {useEffect,useState} from 'react';
import {acceptConnection,connection,flushQueue,pending,sheetUrl} from '@/lib/sheets-sync';
export default function SheetsStatus({visible=true}:{visible?:boolean}){
 const [message,setMessage]=useState(''),[connected,setConnected]=useState(false),[busy,setBusy]=useState(false);
 async function retry(){setBusy(true);try{const left=await flushQueue();setMessage(left?'รอส่ง '+left+' วัน':'ส่งรายการค้างครบแล้ว')}catch(e){setMessage((e as Error).message)}finally{setBusy(false)}}
 useEffect(()=>{try{const added=acceptConnection();setConnected(!!connection());setMessage(added?'เชื่อมต่อแล้ว กดบันทึกประจำวันเพื่อส่งข้อมูล':Object.keys(pending()).length?'มีรายการรอส่ง':'' )}catch(e){setMessage((e as Error).message)}const online=()=>{if(connection())void retry()};window.addEventListener('online',online);return()=>window.removeEventListener('online',online)},[]);
 return <details className="panel" style={{display:visible?undefined:'none'}}><summary>Google Sheets · {connected?'เชื่อมต่อแล้ว':'ยังไม่เชื่อมต่อเครื่องนี้'}</summary><p>{connected?'บันทึกประจำวันจะส่งข้อมูลครบทั้งวันลงชีต วันที่เดิมจะอัปเดตแถวเดิม':'เปิดชีต แล้วเลือกเมนู Court Coach → เชื่อมเว็บเครื่องนี้ เพื่อเชื่อมต่อครั้งแรก'}</p><a href={sheetUrl} target="_blank" rel="noreferrer">เปิดชีตบันทึกประจำวัน ↗</a>{connected&&<p><button className="small-btn" onClick={()=>void retry()} disabled={busy}>{busy?'กำลังส่ง…':'ส่งรายการค้างอีกครั้ง'}</button></p>}<p role="status">{message}</p></details>
}
