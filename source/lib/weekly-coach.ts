import {weeklyReview, type Entry, type Profile} from './coach';
const DAY=86400000;
export function paceReference(p:Profile,date:string){
 const weeks=Math.max(0,(Date.parse(date)-Date.parse(p.paceStart??p.baselineDate))/(7*DAY));
 const weight=(p.paceWeight??p.baselineWeight)-weeks,lean=p.baselineWeight*(1-p.bodyFat/100);
 return {weeks,weight,bodyFat:weight>lean?(1-lean/weight)*100:null};
}
export function coachingReview(logs:Record<string,Entry>,date:string){
 const end=Date.parse(date),previous=new Date(end-7*DAY).toISOString().slice(0,10);
 const current=weeklyReview(logs,date),prior=weeklyReview(logs,previous);
 const recent=Object.entries(logs).filter(([d])=>end-Date.parse(d)>=0&&end-Date.parse(d)<14*DAY);
 const foodDays=recent.filter(([,e])=>e.calories!==null&&e.calories>0&&(e.meals===undefined||e.foodComplete===true)).length;
 const completeDays=recent.filter(([,e])=>e.activityComplete===true).length;
 const recovery=recent.some(([d,e])=>end-Date.parse(d)<7*DAY&&(e.pain||e.soreness>=7||(e.sleep!==null&&e.sleep<6)));
 let status='เก็บข้อมูลให้เห็นแนวโน้ม',message='ชั่งหลังตื่น เข้าห้องน้ำแล้ว ก่อนกิน อย่างน้อย 3 วันในแต่ละสัปดาห์ บันทึกอาหารและการฟื้นตัว แล้วเทียบค่าเฉลี่ย 7 วัน';
 if(recovery){status='ให้การฟื้นตัวมาก่อน';message='มีบันทึกเจ็บ ล้าสูง หรือนอนน้อยใน 7 วันที่ผ่านมา ใช้วันเบาตามอาการ ไม่ลดอาหารหรือเพิ่มคาร์ดิโอ หากอาการค้างให้ประเมินกับผู้เชี่ยวชาญ';}
 else if(current.delta!==null&&current.prev!==null&&-current.delta>current.prev*.01){status='ลดเร็ว ควรทบทวน';message='ค่าเฉลี่ยลดเกิน 1% ของน้ำหนักต่อสัปดาห์ อาจมีน้ำร่วมด้วย อย่าเร่งเพิ่ม หากแรงตกหรือหิวมาก ให้เพิ่มอาหาร 100–200 kcal และทบทวนการฟื้นตัว';}
 else if(current.delta!==null&&prior.delta!==null&&current.delta>-.25&&prior.delta>-.25){
  if(foodDays<10||completeDays<10){status='ยังไม่ลด แต่ข้อมูลยังไม่ครบ';message='สองช่วงเปรียบเทียบลดน้อยกว่า 0.25 กก./สัปดาห์ ตรวจอาหารและเติมบันทึกกิจกรรมก่อน วันที่ว่างไม่ได้แปลว่าไม่ได้ซ้อม จึงยังไม่แนะนำลดอาหารเพิ่ม';}
  else {status='ถึงจุดทบทวนอาหาร';message='สองช่วงเปรียบเทียบลดน้อยกว่า 0.25 กก./สัปดาห์ ตรวจปริมาณอาหาร น้ำมัน เครื่องดื่ม และความหิว หากบันทึกตรงกับที่กินจริงและฟื้นตัวดี อาจลดเพียง 100–150 kcal/วัน แล้วดูอีก 14 วัน ไม่เพิ่มคาร์ดิโอพร้อมกัน';}
 }else if(current.delta!==null){status=current.delta<-.25?'แนวโน้มกำลังลด':'ยังต้องดูต่อ';message='คงแผนและดูแรงเวท ความหิว การนอนร่วมกัน เป้าเฉลี่ยใกล้ 1 กก./สัปดาห์ไม่ใช่ขั้นต่ำที่ต้องทำให้ได้ทุกสัปดาห์ ไม่ตัดอาหารจากน้ำหนักครั้งเดียว';}
 return {current,foodDays,completeDays,status,message};
}
