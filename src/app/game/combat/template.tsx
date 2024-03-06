import { EndTurn } from "@/app/_lib/EndTurn";
import { EnemyAvatar } from "@/app/_lib/EnemyAvatar";
import { PlayerAvatar } from "@/app/_lib/PlayerAvatar";
import { ReactNode } from "react";

export default function CombatTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <PlayerAvatar />
          <EnemyAvatar />
        </div>
        <div className="flex justify-end">
          <EndTurn />
        </div>
      </div>
      {children}
    </>
  );
}
