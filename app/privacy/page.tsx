"use client";
import {useEffect,useState} from "react";import {tips} from "@/lib/tips";import {daily} from "@/lib/data";
const H="text-[11px] tracking-[.2em] text-navy/50 uppercase mb-2";
export default function P(){const t=daily(tips);const [live,setLive]=useState<{title:string;url:string;date:string}[]>([]);
useEffect(()=>{fetch("/api/cisa").then(r=>r.json()).then(setLive).catch(()=>{})},[]);
const d=new Date();return(<div className="min-h-screen bg-[#f4f5f7] p-4 md:p-12"><article className="max-w-3xl mx-auto bg-white border border-navy/15 p-8 md:p-14">
<div className="flex justify-between text-[11px] tracking-[.2em] text-navy/50 uppercase border-b border-navy pb-3"><span>Confidential · Prepared for Inem</span><span>PIB-{d.toLocaleDateString("en-CA").replace(/-/g,"")}</span></div>
<h1 className="font-serif text-3xl mt-8">Daily Privacy Brief</h1><p className="text-sm text-navy/60 mt-1">{d.toLocaleDateString(undefined,{day:"numeric",month:"long",year:"numeric"})}</p>
<section className="mt-10"><h2 className={H}>1. Executive summary</h2><p className="text-xl font-serif leading-snug">{t.title}</p></section>
<section className="mt-8 border-t border-navy/15 pt-6"><h2 className={H}>2. Why it matters</h2><p className="leading-relaxed">{t.why}</p></section>
<section className="mt-8 border-t border-navy/15 pt-6"><h2 className={H}>3. Recommended action</h2><p className="leading-relaxed">{t.todo}</p></section>
<section className="mt-8 border-t border-navy/15 pt-6"><h2 className={H}>Source</h2><p className="text-sm"><a className="underline" href={t.url} target="_blank" rel="noopener noreferrer">{t.source}</a> · {t.date}</p></section>
{live.length>0&&<section className="mt-10 border-t border-navy pt-6"><h2 className={H}>4. Threat watch · latest from CISA, refreshed hourly</h2>
<table className="w-full text-sm"><tbody>{live.map(i=><tr key={i.url} className="border-b border-navy/10"><td className="py-2 pr-4 text-navy/50 whitespace-nowrap align-top">{i.date&&new Date(i.date).toLocaleDateString()}</td><td className="py-2"><a href={i.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{i.title}</a></td></tr>)}</tbody></table></section>}</article></div>);}
