import {supabase} from "./supabase";
// One secret password does two jobs: it signs her in to Supabase silently (so data syncs across
// devices, no email prompt) and it encrypts reflections/task titles on her device before upload.
const te=new TextEncoder(),td=new TextDecoder();
const b64=(u:Uint8Array)=>btoa(String.fromCharCode(...Array.from(u)));
const ub=(s:string)=>Uint8Array.from(atob(s),c=>c.charCodeAt(0)) as unknown as BufferSource;
const EMAIL=process.env.NEXT_PUBLIC_VAULT_EMAIL||"";
let key:CryptoKey|null=null;
async function derive(pw:string,salt:BufferSource){const m=await crypto.subtle.importKey("raw",te.encode(pw),"PBKDF2",false,["deriveKey"]);
return crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:310000,hash:"SHA-256"},m,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);}
async function encWith(k:CryptoKey,t:string){const iv=crypto.getRandomValues(new Uint8Array(12));const c=new Uint8Array(await crypto.subtle.encrypt({name:"AES-GCM",iv},k,te.encode(t)));return b64(iv)+"."+b64(c);}
async function decWith(k:CryptoKey,s:string){const [i,c]=s.split(".");return td.decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:ub(i)},k,ub(c)));}
async function authPw(pw:string){const h=await crypto.subtle.digest("SHA-256",te.encode("swm-auth|"+pw));return Array.from(new Uint8Array(h)).map(b=>b.toString(16).padStart(2,"0")).join("");}
export const hasKey=()=>!!key;
export const lock=()=>{key=null};
export const enc=(t:string)=>encWith(key!,t);
export const dec=async(s:string)=>{try{return await decWith(key!,s)}catch{return "(couldn't open this entry)"}};
export async function vaultExists():Promise<boolean|null>{const {data,error}=await supabase.rpc("vault_exists");return error?null:!!data;}
export async function setupVault(pw:string):Promise<string|null>{
if(!EMAIL)return "Add NEXT_PUBLIC_VAULT_EMAIL to .env.local (a real email you own), then restart the server.";
let {data,error}:any=await supabase.auth.signUp({email:EMAIL,password:await authPw(pw)});
if(error&&/registered/i.test(error.message)){const r=await supabase.auth.signInWithPassword({email:EMAIL,password:await authPw(pw)});
if(r.error||!r.data.session)return "A password is already set. Reload and enter it.";data=r.data;error=null;}
else if(error)return error.message;
if(!data.session||!data.user)return "In Supabase, turn off 'Confirm email' under Auth settings, then try again.";
const salt=crypto.getRandomValues(new Uint8Array(16));const k=await derive(pw,salt);
const {error:e2}=await supabase.from("profiles").upsert({id:data.user.id,vault_salt:b64(salt),vault_check:await encWith(k,"safe-with-me")});
if(e2)return "Couldn't save: "+e2.message;key=k;return null;}
export async function unlock(pw:string){
let {data:{session}}=await supabase.auth.getSession();
if(!session){if(!EMAIL)return false;const {data,error}=await supabase.auth.signInWithPassword({email:EMAIL,password:await authPw(pw)});if(error||!data.session)return false;session=data.session;}
const {data}=await supabase.from("profiles").select("vault_salt,vault_check").eq("id",session.user.id).maybeSingle();
if(!data?.vault_salt)return false;
try{const k=await derive(pw,ub(data.vault_salt));if(await decWith(k,data.vault_check)!=="safe-with-me")return false;key=k;return true}catch{return false}}