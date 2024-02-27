import { CardProps } from ".";
import { Card } from "./Card";
import { bash } from "../actions/cards/bash";

export function Bash({ card }: CardProps) {
  return (
    <Card card={card} execute={bash}>
      Deal 4 damage. Apply vulnerable.
    </Card>
  );
}
