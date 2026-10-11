const H=[[5,16,50,0],[14,12,58,18],[24,14,62,34],[33,11,54,8],[43,16,66,40],[52,12,56,22],[61,15,60,4],[70,11,64,30],[79,16,52,14],[88,13,58,44],[95,11,62,26]];
export default function Hearts(){return <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
{H.map(([l,s,d,y],i)=><span key={i} style={{left:`${l}%`,width:s*2.2,height:s*2.2,fontSize:s,animation:`fall ${d}s linear ${-y}s infinite`}} className="absolute -top-16 rounded-full bg-white/40 border border-white/70 grid place-items-center text-rose/70">♥</span>)}</div>}
