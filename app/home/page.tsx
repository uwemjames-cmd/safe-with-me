"use client";
import {useEffect,useState} from "react";import Link from "next/link";
import {scriptures,daily,protect} from "@/lib/data";import {notes} from "@/lib/love";import {tips} from "@/lib/tips";import {opportunities} from "@/lib/opportunities";import {getDone} from "@/lib/progress";import SC from "@/components/ScriptureCard";
const P="bg-[#ffe9ef] border border-[#f4b9ca] shadow-[0_8px_24px_rgba(224,96,126,.14)]";
export default function Home(){const [pct,setPct]=useState(0);
const [curtain,setCurtain]=useState(false);
useEffect(()=>{getDone().then(d=>setPct(Math.round(d.length/protect.length*100)))},[]);
useEffect(()=>{if(new URLSearchParams(location.search).has("enter")||!sessionStorage.getItem("swm-curtain-v2")){setCurtain(true);sessionStorage.setItem("swm-curtain-v2","1");history.replaceState(null,"","/home")}},[]);
const h=new Date().getHours();const g=h<12?"Good morning":h<17?"Good afternoon":"Good evening";
const t=daily(tips);const now=new Date().toISOString().slice(0,10);const open=opportunities.filter(o=>!o.closed&&(!o.ends||o.ends>=now));const o=open.length?daily(open):null;
return(<div className="min-h-screen bg-[#ffe9ef]">
{curtain&&<><div className="curtain l"/><div className="curtain r" onAnimationEnd={()=>setCurtain(false)}/>
<div className="fixed inset-0 z-[71] grid place-items-center pointer-events-none font-script text-6xl text-white drop-shadow-lg" style={{animation:"curtFade 1s ease .2s forwards"}}>Safe With Me</div></>}
<div className="max-w-4xl mx-auto p-6 md:p-12 space-y-8">
<h1 className="font-serif text-4xl">{g}, Inem. ❤️</h1>
<section className="bg-navy text-white rounded-2xl p-8"><h2 className="text-xs tracking-widest text-gold mb-3">FROM EMMANUEL, TODAY</h2><p className="font-serif text-2xl">{daily(notes)}</p></section>
<section className={`${P} rounded-2xl p-8`}><h2 className="text-xs tracking-widest text-gold mb-4">SCRIPTURE OF THE DAY</h2><SC s={daily(scriptures)}/><Link href="/scriptures" className="text-sm text-rose mt-4 inline-block">Open library →</Link></section>
<div className="grid md:grid-cols-2 gap-6">
<Link href="/privacy" className={`${P} block rounded-2xl p-6`}><h2 className="text-xs tracking-widest text-gold mb-3">PRIVACY TIP OF THE DAY</h2><p className="font-serif text-xl">{t.title}</p></Link>
{o&&<a href={o.url} target="_blank" rel="noopener noreferrer" className={`${P} block rounded-2xl p-6`}><h2 className="text-xs tracking-widest text-gold mb-3">OPPORTUNITY</h2><p className="font-serif text-xl">{o.name}</p><p className="text-sm text-navy/60 mt-1">{o.org}</p></a>}</div>
<Link href="/protect" className="flex items-center gap-6 bg-navy text-white rounded-2xl p-6"><div className="font-serif text-4xl">{pct}%</div>
<div className="flex-1"><div className="text-xs tracking-widest text-gold mb-2">YOUR PRIVACY HEALTH</div><div className="h-1.5 bg-white/15 rounded"><div className="h-full bg-rose rounded" style={{width:`${pct}%`}}/></div></div><span className="text-sm text-rose">Protect →</span></Link></div></div>);}