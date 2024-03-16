"use server";
import prisma from "../../prisma";
import { revalidatePath } from "next/cache";
import { getSessionPlayer } from "../getSessionPlayer";
import { Card } from "@prisma/client";
import { shuffle } from "./shuffle";

export async function startEncounter() {
  const { id } = (await getSessionPlayer()) ?? {};
  if (!id) return;
  const currentEncounter = await prisma.encounter.findFirst({
    where: {
      playerId: id,
    },
    include: { enemies: true },
  });
  if (currentEncounter) {
    await prisma.encounter.delete({
      where: { id: currentEncounter.id },
      include: { enemies: true },
    });
  }

  const encounter = await prisma.encounter.create({
    data: {
      player: { connect: { id } },
      enemies: { create: [{ templateId: "slime" }, { templateId: "slime" }] },
    },
  });

  await shuffle();

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

function drawRandomCards(draw: Card[], amount: number) {
  const drawCopy = [...draw]; // Create a copy of the cards array

  if (drawCopy.length < amount) return { hand: drawCopy, draw: [] };

  const hand = [];
  for (let i = 0; i < amount; i++) {
    const randomIndex = getRandomNumber(drawCopy.length);
    hand.push(drawCopy[randomIndex]);
    drawCopy.splice(randomIndex, 1); // Modify the copy instead of the original array
  }
  return { hand, draw: drawCopy };
}

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}
