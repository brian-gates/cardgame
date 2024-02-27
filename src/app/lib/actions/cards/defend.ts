"use server";
import { Card } from "@prisma/client";
import { discard } from "../discard";
import { gainArmor } from "../gainArmor";

export async function defend({ card }: { card: Card }) {
  await gainArmor(5);
  await discard(card.id);
}
