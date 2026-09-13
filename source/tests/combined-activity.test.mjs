import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyEntry,validateEntry} from '../lib/coach.ts';
import {activitySummary} from '../lib/activity.ts';
import {parseData,encodeBackup} from '../lib/local-store.ts';
test('combined activity totals persist without double counting historical breakdowns',()=>{
 const old={...emptyEntry(),extra:60,cardioOther:30};
 assert.equal(activitySummary(old).total,90);
 const entry={...old,cardio:45,cardioCombined:true};
 assert.equal(validateEntry(entry),true);
 const restored=parseData(encodeBackup({profile:null,logs:{'2026-09-13':entry}})).logs['2026-09-13'];
 assert.equal(activitySummary(restored).total,45);
 assert.equal(restored.extra,60);
 assert.equal(activitySummary({...entry,cardio:0}).total,0);
 assert.equal(activitySummary({...entry,cardio:null}).total,null);
 assert.equal(validateEntry({...entry,cardioCombined:'yes'}),false);
});
