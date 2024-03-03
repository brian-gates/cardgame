import { Card } from "@prisma/client";
import { createContext } from "react";

type GameContextValue = {
  cards: Card[];
  setCards: (cards: Card[]) => void;
};

export const GameContext = createContext<GameContextValue>({
  cards: [],
  setCards: () => {},
});
