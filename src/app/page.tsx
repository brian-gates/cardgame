import prisma from "../../lib/prisma";
import { Card } from "@prisma/client";

export default function Board() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-violet-100 text-slate-800">
      <div className="flex flex-row gap-4">
        <PlayerAvatar />
        <EnemyAvatar />
      </div>
      <PlayerHand />
    </main>
  );
}

async function PlayerHand() {
  const cards = await prisma.card.findMany({
    take: 4
  })
  
  async function playCard(formData: FormData) {
    'use server';
    console.log("play card", formData);
  }
  return (
    <form action={playCard} className="flex flex-row gap-1">
      {cards.map((card => {
        return <Card {...card} />
      }))}
    </form>
  );
}

function Card({
  title,
  id,
}: Card) {
  return (
    <button
      name="action"
      value={id}
      type="submit"
      className="w-36 h-56 bg-slate-100 rounded-md shadow-md border-2 hover:border-2 hover:scale-125 transition cursor-pointer flex flex-col"
    >
      <h4 className="text-lg font-bold text-center border-b w-full">{title}</h4>
      <div className="p-1 grow gap-1 flex flex-col">
        <div className="h-20 w-full bg-slate-300 self-center rounded-sm shadow-inner"></div>
        <p className="text-sm p-2 text-left shadow-inner rounded-sm h-fit border-2 border-green-300 grow">Description goes here.</p>
      </div>
    </button>
  );
}

async function PlayerAvatar() {
  const player = await prisma.player.findFirst()
  return (
    <div className="flex flex-col gap-1">
      <Stats health={player?.health ?? 10} maxHealth={player?.maxHealth ?? 10} />
    </div>
  );
}

function EnemyAvatar() {
  return (
    <div className="flex flex-col gap-1">
      <Stats health={10} maxHealth={10} />
    </div>
  );
}

function Stats({
  health,
  maxHealth
}: {
  health: number,
  maxHealth: number
}) {
  const percentHealth = Math.floor(health / maxHealth)
  return (
    <div className="flex flex-row gap-1">
      <div className="w-24 h-4 bg-gradient-to-b to-red-400 from-red-700 rounded-md overflow-hidden">
        <div className={`bg-gradient-to-b from from-green-400 to-green-700 w-[${percentHealth}%] h-full shadow-2xl`}></div>
      </div>
      <div className="w-24 h-4 bg-blue-500 rounded-md overflow-hidden">
        <div className="bg-gradient-to-b from-blue-400 to-blue-700 w-full h-full"></div>
      </div>
    </div>
  );
}

function EndTurn() {
  async function endTurn() {
    'use server'
  }
  return <button
  name="action"
  value='endTurn'
  type="submit"
>End Turn</button>
}