import { CardTemplate } from "@prisma/client";
import { Bash, BashTemplate } from "./Bash";
import { Defend, DefendTemplate } from "./Defend";
import { Strike, StrikeTemplate } from "./Strike";
import { FC, ReactNode } from "react";

export type CardProps = {
  title: string;
  image: string;
  children: ReactNode;
};

export const cardComponentsById: Record<CardTemplate, JSX.Element> = {
  bash: <Bash />,
  strike: <Strike />,
  defend: <Defend />,
};

export const cardTemplatesById = {
  bash: <BashTemplate />,
  strike: <StrikeTemplate />,
  defend: <DefendTemplate />,
};

export const cardTitlesById = {
  bash: "Bash",
  strike: "Strike",
  defend: "Defend",
} as const satisfies Record<CardTemplate, string>;

export const cardImagesById = {
  bash: "/cards/bash.png",
  strike: "/cards/strike.png",
  defend: "/cards/defend.png",
} as const satisfies Record<CardTemplate, string>;

export const templateIds = Object.keys(cardTitlesById) as CardTemplate[];

export const isCardTemplate = (id: string): id is CardTemplate =>
  templateIds.includes(id as CardTemplate);
