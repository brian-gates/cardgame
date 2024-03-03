"use server";

import { CardId } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getSessionPlayer } from "./getSessionPlayer";

const starterDeck: CardId[] = [
  "bash",
  "defend",
  "defend",
  "defend",
  "defend",
  "strike",
  "strike",
  "strike",
  "strike",
];

export async function resetToStarterDeck() {
  const player = await getSessionPlayer();
  const { id, email } = player ?? {};
  if (!id || !email) return;
  await prisma.card.deleteMany({
    where: {
      ownerId: id,
    },
  });
  const x = await prisma.card.createMany({
    data: starterDeck.map((cardId) => ({
      ownerId: id,
      cardId,
      location: "draw",
    })),
  });
  revalidatePath("/game");
  return x;
}
