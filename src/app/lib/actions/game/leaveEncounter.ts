"use server";

import prisma from "../../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getEncounter } from "../../enemies/getEncounter";

export async function leaveEncounter() {
  const encounter = await getEncounter();
  if (encounter) {
    await prisma.encounter.delete({
      where: { id: encounter.id },
      include: { enemies: true },
    });
  }
  revalidatePath("/game/combat");
  redirect("/game");
}
