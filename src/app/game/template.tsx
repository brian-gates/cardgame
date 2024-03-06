import { Game } from "@/app/_lib/Game";
import { ReactNode } from "react";

export default async function Template({ children }: { children: ReactNode }) {
  return <Game>{children}</Game>;
}
