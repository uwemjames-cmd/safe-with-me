"use client";
import {useEffect,useState} from "react";import {protect,daily} from "@/lib/data";import {getDone,setItem} from "@/lib/progress";import {sweet} from "@/lib/love";
const lvl=(p:number)=>p===100?"Fully implemented":p>=67?"Established":p>=34?"Developing":"Baseline";
export default function Protect(){const [done,setDone]=useState<string[]>([]);
useEffect(()=>{getDone().then(setDone)},[]);
const t=(id:string)=>{const on=!done.includes(id);setDone(on?[...done,id]:done.filter(x=>x!==id));setItem(id,on);};
const areas=Array.from(new Set(protect.map(p=>p.area)));const pct=Math.round(done.length/protect.length*100);
return(<div className="min-h-screen bg-white"><div className="max-w-5xl mx-auto p-6 md:p-12">
<p className="text-[11px] tracking-[.2em] text-navy/50 uppercase">Personal data protection</p><h1 className="font-serif text-4xl mt-1 mb-8">Protection Posture</h1>
<div className="grid md:grid-cols-3 gap-10 items-start">
<aside className="md:order-2 md:sticky md:top-6 border border-navy/20 p-6">
<div className="text-[11px] tracking-[.2em] text-navy/50 uppercase">Overall</div><div className="font-serif text-6xl mt-1">{pct}%</div>
<div className="h-0.5 bg-navy/10 mt-3"><div className="h-full bg-navy transition-all duration-500" style={{width:`${pct}%`}}/></div>
<p className="text-sm mt-3">{lvl(pct)} · {done.length} of {protect.length} controls</p>
<table className="w-full text-xs mt-5"><tbody>{areas.map(a=>{const all=protect.filter(p=>p.area===a);const n=all.filter(p=>done.includes(p.id)).length;return <tr key={a} className="border-t border-navy/10"><td className="py-2">{a}</td><td className="py-2 text-right text-navy/60">{n}/{all.length}</td></tr>})}</tbody></table>
<p className="text-xs text-navy/50 italic mt-4">No pressure. {daily(sweet)}</p></aside>
<div className="md:col-span-2 md:order-1">{areas.map(a=><section key={a} className="mb-10"><h2 className="text-[11px] tracking-[.2em] text-navy/50 uppercase pb-2 border-b border-navy">{a}</h2>
{protect.filter(p=>p.area===a).map(p=><button key={p.id} onClick={()=>t(p.id)} className="w-full text-left flex gap-4 py-4 border-b border-navy/10">
<span className={`mt-1 h-4 w-4 shrink-0 border border-navy grid place-items-center text-[10px] leading-none ${done.includes(p.id)?"bg-navy text-white":""}`}>{done.includes(p.id)?"✓":""}</span>
<span><span className="block font-medium">{p.title}</span><span className="block text-sm text-navy/55 mt-0.5">{p.why}</span></span></button>)}</section>)}</div></div></div></div>);}
