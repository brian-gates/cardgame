import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { endTurn } from "./actions/endTurn";
import { GiCardDraw } from "react-icons/gi";

export async function EndTurn() {
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
