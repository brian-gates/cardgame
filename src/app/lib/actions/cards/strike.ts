"use server";
import { Card } from "@prisma/client";
import { discard } from "../discard";
import { damageEnemy } from "../damageEnemy";

export async function strike({ card }: { card: Card }) {
  await damageEnemy(6);
  await discard(card.id);
}
