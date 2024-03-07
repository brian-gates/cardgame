"use server";
import { Card } from "@prisma/client";
import { discard } from "../game/discard";
import { gainArmor } from "../game/gainArmor";

export async function defend(card: Card) {
  await gainArmor(1);
  await discard(card.id);
}
