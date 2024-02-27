import { getServerSession } from "next-auth";
import { cardsById } from "./cards";
import prisma from "./prisma";

async function Deck() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return null;

  const deck = await prisma.card.findMany({
    where: {
      ownerId: id,
    },
  });
  return (
    <div>
      <h2 className="text-2xl font-bold">Deck ({deck.length} Cards)</h2>
      <div className="flex flex-row gap-1">
        {deck.map((card) => {
          const CardComponent = cardsById[card.cardId];
          return <CardComponent key={card.id} card={card} />;
        })}
      </div>
    </div>
  );
}
