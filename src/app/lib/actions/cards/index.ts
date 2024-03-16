import { Card, CardTemplate } from "@prisma/client";
import { strike } from "./strike";
import { bash } from "./bash";
import { defend } from "./defend";

export type CardAction = ({
  card,
  enemyId,
}: {
  card: Card;
  enemyId?: string;
}) => Promise<boolean>;

export const cardActionsByTemplateId: Record<CardTemplate, CardAction> = {
  strike,
  defend,
  bash,
};
