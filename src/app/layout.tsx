import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./lib/providers";
import { LoginButton } from "./lib/LoginButton";

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
      <Providers>
        <body
          className={
            inter.className +
            " bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 h-screen w-screen overflow-hidden min-h-[800px] min-w-[800px]"
          }
        >
          <LoginButton />
          {children}
        </body>
      </Providers>
    </html>
  );
}
