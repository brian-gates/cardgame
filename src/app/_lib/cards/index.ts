import { Card, CardId } from "@prisma/client";
import { Bash } from "./Bash";
import { Defend } from "./Defend";
import { Strike } from "./Strike";
import { FC } from "react";

export const cardIds = ["bash", "strike", "defend"] as const;

export const isCardId = (id: string): id is CardId =>
  cardIds.includes(id as CardId);

export type CardProps = {
  card: Card;
};

export const cardsById: Record<CardId, FC<CardProps>> = {
  bash: Bash,
  strike: Strike,
  defend: Defend,
};

export const cardTitlesById: Record<CardId, string> = {
  bash: "Bash",
  strike: "Strike",
  defend: "Defend",
};
export { Bash, Defend, Strike };
