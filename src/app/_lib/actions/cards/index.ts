import { Card, CardId } from "@prisma/client";
import { strike } from "./strike";
import { bash } from "./bash";
import { defend } from "./defend";

type CardAction = (card: Card) => Promise<void>;

export const cardActionsById: Record<CardId, CardAction> = {
  strike,
  defend,
  bash,
};
