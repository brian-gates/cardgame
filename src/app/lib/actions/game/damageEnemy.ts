"use server";

export async function damageEnemy(amount: number, enemyId: string) {
  const enemy = await prisma.enemy.findUnique({ where: { id: enemyId } });

  if (!enemy) return;

  await prisma.enemy.update({
    where: { id: enemyId },
    data: { health: Math.max(enemy.health - amount, 0) },
  });
}
