"use server";
import { getServerSession } from "next-auth";
import { enemyActionsById } from "../enemies";
import { getSessionPlayer } from "./getSessionPlayer";

export async function enemyTurn() {
  const player = await getSessionPlayer();
  if (!player) return;

  const enemy = await prisma.enemy.findUnique({
    where: { playerId: player.id },
  });
  if (!enemy) return;
  const action = enemyActionsById[enemy.enemyId];
  await action();
}
