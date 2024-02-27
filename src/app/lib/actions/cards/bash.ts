"use server";
import { Card } from "@prisma/client";
import { discard } from "../discard";
import { damageEnemy } from "../damageEnemy";
import { roll } from "../../roll";

export async function bash(card: Card) {
  await damageEnemy(roll(3));
  await discard(card.id);
}
