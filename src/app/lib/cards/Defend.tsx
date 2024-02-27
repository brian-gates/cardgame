import { getServerSession } from "next-auth";
import { CardProps } from ".";
import { Card } from "./Card";
import { discard } from "../actions/discard";
import { gainArmor } from "../actions/gainArmor";

export function Defend({ card }: CardProps) {
  async function execute() {
    "use server";
    await gainArmor(5);
    await discard(card.id);
  }
  return (
    <Card card={card} execute={execute}>
      Block 5 damage.
    </Card>
  );
}
