"use server";
import { revalidatePath } from "next/cache";
import { draw } from "./draw";
import { enemyTurns } from "./enemyTurns";
import { discardHand } from "./discardHand";
import { resetPlayerArmor } from "./resetPlayerArmor";

export async function endTurn() {
  await enemyTurns();
  await discardHand();
  await draw(5);
  await resetPlayerArmor();
  revalidatePath("/game");
}
