"use server";

import { cardActionsById } from "../cards";

export async function playCard(cardId: string) {
  const card = await prisma.card.findUnique({
    where: { id: cardId, location: "hand" },
  });
  if (!card) return;
  const action = cardActionsById[card.templateId];
  if (!action) return;
  await action(card);
}
