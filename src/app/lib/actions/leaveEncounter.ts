"use server";
import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function leaveEncounter() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return;
  await prisma.enemy.delete({
    where: { playerId: id },
  });
  revalidatePath("/");
}
