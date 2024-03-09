import { redirect } from "next/navigation";
import { getEnemy } from "../_lib/enemies/getEnemy";
import { getServerSession } from "next-auth";

export default async function GamePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  const enemy = await getEnemy();
  if (enemy) {
    redirect("/game/combat");
  }
  return null;
}
