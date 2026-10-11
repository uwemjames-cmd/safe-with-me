"use client";
import {usePathname} from "next/navigation";
export default function Shell({children}:{children:React.ReactNode}){const p=usePathname();
return <main className={p==="/"?"":"md:pl-60 pb-20 md:pb-0 min-h-screen"}>{children}</main>;}
