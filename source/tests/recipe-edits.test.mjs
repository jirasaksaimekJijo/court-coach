import assert from 'node:assert/strict';
import {test} from 'node:test';
import {foodPresets,presetMeal} from '../lib/food-presets.ts';
import {readRecipeEdits,saveRecipe,recipeEditsKey} from '../lib/recipe-edits.ts';
import {addCustomFood,readCustomFoods} from '../lib/custom-foods.ts';
import {mealSummary} from '../lib/meal-summary.ts';
import {dietReview} from '../lib/diet-review.ts';
import {emptyEntry} from '../lib/coach.ts';
test('recipe overrides survive reload, preserve other edits and do not mutate logged meals',()=>{
 const map=new Map(),storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};
 const original=foodPresets[0],logged=presetMeal(original,1),edited={...original,values:{...original.values,calories:400}};
 saveRecipe(storage,edited);saveRecipe(storage,{...foodPresets[1],name:'Changed'});
 assert.equal(readRecipeEdits(storage).length,2);assert.equal(presetMeal(readRecipeEdits(storage)[0],1).calories,400);assert.equal(logged.calories,original.values.calories);
 const custom={...edited,id:'custom-11111111-1111-4111-8111-111111111111'};addCustomFood(storage,custom);saveRecipe(storage,{...custom,name:'Updated'});assert.equal(readCustomFoods(storage)[0].name,'Updated');
 assert.throws(()=>saveRecipe(storage,{...edited,values:{...edited.values,fat:-1}}));
 assert.throws(()=>saveRecipe({...storage,setItem:()=>{throw Error('quota')}},edited));
 map.set(recipeEditsKey,'broken');assert.throws(()=>saveRecipe(storage,edited));assert.equal(map.get(recipeEditsKey),'broken');
});
test('short meal descriptions keep multiple meals and leave original notes intact',()=>{
 const note='Oats × 1 container (estimated based on recipe) + Basil × 1 meal (estimated based on recipe); Recipe base (1 portion): rice 200g; raw chicken 250g + pork 50g; no oil + Egg × 1 egg';
 assert.equal(mealSummary(note),'Oats × 1 container + Basil × 1 meal + Egg × 1 egg');assert(note.includes('rice 200g'));
 assert.equal(mealSummary('Rice + chicken, no sauce'),'Rice + chicken, no sauce');
});
test('diet review excludes incomplete and future days and never invents missing targets or weight trends',()=>{
 const logs={'2026-09-10':{...emptyEntry(),weight:111.2,foodComplete:true,calories:2919,nutritionTarget:{calories:2700,protein:222.4,carbs:273,fat:80}},'2026-09-09':{...emptyEntry(),foodComplete:true,calories:2500},'2026-09-08':{...emptyEntry(),calories:10},'2026-09-11':{...emptyEntry(),foodComplete:true,calories:9999}};
 const x=dietReview(logs,'2026-09-10');assert.equal(x.count,2);assert.equal(x.average,2709.5);assert.equal(x.paired,1);assert.equal(x.averageDifference,219);assert.equal(x.review.delta,null);assert.equal(x.latestWeight,111.2);assert(x.pace[0]>1&&x.pace[0]<1.1);
 assert.equal(dietReview({},'2026-09-10').average,null);assert.equal(dietReview(logs,'2027-01-01').pace,null);
});
