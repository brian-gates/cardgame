import { CardProps } from ".";
import { Card } from "./Card";
import { defend } from "../actions/cards/defend";
import { IoShieldSharp } from "react-icons/io5";

export function Defend({ card, templateId, onClick }: CardProps) {
  return (
    <Card card={card} templateId={templateId} onClick={onClick}>
      <p className="text-2xl text-center">
        1 <IoShieldSharp className="inline" />
      </p>
    </Card>
  );
}
