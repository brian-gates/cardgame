import { getEnemy } from "@/app/_lib/enemies/getEnemy";
import { redirect } from "next/navigation";

export default async function CombatPage() {
  const enemy = await getEnemy();
  if (!enemy) {
    redirect("/game");
  }
  if (enemy.health === 0) {
    redirect("/game/combat/reward");
  }
}
