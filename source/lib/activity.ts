import type {Entry} from './coach';
export function activitySummary(e:Entry){
 if(e.cardioCombined)return {other:null,badminton:e.extra,total:e.cardio,needsReview:false,legacy:e.cardio};
 const needsReview=e.cardioOther===undefined&&e.cardio!==null&&e.cardio<e.extra;
 const other=e.cardioOther!==undefined?e.cardioOther:e.cardio!==null&&!needsReview?e.cardio-e.extra:null;
 return {other,badminton:e.extra,total:other===null?null:other+e.extra,needsReview,legacy:e.cardio};
}
