import prisma from "../prisma";
import { getSessionPlayer } from "../actions/getSessionPlayer";

export async function getEnemy() {
  const { id } = (await getSessionPlayer()) ?? {};

  return await prisma.enemy.findUnique({
    where: { playerId: id },
  });
}
