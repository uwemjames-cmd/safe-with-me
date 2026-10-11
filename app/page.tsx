import Link from "next/link";
export default function Hero(){return(
<section className="relative h-screen overflow-hidden text-white">
{/* Add public/hero.mp4 and public/hero.jpg */}
<video autoPlay muted loop playsInline poster="/hero.jpg" className="absolute inset-0 w-full h-full object-cover"><source src="/hero.mp4" type="video/mp4"/></video>
<div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/30"/>
<div className="relative h-full flex flex-col justify-end max-w-3xl p-8 md:p-16 pb-20">
<h1 className="font-serif text-5xl md:text-7xl mb-4">Safe With Me</h1>
<p className="text-xl text-sky mb-4">A little place where you are safe.</p>
<p className="text-white/80 mb-8 max-w-xl">You spend so much time thinking about protecting information. I wanted to build you a place that reminds you that you deserve protection too.</p>
<Link href="/home" className="self-start bg-rose text-navy font-medium px-7 py-3 rounded-full">Enter your sanctuary</Link></div></section>);}
