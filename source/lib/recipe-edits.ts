import {foodPresets,type FoodPreset} from './food-presets';
import {customFoodKey,readCustomFoods,validCustomFood} from './custom-foods';
export const recipeEditsKey='court-coach:recipe-edits:v1';
type Store=Pick<Storage,'getItem'|'setItem'>;
const valid=(f:FoodPreset)=>validCustomFood({...f,id:'custom-00000000-0000-0000-0000-000000000000'})&&typeof f.estimate==='string'&&typeof f.tag==='string';
export function readRecipeEdits(storage:Pick<Storage,'getItem'>):FoodPreset[]{
 const items=JSON.parse(storage.getItem(recipeEditsKey)||'[]');
 if(!Array.isArray(items)||!items.every(f=>f&&foodPresets.some(p=>p.id===f.id)&&valid(f))||new Set(items.map(f=>f.id)).size!==items.length)throw Error('Saved recipe edits could not be read. Existing data has not been changed.');
 return items;
}
export function saveRecipe(storage:Store,food:FoodPreset){
 if(!valid(food))throw Error('Check the recipe name, serving and nutrition values.');
 if(foodPresets.some(f=>f.id===food.id)){
  const current=readRecipeEdits(storage),base=foodPresets.find(f=>f.id===food.id)!;
  const next={...food,fixedPortions:base.fixedPortions};
  storage.setItem(recipeEditsKey,JSON.stringify([...current.filter(f=>f.id!==food.id),next]));
 }else{
  const current=readCustomFoods(storage);
  if(!validCustomFood(food)||!current.some(f=>f.id===food.id))throw Error('This menu item no longer exists. Reload the page.');
  storage.setItem(customFoodKey,JSON.stringify(current.map(f=>f.id===food.id?food:f)));
 }
}
