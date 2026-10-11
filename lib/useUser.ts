"use client";
import {useEffect,useState} from "react";import {supabase} from "./supabase";
export function useUser(){const [u,setU]=useState<any>(undefined);
useEffect(()=>{supabase.auth.getUser().then(({data})=>{if(!data.user)location.href="/login";else setU(data.user)})},[]);return u;}
export function useOptionalUser(){const [u,setU]=useState<any>(undefined);
useEffect(()=>{let done=false;const f=(v:any)=>{if(!done){done=true;setU(v)}};
const t=setTimeout(()=>f(null),1500);
try{supabase.auth.getUser().then(({data})=>f(data?.user??null)).catch(()=>f(null))}catch{f(null)}
return()=>clearTimeout(t)},[]);return u;}
