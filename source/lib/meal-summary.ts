/** A display-only summary: the original saved note remains available for editing. */
export function mealSummary(note:string){
 return note.replace(/;\s*(?:ฐานสูตร\s*1\s*ส่วน|Recipe base\s*\(1 portion\))\s*:[\s\S]*?(?=\s\+\s[^;+]*×|$)/gi,'')
  .replace(/\s*\((?:ประมาณจากสูตร|estimated based on recipe)\)/gi,'').trim();
}
