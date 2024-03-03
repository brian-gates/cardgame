import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { enemyDetailsById } from "./enemies";
import { Stats } from "./Stats";
import { getSessionPlayer } from "./actions/getSessionPlayer";

export async function EnemyAvatar() {
  const { id } = (await getSessionPlayer()) ?? {};

  const enemy = await prisma.enemy.findUnique({
    where: { playerId: id },
  });
  if (!enemy) return null;

  const { title, maxHealth } = enemyDetailsById[enemy.enemyId];

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Stats health={enemy.health} maxHealth={maxHealth} armor={enemy.armor} />
    </div>
  );
}
