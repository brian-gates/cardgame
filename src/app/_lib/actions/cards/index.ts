import { Card, CardTemplate } from "@prisma/client";
import { strike } from "./strike";
import { bash } from "./bash";
import { defend } from "./defend";

type CardAction = (card: Card) => Promise<void>;

export const cardActionsById: Record<CardTemplate, CardAction> = {
  strike,
  defend,
  bash,
};
