import { getServerSession } from "next-auth";
import prisma from "./prisma";

export async function DiscardPile() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return null;

  const count = await prisma.card.count({
    where: { ownerId: id, location: "discard" },
  });
  return (
    <div className="group absolute bottom-0 right-0 p-4 flex-col-reverse flex gap-3">
      <h2 className="text-2xl font-bold text-right">
        Discard <span className="text-slate-400 text-sm">{count}</span>
      </h2>
    </div>
  );
}
