import type {Meal} from './meals';
export const foodSource='https://chatgpt.com/share/6aa02e08-be70-83ec-be10-a68d45e531ea';
export type FoodPreset={fixedPortions?:1;logNote?:string;sources?:{title:string;url:string}[];id:string;name:string;unit:string;tag:string;ingredients:string[];method:string;estimate:string;values:Omit<Meal,'note'>};

type Values=Omit<Meal,'note'>;
// Per 100 g. Sauce/vegetables are explicit planning allowances, not product labels.
const chicken={calories:120,protein:22.5,carbs:0,fat:2.6};
const pork={calories:128,protein:20.65,carbs:0,fat:3.53};
const belly={calories:518,protein:9.34,carbs:0,fat:53.01};
const rice={calories:130,protein:2.69,carbs:28.17,fat:0.28};
const egg={calories:155,protein:12.6,carbs:1.12,fat:10.6};
const white={calories:52,protein:10.9,carbs:0.73,fat:0.17};
const wrap={calories:301,protein:8.1,carbs:51,fat:6.5};
const vegetables={calories:20,protein:1.4,carbs:4,fat:0.2};
const sauce={calories:200,protein:0,carbs:40,fat:0.7/0.15};
function recipeValues(parts:[Values,number][]):Values{return Object.fromEntries((['calories','protein','carbs','fat'] as const).map(k=>{const total=parts.reduce((sum,[v,g])=>sum+(v[k]??0)*g/100,0);return [k,k==='calories'?Math.round(total):Math.round(total*10)/10]})) as Values;}
const nutritionSources=[
 {title:'USDA · หมูสันใน',url:'https://www.ars.usda.gov/ARSUserFiles/80400525/Data/Pork/Pork1-1.pdf'},
 {title:'USDA · อกไก่ดิบ',url:'https://embed.myfooddata.com/nutrition-facts/171077/100g/1'},
 {title:'USDA · สามชั้นดิบ',url:'https://www.calorie.live/foods/usda-pork-fresh-belly-raw'},
 {title:'USDA · ข้าวสวยสุก',url:'https://www.cooks.com/rec/nutrition?nwal=20445'},
 {title:'USDA · ไข่ต้ม',url:'https://tools.myfooddata.com/nutrition-facts/173424/wt3/1'},
 {title:'USDA · ไข่ขาวดิบ',url:'https://whatyoueat.io/foods/172183-egg-white'},
 {title:'ตัวอย่างฉลากแรป Mission (ยังไม่ใช่ยี่ห้อที่คุณซื้อ)',url:'https://www.jjfoodservice.com/product/england/BAK372'},
];
const sauceNote='เผื่อซอส 15 g = 30 kcal, P 0 / C 6 / F 0.7 g และผัก 50 g = 10 kcal เป็นสมมติฐานสำหรับจัดมื้อ ไม่ใช่ฉลากพันท้ายหรือค่าที่ชั่งจริง';
function waterMeal(kind:'pork'|'chicken'):FoodPreset{
 const name=kind==='pork'?'หมูสันใน':'อกไก่';
 return {id:'water-'+kind,name:name+'ผัดน้ำ + ข้าว + ไข่ต้ม 2 ฟอง',unit:'มื้อ',tag:'มื้อทดแทนกะเพรา',
 ingredients:[name+' 250 g ชั่งก่อนปรุง','น้ำสำหรับผัด ไม่เติมน้ำมัน','ข้าวสวยสุก 200 g','ไข่ต้มเบอร์ 0 จำนวน 2 ฟอง (เนื้อไข่รวมประมาณ 130 g)','ผักประมาณ 50 g','น้ำจิ้มสุกี้พันท้ายนรสิงห์ประมาณ 15 g'],
 method:'ผัดเนื้อด้วยน้ำจนสุก เสิร์ฟกับข้าว ไข่ต้ม และน้ำจิ้ม สูตรนี้รวมไข่ 2 ฟองในยอดแล้ว ไม่ต้องกดเพิ่มไข่ซ้ำ '+sauceNote,
 estimate:'จัดทั้งมื้อให้แคลอรีใกล้กะเพรา รวมข้าวและไข่ 2 ฟองแล้ว โปรตีนมากกว่าและไขมันน้อยกว่า จึงไม่ใช่สารอาหารเท่ากันทุกช่อง ซอสใช้ค่าเผื่อ 30 kcal',
 logNote:'เนื้อดิบ 250 g + ข้าวสุก 200 g + ไข่ต้ม 2 ฟอง รวมแล้ว; ซอส 15 g ประมาณ',sources:nutritionSources,
 values:recipeValues([[kind==='pork'?pork:chicken,250],[rice,200],[egg,130],[vegetables,50],[sauce,15]])};
}
function kebabMeal(kind:'pork'|'chicken'):FoodPreset{
 const name=kind==='pork'?'หมูสันใน':'อกไก่';
 return {id:'kebab-'+kind,name:'เคบับ'+name+' · 2 แผ่น',unit:'มื้อ (2 แผ่น)',tag:'มื้อทดแทนกะเพรา',
 ingredients:['แผ่นแรป 12 นิ้ว แผ่นละ 80 g จำนวน 2 แผ่น (รวม 160 g)',name+' 250 g ชั่งก่อนปรุง แบ่งใส่ 2 แผ่น','ผักประมาณ 50 g รวมทั้งมื้อ','ซอสประมาณ 15 g รวมทั้งมื้อ','ไม่เติมน้ำมันในการปรุงเนื้อ'],
 method:'ปรุงเนื้อให้สุก แบ่งเนื้อ ผัก และซอสครึ่งหนึ่งต่อแผ่นแล้วห่อ ใช้ 2 แผ่นเป็นมื้อทดแทน หากกินแผ่นเดียวให้เลือก 0.5 มื้อ คิดแรป 80 g ประมาณ 241 kcal โดยอ้างอิงฉลาก Mission ต่อ 100 g ชั่วคราว ยังไม่ทราบยี่ห้อจาก Shopee '+sauceNote,
 estimate:'แคลอรีใกล้กะเพราเมื่อกินครบ 2 แผ่น แต่คาร์บสูงกว่าและไขมันต่ำกว่า แผ่นละ 80 g ตามที่ระบุ ส่วนสารอาหารแรปและซอสเป็นค่าประมาณรอฉลากจริง',
 logNote:'2 แรป × 80 g + เนื้อดิบรวม 250 g; ใช้ฉลากแรปตัวอย่างและซอสประมาณ',sources:nutritionSources,
 values:recipeValues([[kind==='pork'?pork:chicken,250],[wrap,160],[vegetables,50],[sauce,15]])};
}

