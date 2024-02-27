import { CardProps } from ".";
import { Card } from "./Card";
import { bash } from "../actions/cards/bash";
import { LuSwords } from "react-icons/lu";

export function Bash({ card }: CardProps) {
  return (
    <Card card={card} execute={bash}>
      Deal d3 <LuSwords className="inline" />.
    </Card>
  );
}
