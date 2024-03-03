"use server";
import { getServerSession } from "next-auth";
import { enemyActionsById } from "../enemies";

export async function enemyTurn() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return;
  const enemy = (
    await prisma.player.findUnique({
      where: { id },
      include: {
        encounter: true,
      },
    })
  )?.encounter;
  if (!enemy) return;
  const action = enemyActionsById[enemy.enemyId];
  await action();
}
