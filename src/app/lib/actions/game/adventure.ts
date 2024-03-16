"use server";

import { revalidatePath } from "next/cache";
import { startEncounter } from "./startEncounter";
import { redirect } from "next/navigation";

export async function adventure() {
  await startEncounter();
  revalidatePath("/game/combat", "layout");
  redirect("/game/combat");
}
