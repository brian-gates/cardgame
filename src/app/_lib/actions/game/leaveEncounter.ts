"use server";

import prisma from "../../prisma";
import { revalidatePath } from "next/cache";
import { getSessionPlayer } from "../getSessionPlayer";
import { redirect } from "next/navigation";
import { getEnemy } from "../../enemies/getEnemy";

export async function leaveEncounter() {
  const player = await getSessionPlayer();
  if (!player) return;
  const enemy = await getEnemy();
  if (enemy) {
    await prisma.enemy.delete({
      where: { id: enemy.id },
    });
  }
  revalidatePath("/game/combat");
  redirect("/game");
}
