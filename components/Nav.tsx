"use client";
import Link from "next/link";import {supabase} from "@/lib/supabase";import {lock} from "@/lib/vault";import {usePathname} from "next/navigation";
const links=[["/home","Home"],["/protect","Protect"],["/love","Love"],["/memories","Memories"],["/planner","Plan"],["/reflect","Reflect"],["/opportunities","Opportunities"],["/scriptures","Scripture"],["/privacy","Privacy Tip"]];
export default function Nav(){const p=usePathname();if(p==="/"||p==="/login")return null;
return(<>
<aside className="hidden md:flex fixed inset-y-0 left-0 w-60 flex-col bg-navy text-white p-6">
<div className="font-serif text-xl mb-1">Safe With Me</div><div className="h-px w-10 bg-gold mb-8"/>
{links.map(([h,l])=><Link key={h} href={h} className={`py-2.5 px-3 rounded-lg text-sm ${p===h?"bg-white/10 text-rose":"text-white/70 hover:text-white"}`}>{l}</Link>)}
<button onClick={async()=>{lock();await supabase.auth.signOut();location.href="/home"}} className="mt-auto text-left text-xs text-white/50 py-2 px-3">Lock & sign out</button></aside>
<nav className="md:hidden fixed bottom-0 inset-x-0 z-50 flex overflow-x-auto gap-5 px-4 bg-navy/95 backdrop-blur text-white py-3 pb-[env(safe-area-inset-bottom)]">
{links.map(([h,l])=><Link key={h} href={h} className={`text-xs whitespace-nowrap ${p===h?"text-rose":"text-white/70"}`}>{l}</Link>)}</nav></>);}
