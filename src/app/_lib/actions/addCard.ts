import { CardTemplate, CardLocation } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getSessionPlayer } from "./getSessionPlayer";

export async function addCard({
  templateId,
  location = "draw",
}: {
  templateId: CardTemplate;
  location: CardLocation;
}) {
  "use server";
  const { id } = (await getSessionPlayer()) ?? {};
  if (!id) return;
  await prisma.card.create({
    data: {
      templateId: templateId,
      ownerId: id,
      location,
    },
  });
  revalidatePath("/game");
}
