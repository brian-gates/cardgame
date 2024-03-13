"use server";
import { getSessionPlayer } from "../getSessionPlayer";

export async function resetToStarterPlayer() {
  const player = await getSessionPlayer();
  if (!player) return;
  await prisma.player.update({
    data: {
      armor: 0,
      health: 10,
      maxHealth: 10,
    },
    where: {
      id: player.id,
    },
  });
}
