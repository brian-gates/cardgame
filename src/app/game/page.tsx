import { redirect } from "next/navigation";
import { getEnemy } from "../_lib/enemies/getEnemy";

export default async function GamePage() {
  const enemy = await getEnemy();
  if (enemy) {
    redirect("/game/combat");
  }
  return null;
}
