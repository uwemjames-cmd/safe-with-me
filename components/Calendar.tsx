"use client";
export const ymd=(d:Date)=>d.toLocaleDateString("en-CA");
export default function Calendar({month,setMonth,sel,onSel,marks}:{month:Date;setMonth:(d:Date)=>void;sel:string;onSel:(s:string)=>void;marks:Record<string,string[]>}){
const y=month.getFullYear(),m=month.getMonth();const first=new Date(y,m,1).getDay();const n=new Date(y,m+1,0).getDate();
const cells=[...Array(first).fill(null),...Array.from({length:n},(_,i)=>ymd(new Date(y,m,i+1)))];const today=ymd(new Date());
return(<div className="bg-white rounded-2xl p-4 border border-navy/10 select-none">
<div className="flex items-center justify-between mb-3"><button className="px-2 text-xl" onClick={()=>setMonth(new Date(y,m-1,1))}>‹</button><div className="font-medium">{month.toLocaleDateString(undefined,{month:"long",year:"numeric"})}</div><button className="px-2 text-xl" onClick={()=>setMonth(new Date(y,m+1,1))}>›</button></div>
<div className="grid grid-cols-7 text-center text-xs text-navy/40 mb-1">{"SMTWTFS".split("").map((d,i)=><div key={i}>{d}</div>)}</div>
<div className="grid grid-cols-7 gap-y-1">{cells.map((c,i)=>c?<button key={c} onClick={()=>onSel(c)} className={`h-11 rounded-lg text-sm flex flex-col items-center justify-center ${c===sel?"bg-navy text-white":c===today?"ring-1 ring-rose":"hover:bg-navy/5"}`}>{+c.slice(8)}<span className="flex gap-0.5 h-1.5">{(marks[c]||[]).slice(0,3).map((col,j)=><i key={j} className="h-1.5 w-1.5 rounded-full" style={{background:col}}/>)}</span></button>:<div key={"e"+i}/>)}</div></div>);}
