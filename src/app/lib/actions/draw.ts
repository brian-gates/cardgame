"use server";
import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { shuffle } from "./shuffle";

/**
 * Draw a number of cards from the draw pile, shuffling if necessary
 * @param count The number of cards to draw
 * @returns
 */
export async function draw(count: number): Promise<void> {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return;
  const drawn = await prisma.card.findMany({
    where: {
      ownerId: id,
      location: "draw",
    },
    take: count,
  });
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
  revalidatePath("/");
  if (drawn.length < count) {
    await shuffle();
    revalidatePath("/");
    const cardsInDrawPile =
      (
        await prisma.card.findMany({
          where: {
            ownerId: id,
            location: "draw",
          },
        })
      ).length > 0;
    if (!cardsInDrawPile) return;
    return draw(count - drawn.length);
  }
  revalidatePath("/");
}
