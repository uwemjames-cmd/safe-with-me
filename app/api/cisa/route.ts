export const revalidate=3600;
// Live security alerts from CISA, refreshed hourly. Falls back to [] if the feed is unreachable.
export async function GET(){try{
const r=await fetch("https://www.cisa.gov/cybersecurity-advisories/all.xml",{next:{revalidate:3600}});const x=await r.text();
const g=(b:string,t:string)=>(b.match(new RegExp(`<${t}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${t}>`))||[])[1]?.trim()||"";
const items=Array.from(x.matchAll(/<item>([\s\S]*?)<\/item>/g)).map(m=>({title:g(m[1],"title"),url:g(m[1],"link"),date:g(m[1],"pubDate")}))
.filter(i=>i.title&&i.url&&!/industrial control|\bICS\b/i.test(i.title)).slice(0,5);
return Response.json(items);}catch{return Response.json([]);}}
