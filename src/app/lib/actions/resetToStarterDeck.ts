"use server";

import { CardId } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

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
  const session = await getServerSession();
  const playerId = session?.user?.email;
  if (!playerId) return;
  await prisma.card.deleteMany({
    where: {
      ownerId: playerId,
    },
  });
  await prisma.card.createMany({
    data: starterDeck.map((cardId) => ({
      ownerId: playerId,
      cardId,
      location: "draw",
    })),
  });
  revalidatePath("/");
}
