import { getServerSession } from "next-auth";
import prisma from "./prisma";

export async function PlayerHand() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return null;

  const count = await prisma.card.count({
    where: { ownerId: id, location: "hand" },
  });

  return (
    <div className="flex flex-col items-center justify-center absolute bottom-0 z-10">
      <div className="group flex-col-reverse flex gap-5 p-4">
        <h2 className="text-2xl font-bold text-center">
          Hand <span className="text-slate-400 text-sm">{count}</span>
        </h2>
      </div>
    </div>
  );
}
