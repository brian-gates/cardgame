import { getEnemy } from "@/app/_lib/enemies/getEnemy";
import { CardChoice } from "./CardChoice";
import { redirect } from "next/navigation";

export default async function RewardPage() {
  if (!(await getEnemy())) {
    redirect("/game");
  }
  return <CardChoice />;
}
