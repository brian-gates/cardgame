import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { endTurn } from "./actions/endTurn";
import { GiCardDraw } from "react-icons/gi";
import { getSessionPlayer } from "./actions/getSessionPlayer";

export async function EndTurn() {
  const player = await getSessionPlayer();
  if (!player) return;
  const encounter = await prisma.enemy.findUnique({
    where: { playerId: player.id },
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