export const foodPresets:FoodPreset[]=[
 {id:'oats-less-carb',fixedPortions:1,name:'Overnight oats ลดคาร์บ',unit:'กล่อง',tag:'มื้อเช้า',ingredients:['ข้าวโอ๊ต 30 g','นมหวานน้อย 200 ml','เมล็ดเจีย 10 g','เวย์ 1 scoop','กล้วย 50 g','ไม่ใส่น้ำผึ้ง','เม็ดมะม่วงหิมพานต์ 10 g'],method:'ผสมโอ๊ต นม เมล็ดเจีย และเวย์ แช่ตู้เย็น ใส่กล้วยและเม็ดมะม่วงหิมพานต์ตอนกิน ไม่ใส่น้ำผึ้ง ปริมาณนี้สำหรับ 1 กล่อง',estimate:'แชตประมาณ 450 kcal · P 38 g · C 48–50 g · F 14 g ช่องคาร์บเว้นไว้ให้ยืนยันจากวัตถุดิบจริง',values:{calories:450,protein:38,carbs:null,fat:14}},
 {id:'kaprao-chicken-pork',name:'ข้าวกะเพราอกไก่ผสมสามชั้น',unit:'มื้อ',tag:'มื้อหลัก',
 ingredients:['อกไก่บด 250 g (ก่อนปรุง)','สามชั้นบด 50 g (ก่อนปรุง)','ข้าวสวยสุก 200 g','ผัก ใบกะเพรา พริก กระเทียม รวมประมาณ 50 g','ซอสรวมประมาณ 15 g · เผื่อ 30 kcal','สูตรคำนวณไม่เติมน้ำมันเพิ่ม'],
 method:'ทำเนื้อทั้งรอบด้วยอกไก่ 2,000 g + สามชั้น 400 g แล้วแบ่งหลังปรุงเป็น 8 ส่วนเท่ากัน ไม่ใช่ตักเนื้อสุกส่วนละ 300 g หากเติมน้ำมัน 5 g ให้เพิ่มประมาณ 45 kcal และไขมัน 5 g ต่อมื้อ',
 estimate:'ประมาณ 859 kcal · ข้าวสุก 200 g ตามที่ระบุ รวมค่าผักและซอสที่เผื่อไว้ ไขมันหลักมาจากสามชั้น ไม่เติมน้ำมันเพิ่ม ปริมาณไขมันจริงขึ้นกับชิ้นเนื้อและไขมันที่เททิ้ง',
 logNote:'ข้าวสุก 200 g; ไก่ดิบ 250 g + สามชั้นดิบ 50 g; รวมซอสประมาณ ไม่เติมน้ำมัน',sources:nutritionSources,
 values:recipeValues([[chicken,250],[belly,50],[rice,200],[vegetables,50],[sauce,15]])},
 ...(['pork','chicken'] as const).map(kind=>waterMeal(kind)),
 ...(['pork','chicken'] as const).map(kind=>kebabMeal(kind)),
 {id:'boiled-egg-0',name:'ไข่ต้ม เบอร์ 0',unit:'ฟอง',tag:'เพิ่มในมื้อ',
 ingredients:['ไข่ไก่เบอร์ 0 จำนวน 1 ฟอง','สมมติเนื้อไข่ต้มหลังแกะเปลือก 65 g'],method:'ต้มให้สุก แกะเปลือก ไม่เติมน้ำมัน หากชั่งเนื้อไข่ได้ต่างจาก 65 g ให้ปรับจำนวนส่วนตามน้ำหนักจริง ÷ 65',
 estimate:'ประมาณ 101 kcal ต่อฟอง คิดจากส่วนที่กินได้ 65 g ไม่ใช่น้ำหนักรวมเปลือก ขนาดเบอร์ 0 ไม่ได้กำหนดน้ำหนักเนื้อไข่แน่นอน',
 logNote:'เนื้อไข่ต้มประมาณ 65 g ไม่รวมเปลือก',sources:nutritionSources,values:recipeValues([[egg,65]])},
 {id:'egg-whites-100g',name:'ไข่ขาวทอดไม่ใช้น้ำมัน',unit:'ส่วน (ดิบ 100 g)',tag:'เพิ่มในมื้อ',
 ingredients:['ไข่ขาว 100 g ชั่งก่อนปรุง','ไม่เติมน้ำมันหรือเนย'],method:'ใช้กระทะไม่ติด ปรุงให้สุก น้ำหนักหลังปรุงลดลงได้จากน้ำที่ระเหย แต่ยังบันทึกตามไข่ขาวดิบ 100 g เดิม',
 estimate:'ประมาณ 52 kcal · โปรตีน 10.9 g · คาร์บ 0.7 g · ไขมัน 0.2 g ต่อไข่ขาวดิบ 100 g หากใช้ไข่ขาวบรรจุกล่องให้ยึดฉลากจริง',
 logNote:'ไข่ขาวดิบ 100 g ไม่เติมน้ำมัน',sources:nutritionSources,values:recipeValues([[white,100]])}

];
export function presetMeal(food:FoodPreset,portions:number):Meal{
 if(food.fixedPortions&&portions!==food.fixedPortions)throw new Error('สูตรนี้ใช้ครั้งละ 1 กล่อง');
 if(!Number.isFinite(portions)||portions<=0||portions>10)throw new Error('ระบุจำนวนส่วนมากกว่า 0 ถึง 10');
 return {...Object.fromEntries(Object.entries(food.values).map(([key,value])=>[key,value===null?null:Math.round(value*portions*10)/10])),note:`${food.name} × ${portions} ${food.unit} (ประมาณจากสูตร)${food.logNote?'; '+food.logNote:''}`.slice(0,300)} as Meal;
}
