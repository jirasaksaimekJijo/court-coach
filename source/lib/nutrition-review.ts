import {nutrition,dayIndex,proteinWeightForDate,type Entry,type Profile} from './coach';
import {nutrients} from './meals';
export function nutritionReview(profile:Profile,logs:Record<string,Entry>,date:string,entry:Entry){
 const target=entry.nutritionTarget??nutrition(profile,dayIndex(date),entry.extra,proteinWeightForDate(profile,logs,date,entry));
 const meals=Object.values(entry.meals??{}).filter(m=>m.note.trim()!==''||nutrients.some(k=>m[k]!==null));
 const rows=nutrients.map(key=>{const actual=entry[key],missing=meals.some(m=>m[key]===null);return {key,target:target[key],actual,missing,delta:actual===null||missing?null:Math.round((actual-target[key])*10)/10};});
 const macroCalories=entry.protein!==null&&entry.carbs!==null&&entry.fat!==null?Math.round(entry.protein*4+entry.carbs*4+entry.fat*9):null;
 const energyMismatch=macroCalories!==null&&entry.calories!==null&&Math.abs(macroCalories-entry.calories)>Math.max(100,entry.calories*.15);
 return {rows,macroCalories,energyMismatch,snapshot:!!entry.nutritionTarget,complete:entry.foodComplete===true&&rows.every(r=>r.delta!==null)&&!energyMismatch};
}
