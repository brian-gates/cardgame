"use server";
import { Card } from "@prisma/client";
import { discard } from "../discard";
import { damageEnemy } from "../damageEnemy";

export async function bash(card: Card) {
  await damageEnemy(4);
  await discard(card.id);
}
