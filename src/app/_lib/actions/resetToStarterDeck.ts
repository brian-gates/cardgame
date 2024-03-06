"use server";

import { CardTemplate } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getSessionPlayer } from "./getSessionPlayer";

const starterDeck: CardTemplate[] = [
  "bash",
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
  await prisma.card.createMany({
    data: starterDeck.map((templateId) => ({
      ownerId: id,
      templateId,
      location: "draw",
    })),
  });
  revalidatePath("/game");
}
