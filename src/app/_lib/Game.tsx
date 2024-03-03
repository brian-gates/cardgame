import { AdminPanel } from "./AdminPanel";
import { PlayerHand } from "./PlayerHand";
import { PlayerDeck } from "./PlayerDeck";
import { PlayerAvatar } from "./PlayerAvatar";
import { EnemyAvatar } from "./EnemyAvatar";
import { EndTurn } from "./EndTurn";
import { DrawPile } from "./DrawPile";
import { DiscardPile } from "./DiscardPile";

export function Game() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between max-w-full p-10">
      <div className="flex flex-col gap-4">
        <PlayerAvatar />
        <EnemyAvatar />
        <EndTurn />
      </div>
      <PlayerHand />
      <DrawPile />
      <DiscardPile />
      <PlayerDeck />
      <AdminPanel />
    </main>
  );
}
