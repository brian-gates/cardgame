"use server";
import { getServerSession } from "next-auth";

export async function damageEnemy(amount: number) {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return;
  const player = await prisma.player.findUnique({
    where: { id },
    include: {
      encounter: true,
    },
  });

  if (!player) return;

  const enemy = player.encounter;

  if (!enemy) return;

  await prisma.enemy.update({
    where: { id: enemy.id },
    data: { health: Math.max(enemy.health - amount, 0) },
  });
}
