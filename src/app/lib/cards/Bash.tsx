import { CardProps } from ".";
import { Card } from "./Card";
import { discard } from "../actions/discard";
import { damageEnemy } from "../actions/damageEnemy";
import { revalidatePath } from "next/cache";

export function Bash({ card }: CardProps) {
  const damage = 4;
  // const vulnerable = 1; // todo
  async function execute() {
    "use server";
    await damageEnemy(damage);
    await discard(card.id);
    revalidatePath("/");
  }
  return (
    <Card card={card} execute={execute}>
      Deal {damage} damage. Apply vulnerable.
    </Card>
  );
}
