import {Scripture} from "@/lib/data";
export default function SC({s}:{s:Scripture}){return(<figure className="border-l-2 border-gold pl-5 py-1">
<blockquote className="font-serif text-xl leading-relaxed">“{s.text}”</blockquote>
<figcaption className="text-sm mt-2 text-navy/60">{s.ref} · {s.theme}</figcaption>{s.note&&<p className="text-sm mt-2 italic">{s.note}</p>}</figure>);}
