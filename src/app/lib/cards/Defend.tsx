import { CardProps } from ".";
import { Card } from "./Card";
import { defend } from "../actions/cards/defend";
import { IoShieldSharp } from "react-icons/io5";

export function Defend({ card }: CardProps) {
  return (
    <Card card={card} execute={defend}>
      Gain 1 <IoShieldSharp className="inline" />.
    </Card>
  );
}
