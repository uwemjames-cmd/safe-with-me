"use client";
import {notes,reasons,letters,locked} from "@/lib/love";import {daily} from "@/lib/data";
const L="font-uncial text-sm tracking-[.25em] text-[#8b2e2e] mb-4";
export default function Love(){const now=new Date().toLocaleDateString("en-CA");
return(<div className="min-h-screen px-6 py-12 md:px-14 text-[#4a2c17] font-hand" style={{background:"radial-gradient(circle at 20% 10%,#f6ead0,#e9d4a8 70%,#d9bd8a)"}}>
<div className="max-w-3xl mx-auto space-y-16"><h1 className="font-uncial text-5xl text-center">Love</h1>
<section className="text-center p-8" style={{border:"3px double #8b5a2b",background:"#f8eed6aa"}}><h2 className={L}>A NOTE FOR TODAY</h2><p className="text-3xl leading-snug">{daily(notes)}</p></section>
<section><h2 className={L}>REASONS I LOVE YOU</h2><ol className="md:columns-2 gap-10">{reasons.map((r,i)=><li key={i} className="break-inside-avoid mb-3 text-2xl leading-snug"><span className="font-uncial text-lg text-[#8b2e2e] mr-2">{i+1}.</span>{r}</li>)}</ol></section>
<section><h2 className={L}>LETTERS</h2>{letters.length===0&&<p className="text-xl">Letters will live here.</p>}
{letters.map(l=><details key={l.title} className="mb-4"><summary className="font-uncial text-2xl cursor-pointer">{l.title}</summary>
<div className="mt-4 p-8 md:p-12 whitespace-pre-wrap text-[1.7rem] leading-10 text-[#3b2212]" style={{background:"linear-gradient(#d6b585,#c9a26b)",border:"4px double #6b4423",boxShadow:"0 10px 30px rgba(75,46,23,.35)"}}>{l.body}</div></details>)}</section>
<section><h2 className={L}>SEALED FOR LATER</h2>{locked.map(m=>now>=m.unlock?<details key={m.title} className="mb-4"><summary className="font-uncial text-2xl cursor-pointer">{m.title}</summary><div className="mt-4 p-8 text-2xl" style={{background:"#d6b585",border:"3px double #6b4423"}}>{m.body}</div></details>
:<div key={m.title} className="flex items-center gap-4 p-5 mb-3 text-xl" style={{border:"2px dashed #8b5a2b"}}><span className="h-9 w-9 rounded-full bg-[#8b2e2e] text-[#f3dcc0] grid place-items-center shrink-0">♥</span>Sealed until {new Date(m.unlock).toLocaleDateString(undefined,{month:"long",day:"numeric"})}.</div>)}</section></div></div>);}
