import { EndTurn } from "@/app/lib/EndTurn";
import { EncounterEnemies } from "@/app/lib/EncounterEnemies";
import { PlayerAvatar } from "@/app/lib/PlayerAvatar";
import { ReactNode } from "react";
import { getEncounter } from "@/app/lib/enemies/getEncounter";

export default async function CombatTemplate({
  children,
}: {
  children: ReactNode;
}) {
  const encounter = await getEncounter();
  if (!encounter) return null;
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{encounter.name}</h1>
        <div className="flex flex-row gap-4">
          <PlayerAvatar />
          <EncounterEnemies encounter={encounter} />
        </div>
        <div className="flex justify-end">
          <EndTurn />
        </div>
      </div>
      {children}
    </>
  );
}
