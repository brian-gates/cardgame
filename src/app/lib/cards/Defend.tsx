import { getServerSession } from "next-auth";
import { CardProps } from ".";
import { Card } from "./Card";

export function Defend({ card }: CardProps) {
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

    if (!player) return;

    await prisma.player.update({
      where: { id },
      data: {
        armor: player.armor + 5,
      },
    });
    await prisma.card.update({
      where: { id: card.id },
      data: { location: "discard" },
    });
  }
  return (
    <Card card={card} execute={execute}>
      Block 5 damage.
    </Card>
  );
}
