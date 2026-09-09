export const mealSlots=[['breakfast','เช้า'],['lunch','เที่ยง'],['preworkout','ก่อนซ้อม'],['dinner','เย็น'],['snack','มื้อเสริม']] as const;
export type MealKey=typeof mealSlots[number][0]|'legacy';
export type Meal={calories:number|null;protein:number|null;carbs:number|null;fat:number|null;note:string};
export type Meals=Partial<Record<MealKey,Meal>>;
export const nutrients=['calories','protein','carbs','fat'] as const;
export const emptyMeal=():Meal=>({calories:null,protein:null,carbs:null,fat:null,note:''});
export function mealTotals(meals:Meals){return Object.fromEntries(nutrients.map(k=>{const values=Object.values(meals).map(m=>m[k]).filter((n):n is number=>n!==null);return [k,values.length?Math.round(values.reduce((a,b)=>a+b,0)*10)/10:null]})) as Pick<Meal,typeof nutrients[number]>}
export function mealsForEntry(entry:Pick<Meal,'calories'|'protein'|'carbs'|'fat'>&{meals?:Meals}):Meals{
 if(entry.meals)return entry.meals;
 return nutrients.some(k=>entry[k]!==null)?{legacy:{...emptyMeal(),...Object.fromEntries(nutrients.map(k=>[k,entry[k]])),note:'ยอดรวมเดิมที่ยังไม่ได้แยกมื้อ'}}:{};
}
export function validateMeals(value:unknown):value is Meals{
 if(!value||typeof value!=='object'||Array.isArray(value))return false;
 return Object.entries(value).every(([key,m])=>[...mealSlots.map(([id])=>id),'legacy'].includes(key)&&m&&typeof m==='object'&&!Array.isArray(m)&&typeof m.note==='string'&&m.note.length<=300&&nutrients.every(k=>m[k]===null||typeof m[k]==='number'&&Number.isFinite(m[k])&&m[k]>=0&&m[k]<=(k==='calories'?10000:1500)));
}
export function mealTotalsMatch(e:Pick<Meal,'calories'|'protein'|'carbs'|'fat'>&{meals?:Meals}){if(e.meals===undefined)return true;if(!validateMeals(e.meals))return false;const totals=mealTotals(e.meals);return nutrients.every(k=>totals[k]===e[k]);}
