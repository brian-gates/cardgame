import { getServerSession } from "next-auth";
import { CardProps } from ".";
import { revalidatePath } from "next/cache";
import { Card } from "./Card";
import { discard } from "../actions/discard";

export function Strike({ card }: CardProps) {
  const damage = 5;
  async function execute() {
    "use server";
    const session = await getServerSession();
    const id = session?.user?.email;
    if (!id) return;
    const player = await prisma.player.findUnique({
      where: { id },
      include: {
        encounter: true,
      },
    });
    const enemy = player?.encounter;
    if (!enemy) return;
    await prisma.enemy.update({
      where: { id: enemy.id },
      data: { health: Math.max(enemy.health - damage, 0) },
    });
    await discard(card.id);
    revalidatePath("/");
  }
  return (
    <Card card={card} execute={execute}>
      Deal {damage} damage.
    </Card>
  );
}
