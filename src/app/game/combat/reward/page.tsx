import { getEncounter } from "@/app/lib/enemies/getEncounter";
import { CardChoice } from "./CardChoice";
import { redirect } from "next/navigation";

export default async function RewardPage() {
  if (!(await getEncounter())) {
    redirect("/game");
  }
  return <CardChoice />;
}
