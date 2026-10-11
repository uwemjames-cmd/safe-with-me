"use client";
import {useState} from "react";import {scriptures} from "@/lib/data";
export default function S(){const themes=["All",...Array.from(new Set(scriptures.map(s=>s.theme)))];const [f,setF]=useState("All");const list=scriptures.filter(s=>f==="All"||s.theme===f);
return(<div className="min-h-screen p-4 md:p-12 bg-[#efe3c4]"><div className="max-w-4xl mx-auto p-6 md:p-14" style={{border:"6px double #8a6a2f",background:"linear-gradient(#fbf4e1,#f3e7c6)",boxShadow:"inset 0 0 70px rgba(139,105,42,.28)"}}>
<h1 className="font-cinzel text-4xl text-center text-[#6b4a14]">Holy Scripture</h1><div className="text-center text-[#8a6a2f] my-3 tracking-[.5em]">❦ ✦ ❦</div>
<div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-10">{themes.map(t=><button key={t} onClick={()=>setF(t)} className={`font-fell italic text-lg pb-0.5 border-b-2 ${f===t?"border-[#9c2b2b] text-[#9c2b2b]":"border-transparent text-[#6b4a14]"}`}>{t}</button>)}</div>
<div className="md:columns-2 gap-14">{list.map(s=><figure key={s.ref} className="break-inside-avoid mb-9">
<div className="font-fell text-xl leading-8 text-[#3a2a12]"><span className="float-left font-cinzel text-5xl leading-[.9] mr-2 mt-1 text-[#9c2b2b]">{s.text[0]}</span>{s.text.slice(1)}</div>
<figcaption className="font-fell italic text-[#9c2b2b] mt-1">{s.ref}<span className="text-[#8a6a2f]"> · {s.theme}</span></figcaption>{s.note&&<p className="font-hand text-2xl mt-1 text-[#5a3d12]">{s.note}</p>}</figure>)}</div></div></div>);}
