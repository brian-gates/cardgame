import { getServerSession } from "next-auth";
import { CardProps } from ".";
import { revalidatePath } from "next/cache";
import { Card } from "./Card";
import { discard } from "../actions/discard";
import { damageEnemy } from "../actions/damageEnemy";

export function Strike({ card }: CardProps) {
  const damage = 5;
  async function execute() {
    "use server";
    await damageEnemy(damage);
    await discard(card.id);
    revalidatePath("/");
  }
  return (
    <Card card={card} execute={execute}>
      Deal {damage} damage.
    </Card>
  );
}
