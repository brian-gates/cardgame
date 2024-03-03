import { CardProps } from ".";
import { Card } from "./Card";
import { strike } from "../actions/cards/strike";
import { LuSwords } from "react-icons/lu";

export function Strike({ card }: CardProps) {
  return (
    <Card card={card}>
      Deal 1 <LuSwords className="inline" /> damage.
    </Card>
  );
}
