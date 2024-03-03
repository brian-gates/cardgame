import { Card, CardId } from "@prisma/client";
import { Bash } from "./Bash";
import { Defend } from "./Defend";
import { Strike } from "./Strike";
import { FC, useMemo } from "react";
import { cardActionsById } from "../actions/cards";

export type CardProps = {
  card: Card;
};

const cardComponentsById: Record<CardId, FC<CardProps>> = {
  bash: Bash,
  strike: Strike,
  defend: Defend,
};

export const cardTitlesById = {
  bash: "Bash",
  strike: "Strike",
  defend: "Defend",
} as const satisfies Record<CardId, string>;

export const useCard = (card: Card) => {
  return useMemo(() => {
    const title = cardTitlesById[card.cardId];
    const CardComponent = cardComponentsById[card.cardId];
    const play = () => cardActionsById[card.cardId](card);
    return { title, CardComponent, play };
  }, [card.cardId]);
};

export const cardIds = Object.keys(cardTitlesById) as CardId[];

export const isCardId = (id: string): id is CardId =>
  cardIds.includes(id as CardId);
