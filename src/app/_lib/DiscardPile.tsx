import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { getSessionPlayer } from "./actions/getSessionPlayer";

export async function DiscardPile() {
  const player = await getSessionPlayer();
  if (!player) return null;

  const count = await prisma.card.count({
    where: { ownerId: player.id, location: "discard" },
  });
  return (
    <div className="group absolute bottom-0 right-0 p-4 flex-col-reverse flex gap-3">
      <h2 className="text-2xl font-bold text-right">
        Discard <span className="text-slate-400 text-sm">{count}</span>
      </h2>
    </div>
  );
}
