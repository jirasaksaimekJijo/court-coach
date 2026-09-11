import {weeklyReview,type Entry} from './coach';
export function dietReview(logs:Record<string,Entry>,date:string){
 const end=Date.parse(date),recent=Object.entries(logs).filter(([d])=>end-Date.parse(d)>=0&&end-Date.parse(d)<14*86400000);
 const complete=recent.filter(([,e])=>e.foodComplete&&e.calories!==null);
 const paired=complete.filter(([,e])=>e.nutritionTarget?.calories!=null);
 const weights=recent.filter(([,e])=>e.weight!==null).sort(([a],[b])=>b.localeCompare(a));
 const latest=weights[0],weeks=(Date.parse('2026-12-31')-end)/604800000;
 return {review:weeklyReview(logs,date),count:complete.length,average:complete.length?complete.reduce((sum,[,e])=>sum+e.calories!,0)/complete.length:null,
  paired:paired.length,averageDifference:paired.length?paired.reduce((sum,[,e])=>sum+e.calories!-e.nutritionTarget!.calories,0)/paired.length:null,
  latestDate:latest?.[0],latestWeight:latest?.[1].weight??null,weeks,
  pace:latest&&weeks>0?[Math.max(0,latest[1].weight!-95)/weeks,Math.max(0,latest[1].weight!-90)/weeks]:null};
}
