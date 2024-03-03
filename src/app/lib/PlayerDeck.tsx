import { AnimatedCard } from "./AnimatedCard";
import { getSessionPlayer } from "./actions/getSessionPlayer";

export async function PlayerDeck() {
  const player = await getSessionPlayer();
  if (!player) return null;

  const cards = await prisma.card.findMany({ where: { ownerId: player.id } });

  const draw = cards.filter((card) => card.location === "draw");
  const hand = cards.filter((card) => card.location === "hand");
  const discard = cards.filter((card) => card.location === "discard");

  return (
    <>
      {draw.map((card, i) => (
        <AnimatedCard
          key={card.id}
          card={{
            ...card,
            position: i,
          }}
        />
      ))}
      {discard.map((card, i) => (
        <AnimatedCard
          key={card.id}
          card={{
            ...card,
            position: i,
          }}
        />
      ))}
      {hand.map((card, i) => (
        <AnimatedCard
          key={card.id}
          card={{
            ...card,
            position: i,
          }}
        />
      ))}
    </>
  );
}
