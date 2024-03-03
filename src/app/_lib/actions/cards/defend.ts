"use server";
import { Card } from "@prisma/client";
import { discard } from "../discard";
import { gainArmor } from "../gainArmor";

export async function defend(card: Card) {
  await gainArmor(1);
  await discard(card.id);
}
