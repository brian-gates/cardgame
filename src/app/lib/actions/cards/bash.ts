"use server";
import { discard } from "../game/discard";
import { damageEnemy } from "../game/damageEnemy";
import { roll } from "../../roll";
import { CardAction } from ".";

export const bash: CardAction = async ({ card, enemyId }) => {
  if (!enemyId) return { errorType: "target_required" };
  await damageEnemy(roll(3), enemyId);
  await discard(card.id);
  return true;
};
