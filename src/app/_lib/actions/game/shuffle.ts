"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { getSessionPlayer } from "../getSessionPlayer";

// shuffle the player's discard pile into their deck
export async function shuffle() {
  const player = await getSessionPlayer();
  if (!player) return;

  await prisma.card.updateMany({
    where: {
      ownerId: player.id,
      location: "discard",
    },
    data: {
      location: "draw",
    },
  });
  revalidatePath("/game");
}
