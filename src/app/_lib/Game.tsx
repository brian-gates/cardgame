import { AdminPanel } from "./AdminPanel";
import { PlayerHand } from "./PlayerHand";
import { PlayerDeck } from "./PlayerDeck";
import { DrawPile } from "./DrawPile";
import { DiscardPile } from "./DiscardPile";
import { ReactNode } from "react";

export function Game({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between max-w-full p-10">
      {children}
      <DrawPile />
      <PlayerHand />
      <DiscardPile />
      <PlayerDeck />
      <AdminPanel />
    </div>
  );
}
