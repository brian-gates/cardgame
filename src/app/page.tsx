import { getServerSession } from "next-auth";
import { cardIds, cardsById } from "./lib/cards";
import prisma from "./lib/prisma";
import { CardId } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { enemyDetailsById } from "./lib/enemies";
import { IoShieldSharp } from "react-icons/io5";
import { endTurn } from "./lib/actions/endTurn";

export default async function App() {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) return null;
  const player = await prisma.player.upsert({
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
  if (!session) return null;
  return <Board />;
}

export function Board() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-violet-100 text-slate-800">
      <div className="flex flex-col gap-4">
        <PlayerAvatar />
        <EnemyAvatar />
        <EndTurn />
        <PlayerHand />
        <DrawPile />
        <Deck />
        <AdminPanel />
      </div>
    </main>
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
    <div>
      <h2 className="text-2xl font-bold">
        Draw Pile ({drawPile.length} Cards)
      </h2>
      <div className="flex flex-row gap-1">
        {drawPile.map((card) => {
          const CardComponent = cardsById[card.cardId];
          return <CardComponent key={card.id} card={card} />;
        })}
      </div>
    </div>
  );
}

async function Deck() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return null;

  const deck = await prisma.card.findMany({
    where: {
      ownerId: id,
    },
  });
  return (
    <div>
      <h2 className="text-2xl font-bold">Deck ({deck.length} Cards)</h2>
      <div className="flex flex-row gap-1">
        {deck.map((card) => {
          const CardComponent = cardsById[card.cardId];
          return <CardComponent key={card.id} card={card} />;
        })}
      </div>
    </div>
  );
}

function AdminPanel() {
  return (
    <div className="border-2 border-slate-300 p-4 rounded-md">
      <h3 className="text-xl font-bold">Admin</h3>
      {cardIds.map((cardId) => (
        <AddCard key={cardId} cardId={cardId as CardId} />
      ))}
      <StartEncounter />
      <LeaveEncounter />
    </div>
  );
}

function StartEncounter() {
  async function execute() {
    "use server";
    const session = await getServerSession();
    const id = session?.user?.email;
    if (!id) return;
    const currentEncounter = await prisma.enemy.findUnique({
      where: { playerId: id },
    });
    if (currentEncounter) {
      await prisma.enemy.delete({
        where: { playerId: id },
      });
    }
    await prisma.enemy.create({
      data: {
        enemyId: "slime",
        playerId: id,
      },
    });
    revalidatePath("/");
  }
  return (
    <form action={execute}>
      <button type="submit">Start Encounter</button>
    </form>
  );
}

function LeaveEncounter() {
  async function execute() {
    "use server";
    const session = await getServerSession();
    const id = session?.user?.email;
    if (!id) return;
    await prisma.enemy.delete({
      where: { playerId: id },
    });
    revalidatePath("/");
  }
  return (
    <form action={execute}>
      <button type="submit">Leave Encounter</button>
    </form>
  );
}

function AddCard({ cardId }: { cardId: CardId }) {
  async function execute() {
    "use server";
    const session = await getServerSession();
    const id = session?.user?.email;
    if (!id) return;
    await prisma.card.create({
      data: {
        cardId,
        ownerId: id,
        location: "draw",
      },
    });
    revalidatePath("/");
  }
  return (
    <form action={execute}>
      <button type="submit">Add {cardId}</button>
    </form>
  );
}

async function PlayerHand() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return null;

  const hand = await prisma.card.findMany({
    where: {
      ownerId: id,
      location: "hand",
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold">Hand ({hand.length} Cards) </h2>
      <div className="flex flex-row gap-3">
        {hand.map((card) => {
          const CardComponent = cardsById[card.cardId];
          return <CardComponent key={card.id} card={card} />;
        })}
      </div>
    </div>
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
        <div className="text-xs">
          {health} / {maxHealth} ({percentHealth}%)
        </div>

        <div className="w-36 h-4 bg-gradient-to-b to-red-400 from-red-700 rounded-md overflow-hidden flex flex-row">
          <div
            className={`bg-gradient-to-b from from-green-400 to-green-700 h-full shadow-2xl`}
            style={{ width: `${percentHealth}%` }}
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

async function heal(formData: FormData) {
  "use server";
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return;

  const player = await prisma.player.findUnique({
    where: { id },
  });

  if (!player) return;

  const healAmount = Number(formData.get("amount"));
  const newHealth = Math.min(player.health + healAmount, player.maxHealth);
  await prisma.player.update({
    where: { id },
    data: { health: newHealth },
  });
  revalidatePath("/");
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
      <button type="submit">End Turn</button>
    </form>
  );
}
