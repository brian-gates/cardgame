import { getServerSession } from "next-auth";
import { cardsById } from "./lib/cards";
import prisma from "./lib/prisma";
import { enemyDetailsById } from "./lib/enemies";
import { IoShieldSharp } from "react-icons/io5";
import { endTurn } from "./lib/actions/endTurn";
import { AdminPanel } from "./lib/AdminPanel";
import { GiCardDraw, GiHealthNormal } from "react-icons/gi";
import { PlayerHand } from "./lib/PlayerHand";

export default async function App() {
  const session = await getServerSession();
  if (!session) return null;
  const email = session?.user?.email;
  if (!email) return null;
  await prisma.player.upsert({
    where: { id: email },
    update: {
      lastActive: new Date(),
    },
    create: {
      id: email,
      armor: 0,
      health: 10,
      maxHealth: 10,
    },
  });
  return <Board />;
}

function Board() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-violet-100 text-slate-800 max-w-full p-10">
      <div className="flex flex-col gap-4">
        <PlayerAvatar />
        <EnemyAvatar />
        <EndTurn />
        {/* <Deck /> */}
      </div>
      <PlayerHand />
      <DrawPile />
      <DiscardPile />
      <AdminPanel />
    </main>
  );
}

async function DiscardPile() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return null;
  const discardPile = await prisma.card.findMany({
    where: {
      ownerId: id,
      location: "discard",
    },
  });
  return (
    <div className="group absolute bottom-0 right-0 p-4 flex-col-reverse flex gap-3">
      <h2 className="text-2xl font-bold text-right">
        Discard{" "}
        <span className="text-slate-400 text-sm">{discardPile.length}</span>
      </h2>
      <div className="flex flex-row gap-2 transition-transform -space-x-36 group-hover:space-x-0">
        {discardPile.map((card, i) => {
          const CardComponent = cardsById[card.cardId];
          return (
            <div
              key={card.id}
              className={`w-36 h-56 transition-transform rotate-[${i * 4}deg]`}
            >
              <CardComponent card={card} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

async function DrawPile() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return null;
  const drawPile = await prisma.card.findMany({
    where: {
      ownerId: id,
      location: "draw",
    },
  });
  return (
    <div className="group absolute bottom-0 left-0 p-4 flex-col-reverse flex gap-3">
      <h2 className="text-2xl font-bold">
        Draw <span className="text-slate-400 text-sm">{drawPile.length}</span>
      </h2>
      <form action={endTurn}>
        <button
          type="submit"
          className="flex flex-row -space-x-32 min-w-36 min-h-56 border-2 border-slate-400 hover:border-blue-500 p-3"
        >
          {drawPile.map((card) => (
            <CardBack key={card.id} />
          ))}
        </button>
      </form>
    </div>
  );
}

function CardBack() {
  return (
    <div className="w-36 h-56 bg-slate-100 rounded-md shadow-md border-2 cursor-pointer flex flex-col items-center justify-center"></div>
  );
}

async function PlayerAvatar() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return null;
  const player = await prisma.player.findUnique({
    where: { id },
  });

  if (!player) return null;
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-bold">{session.user?.name}</h2>
      <Stats
        health={player?.health ?? 10}
        maxHealth={player?.maxHealth ?? 10}
        armor={player?.armor ?? 0}
      />
    </div>
  );
}

async function EnemyAvatar() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return;
  const player = await prisma.player.findUnique({
    where: { id },
    include: {
      encounter: true,
    },
  });
  const enemy = player?.encounter;
  if (!enemy) return null;

  const { title, maxHealth } = enemyDetailsById[enemy.enemyId];

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Stats health={enemy.health} maxHealth={maxHealth} armor={enemy.armor} />
    </div>
  );
}

function Stats({
  health,
  maxHealth,
  armor,
}: {
  health: number;
  maxHealth: number;
  armor: number;
}) {
  const percentHealth = Math.floor((health / maxHealth) * 100);

  return (
    <div className="flex flex-row gap-1">
      <div className="flex flex-col gap-1">
        <div className="text-xs flex flex-row items-center gap-1">
          <GiHealthNormal />
          <div>
            {health} / {maxHealth} ({percentHealth}%)
          </div>
        </div>

        <div className="w-36 h-4 bg-gradient-to-b to-red-400 from-red-700 rounded-md overflow-hidden flex flex-row">
          <div
            className={`bg-gradient-to-b from from-green-400 to-green-700 h-full shadow-2xl transition-transform`}
            style={{ width: `${percentHealth}%`, transition: "width 1s" }}
          ></div>
        </div>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <IoShieldSharp />
        <div>{armor}</div>
      </div>
    </div>
  );
}

async function EndTurn() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return;
  const encounter = await prisma.enemy.findUnique({
    where: { playerId: id },
  });
  if (!encounter) return null;
  return (
    <form action={endTurn}>
      <button
        type="submit"
        className="bg-slate-800 text-slate-100 p-3 rounded-md shadow-md flex flex-row items-center gap-2"
      >
        <GiCardDraw /> End Turn
      </button>
    </form>
  );
}
