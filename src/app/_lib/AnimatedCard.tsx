"use client";
import { MotionDiv } from "./framer-motion";
import { CardBack } from "./CardBack";
import { Card } from "@prisma/client";
import { cardsById } from "./cards";

// const cardDimensions = {
//   width: 144,
//   height: 154,
// };

const pad = 20;

export function AnimatedCard({ card }: { card: Card & { position?: number } }) {
  const { position } = card;

  const variants = {
    draw: {
      x: pad,
      bottom: pad,
      left: pad,
      transform: `translateX(${(position ?? 0) * 2}px)`,
    },
    hand: {
      x: "50%",
      bottom: pad,
      transform: `rotate(${5 - (position ?? 0) * 2}deg) translateX(${(position ?? 0) * 2}px)`,
    },
    discard: {
      right: pad,
      bottom: pad,
      transform: `rotate(${5 - (position ?? 0) * 2}deg)`,
    },
  };

  console.log({ position, card });

  const CardComponent = cardsById[card.cardId];

  return (
    <MotionDiv
      layoutId={card.id}
      className="absolute z-30"
      initial="draw"
      variants={variants}
      animate={card.location}
      // whileHover={{ scale: 1.1 }}
    >
      {card.location}
      {card.location !== "draw" ? <CardComponent card={card} /> : <CardBack />}
    </MotionDiv>
  );
}
