"use server";
import { revalidatePath } from "next/cache";
import { drawCard } from "./drawCard";
import { enemyTurn } from "./enemyTurn";

export async function endTurn() {
  await drawCard(5);
  await enemyTurn();
  revalidatePath("/");
}
