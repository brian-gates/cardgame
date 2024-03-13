"use server";
import { discard } from "../game/discard";
import { gainArmor } from "../game/gainArmor";
import { CardAction } from ".";

export const defend: CardAction = async ({ card }) => {
  await gainArmor(1);
  await discard(card.id);
  return true;
};
