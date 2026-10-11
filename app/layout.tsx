import "./globals.css";import Nav from "@/components/Nav";import Shell from "@/components/Shell";
export const metadata={title:"Safe With Me",robots:"noindex,nofollow"};
export default function L({children}:{children:React.ReactNode}){return(<html lang="en"><body><Nav/><Shell>{children}</Shell></body></html>);}
