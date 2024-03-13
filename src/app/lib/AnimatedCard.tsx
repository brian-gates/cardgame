"use client";

import { MotionDiv } from "./framer-motion";
import { CardBack } from "./CardBack";
import { Card } from "@prisma/client";
import { CardFront } from "./cards/CardFront";
import { useSearchParams } from "next/navigation";
import { cn } from "./cn";
import { PlayableCard } from "./PlayableCard";

const cardWidth = 144;
const cardHeight = 224;

export const dynamic = "force-dynamic";

export function AnimatedCard({
  card,
  position = 0,
  handSize,
  playable,
}: {
  card: Card;
  position?: number;
  handSize: number;
  playable?: boolean;
}) {
  const playing =
    useSearchParams().get("card") === card.id && card.location === "hand";
  const location = playing ? "playing" : card.location;
  function Card() {
    if (playable) {
      return (
        <PlayableCard card={card}>
          <CardFront templateId={card.templateId} />
        </PlayableCard>
      );
    }
    if (card.location === "draw") {
      return <CardBack />;
    }
    return <CardFront templateId={card.templateId} />;
  }
  return (
    <MotionDiv
      layout
      key={card.id}
      layoutId={card.id}
      data-position={position}
      data-hand-size={handSize}
      data-location={location}
      className={cn("absolute z-10 rounded-lg", {
        "pointer-events-none": location !== "hand",
        "border-4 border-blue-500": playing,
      })}
      initial={location}
      animate={location}
      whileHover={{
        rotate: 0,
        scale: 1.2,
        zIndex: 30,
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
        playing: {
          left: `50%`,
          rotate: 0,
          bottom: cardHeight * 1.5,
          scale: 1.2,
          zIndex: 20,
          translate: 0,
        },
      }}
    >
      <Card />
    </MotionDiv>
  );
}
