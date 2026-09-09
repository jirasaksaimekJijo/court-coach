import type {Meal} from './meals';
export const foodSource='https://chatgpt.com/share/6aa02e08-be70-83ec-be10-a68d45e531ea';
export type FoodPreset={id:string;name:string;unit:string;tag:string;ingredients:string[];method:string;estimate:string;values:Omit<Meal,'note'>};
export const foodPresets:FoodPreset[]=[
 {id:'overnight-oats',name:'Overnight oats สูตรเดิม',unit:'กล่อง',tag:'มื้อเช้า',ingredients:['ข้าวโอ๊ต 40 g','นมหวานน้อย 200 ml','เมล็ดเจีย 10 g','เวย์ 1 scoop','กล้วยประมาณ 65 g','น้ำผึ้ง 5 g','เม็ดมะม่วงหิมพานต์ 10 g'],method:'ผสมโอ๊ต นม เมล็ดเจีย เวย์ และน้ำผึ้ง แช่ตู้เย็น ใส่กล้วยและเม็ดมะม่วงตอนกิน',estimate:'ค่าประมาณตามตารางในแชต ยี่ห้อนมและขนาด scoop ทำให้ค่าจริงต่างได้',values:{calories:539,protein:40,carbs:66,fat:15}},
 {id:'oats-less-carb',name:'Overnight oats ลดคาร์บ',unit:'กล่อง',tag:'มื้อเช้า',ingredients:['ข้าวโอ๊ต 30 g','นมหวานน้อย 200 ml','เมล็ดเจีย 10 g','เวย์ 1 scoop','กล้วย 50 g','ไม่ใส่น้ำผึ้ง','เม็ดมะม่วงหิมพานต์ 10 g'],method:'วิธีเดียวกับสูตรเดิม ลดโอ๊ตและกล้วย พร้อมตัดน้ำผึ้ง',estimate:'แชตประมาณ 450 kcal · P 38 g · C 48–50 g · F 14 g ช่องคาร์บเว้นไว้ให้ยืนยันจากวัตถุดิบจริง',values:{calories:450,protein:38,carbs:null,fat:14}},
 {id:'kaprao-chicken-pork',name:'ข้าวกะเพราอกไก่ผสมสามชั้น',unit:'มื้อ',tag:'มื้อหลัก',ingredients:['อกไก่บด 250 g (ก่อนปรุง)','สามชั้นบด 50 g (ก่อนปรุง)','ข้าวสวยสุก 150 g','ผัก ใบกะเพรา พริก กระเทียม','ซอสและน้ำมันตามที่ใช้จริง'],method:'ทำเนื้อทั้งรอบด้วยอกไก่ 2,000 g + สามชั้น 400 g แล้วแบ่งหลังปรุงเป็น 8 ส่วนเท่ากัน ไม่ใช่ตักเนื้อสุกส่วนละ 300 g',estimate:'แชตประมาณ 780–850 kcal และโปรตีนราว 65 g ต่อมื้อ ไม่ระบุคาร์บและไขมันครบ จึงต้องกรอกเพิ่มก่อนสรุปสารอาหาร',values:{calories:null,protein:65,carbs:null,fat:null}}
];
export function presetMeal(food:FoodPreset,portions:number):Meal{
 if(!Number.isFinite(portions)||portions<=0||portions>10)throw new Error('ระบุจำนวนส่วนมากกว่า 0 ถึง 10');
 return {...Object.fromEntries(Object.entries(food.values).map(([key,value])=>[key,value===null?null:Math.round(value*portions*10)/10])),note:`${food.name} × ${portions} ${food.unit} (ประมาณจากสูตร)`} as Meal;
}
