"use server";

import { cardActionsByTemplateId } from "../cards";

export async function playCard(cardId: string, enemyId: string) {
  const card = await prisma.card.findUnique({
    where: { id: cardId, location: "hand" },
  });
  if (!card) return;
  const action = cardActionsByTemplateId[card.templateId];
  if (!action) return;
  await action({ card, enemyId });
}
