"use server";
import { enemyDetailsById } from "../../enemies";
import { getSessionPlayer } from "../getSessionPlayer";
import { revalidatePath } from "next/cache";

export async function enemyTurns() {
  const player = await getSessionPlayer();
  if (!player) return;

  const encounter = await prisma.encounter.findUnique({
    where: { playerId: player.id },
    include: { enemies: true },
  });

  const actions = encounter?.enemies.map((enemy) => {
    return enemyDetailsById[enemy.templateId].actions[0];
  });

  if (!actions) return;

  for (const action of actions) {
    await action();
  }
  revalidatePath("/game/combat");
}
