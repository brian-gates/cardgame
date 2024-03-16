"use server";

export async function damageEnemy(amount: number, id: string) {
  const enemy = await prisma.enemy.findUnique({ where: { id } });

  if (!enemy) return;

  await prisma.enemy.update({
    where: { id },
    data: { health: Math.max(enemy.health - amount, 0) },
  });
}
