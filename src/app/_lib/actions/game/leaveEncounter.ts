"use server";

import prisma from "../../prisma";
import { revalidatePath } from "next/cache";
import { getSessionPlayer } from "../getSessionPlayer";
import { redirect } from "next/navigation";

export async function leaveEncounter() {
  const player = await getSessionPlayer();
  if (!player) return;
  await prisma.enemy.delete({
    where: { playerId: player.id },
  });
  revalidatePath("/game/combat");
  redirect("/game");
}
