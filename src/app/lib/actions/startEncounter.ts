"use server";
import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function startEncounter() {
  const session = await getServerSession();
  const id = session?.user?.email;
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
  revalidatePath("/");
}
