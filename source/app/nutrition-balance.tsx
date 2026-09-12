import type {Entry} from '@/lib/coach';

type Targets=Record<'calories'|'protein'|'carbs'|'fat',number>;
export default function NutritionBalance({entry,target}:{entry:Entry;target:Targets}){
 return <section className="panel nutrition-balance" aria-live="polite"><h3>ขาด / เกินจากเป้าอาหาร</h3><p className="muted">เทียบยอดที่กรอกวันนี้กับเป้าในหน้าอาหาร</p><div className="nutrition-balance-grid">{([['calories','พลังงาน','kcal'],['protein','โปรตีน','g'],['carbs','คาร์บ','g'],['fat','ไขมัน','g']] as const).map(([key,label,unit])=>{
 const actual=entry[key],delta=actual==null?null:Math.round((actual-target[key])*10)/10;
 return <div key={key} className={delta===null?'unknown':delta>0?'over':delta<0?'under':'on-target'}><span>{label}</span><strong>{delta===null?'ยังไม่กรอก':delta===0?'พอดีเป้า':`${delta>0?'เกิน':'ขาด'} ${Math.abs(delta).toLocaleString('en-US',{maximumFractionDigits:1})} ${unit}`}</strong><small>กิน {actual??'—'} / เป้า {target[key]} {unit}</small></div>
 })}</div></section>
}
