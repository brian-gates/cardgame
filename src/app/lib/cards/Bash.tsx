import { getServerSession } from "next-auth";
import { CardProps } from ".";
import { Card } from "./Card";

export function Bash({ card }: CardProps) {
  const damage = 4;
  // const vulnerable = 1; // todo
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
    await prisma.card.update({
      where: { id: card.id },
      data: { location: "discard" },
    });
  }
  return (
    <Card card={card} execute={execute}>
      Deal {damage} damage. Apply vulnerable.
    </Card>
  );
}
