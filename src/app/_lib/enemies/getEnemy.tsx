import prisma from "../prisma";
import { getSessionPlayer } from "../actions/getSessionPlayer";

export async function getEnemy() {
  const { id } = (await getSessionPlayer()) ?? {};

  if (!id) return;

  return await prisma.enemy.findUnique({
    where: { playerId: id },
  });
}
