import { newGame } from "@/app/lib/actions/game/newGame";
import { getSessionPlayer } from "@/app/lib/actions/getSessionPlayer";
import { redirect } from "next/navigation";

export default async function DefeatPage() {
  const player = await getSessionPlayer();
  if (!player) return;
  if (player.health > 0) {
    redirect("/game/combat");
  }
  if (
    (await prisma.card.count({
      where: { ownerId: player.id },
    })) > 0
  )
    await prisma.card.deleteMany({ where: { ownerId: player.id } });

  if (
    (await prisma.encounter.count({
      where: { playerId: player.id },
    })) > 0
  )
    await prisma.encounter.delete({
      where: { playerId: player.id },
      include: { enemies: true },
    });

  return (
    <form
      action={newGame}
      className="flex flex-col items-center justify-center gap-5 bg-black bg-opacity-50 h-screen w-screen absolute top-0 left-0 z-50"
    >
      <h1 className="text-3xl font-bold text-red-500">Defeated</h1>
      <button type="submit">New Game</button>
    </form>
  );
}
