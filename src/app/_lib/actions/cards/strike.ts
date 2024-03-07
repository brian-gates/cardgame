"use server";
import { Card } from "@prisma/client";
import { discard } from "../game/discard";
import { damageEnemy } from "../game/damageEnemy";

export async function strike(card: Card) {
  await damageEnemy(1);
  await discard(card.id);
}
