"use server";
import { Card } from "@prisma/client";
import { discard } from "../discard";
import { damageEnemy } from "../damageEnemy";

export async function strike(card: Card) {
  await damageEnemy(1);
  await discard(card.id);
}
