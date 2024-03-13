import { ReactNode } from "react";
import { AdminPanel } from "../lib/AdminPanel";
import { DiscardPile } from "../lib/DiscardPile";
import { DrawPile } from "../lib/DrawPile";
import { Cards } from "../lib/Cards";
import { PlayerHand } from "../lib/PlayerHand";

export default function GameTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-between max-w-full p-10">
      {children}
      <DrawPile />
      <PlayerHand />
      <DiscardPile />
      <Cards />
      <AdminPanel />
    </div>
  );
}
