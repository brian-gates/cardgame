"use server";

import prisma from "../../prisma";
import { revalidatePath } from "next/cache";
import { shuffle } from "./shuffle";
import { getSessionPlayer } from "../getSessionPlayer";

/**
 * Draw cards from the draw pile, shuffling if necessary
 */
export async function draw(count: number): Promise<void> {
  const player = await getSessionPlayer();
  if (!player) return;

  // find cards available to draw
  const drawn = await prisma.card.findMany({
    where: {
      ownerId: player.id,
      location: "draw",
    },
    take: count,
  });
  // move cards to hand
  await prisma.card.updateMany({
    where: {
      id: {
        in: drawn.map((card) => card.id),
      },
    },
    data: {
      location: "hand",
    },
  });
  revalidatePath("/game");
  // if we didn't draw enough, shuffle and continue
  if (drawn.length < count) {
    await shuffle();
    revalidatePath("/game");
    const cardsInDrawPile =
      (
        await prisma.card.findMany({
          where: {
            ownerId: player.id,
            location: "draw",
          },
        })
      ).length > 0;
    if (!cardsInDrawPile) return;
    return draw(count - drawn.length);
  }
  revalidatePath("/game");
}

export async function draw7() {
  return draw(7);
}

export async function draw1() {
  return draw(1);
}
