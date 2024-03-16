import { cardActionsByTemplateId } from "@/app/lib/actions/cards";
import { getSessionPlayer } from "@/app/lib/actions/getSessionPlayer";
import { getEncounter } from "@/app/lib/enemies/getEncounter";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FaArrowUp } from "react-icons/fa";

export default async function CombatPage({
  searchParams,
}: {
  searchParams: {
    card: string;
    enemy: string;
  };
}) {
  const encounter = await getEncounter();
  if (!encounter) {
    redirect("/game");
  }
  if (encounter.enemies.every((enemy) => enemy.health === 0)) {
    redirect("/game/combat/reward");
  }

  const player = await getSessionPlayer();
  if (player && player.health === 0) {
    redirect("/game/combat/defeat");
  }

  const targetedEnemy = encounter.enemies.find(
    (enemy) => enemy.id === searchParams.enemy
  );

  if (targetedEnemy?.health === 0) {
    redirect(
      `/game/combat${searchParams.card ? `?card=${searchParams.card}` : ""}`
    );
  }

  if (searchParams.card) {
    const card = await prisma.card.findUnique({
      where: { id: searchParams.card, location: "hand" },
    });
    if (!card) return;
    const result = await cardActionsByTemplateId[card.templateId]({
      card,
      enemyId: searchParams.enemy,
    });
    if (result === true) {
      revalidatePath("/game");
      revalidatePath("/game/combat", "layout");
      redirect(`/game/combat?enemy=${searchParams.enemy}`);
    }
    if (result.errorType === "target_required") {
      return (
        <h2 className="text-2xl flex items-center gap-2">
          Choose a target <FaArrowUp />
        </h2>
      );
    }
  }
}
