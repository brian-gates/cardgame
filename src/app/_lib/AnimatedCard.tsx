"use client";
import { MotionDiv } from "./framer-motion";
import { CardBack } from "./CardBack";
import { Card } from "@prisma/client";
import { useCard } from "./cards";

const cardWidth = 144;

export function AnimatedCard({
  card,
  position = 0,
  handSize,
}: {
  card: Card;
  position?: number;
  handSize: number;
}) {
  const { CardComponent } = useCard(card);

  return (
    <MotionDiv
      layout
      key={card.id}
      layoutId={card.id}
      data-position={position}
      data-hand-size={handSize}
      data-location={card.location}
      className="absolute z-30"
      initial={card.location}
      animate={card.location}
      whileHover={{
        rotate: 0,
        scale: 1.2,
        zIndex: 40,
      }}
      style={{
        bottom: 0,
        scale: 1,
        alignSelf: "flex-end",
        transformOrigin: "bottom",
      }}
      variants={{
        draw: {
          left: 0,
          translateX: position * 2,
        },
        hand: {
          left: `50%`,
          bottom: 50,
          rotate: (position + 1 - handSize / 2) * 10,
          translateX: (position - handSize / 2) * 100,
          translateY: Math.abs(handSize / 2 - position) * 10,
        },
        discard: {
          left: `calc(100% - ${cardWidth}px)`,
          rotate: 5 - position * 2,
        },
      }}
    >
      {card.location !== "draw" ? <CardComponent card={card} /> : <CardBack />}
    </MotionDiv>
  );
}
