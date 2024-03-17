"use client";
import { enemyDetailsById } from "./enemies";
import { getEncounter } from "./enemies/getEncounter";
import { Avatar } from "./Avatar";
import Link from "next/link";
import { useQueryString } from "./useQueryString";
import { useSearchParams } from "next/navigation";
import { cn } from "./cn";
import { FiTarget } from "react-icons/fi";

export function EncounterEnemies({
  encounter,
}: {
  encounter: Awaited<ReturnType<typeof getEncounter>>;
}) {
  const enemy = useSearchParams().get("enemy");
  const queryString = useQueryString();
  if (!encounter) return;

  return (
    <div className="flex flex-col gap-5">
      {encounter.enemies.map(({ templateId, health, armor, id }) => {
        const { name, maxHealth, image } = enemyDetailsById[templateId];
        const isSelected = enemy === id;
        return (
          <Link
            key={id}
            href={"?" + queryString("enemy", id)}
            className={cn(
              "hover:bg-slate-300 hover:bg-opacity-10 rounded-lg border-2 border-slate-700 relative",
              {
                "bg-slate-300 bg-opacity-10 border-blue-500": isSelected,
              }
            )}
          >
            {isSelected ? (
              <FiTarget className="absolute top-2 left-2 bg-red-600 rounded-full w-5 h-5 opacity-100" />
            ) : null}
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
