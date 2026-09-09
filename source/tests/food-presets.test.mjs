import assert from 'node:assert/strict';
import {test} from 'node:test';
import {foodPresets,presetMeal} from '../lib/food-presets.ts';
import {addMeal,emptyMeal,validateMeals} from '../lib/meals.ts';
const food=id=>foodPresets.find(f=>f.id===id);
test('replacement meals are within 10% of kaprao calories and distinguish their macros',()=>{
 const base=food('kaprao-chicken-pork');
 assert.equal(base.values.calories,859);
 assert.equal(base.values.fat,34.4);
 for(const id of ['kebab-pork','kebab-chicken']){
  const p=food(id);assert(Math.abs(p.values.calories/base.values.calories-1)<0.1);
  assert(p.values.fat<base.values.fat);assert(validateMeals({lunch:presetMeal(p,1)}));
 }
 assert(food('kebab-chicken').values.carbs>base.values.carbs);
 assert.equal(presetMeal(food('kebab-chicken'),0.5).calories,411);
});
test('eggs add to existing meals without replacing food or assuming missing nutrients are zero',()=>{
 const main=presetMeal(food('kaprao-chicken-pork'),1),egg=presetMeal(food('boiled-egg-0'),1);
 const combined=addMeal(main,egg);assert.equal(combined.calories,960);assert.equal(combined.fat,41.3);
 assert(combined.note.includes(main.note));assert(combined.note.includes('ไข่ต้ม'));assert(validateMeals({lunch:combined}));
 assert.deepEqual(addMeal(emptyMeal(),egg),egg);
 assert.equal(addMeal({...main,carbs:null},egg).carbs,null);
 assert.equal(addMeal({...emptyMeal(),note:'อาหารที่ยังไม่ทราบยอด'},egg).calories,null);
 assert.equal(main.calories,859);
});
test('raw egg whites and fixed single-portion oats remain distinct',()=>{
 assert.deepEqual(food('egg-whites-100g').values,{calories:52,protein:10.9,carbs:0.7,fat:0.2});
 assert.throws(()=>presetMeal(food('oats-less-carb'),2));
 assert.equal(foodPresets.filter(f=>f.id.startsWith('oats')).length,1);
});

test('water meals exclude eggs; smoothie scales the complete recipe',()=>{
 assert.equal(food('water-pork').values.calories,620);assert.equal(food('water-chicken').values.calories,600);
 for(const id of ['water-pork','water-chicken'])assert(!food(id).name.includes('ไข่'));
 const smoothie=presetMeal(food('fruit-meiji-r1-smoothie'),1);assert.deepEqual([smoothie.calories,smoothie.protein,smoothie.carbs,smoothie.fat],[646,91.4,48.9,9.5]);
 assert.equal(presetMeal(food('fruit-meiji-r1-smoothie'),0.5).calories,323);assert(validateMeals({snack:smoothie}));
});
