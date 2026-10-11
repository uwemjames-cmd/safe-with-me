import {supabase} from "./supabase";
// Syncs to Supabase once she has unlocked a vault space on this device; until then it's kept locally.
const K="swm-protect",U="swm-unsynced";
const loc=():string[]=>{try{return JSON.parse(localStorage.getItem(K)||"[]")}catch{return[]}};
const sess=async()=>(await supabase.auth.getSession()).data.session;
export async function getDone():Promise<string[]>{const s=await sess();if(!s)return loc();
const {data}=await supabase.from("protect_progress").select("item_id");let r:string[]=(data||[]).map((x:any)=>x.item_id);
if(localStorage.getItem(U)){const extra=loc().filter(i=>!r.includes(i));if(extra.length)await supabase.from("protect_progress").upsert(extra.map(item_id=>({user_id:s.user.id,item_id})));r=[...r,...extra];localStorage.removeItem(U)}
localStorage.setItem(K,JSON.stringify(r));return r;}
export async function setItem(id:string,on:boolean){const l=loc().filter(x=>x!==id);localStorage.setItem(K,JSON.stringify(on?[...l,id]:l));
const s=await sess();if(!s){localStorage.setItem(U,"1");return}
if(on)await supabase.from("protect_progress").upsert({user_id:s.user.id,item_id:id});else await supabase.from("protect_progress").delete().eq("item_id",id)}
