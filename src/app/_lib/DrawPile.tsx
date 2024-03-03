import prisma from "./prisma";
import { getSessionPlayer } from "./actions/getSessionPlayer";

export async function DrawPile() {
  const { id } = (await getSessionPlayer()) ?? {};
  if (!id) return null;
  const drawPile = await prisma.card.findMany({
    where: {
      ownerId: id,
      location: "draw",
    },
  });
  return (
    <div className="absolute bottom-0 left-0 p-4 flex-col-reverse flex gap-3">
      <h2 className="text-2xl font-bold">
        Draw <span className="text-slate-400 text-sm">{drawPile.length}</span>
      </h2>
    </div>
  );
}
