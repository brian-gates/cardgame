"use client";

import { Card } from "@prisma/client";
import { cardTitlesById } from ".";
import { ReactNode, useState } from "react";

export function Card({
  card,
  execute,
  children,
}: {
  card: Card;
  execute: (card: Card) => Promise<void>;
  children: ReactNode;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const title = cardTitlesById[card.cardId];
  return (
    <button
      onClick={async () => {
        setIsPlaying(true);
        await execute(card);
        setIsPlaying(false);
      }}
      className="w-36 h-56 bg-slate-100 rounded-md border-2 cursor-pointer flex flex-col"
    >
      <h4 className="text-lg font-bold text-center border-b w-full">{title}</h4>
      <div className="p-1 grow gap-1 flex flex-col">
        <div className="h-20 w-full bg-slate-300 self-center rounded-sm shadow-inner"></div>
        <p className="text-sm p-2 text-left shadow-inner rounded-sm h-fit border-2 border-green-50 grow">
          {children}
        </p>
      </div>
    </button>
  );
}
