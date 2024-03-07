"use server";
import { Card } from "@prisma/client";
import { discard } from "../game/discard";
import { damageEnemy } from "../game/damageEnemy";
import { roll } from "../../roll";

export async function bash(card: Card) {
  await damageEnemy(roll(3));
  await discard(card.id);
}
