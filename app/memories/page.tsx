"use client";
import {useState} from "react";import {memories,Mem} from "@/lib/memories";import Photo from "@/components/Photo";import Vault from "@/components/Vault";import Hearts from "@/components/Hearts";
function Inner(){const [o,setO]=useState<Mem|null>(null);
return(<div className="relative min-h-screen bg-[#ffe9ef] p-6 md:p-12 overflow-x-hidden"><Hearts/>
<h1 className="relative z-10 font-script text-5xl text-[#e0607e] mb-12">Memories</h1>
<div className="relative z-10 space-y-24 max-w-5xl mx-auto">{memories.map((m,i)=><article key={m.slug} onClick={()=>setO(m)} className={`cursor-pointer flex items-center gap-4 md:gap-10 ${i%2?"flex-row-reverse":""}`}>
<div className="relative w-2/3 shrink-0"><Photo base={m.slug} alt={m.title} className="w-full aspect-[4/3] border-[10px] border-white shadow-xl rounded-sm"/>
<div className={`absolute -bottom-8 ${i%2?"-left-2 md:-left-12":"-right-2 md:-right-12"} w-1/3`}><Photo base={`${m.slug}-2`} fallback={m.slug} alt={m.title} className="w-full aspect-square border-[6px] border-white shadow-lg"/></div></div>
<div className={`flex-1 ${i%2?"text-right":""}`}><h2 className="font-script text-2xl md:text-4xl text-[#c2456b] leading-tight">{m.title}</h2><p className="text-xs md:text-sm text-navy/50 mt-2">{[m.date,m.place].filter(Boolean).join(" · ")}</p></div></article>)}</div>
{o&&<div onClick={()=>setO(null)} className="fixed inset-0 z-[60] bg-navy/90 grid place-items-center p-6 text-white"><div className="max-w-xl"><Photo base={o.slug} alt={o.title} controls className="w-full max-h-[70vh] rounded"/><h3 className="font-script text-3xl mt-4">{o.title}</h3><p className="text-white/70">{o.caption}</p><p className="italic mt-2 text-rose">{o.note}</p></div></div>}</div>);}
export default function Memories(){return <Vault name="Memories"><Inner/></Vault>}
