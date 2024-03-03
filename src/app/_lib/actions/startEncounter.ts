"use server";
import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { getSessionPlayer } from "./getSessionPlayer";

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
  revalidatePath("/game");
}
