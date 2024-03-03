import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { enemyDetailsById } from "./enemies";
import { Stats } from "./Stats";

export async function EnemyAvatar() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return;
  const player = await prisma.player.findUnique({
    where: { id },
    include: {
      encounter: true,
    },
  });
  const enemy = player?.encounter;
  if (!enemy) return null;

  const { title, maxHealth } = enemyDetailsById[enemy.enemyId];

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Stats health={enemy.health} maxHealth={maxHealth} armor={enemy.armor} />
    </div>
  );
}
