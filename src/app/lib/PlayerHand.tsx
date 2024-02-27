import { getServerSession } from "next-auth";
import { cardsById } from "./cards";
import prisma from "./prisma";
import { MotionDiv } from "./framer-motion";

export async function PlayerHand() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return null;

  const hand = await prisma.card.findMany({
    where: {
      ownerId: id,
      location: "hand",
    },
  });

  return (
    <div className="flex flex-col items-center justify-center absolute bottom-0 z-10">
      <div className="group flex-col-reverse flex gap-5 p-4">
        <h2 className="text-2xl font-bold text-center">
          Hand <span className="text-slate-400 text-sm">{hand.length}</span>
        </h2>
        <div className="flex flex-row items-center justify-center">
          {hand.map((card, i) => {
            const Card = cardsById[card.cardId];
            const distanceFromCenter = i - Math.floor(hand.length / 2);
            const rotationDegrees = 5 * distanceFromCenter;
            const rotation =
              rotationDegrees > 0
                ? `rotate-[${rotationDegrees}deg]`
                : `-rotate-[${Math.abs(rotationDegrees)}deg]`;
            const translation = `translate-y-[${Math.abs(distanceFromCenter)}rem`;
            return (
              <MotionDiv
                className={`origin-bottom ${rotation} ${translation}] group-hover:translate-y-0 group-hover:rotate-0 group-focus-within:translate-y-0 group-focus-within:rotate-0 transition-transform`}
              >
                <Card key={card.id} card={card} />
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </div>
  );
}
