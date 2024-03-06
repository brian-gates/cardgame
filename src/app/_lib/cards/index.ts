import { Card, CardTemplate } from "@prisma/client";
import { Bash } from "./Bash";
import { Defend } from "./Defend";
import { Strike } from "./Strike";
import { FC, useMemo } from "react";
import { cardActionsById } from "../actions/cards";

export type CardProps = {
  card?: Card;
  templateId: CardTemplate;
  onClick?: () => void;
};

export const cardComponentsById: Record<CardTemplate, FC<CardProps>> = {
  bash: Bash,
  strike: Strike,
  defend: Defend,
};

export const cardTitlesById = {
  bash: "Bash",
  strike: "Strike",
  defend: "Defend",
} as const satisfies Record<CardTemplate, string>;

export const useCard = ({
  card,
  templateId,
}: {
  card?: Card;
  templateId: CardTemplate;
}) => {
  return useMemo(() => {
    const title = cardTitlesById[templateId];
    const CardComponent = cardComponentsById[templateId];
    const play = card ? () => cardActionsById[templateId](card) : undefined;
    return { title, CardComponent, play };
  }, [templateId]);
};

export const useCardAction = (card: Card) => {
  const play = card ? () => cardActionsById[card.templateId](card) : undefined;
  return play;
};

export const templateIds = Object.keys(cardTitlesById) as CardTemplate[];

export const isTemplateId = (id: string): id is CardTemplate =>
  templateIds.includes(id as CardTemplate);
