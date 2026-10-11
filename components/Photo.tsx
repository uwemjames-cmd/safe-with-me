"use client";
import {useState} from "react";
const b=["jpg","jpeg","png","webp","heic","mp4","webm","mov"];const ex=[...b,...b.map(e=>e.toUpperCase())];
// Tries base.<ext> for each type (photo or video), then fallback.<ext>, then a gradient.
export default function Photo({base,fallback,alt,className,controls}:{base:string;fallback?:string;alt:string;className?:string;controls?:boolean}){
const list=[base,...(fallback?[fallback]:[])].flatMap(b=>ex.map(e=>`/memories/${b}.${e}`));
const [i,setI]=useState(0);const src=list[i];
if(!src)return <div className={`bg-gradient-to-br from-rose/40 to-sky/40 ${className}`}/>;
const next=()=>setI(i+1);
return /\.(mp4|webm|mov)$/i.test(src)
?<video key={src} src={src} onError={next} muted={!controls} loop={!controls} autoPlay={!controls} controls={controls} playsInline className={`object-cover ${className}`}/>
:<img key={src} src={src} alt={alt} onError={next} className={`object-cover ${className}`}/>;}
