import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {plans,setCount,exerciseIntensity} from '../lib/coach.ts';
import {addCustomFood,readCustomFoods} from '../lib/custom-foods.ts';
test('all 40 slots match the supplied tables, including order and prescription',()=>{
 const source=readFileSync(new URL('../public/FOUNDATION-PLAN.md',import.meta.url),'utf8');
 const expected=source.split(/\r?\n/).filter(l=>/^\| (Mon|Tue|Thu|Fri|Sun) \|/.test(l)).map(l=>l.split('|').slice(1,-1).map(s=>s.trim()));
 const actual=plans.flatMap(p=>p.exercises.map((e,i)=>[p.tag[0]+p.tag.slice(1).toLowerCase(),`${i+1}. ${e.name}`,String(e.sets),e.reps,e.restLabel,e.intensity,e.cue]));
 assert.equal(actual.length,40);assert.deepEqual(actual,expected.map(r=>r.map((v,i)=>i===1?v.replace(/\*$/,''):v)));
 assert.deepEqual(plans.map(p=>p.exercises.length),[8,8,0,8,8,0,8]);assert.equal(plans[5].time,'240');
});
test('foundation, full dose and deload keep low support intensity intact',()=>{
 const squat=plans[0].exercises[2],throwing=plans[1].exercises[0],easy=plans[6].exercises[0];
 assert.equal(setCount(squat,1,'normal',0),2);assert.equal(setCount(squat,2,'normal',0),2);assert.equal(setCount(squat,3,'normal',0),3);assert.equal(setCount(squat,6,'normal',0),2);
 assert.equal(setCount(throwing,1,'normal',1),3);assert.equal(setCount(easy,6,'normal',6),1);assert.equal(exerciseIntensity(easy,1),'RPE 3');assert.equal(exerciseIntensity(squat,1),'RPE 6 (cap)');assert.equal(setCount(squat,3,'stop',0),0);
});
test('custom menu persists, merges fresh storage and refuses invalid or failed writes',()=>{
 const map=new Map();const storage={getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)};
 const food={id:'custom-11111111-1111-4111-8111-111111111111',name:'Yogurt',unit:'cup',tag:'My menu',ingredients:[],method:'',estimate:'User entered',values:{calories:100,protein:12,carbs:null,fat:0}};
 addCustomFood(storage,food);assert.deepEqual(readCustomFoods(storage)[0],food);
 addCustomFood(storage,{...food,id:'custom-22222222-2222-4222-8222-222222222222'});assert.equal(readCustomFoods(storage).length,2);
 assert.throws(()=>addCustomFood(storage,{...food,values:{...food.values,fat:-1}}));assert.equal(readCustomFoods(storage).length,2);
 assert.throws(()=>addCustomFood({...storage,setItem:()=>{throw Error('quota')}},food));assert.equal(readCustomFoods(storage).length,2);
});
