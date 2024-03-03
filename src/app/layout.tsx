import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./lib/providers";
import { SessionStatus } from "./lib/SessionStatus";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cardgame",
  description: "A card game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          as="font"
          type="font/woff2"
        />
      </Head>
      <Providers>
        <body
          style={{ fontFamily: "" }}
          className={
            inter.className +
            " bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 h-screen w-screen overflow-hidden min-h-[800px] min-w-[800px]"
          }
        >
          <SessionStatus />
          {children}
        </body>
      </Providers>
    </html>
  );
}
