import { Bash } from "./Bash";
import { Defend } from "./Defend";
import { Strike } from "./Strike";

export const cardIds = ["bash", "strike", "defend"] as const;

export const isCardId = (id: string): id is CardIds =>
  cardIds.includes(id as CardIds);

export type CardIds = (typeof cardIds)[number];

export const cardsById: Record<CardIds, React.FC> = {
  bash: Bash,
  strike: Strike,
  defend: Defend,
};

export { Bash, Defend, Strike };
