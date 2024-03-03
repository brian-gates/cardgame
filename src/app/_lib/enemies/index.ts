import { EnemyId } from "@prisma/client";
import { damagePlayer } from "../actions/damagePlayer";

export const enemyIds: EnemyId[] = ["slime"] as const;

export const enemyDetailsById: Record<
  EnemyId,
  { title: string; description: string; maxHealth: number }
> = {
  slime: { title: "Slime", description: "A slime.", maxHealth: 10 },
};

export const enemyActionsById: Record<EnemyId, () => Promise<void>> = {
  slime: async () => {
    await damagePlayer(1);
  },
};
