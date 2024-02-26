import { cardsById, isCardId } from "./lib/cards";
import prisma from "./lib/prisma";
import { Card } from "@prisma/client";

export default function Board() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-violet-100 text-slate-800">
      <div className="flex flex-row gap-4">
        <PlayerAvatar />
        <EnemyAvatar />
        <EndTurn />
      </div>
      <PlayerHand />
    </main>
  );
}

async function PlayerHand() {
  const cards = await prisma.card.findMany({
    take: 4,
  });

  return (
    <div className="flex flex-row gap-3">
      {cards.map((card) => {
        if (!isCardId(card.id)) return null;
        const CardComponent = cardsById[card.id];
        return <CardComponent key={card.id} />;
      })}
    </div>
  );
}

async function PlayerAvatar() {
  const player = await prisma.player.findFirst();
  return (
    <div className="flex flex-col gap-1">
      <Stats
        health={player?.health ?? 10}
        maxHealth={player?.maxHealth ?? 10}
      />
    </div>
  );
}

async function EnemyAvatar() {
  const enemy = await prisma.enemy.findFirst();
  if (!enemy) return null;

  return (
    <div className="flex flex-col gap-1">
      <Stats health={enemy.health} maxHealth={enemy.maxHealth} />
    </div>
  );
}

function Stats({ health, maxHealth }: { health: number; maxHealth: number }) {
  const percentHealth = Math.floor(health / maxHealth);
  return (
    <div className="flex flex-row gap-1">
      <div className="w-24 h-4 bg-gradient-to-b to-red-400 from-red-700 rounded-md overflow-hidden">
        <div
          className={`bg-gradient-to-b from from-green-400 to-green-700 w-[${percentHealth}%] h-full shadow-2xl`}
        ></div>
      </div>
      <div className="w-24 h-4 bg-blue-500 rounded-md overflow-hidden">
        <div className="bg-gradient-to-b from-blue-400 to-blue-700 w-full h-full"></div>
      </div>
    </div>
  );
}

function EndTurn() {
  async function endTurn() {
    "use server";
  }
  return (
    <button name="action" value="endTurn" type="submit">
      End Turn
    </button>
  );
}
