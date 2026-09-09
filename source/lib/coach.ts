import {mealTotalsMatch,type Meals} from './meals';
export type Profile = { planRevision?:number; paceStart?:string; paceWeight?:number; weight:number; height:number; age:number; start:string; adjustment:number; baselineWeight:number; bodyFat:number; baselineDate:string };
export type Entry = { weight:number|null; bodyFat:number|null; sleep:number|null; soreness:number; pain:boolean; extra:number; calories:number|null; protein:number|null; carbs:number|null; fat:number|null; cardio:number|null; cardioOther?:number|null; notes:string; done:string[]; lifts:Record<string,string>; sets?:Record<string,number>; loads?:Record<string,number>; activityComplete?:boolean; foodComplete?:boolean; meals?:Meals; nutritionTarget?:{calories:number;protein:number;carbs:number;fat:number} };
export const defaultProfile:Profile={planRevision:1,paceStart:'2026-09-08',paceWeight:114,weight:114,height:185,age:26,start:'2026-09-08',adjustment:0,baselineWeight:112,bodyFat:30,baselineDate:'2026-09-08'};
export const emptyEntry=():Entry=>({weight:null,bodyFat:null,sleep:null,soreness:0,pain:false,extra:0,calories:null,protein:null,carbs:null,fat:null,cardio:null,notes:'',done:[],lifts:{}});
export function dateKey(d=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(d)}
export const days=['จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์','อาทิตย์'];
export type Exercise={id:string;name:string;reps:string;cue:string;rest:number;main?:boolean;optional?:boolean;legExtra?:boolean};
const ex=(id:string,name:string,reps:string,cue:string,rest=75,main=false):Exercise=>({id,name,reps,cue,rest,main});
export const plans=[
 {title:'ขา A · แรงส่งและการทรงตัว',tag:'LOWER A',time:'40–50',cardio:'เดินสบาย 10 นาทีหลังเวท',minutes:10,focus:'ควบคุมเข่าและสะโพกให้มั่นคงก่อนเพิ่มความเร็ว',exercises:[ex('squat','Goblet squat','8–10','ถือดัมเบลชิดอก ย่อลงเท่าที่ควบคุมได้ เข่าไปทิศเดียวกับปลายเท้า',120,true),ex('rdl','Dumbbell stiff-leg deadlift','8–10','ดันสะโพกไปด้านหลัง หลังเป็นกลาง ลดจนรู้สึกตึงต้นขาด้านหลัง',120,true),ex('split','Bodyweight walking lunge','8 / ข้าง','ก้าวช้า ๆ ด้วยน้ำหนักตัว ย่อตื้นก่อน เข่าตามปลายเท้า ถ้าคุมไม่ได้ให้ทำ goblet squat เบาแทน',90),ex('calf','Standing calf raise','12–15','เขย่งช้า ๆ ขึ้นสุดช่วงที่ไม่เจ็บ จับหลักพยุง',60),ex('deadbug','Dead bug','8 / ข้าง','หายใจออก เก็บซี่โครง เหยียดแขนขาสลับโดยหลังไม่แอ่น',60)]},
 {title:'ช่วงบน A · ดึงและดัน',tag:'UPPER A',time:'40–50',cardio:'จักรยานเบา 15 นาที พูดเป็นประโยคได้',minutes:15,focus:'หลังแข็งแรงและสะบักเคลื่อนไหวดี ช่วยรองรับการตีเหนือศีรษะ',exercises:[ex('bench','Dumbbell bench press','8–12','เท้าวางมั่นคง ลดดัมเบลช้า ๆ ไม่ฝืนไหล่ลงลึก',120,true),ex('pulldown','Lat pulldown','10–12','ดึงลงหน้าอกส่วนบน ไม่เหวี่ยงตัวหรือดึงหลังคอ',90,true),ex('row','Seated cable row','10–12','ดึงศอกไปด้านหลัง ลำตัวนิ่ง ไม่ยกไหล่',90,true),ex('face','Face pull','12–15','ใช้สายเบา ดึงเข้าระดับใบหน้า คอผ่อนคลาย',60),ex('pallof','Pallof press','10 / ข้าง','ยืนมั่นคง ดันสายออก ไม่ปล่อยลำตัวบิด',60)]},
 {title:'เวทเบา · แกนกลางและไหล่',tag:'CONTROL',time:'25–35',cardio:'จักรยานหรือเดินเร็ว 20 นาที ระดับคุยได้สบาย',minutes:20,focus:'วันเบาช่วยสะสมความสม่ำเสมอ ให้ขาฟื้นก่อนเวทวันพฤหัสฯ',exercises:[ex('external','Band external rotation','12–15 / ข้าง','หนีบผ้าข้างลำตัว หมุนแขนออกช้า ๆ ด้วยยางเบา',60),ex('scaption','Dumbbell scaption','10–12','ยกแขนเฉียงด้านหน้า นิ้วโป้งขึ้น ถึงระดับไหล่เท่าที่สบาย',60),ex('carry','Dumbbell farmer hold · ถือดัมเบลค้าง','20–30 วินาที','ใช้ดัมเบลทั่วไปสองข้าง ยืนเท้ากว้างประมาณสะโพก แขนข้างลำตัว เกร็งหน้าท้องเบา ๆ ไม่ยักไหล่ ไม่เอนตัว ถือค้างโดยไม่เดิน หายใจตามปกติ วางลงเมื่อจับไม่มั่นคง',75),ex('sideplank','Side bridge','20–30 วินาที / ข้าง','ศอกใต้ไหล่ ลำตัวตรง หากยากให้วางเข่าทั้งสองบนพื้นเพื่อลดแรงต้าน',60)]},
 {title:'ขา B · ก้าวและหยุดอย่างมั่นคง',tag:'LOWER B',time:'35–45',cardio:'เดินสบาย 10 นาที ไม่เพิ่มวิ่งหนัก',minutes:10,focus:'ฝึกแรงสะโพกด้านข้างและการก้าวขึ้นอย่างมั่นคง ก่อนเพิ่มความเร็วในสนาม',exercises:[ex('legpress','Leg press','10–12','วางเท้ามั่นคง ลดจนสะโพกยังแนบเบาะ ไม่ล็อกเข่ากระแทก',120,true),ex('stepup','Dumbbell step-up','8 / ข้าง','เริ่มไม่ถือดัมเบลและใช้กล่องเตี้ย 10–15 ซม. ดันจากขาบน ไม่ต้องใช้ม้านั่งสูงตามภาพ',90,true),ex('legcurl','Seated leg curl','10–15','ปรับจุดหมุนเครื่องให้ตรงเข่า หลังแนบเบาะ กดแผ่นต้นขาให้มั่นคง งอเข่าดึงแผ่นรองลงช้า ๆ ไม่กระชาก',90),ex('lateral','Standing side leg raise','10–12 / ข้าง','จับเก้าอี้มั่นคง ยกขาออกด้านข้างช้า ๆ ลำตัวไม่เอียง ฝึกแรงสะโพกด้านข้างสำหรับก้าวในสนาม',60),ex('seatedcalf','Seated calf raise','12–15','งอเข่า เขย่งเต็มช่วงที่สบาย ลดส้นช้า ๆ',60)]},
 {title:'ช่วงบน B · เก็บแรงไว้ลงคอร์ต',tag:'UPPER B · LIGHT',time:'25–35',cardio:'เดินเบา 10 นาที งดอินเทอร์วัลก่อนวันแบต',minutes:10,focus:'ใช้น้ำหนักเบา เหลือแรง 4 ครั้งทุกเซ็ต ไม่ซ้อมจนหมดแรง',exercises:[ex('chestrow','Chest-supported row','10–12','อกแนบเบาะ ดึงศอกโดยไม่เหวี่ยงตัว',90),ex('incline','Incline push-up','8–12','วางมือบนม้านั่งมั่นคง เกร็งลำตัว เลือกความสูงให้ยังเหลือแรง',75),ex('rear','Seated rear delt raise','12–15','นั่งพับสะโพกไปหน้า หลังเป็นกลาง ใช้ดัมเบลเบา กางแขนโดยไม่ยักไหล่',60),ex('pallof','Pallof press','10 / ข้าง','ดันสายตรงหน้า ต้านการหมุนลำตัว',60)]},
 {title:'วันแบดมินตัน · ทักษะและเกม',tag:'COURT DAY',time:'45–60',cardio:'ใช้การตีแบตเป็นคาร์ดิโอวันนี้ ไม่ต้องวิ่งเพิ่ม',minutes:0,focus:'วอร์ม 10 นาที → ฝึกเสิร์ฟ/ตีโต้ 10 นาที → เล่นคู่ 20–35 นาทีสลับพัก → คูลดาวน์ 5 นาที ถ้าเดิมเล่นได้นานกว่านี้ให้คงระดับสบายก่อน',exercises:[] as Exercise[]},
 {title:'พักและฟื้นตัว',tag:'RECOVERY',time:'0–20',cardio:'เลือกเดินสบาย 15–20 นาที หรือพักเต็มวัน',minutes:0,focus:'นอนให้พอ เตรียมอาหาร และสังเกตอาการล้าที่ค้างจากทั้งสัปดาห์',exercises:[] as Exercise[]}
];
// Preserve movement IDs so previous logs and images remain valid.
const accessoryIds=['pallof','external','incline','deadbug','scaption'];
const baseExercises=plans.flatMap(p=>p.exercises);
for(let day=0;day<5;day++){
 const extra=baseExercises.find(e=>e.id===accessoryIds[day]);
 if(extra)plans[day].exercises.push({...extra,main:false,optional:true});
 plans[day].time=day===0||day===3?'75–100':day===2||day===4?'45–70':'60–90';
}
// Substitute a simpler core exercise without rewriting historical Pallof logs.
for(const day of [0,1,4]){const replacement=baseExercises.find(e=>e.id===(day===0?'sideplank':'deadbug'))!;plans[day].exercises=plans[day].exercises.map(e=>e.id==='pallof'?{...replacement,optional:e.optional}:e);}
const legAccessoryPool=[...baseExercises,ex('bridge','Glute bridge','10–12','นอนหงาย ชันเข่า เกร็งก้นยกสะโพกช้า ๆ ไม่แอ่นหลัง ใช้น้ำหนักตัวก่อน',60)];
const legAccessoryDays=[['lateral','seatedcalf'],['legcurl','calf'],['bridge','lateral'],['bridge','calf'],['bridge','lateral']];
for(let day=0;day<5;day++)for(const id of legAccessoryDays[day]){const movement=legAccessoryPool.find(e=>e.id===id)!;plans[day].exercises.push({...movement,main:false,optional:true,legExtra:true,cue:movement.cue+' · ท่าเสริมขา 1 เซ็ตเบา เหลือแรงอย่างน้อย 4 ครั้ง ถ้าล้าหรือฟอร์มเสียให้ข้าม'});}
for(const day of [0,3])for(const movement of plans[day].exercises){if(movement.main)movement.rest=180;else if(['split','stepup'].includes(movement.id))movement.rest=120;}
plans[1].cardio='เดิน 60 นาที ปรับชัน/ความเร็วให้ยังคุยเป็นประโยคได้';
plans[2].cardio='เดินหรือจักรยาน 60 นาที ระดับคุยได้ ไม่เร่งความชัน';
plans[4].cardio='เดินเบา 60 นาที ลดความชันก่อนวันแบต';
for(const day of [1,2,4])plans[day].minutes=60;
// New IDs keep earlier movement logs separate from the substitutions.
const replacements:Record<string,Exercise>={
 lateral:ex('hipabduction','Hip abduction machine · เครื่องกางขาออก','12–15','นั่งหลังพิงเบาะ วางแผ่นรองด้านนอกเข่า กางขาออกช้า ๆ แล้วคุมกลับ ไม่โยกตัว ไม่ฝืนช่วงที่เจ็บ',60),
 seatedcalf:ex('dbseatedcalf','Seated dumbbell calf raise · นั่งเขย่งน่องดัมเบล','12–15 / ข้าง','นั่งม้านั่ง งอเข่าราว 90° วางดัมเบลบนต้นขาเหนือเข่าเล็กน้อย รองผ้าและจับให้มั่น ทำทีละข้าง ยกส้นแล้วลดช้า ๆ เริ่มบนพื้นได้ ไม่จำเป็นต้องมีแท่นตามภาพ ทำครบสองข้างนับเป็น 1 เซ็ต',60),
 scaption:ex('dbside','Dumbbell lateral raise · ยกไหล่ด้านข้าง','12–15','ใช้ดัมเบลเบา งอศอกเล็กน้อย ยกแขนออกด้านข้างถึงระดับไหล่หรือต่ำกว่าที่สบาย ลดช้า ๆ ไม่เหวี่ยง ไม่ยักไหล่ หากเจ็บหรือหนีบให้ข้าม',60)
};
for(const plan of plans)plan.exercises=plan.exercises.map(m=>replacements[m.id]?{...m,...replacements[m.id],main:m.main,optional:m.optional,legExtra:m.legExtra,cue:replacements[m.id].cue+(m.legExtra?' · ท่าเสริมขา 1 เซ็ตเบา เหลือแรงอย่างน้อย 4 ครั้ง ถ้าล้าให้ข้าม':'')}:m);
export function cycleWeek(week:number){return ((Math.max(1,week)-1)%4)+1}
export function cardioPlan(day:number,week:number,mode:string,extra=0){
 if(mode==='stop')return {minutes:0,optional:0,text:'พักคาร์ดิโอและแบตวันนี้เพราะมีอาการเจ็บ'};
 if(extra>=30&&day!==5)return {minutes:0,optional:0,text:'วันนี้มีแบตเพิ่ม ใช้แทนคาร์ดิโอ ไม่ต้องทำลู่อีก 60 นาที'};
 if(mode==='light')return {minutes:15,optional:0,text:'เดินหรือปั่นเบา 10–15 นาทีตามไหว หรือพักหากยังล้า'};
 const deload=cycleWeek(week)===4;
 if([1,2,4].includes(day))return {minutes:deload?40:60,optional:0,text:deload?'สัปดาห์ผ่อน: เดิน/ปั่นเบา 40 นาที ลดความชัน':plans[day].cardio};
 return {minutes:plans[day].minutes,optional:day===0&&cycleWeek(week)>1&&!deload?60:0,text:plans[day].cardio};
}
export function dayIndex(date:string){return (new Date(date+'T12:00:00+07:00').getUTCDay()+6)%7}
export function weekNumber(date:string,start:string){return Math.max(1,Math.floor((Date.parse(date)-Date.parse(start))/604800000)+1)}
export function readiness(e:Entry){return e.pain?'stop':(e.sleep!==null&&e.sleep<6)||e.soreness>=7?'light':'normal'}
export function setCount(exercise:Exercise,week:number,mode:string,day:number){if(mode==='stop')return 0;if(exercise.legExtra)return mode==='light'||cycleWeek(week)===4?0:1;if(mode==='light')return 1;const phase=cycleWeek(week);if(phase===4)return exercise.main&&day!==2&&day!==4?2:1;if(exercise.optional&&phase===1)return 1;return phase===1||day===2||day===4?2:exercise.main?3:2}
export function nutrition(p:Profile,day:number,extra:number,proteinWeight=p.weight){const bmr=10*p.weight+6.25*p.height-5*p.age+5;const base=Math.round((bmr*1.45-600)/50)*50;const calories=base+(day===5?200:day===6?-300:0)+(day!==5&&extra>=30?150:0)+p.adjustment;const protein=Math.round(proteinWeight*2*10)/10;const fat=Math.round(calories*.26/5/9)*5;const carbs=Math.round((calories-protein*4-fat*9)/4);return {calories,protein,fat,carbs,proteinWeight,bmr:Math.round(bmr),maintenance:Math.round(bmr*1.45)}}
export function weeklyReview(logs:Record<string,Entry>,date:string){const end=Date.parse(date);const group=(lo:number,hi:number)=>Object.entries(logs).filter(([d,e])=>e.weight!==null&&end-Date.parse(d)>=lo*86400000&&end-Date.parse(d)<hi*86400000).map(([,e])=>e.weight!);const now=group(0,7),prev=group(7,14);const mean=(a:number[])=>a.reduce((s,n)=>s+n,0)/a.length;return {now:now.length?mean(now):null,prev:prev.length?mean(prev):null,delta:now.length>=3&&prev.length>=3?mean(now)-mean(prev):null,n:now.length,p:prev.length}}
export function validDate(value:unknown):value is string{return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value}
function range(v:unknown,min:number,max:number,nullable=false){return nullable&&v===null||typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max}
export function validateProfile(p:any):p is Profile{return p&&(p.paceStart===undefined||validDate(p.paceStart))&&(p.paceWeight===undefined||range(p.paceWeight,40,250))&&(p.planRevision===undefined||p.planRevision===1)&&range(p.weight,40,250)&&range(p.height,130,220)&&range(p.age,18,80)&&Number.isInteger(p.age)&&validDate(p.start)&&range(p.adjustment,-200,200)&&range(p.baselineWeight,40,250)&&range(p.bodyFat,5,60)&&validDate(p.baselineDate)}
export function validateEntry(e:any):e is Entry{return e&&(e.nutritionTarget===undefined||e.nutritionTarget&&typeof e.nutritionTarget==='object'&&!Array.isArray(e.nutritionTarget)&&['calories','protein','carbs','fat'].every(k=>range(e.nutritionTarget[k],0,k==='calories'?10000:1500)))&&(e.cardioOther===undefined||range(e.cardioOther,0,360,true))&&(e.loads===undefined||e.loads&&typeof e.loads==='object'&&!Array.isArray(e.loads)&&Object.keys(e.loads).length<=60&&Object.entries(e.loads).every(([k,v])=>/^[a-z]+$/.test(k)&&typeof v==='number'&&Number.isFinite(v)&&v>=0&&v<=1000))&&(e.sets===undefined||e.sets&&typeof e.sets==='object'&&!Array.isArray(e.sets)&&Object.keys(e.sets).length<=60&&Object.entries(e.sets).every(([k,v])=>/^[a-z]+$/.test(k)&&typeof v==='number'&&Number.isInteger(v)&&v>=0&&v<=12))&&(e.foodComplete===undefined||typeof e.foodComplete==='boolean')&&mealTotalsMatch(e)&&range(e.weight,40,250,true)&&range(e.bodyFat,5,60,true)&&range(e.sleep,0,24,true)&&range(e.soreness,0,10)&&typeof e.pain==='boolean'&&range(e.extra,0,360)&&(e.activityComplete===undefined||typeof e.activityComplete==='boolean')&&range(e.calories,0,10000,true)&&['protein','carbs','fat'].every(k=>range(e[k],0,1500,true))&&range(e.cardio,0,360,true)&&typeof e.notes==='string'&&e.notes.length<=1500&&Array.isArray(e.done)&&e.done.length<=30&&e.done.every((s:unknown)=>typeof s==='string'&&/^[a-z]+$/.test(s))&&e.lifts&&typeof e.lifts==='object'&&!Array.isArray(e.lifts)&&Object.keys(e.lifts).length<=60&&Object.entries(e.lifts).every(([k,v])=>/^[a-z]+-\d$/.test(k)&&typeof v==='string'&&v.length<=40)}
export function projection(p:Profile,date:string){const weeks=Math.max(0,(Date.parse(date)-Date.parse(p.baselineDate))/604800000);const lean=p.baselineWeight*(1-p.bodyFat/100);const target=lean/.9;const low=Math.max(target,p.baselineWeight-weeks*.7),high=Math.max(target,p.baselineWeight-weeks*.4);return {low,high,bfLow:Math.max(10,(1-lean/low)*100),bfHigh:Math.max(10,(1-lean/high)*100),target,weeks}}

export function compositionScenario(p:Profile){const lean=p.baselineWeight*(1-p.bodyFat/100);return {lean,atWeights:[90,95].map(weight=>({weight,bodyFat:(1-lean/weight)*100})),atBodyFats:[20,15,10].map(bodyFat=>({bodyFat,weight:lean/(1-bodyFat/100)}))}}

// Apply the latest user-reported calculation weight once; preserve the separately dated BF baseline.
export function currentProfile(p:Profile):Profile{return p.planRevision===1?{...defaultProfile,...p}:{...defaultProfile,...p,weight:114,paceWeight:114,paceStart:'2026-09-08',planRevision:1}}

export function proteinWeightForDate(p:Profile,logs:Record<string,Entry>,date:string,entry:Entry){
 const usable=(w:number|null):w is number=>typeof w==='number'&&Number.isFinite(w)&&w>=40&&w<=250;
 if(usable(entry.weight))return entry.weight;
 const latest=Object.entries(logs).filter(([d,e])=>d<=date&&usable(e.weight)).sort(([a],[b])=>b.localeCompare(a))[0];
 return latest?latest[1].weight!:p.weight;
}
