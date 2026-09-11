import assert from 'node:assert/strict';
import {test} from 'node:test';
import {sheetsConnectionKey,sheetsQueueKey} from '../lib/sheets-sync.ts';
test('Sheets connection and queue keys are explicit for cross-tab refreshes',()=>{
 assert.equal(sheetsConnectionKey,'court-coach:sheets:connection:v1');
 assert.equal(sheetsQueueKey,'court-coach:sheets:queue:v1');
});
