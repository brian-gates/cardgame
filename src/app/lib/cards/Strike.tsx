import { CardProps } from ".";
import { Card } from "./Card";
import { strike } from "../actions/cards/strike";

export function Strike({ card }: CardProps) {
  return (
    <Card card={card} execute={strike}>
      Deal 6 damage.
    </Card>
  );
}
