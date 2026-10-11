"use client";
import {useState} from "react";import {opportunities,Opp} from "@/lib/opportunities";
const isOpen=(o:Opp)=>!o.closed&&(!o.ends||o.ends>=new Date().toISOString().slice(0,10));
const Card=({o,ar}:{o:Opp;ar?:boolean})=><a href={o.url} target="_blank" rel="noopener noreferrer" className={`block bg-white rounded-xl p-5 mb-3 ${ar?"opacity-60":""}`}>
<div className="text-xs text-gold">{o.category} · {o.location}</div><h2 className="font-serif text-xl">{o.name}</h2><div className="text-sm text-navy/60">{o.org} · {o.deadline}</div>
<p className="mt-2 text-sm">{o.desc}</p><p className="mt-2 text-sm italic">{o.why}</p></a>;
export default function Opp_(){const cats=["All",...Array.from(new Set(opportunities.map(o=>o.category)))];const [f,setF]=useState("All");
const l=opportunities.filter(o=>f==="All"||o.category===f);const open=l.filter(isOpen),arch=l.filter(o=>!isOpen(o));
return(<div className="max-w-3xl mx-auto p-6 md:p-12"><h1 className="font-serif text-4xl mb-6">Opportunities</h1>
<div className="flex flex-wrap gap-2 mb-6">{cats.map(c=><button key={c} onClick={()=>setF(c)} className={`px-3 py-1 rounded-full text-sm ${f===c?"bg-navy text-white":"bg-white border border-navy/10"}`}>{c}</button>)}</div>
<h2 className="text-xs tracking-widest text-gold mb-3">OPEN</h2>{open.length===0&&<p className="text-navy/50 mb-6">Nothing open in this category right now.</p>}{open.map(o=><Card key={o.url} o={o}/>)}
{arch.length>0&&<><h2 className="text-xs tracking-widest text-gold mt-8 mb-3">ARCHIVE · CLOSED, WORTH WATCHING</h2>{arch.map(o=><Card key={o.url} o={o} ar/>)}</>}</div>);}
