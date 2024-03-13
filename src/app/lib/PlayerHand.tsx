import { getSessionPlayer } from "./actions/getSessionPlayer";

export async function PlayerHand() {
  const player = await getSessionPlayer();
  if (!player) return null;

  const count = await prisma.card.count({
    where: { ownerId: player.id, location: "hand" },
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
