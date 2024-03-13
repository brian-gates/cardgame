"use client";
import { enemyDetailsById } from "./enemies";
import { getEncounter } from "./enemies/getEncounter";
import { Avatar } from "./Avatar";
import Link from "next/link";
import { useQueryString } from "./useQueryString";
import { useSearchParams } from "next/navigation";

export function EncounterEnemies({
  encounter,
}: {
  encounter: Awaited<ReturnType<typeof getEncounter>>;
}) {
  if (!encounter) return;
  const enemy = useSearchParams().get("enemy");
  const queryString = useQueryString();

  return (
    <div className="flex flex-col gap-5">
      {encounter.enemies.map(({ templateId, health, armor, id }) => {
        const { name, maxHealth, image } = enemyDetailsById[templateId];
        const isSelected = enemy === id;
        return (
          <Link key={id} href={"?" + queryString("enemy", id)}>
            <Avatar
              {...{
                image,
                name,
                health,
                maxHealth,
                armor,
                isSelected,
              }}
            />
          </Link>
        );
      })}
    </div>
  );
}
