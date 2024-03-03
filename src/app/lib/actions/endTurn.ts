"use server";
import { revalidatePath } from "next/cache";
import { draw } from "./draw";
import { enemyTurn } from "./enemyTurn";
import { discardHand } from "./discardHand";

export async function endTurn() {
  await discardHand();
  await draw(5);
  await enemyTurn();
  revalidatePath("/");
}
