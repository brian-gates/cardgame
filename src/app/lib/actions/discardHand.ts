/**
 * Discard the player's hand
 * */

import { getSessionPlayer } from "./getSessionPlayer";

export async function discardHand() {
  const player = await getSessionPlayer();
  if (!player) return;
  await prisma.card.updateMany({
    data: {
      location: "discard",
    },
    where: {
      location: "hand",
      ownerId: player.id,
    },
  });
}
