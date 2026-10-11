"use client";
import {useEffect,useState} from "react";import {supabase} from "@/lib/supabase";import Vault from "@/components/Vault";import {enc,dec} from "@/lib/vault";import Calendar,{ymd} from "@/components/Calendar";import {daily} from "@/lib/data";
const prompts=["What's on my mind?","What am I grateful for today?","What am I worried about?","What am I learning?","What do I want to pray about?"];
const PJ="Privacy Journal";
const TOPICS=["Regulation or law","Breach or incident","Privacy by design or tooling","Case study","Work or client matter","Personal privacy practice","Training or reading"];
const FW=["NDPA 2023 (Nigeria)","GDPR","NIST Privacy Framework","ISO/IEC 27701","CCPA / CPRA","Other framework","Not applicable"];
const PR=["Lawfulness, fairness and transparency","Purpose limitation","Data minimisation","Accuracy","Storage limitation","Integrity and confidentiality","Accountability","Data subject rights","Cross-border transfer"];
const DATA=["Contact details","Financial","Health","Biometric","Children's data","Location","Credentials","Communications"];
const RISK:Record<string,string>={Low:"#3fa66b",Medium:"#f5a623",High:"#e5484d"};
const ASK=["What personal data did I handle or share today, and was it necessary?","Who has access to the data I work with, and should they?","Did I collect, keep or send more than the purpose required?","Where could consent or a lawful basis be unclear?","What would I do differently if this data leaked tomorrow?","What did I learn today that I could apply to a client or to my own accounts?"];
const empty={topic:TOPICS[0],title:"",fw:FW[0],pr:PR[0],data:[] as string[],risk:"Low",what:"",why:"",src:"",action:"",done:false,mine:""};
const inp="w-full p-3 rounded-xl bg-white border border-navy/10 outline-none";
const Lb=({c}:{c:string})=><div className="text-[11px] tracking-[.18em] uppercase text-navy/50 mb-1">{c}</div>;
function Inner(){
const [mode,setMode]=useState<"Brain dump"|"Privacy journal">("Brain dump");
const [pr,setPr]=useState(prompts[0]);const [b,setB]=useState("");const [f,setF]=useState<any>({...empty});
const [rows,setRows]=useState<any[]>([]);const [t,setT]=useState("");const [sel,setSel]=useState(ymd(new Date()));const [month,setMonth]=useState(new Date());
const load=async()=>{const y=month.getFullYear(),m=month.getMonth();
const {data}=await supabase.from("reflections").select("*").gte("created_at",new Date(y,m,1).toISOString()).lt("created_at",new Date(y,m+1,1).toISOString()).order("created_at",{ascending:false});
setRows(await Promise.all((data||[]).map(async r=>{const body=await dec(r.body);let p:any=null;if(r.prompt===PJ){try{p=JSON.parse(body)}catch{}}return {...r,body,p,day:ymd(new Date(r.created_at))}})))};
useEffect(()=>{load()},[month]);
const done=(err:any)=>{setT(err?"Couldn't save.":"Saved. Only you can read this.");if(!err){setSel(ymd(new Date()));setMonth(new Date())}setTimeout(()=>setT(""),2500)};
const saveDump=async()=>{if(!b.trim())return;const {error}=await supabase.from("reflections").insert({prompt:pr,body:await enc(b)});if(!error)setB("");done(error)};
const savePriv=async()=>{if(!f.title.trim()&&!f.what.trim())return;const {error}=await supabase.from("reflections").insert({prompt:PJ,body:await enc(JSON.stringify(f))});if(!error)setF({...empty});done(error)};
const upd=async(r:any)=>{const p={...r.p,done:!r.p.done};await supabase.from("reflections").update({body:await enc(JSON.stringify(p))}).eq("id",r.id);load()};
const S=(k:string,v:any)=>setF({...f,[k]:v});const tgl=(x:string)=>S("data",f.data.includes(x)?f.data.filter((y:string)=>y!==x):[...f.data,x]);
const isP=mode==="Privacy journal";const vis=rows.filter(r=>isP?r.prompt===PJ:r.prompt!==PJ);
const marks:Record<string,string[]>={};vis.forEach(r=>{marks[r.day]=[isP?(RISK[r.p?.risk]||"#89CFF0"):"#FF8A9D"]});
const list=vis.filter(r=>r.day===sel);const pv=rows.filter(r=>r.prompt===PJ&&r.p);
const sel_=(k:string,o:string[])=><select value={f[k]} onChange={e=>S(k,e.target.value)} className={inp}>{o.map(x=><option key={x}>{x}</option>)}</select>;
return(<div className="max-w-5xl mx-auto p-6 md:p-12"><h1 className="font-serif text-4xl mb-6">Reflect</h1>
<div className="flex gap-2 mb-8">{(["Brain dump","Privacy journal"] as const).map(v=><button key={v} onClick={()=>setMode(v)} className={`px-5 py-1.5 rounded-full text-sm ${mode===v?"bg-navy text-white":"bg-white border border-navy/10"}`}>{v}</button>)}</div>
<div className="grid md:grid-cols-[320px_1fr] gap-8 items-start"><div className="md:sticky md:top-6"><Calendar month={month} setMonth={setMonth} sel={sel} onSel={setSel} marks={marks}/>
{isP?<div className="mt-4 border border-navy/15 bg-white p-4 text-sm"><Lb c="This month"/><div className="flex justify-between"><span>Entries</span><b>{pv.length}</b></div><div className="flex justify-between"><span>Open actions</span><b>{pv.filter(r=>r.p.action&&!r.p.done).length}</b></div><div className="flex justify-between"><span>High-risk notes</span><b>{pv.filter(r=>r.p.risk==="High").length}</b></div></div>
:<p className="text-xs text-navy/50 mt-3">Days with an entry have a dot. Tap any day to read it.</p>}</div>
<div>{!isP?<>
<div className="flex flex-wrap gap-2 mb-3">{prompts.map(x=><button key={x} onClick={()=>setPr(x)} className={`px-3 py-1 rounded-full text-sm ${pr===x?"bg-navy text-white":"bg-white border border-navy/10"}`}>{x}</button>)}</div>
<textarea value={b} onChange={e=>setB(e.target.value)} placeholder="Write freely. It's just you here." className="w-full h-44 p-5 rounded-2xl bg-white border border-navy/10 font-serif text-lg outline-none"/>
<div className="flex items-center gap-4 mt-3"><button onClick={saveDump} className="bg-navy text-white px-6 py-2 rounded-full">Save today's entry</button><span className="text-sm text-navy/60">{t}</span></div></>
:<div className="bg-white border border-navy/15 p-6 space-y-4">
<p className="text-sm italic text-navy/60">Ask yourself: {daily(ASK)}</p>
<div className="grid md:grid-cols-2 gap-4"><div><Lb c="Entry type"/>{sel_("topic",TOPICS)}</div><div><Lb c="Framework or law"/>{sel_("fw",FW)}</div></div>
<div><Lb c="Title"/><input value={f.title} onChange={e=>S("title",e.target.value)} placeholder="e.g. Consent wording on a client sign-up form" className={inp}/></div>
<div><Lb c="Principle or topic area"/>{sel_("pr",PR)}</div>
<div><Lb c="Data involved"/><div className="flex flex-wrap gap-2">{DATA.map(x=><button key={x} onClick={()=>tgl(x)} className={`px-3 py-1 rounded-full text-sm border ${f.data.includes(x)?"bg-navy text-white border-navy":"border-navy/20"}`}>{x}</button>)}</div></div>
<div><Lb c="Risk observed"/><div className="flex gap-2">{Object.keys(RISK).map(x=><button key={x} onClick={()=>S("risk",x)} className="px-4 py-1 rounded-full text-sm border-2" style={{borderColor:RISK[x],background:f.risk===x?RISK[x]:"#fff",color:f.risk===x?"#fff":"inherit"}}>{x}</button>)}</div></div>
<div><Lb c="What happened or what I learned"/><textarea value={f.what} onChange={e=>S("what",e.target.value)} className={`${inp} h-28`}/></div>
<div><Lb c="Why it matters"/><textarea value={f.why} onChange={e=>S("why",e.target.value)} className={`${inp} h-20`}/></div>
<div><Lb c="Source or link"/><input value={f.src} onChange={e=>S("src",e.target.value)} className={inp}/></div>
<div><Lb c="Action I will take"/><input value={f.action} onChange={e=>S("action",e.target.value)} className={inp}/></div>
<div><Lb c="One thing I did to protect my own data today"/><input value={f.mine} onChange={e=>S("mine",e.target.value)} className={inp}/></div>
<div className="flex items-center gap-4"><button onClick={savePriv} className="bg-navy text-white px-6 py-2 rounded-full">Save to journal</button><span className="text-sm text-navy/60">{t}</span></div></div>}
<h2 className="text-xs tracking-widest text-gold mt-10 mb-4">{new Date(sel+"T00:00").toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long",year:"numeric"}).toUpperCase()}</h2>
{list.length===0&&<p className="text-navy/50">No entry on this day.</p>}
{list.map(r=>{const p=r.p;const tm=new Date(r.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
if(!isP||!p)return <article key={r.id} className="border-l-2 border-rose pl-4 mb-6"><div className="text-xs text-navy/50">{tm} · {r.prompt}</div><p className="whitespace-pre-wrap mt-1">{r.body}</p></article>;
return(<article key={r.id} className="bg-white border border-navy/10 p-5 mb-4" style={{borderLeft:`4px solid ${RISK[p.risk]||"#89CFF0"}`}}>
<div className="text-xs text-navy/50">{tm} · {p.topic}</div><h3 className="font-serif text-xl mt-1">{p.title||"Untitled"}</h3>
<div className="flex flex-wrap gap-2 my-3 text-xs"><span className="px-2 py-0.5 bg-navy/5">{p.fw}</span><span className="px-2 py-0.5 bg-navy/5">{p.pr}</span>{(p.data||[]).map((x:string)=><span key={x} className="px-2 py-0.5 bg-sky/20">{x}</span>)}<span className="px-2 py-0.5 text-white" style={{background:RISK[p.risk]}}>{p.risk} risk</span></div>
{p.what&&<div className="mb-3"><Lb c="What happened or learned"/><p className="whitespace-pre-wrap">{p.what}</p></div>}
{p.why&&<div className="mb-3"><Lb c="Why it matters"/><p className="whitespace-pre-wrap">{p.why}</p></div>}
{p.src&&<div className="mb-3"><Lb c="Source"/>{/^https?:\/\//.test(p.src)?<a className="underline text-sm break-all" href={p.src} target="_blank" rel="noopener noreferrer">{p.src}</a>:<p className="text-sm">{p.src}</p>}</div>}
{p.action&&<button onClick={()=>upd(r)} className="flex items-center gap-3 mb-3 text-left"><span className={`h-4 w-4 shrink-0 border border-navy grid place-items-center text-[10px] ${p.done?"bg-navy text-white":""}`}>{p.done?"✓":""}</span><span className={p.done?"line-through text-navy/40":""}>{p.action}</span></button>}
{p.mine&&<p className="text-sm text-navy/60 italic">Personal practice: {p.mine}</p>}</article>)})}
</div></div></div>);}
export default function Reflect(){return <Vault name="Reflect"><Inner/></Vault>}
