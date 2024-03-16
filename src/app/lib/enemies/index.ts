import { EnemyTemplate } from "@prisma/client";
import { damagePlayer } from "../actions/game/damagePlayer";
import { slime } from "./slime";
import { roll } from "../roll";

export const enemyTemplates: EnemyTemplate[] = ["slime"] as const;

export type EnemyDetails = {
  name: string;
  description: string;
  maxHealth: number;
  image: string;
  actions: (() => Promise<void>)[];
};

export const enemyDetailsById: Record<EnemyTemplate, EnemyDetails> = {
  slime,
};

export const enemyActionsById: Record<EnemyTemplate, () => Promise<void>> = {
  slime: async () => {
    await damagePlayer(roll(3));
  },
};
