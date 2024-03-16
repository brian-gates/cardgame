"use server";
import { discard } from "../game/discard";
import { damageEnemy } from "../game/damageEnemy";
import type { CardAction } from ".";
import { roll } from "../../roll";

export const strike: CardAction = async ({ card, enemyId }) => {
  if (!enemyId) return { errorType: "target_required" };
  await damageEnemy(roll(3), enemyId);
  await discard(card.id);
  return true;
};
