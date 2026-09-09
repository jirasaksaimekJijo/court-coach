import assert from 'node:assert/strict';
import {test} from 'node:test';
import {parseData,writeLocal,readLocal,encodeBackup,mergeImport,storageKey,displayProfile} from '../lib/local-store.ts';
import {emptyEntry,defaultProfile,plans} from '../lib/coach.ts';
import {mealTotals} from '../lib/meals.ts';
import {activitySummary} from '../lib/activity.ts';
const profile={...defaultProfile,weight:92,baselineWeight:97,paceWeight:93,paceStart:'2026-08-01'};
const meals={breakfast:{calories:539,protein:40,carbs:66,fat:15,note:'โอ๊ต'},dinner:{calories:null,protein:null,carbs:null,fat:null,note:''}};
const entry={...emptyEntry(),weight:92,bodyFat:25,sleep:7,cardio:35,extra:120,sets:{scaption:2,dbside:1},loads:{scaption:5,dbside:4},lifts:{'scaption-0':'5 kg / 12'},meals,...mealTotals(meals),nutritionTarget:{calories:2550,protein:184,carbs:285,fat:75}};
const data={profile,logs:{'2026-09-08':entry}};
const memory=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)}};
test('complete save/reload and export/import preserve data',()=>{const s=memory();assert.deepEqual(readLocal(s,'k').data,{profile:null,logs:{}});writeLocal(s,'k',data,null);assert.deepEqual(readLocal(s,'k').data,data);assert.deepEqual(parseData(encodeBackup(data)),data);});
test('legacy profile values, null fields and cardio ambiguity are preserved',()=>{const old=structuredClone(data);delete old.profile.planRevision;const out=parseData(JSON.stringify(old));assert.equal(displayProfile(out.profile).weight,92);assert.equal(out.profile.paceStart,'2026-08-01');assert.equal(out.logs['2026-09-08'].meals.dinner.calories,null);assert.equal(activitySummary(out.logs['2026-09-08']).needsReview,true);assert.equal(activitySummary({...entry,cardioOther:35}).total,155)});
test('failed imports and quota or concurrent writes do not overwrite storage',()=>{const s=memory(),raw=writeLocal(s,'k',data,null);for(const value of ['{',JSON.stringify({...data,version:99}),JSON.stringify({...data,logs:{'2026-02-30':entry}}),JSON.stringify({...data,logs:{'2026-09-08':{...entry,calories:0}}}),'"bad"','{"profile":null,"logs":{},"__proto__":{}}'])assert.throws(()=>parseData(value));assert.equal(s.getItem('k'),raw);assert.throws(()=>writeLocal(s,'k',{profile:null,logs:{}},null),/อีกแท็บ/);assert.equal(s.getItem('k'),raw);assert.throws(()=>writeLocal({getItem:()=>null,setItem:()=>{throw Error('quota')}},'k',data,null),/ไม่สำเร็จ/);assert.throws(()=>readLocal({getItem:()=>{throw Error('blocked')},setItem:()=>{}},'k'),/ไม่อนุญาต/)});
test('merge defaults preserve existing dates and profile; explicit replacement works',()=>{const incoming={profile:{...profile,weight:90},logs:{'2026-09-08':{...emptyEntry(),weight:90},'2026-09-09':emptyEntry()}};const kept=mergeImport(data,incoming,false,false);assert.equal(kept.logs['2026-09-08'].weight,92);assert.equal(kept.profile.weight,92);assert.equal(Object.keys(kept.logs).length,2);const replaced=mergeImport(data,incoming,true,true);assert.equal(replaced.logs['2026-09-08'].weight,90);assert.equal(replaced.profile.weight,90)});
test('path isolation and requested exercise changes',()=>{assert.notEqual(storageKey('/one/'),storageKey('/two/'));const ids=plans.flatMap(p=>p.exercises.map(e=>e.id));for(const id of ['hipabduction','dbseatedcalf','dbside'])assert(ids.includes(id));for(const id of ['lateral','seatedcalf','scaption'])assert(!ids.includes(id))});

test('legacy profiles without any optional fields retain their own baseline fallback',()=>{const p={...profile};delete p.planRevision;delete p.paceWeight;delete p.paceStart;const result=displayProfile(parseData(JSON.stringify({profile:p,logs:{}})).profile);assert.deepEqual(result,p);assert.equal(result.paceWeight??result.baselineWeight,97)});

test('restore original defaults only for the exact first-release sample',()=>{
 const sample={planRevision:1,paceStart:'2026-09-09',paceWeight:80,weight:80,height:175,age:30,start:'2026-09-09',adjustment:0,baselineWeight:80,bodyFat:20,baselineDate:'2026-09-09'};
 assert.deepEqual(displayProfile(null),defaultProfile);
 assert.deepEqual(displayProfile(sample),defaultProfile);
 for(const changed of [{weight:81},{height:180},{adjustment:50},{bodyFat:21}])assert.deepEqual(displayProfile({...sample,...changed}),{...sample,...changed});
 const stored={profile:sample,logs:data.logs};
 const parsed=parseData(JSON.stringify(stored));displayProfile(parsed.profile);
 assert.deepEqual(parsed.logs,data.logs);
});
