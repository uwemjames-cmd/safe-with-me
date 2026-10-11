"use client";
import {useEffect,useState} from "react";import {supabase} from "@/lib/supabase";import Vault from "@/components/Vault";import {enc,dec} from "@/lib/vault";import Calendar,{ymd} from "@/components/Calendar";
const COL:Record<number,string>={1:"#e5484d",2:"#f5a623",3:"#3fa66b"};const LBL=["","High","Normal","Low"];
const win=["Look at you getting things done. ❤️","Okayyyy productivity queen.","You actually did it. I'm proud of you."];
const soft=["It's okay. One unfinished day doesn't define you.","Rest is not failure."];
const add=(d:Date,n:number)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const Row=({t,tog,del}:{t:any;tog:()=>void;del:()=>void})=><div className="flex items-center gap-3 p-3 mb-2 rounded-xl bg-white border border-navy/10" style={{borderLeft:`4px solid ${COL[t.priority]}`}}>
<button onClick={tog} className={`h-5 w-5 rounded-full border-2 shrink-0 ${t.done?"bg-rose border-rose":"border-navy/30"}`}/><span className={`flex-1 ${t.done?"line-through text-navy/40":""}`}>{t.title}</span>
<span className="text-xs px-2 py-0.5 rounded-full text-white" style={{background:COL[t.priority]}}>{LBL[t.priority]}</span><button onClick={del} className="text-navy/30 hover:text-navy">×</button></div>;
function Inner(){const today=ymd(new Date());const [sel,setSel]=useState(today);const [view,setView]=useState<"Day"|"Week"|"Month">("Day");const [month,setMonth]=useState(new Date());
const [tasks,setTasks]=useState<any[]>([]);const [title,setTitle]=useState("");const [pri,setPri]=useState(2);
const y=month.getFullYear(),m=month.getMonth();const sd=new Date(sel+"T00:00");
const a=ymd(new Date(y,m,-6)),b=ymd(new Date(y,m+1,7)),sa=ymd(add(sd,-7)),sb=ymd(add(sd,7));const from=a<sa?a:sa,to=b>sb?b:sb;
const load=async()=>{const {data}=await supabase.from("tasks").select("*").gte("day",from).lte("day",to).order("priority");setTasks(await Promise.all((data||[]).map(async t=>({...t,title:await dec(t.title)}))))};
useEffect(()=>{load()},[from,to]);
const addT=async()=>{if(!title.trim())return;await supabase.from("tasks").insert({title:await enc(title),priority:pri,day:sel});setTitle("");load()};
const tog=async(t:any)=>{await supabase.from("tasks").update({done:!t.done}).eq("id",t.id);load()};
const del=async(t:any)=>{await supabase.from("tasks").delete().eq("id",t.id);load()};
const marks:Record<string,string[]>={};tasks.forEach(t=>{(marks[t.day]=marks[t.day]||[]).push(COL[t.priority])});
const dayT=tasks.filter(t=>t.day===sel);const d=dayT.filter(t=>t.done).length;const pct=dayT.length?Math.round(d/dayT.length*100):0;
const msg=!dayT.length?"":pct===100?win[d%win.length]:(sel<today||new Date().getHours()>=20)?soft[d%soft.length]:"";
const wk=Array.from({length:7},(_,i)=>{const x=add(sd,-((sd.getDay()+6)%7)+i);return ymd(x)});
const mp=`${y}-${String(m+1).padStart(2,"0")}`;const mT=tasks.filter(t=>t.day.startsWith(mp));const days=Array.from(new Set(mT.map(t=>t.day))).sort();
const fmt=(s:string)=>new Date(s+"T00:00").toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short"});
const grp=(ds:string[])=>ds.map(dd=>{const l=tasks.filter(t=>t.day===dd);return <section key={dd} className="mb-5"><button onClick={()=>{setSel(dd);setView("Day")}} className="text-xs tracking-widest text-gold mb-2">{fmt(dd).toUpperCase()}{dd===today?" · TODAY":""}</button>{l.length===0?<p className="text-sm text-navy/30">Nothing planned.</p>:l.map(t=><Row key={t.id} t={t} tog={()=>tog(t)} del={()=>del(t)}/>)}</section>});
return(<div className="max-w-5xl mx-auto p-6 md:p-12"><h1 className="font-serif text-4xl mb-6">Plan</h1>
<div className="flex gap-2 mb-6">{(["Day","Week","Month"] as const).map(v=><button key={v} onClick={()=>setView(v)} className={`px-5 py-1.5 rounded-full text-sm ${view===v?"bg-navy text-white":"bg-white border border-navy/10"}`}>{v}</button>)}</div>
<div className="grid md:grid-cols-[320px_1fr] gap-8 items-start"><div className="md:sticky md:top-6"><Calendar month={month} setMonth={setMonth} sel={sel} onSel={s=>{setSel(s);setView("Day")}} marks={marks}/>
<div className="flex gap-4 text-xs text-navy/60 mt-3">{[1,2,3].map(p=><span key={p} className="flex items-center gap-1"><i className="h-2 w-2 rounded-full" style={{background:COL[p]}}/>{LBL[p]}</span>)}</div></div>
<div><div className="flex gap-2 mb-6"><input value={title} onChange={e=>setTitle(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addT()} placeholder={`Add to ${fmt(sel)}`} className="flex-1 p-3 rounded-xl bg-white border border-navy/10"/>
{[1,2,3].map(p=><button key={p} onClick={()=>setPri(p)} title={LBL[p]} className="h-10 w-10 rounded-full border-2" style={{background:pri===p?COL[p]:"#fff",borderColor:COL[p]}}/>)}
<button onClick={addT} className="bg-navy text-white px-5 rounded-xl">Add</button></div>
{view==="Day"&&<><h2 className="font-serif text-2xl">{sd.toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long"})}</h2>
<div className="h-1.5 bg-navy/10 rounded my-3"><div className="h-full bg-rose rounded transition-all" style={{width:`${pct}%`}}/></div><p className="text-sm text-navy/60 mb-5">{d} of {dayT.length} done. {msg}</p>
{dayT.length===0&&<p className="text-navy/40">Nothing planned for this day.</p>}{dayT.map(t=><Row key={t.id} t={t} tog={()=>tog(t)} del={()=>del(t)}/>)}</>}
{view==="Week"&&<><h2 className="font-serif text-2xl mb-4">This week</h2>{grp(wk)}</>}
{view==="Month"&&<><h2 className="font-serif text-2xl mb-1">{month.toLocaleDateString(undefined,{month:"long",year:"numeric"})}</h2><p className="text-sm text-navy/60 mb-5">{mT.filter(t=>t.done).length} of {mT.length} done this month.</p>{days.length===0&&<p className="text-navy/40">Nothing planned this month.</p>}{grp(days)}</>}
<p className="text-sm text-navy/50 mt-8">Take a break. Go drink water.</p></div></div></div>);}
export default function Planner(){return <Vault name="Plan"><Inner/></Vault>}
