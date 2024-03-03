import { CardId, CardLocation } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getSessionPlayer } from "./getSessionPlayer";

export async function addCard({
  cardId,
  location = "draw",
}: {
  cardId: CardId;
  location: CardLocation;
}) {
  "use server";
  const { id } = (await getSessionPlayer()) ?? {};
  if (!id) return;
  await prisma.card.create({
    data: {
      cardId,
      ownerId: id,
      location,
    },
  });
  revalidatePath("/game");
}
