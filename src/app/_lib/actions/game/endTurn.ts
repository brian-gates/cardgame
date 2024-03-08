"use server";
import { revalidatePath } from "next/cache";
import { draw } from "./draw";
import { enemyTurn } from "./enemyTurn";
import { discardHand } from "./discardHand";
import { resetPlayerArmor } from "./resetPlayerArmor";

export async function endTurn() {
  await enemyTurn();
  await discardHand();
  await draw(5);
  await resetPlayerArmor();
  revalidatePath("/game");
}
