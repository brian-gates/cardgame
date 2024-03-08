"use server";
import prisma from "../../prisma";
import { revalidatePath } from "next/cache";
import { getSessionPlayer } from "../getSessionPlayer";
import { Card } from "@prisma/client";

export async function startEncounter() {
  const { id } = (await getSessionPlayer()) ?? {};
  if (!id) return;
  const currentEncounter = await prisma.enemy.findUnique({
    where: { playerId: id },
  });
  if (currentEncounter) {
    await prisma.enemy.delete({
      where: { playerId: id },
    });
  }
  await prisma.enemy.create({
    data: {
      enemyId: "slime",
      playerId: id,
    },
  });

  const deck = await prisma.card.findMany({
    where: { ownerId: id },
  });

  const { hand, draw } = drawRandomCards(deck, 5);

  await prisma.card.updateMany({
    where: { id: { in: hand.map((card) => card.id) } },
    data: { location: "hand" },
  });

  await prisma.card.updateMany({
    where: { id: { in: draw.map((card) => card.id) } },
    data: { location: "draw" },
  });

  revalidatePath("/game");
}

function drawRandomCards(cards: Card[], amount: number) {
  const cardsCopy = [...cards]; // Create a copy of the cards array
  const hand = [];
  for (let i = 0; i < amount; i++) {
    const randomIndex = getRandomNumber(cardsCopy.length);
    hand.push(cardsCopy[randomIndex]);
    cardsCopy.splice(randomIndex, 1); // Modify the copy instead of the original array
  }
  return { hand, draw: cardsCopy };
}

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}
