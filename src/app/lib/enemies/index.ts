import { EnemyId } from "@prisma/client";

export const enemyIds: EnemyId[] = ["slime"] as const;

export const enemyDetailsById: Record<
  EnemyId,
  { title: string; description: string; maxHealth: number }
> = {
  slime: { title: "Slime", description: "A slime.", maxHealth: 10 },
};
