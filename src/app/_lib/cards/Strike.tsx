import { CardProps } from ".";
import { Card } from "./Card";
import { LuSwords } from "react-icons/lu";

export function Strike({ card, templateId, onClick }: CardProps) {
  return (
    <Card card={card} templateId={templateId} onClick={onClick}>
      <p className="text-2xl text-center">
        1 <LuSwords className="inline" />
      </p>
    </Card>
  );
}
