"use client";
import {useEffect,useState} from "react";import {hasKey,vaultExists,setupVault,unlock,lock} from "@/lib/vault";
export default function Vault({name,children}:{name:string;children:React.ReactNode}){
const [s,setS]=useState<"load"|"setup"|"locked"|"open">("load");const [p,setP]=useState("");const [c,setC]=useState("");const [m,setM]=useState("");const [busy,setBusy]=useState(false);
useEffect(()=>{(async()=>{if(hasKey())return setS("open");const e=await vaultExists();if(e===null)setM("Supabase isn't set up yet. Run schema.sql and check .env.local.");else setS(e?"locked":"setup")})();return()=>lock()},[]);
const go=async()=>{setM("");setBusy(true);
if(s==="setup"){if(p.length<8)setM("Use at least 8 characters.");else if(p!==c)setM("Those don't match.");else{const e=await setupVault(p);if(e)setM(e);else setS("open")}}
else{(await unlock(p))?setS("open"):setM("That's not it. Try again.")}
setBusy(false);setP("");setC("")};
if(s==="open")return(<><button onClick={()=>{lock();setS("locked")}} className="fixed top-4 right-4 z-40 text-sm text-navy/60 bg-white/80 backdrop-blur rounded-full px-3 py-1 shadow">🔒 Lock</button>{children}</>);
if(s==="load")return <div className="p-12 text-navy/50">{m}</div>;
return(<div className="min-h-[80vh] grid place-items-center p-6"><div className="w-full max-w-sm bg-navy text-white rounded-3xl p-8 text-center shadow-2xl">
<div className="text-3xl mb-3">🔒</div><h1 className="font-serif text-3xl">{name}</h1>
<p className="text-white/60 text-sm mt-2 mb-6">{s==="setup"?"Choose a secret password. It's yours alone and you'll enter it each time you open this space.":"Enter your secret password."}</p>
<input type="password" value={p} onChange={e=>setP(e.target.value)} onKeyDown={e=>e.key==="Enter"&&s==="locked"&&go()} placeholder="Secret password" className="w-full p-3 rounded-xl bg-white/10 text-center mb-3 outline-none"/>
{s==="setup"&&<><input type="password" value={c} onChange={e=>setC(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="Confirm password" className="w-full p-3 rounded-xl bg-white/10 text-center mb-3 outline-none"/>
<p className="text-xs text-gold mb-4">Nobody can recover this for you, not even me. If you forget it, these entries can't be opened.</p></>}
<button disabled={busy} onClick={go} className="w-full bg-rose text-navy py-3 rounded-full font-medium">{s==="setup"?"Set password":"Unlock"}</button>
<p className="text-sm text-rose mt-3 min-h-5">{m}</p></div></div>);}
