"use server";
import prisma from "../../prisma";
import { revalidatePath } from "next/cache";
import { getSessionPlayer } from "../getSessionPlayer";
import { Card } from "@prisma/client";
import { shuffle } from "./shuffle";
import { roll } from "../../roll";

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

  await prisma.encounter.create({
    data: {
      name: "Slimes",
      player: { connect: { id } },
      enemies: { create: [{ templateId: "slime" }, { templateId: "slime" }] },
    },
  });

  await shuffle();

  const deck = await prisma.card.findMany({
    where: { ownerId: id },
  });

  const { hand, draw } = drawRandomCards(deck, 5);

  if (hand.length) {
    await prisma.card.updateMany({
      where: { id: { in: hand.map((card) => card.id) } },
      data: { location: "hand" },
    });
  }

  if (draw.length) {
    await prisma.card.updateMany({
      where: { id: { in: draw.map((card) => card.id) } },
      data: { location: "draw" },
    });
  }
}

function drawRandomCards(draw: Card[], amount: number) {
  const drawCopy = [...draw]; // Create a copy of the cards array

  if (drawCopy.length < amount) return { hand: drawCopy, draw: [] };

  const hand = [];
  for (let i = 0; i < amount; i++) {
    const randomIndex = roll(drawCopy.length);
    hand.push(drawCopy[randomIndex]);
    drawCopy.splice(randomIndex, 1); // Modify the copy instead of the original array
  }
  return { hand, draw: drawCopy };
}
