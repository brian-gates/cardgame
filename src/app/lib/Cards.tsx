import { AnimatedCard } from "./AnimatedCard";
import { getSessionPlayer } from "./actions/getSessionPlayer";

export async function Cards() {
  const player = await getSessionPlayer();
  if (!player) return null;

  const cards = await prisma.card.findMany({ where: { ownerId: player.id } });

  const draw = cards.filter((card) => card.location === "draw");
  const hand = cards.filter((card) => card.location === "hand");
  const discard = cards.filter((card) => card.location === "discard");

  return (
    <div className="absolute bottom-0 left-0 right-0 p-5 mb-10">
      <div className="relative">
        {draw.map((card, i) => (
          <AnimatedCard
            key={card.id}
            card={card}
            position={i}
            handSize={hand.length}
          />
        ))}
        {discard.map((card, i) => (
          <AnimatedCard
            key={card.id}
            card={card}
            position={i}
            handSize={hand.length}
          />
        ))}
        {hand.map((card, i) => (
          <AnimatedCard
            key={card.id}
            card={card}
            position={i}
            handSize={hand.length}
            playable
          />
        ))}
      </div>
    </div>
  );
}
