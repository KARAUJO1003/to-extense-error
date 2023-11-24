
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "To Extense Conversor",
  description: "Converta seu número para extenso",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
       <header className="fixed z-10 left-0 top-0 flex w-full justify-center items-center px-24 bg-drk950 border-b border-cnz700 h-16 max-md:justify-center max-md:px-5 text-center">
          <Link
            href="/"
            className="text-xl  text-green-400 tracking-[3.52px]"
          >
            ORION/
            <span className="text-grn500 font-bold">utils</span>
          </Link> {/* 
          <ul className="flex items-center justify-center gap-3 max-md:hidden">
            <li className="transition hover:text-grn500">
              <Link href="/" >Home</Link>
            </li>
            <li className="hover:text-grn500">
              <Link href="/toextense" >Conversor</Link>
            </li>
          </ul>*/}
        </header> 

        {children}
      </body>
    </html>
  );
}
