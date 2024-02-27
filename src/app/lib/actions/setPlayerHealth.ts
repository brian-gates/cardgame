"use server";
import { getSessionPlayer } from "./getSessionPlayer";

export async function setPlayerHealth(health: number) {
  const player = await getSessionPlayer();
  if (!player) return;
  return prisma.player.update({
    where: { id: player.id },
    data: { health },
  });
}
