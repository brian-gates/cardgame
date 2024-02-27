import { CardProps } from ".";
import { Card } from "./Card";
import { defend } from "../actions/cards/defend";

export function Defend({ card }: CardProps) {
  return (
    <Card card={card} execute={() => defend({ card })}>
      Block 5 damage.
    </Card>
  );
}
