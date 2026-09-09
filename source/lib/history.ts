import type {Entry} from './coach';
export function exerciseRecords(entry:Entry){
 const legacy=Object.entries(entry.lifts).filter(([,value])=>value.trim()!=='');
 const ids=[...new Set([...Object.keys(entry.sets??{}),...Object.keys(entry.loads??{}),...entry.done,...legacy.map(([key])=>key.replace(/-\d$/,''))])];
 return ids.map(id=>({id,sets:entry.sets?.[id]??null,load:entry.loads?.[id]??null,checked:entry.done.includes(id),legacy:legacy.filter(([key])=>key.startsWith(id+'-')).sort(([a],[b])=>a.localeCompare(b)).map(([key,text])=>({set:Number(key.split('-').at(-1))+1,text}))}));
}
