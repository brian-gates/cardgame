import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function damagePlayer(amount: number) {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return;

  const player = await prisma.player.findUnique({
    where: { id },
  });
  if (!player) return;
  const faceDamage = Math.max(0, amount - player.armor);
  const newArmor = Math.max(player.armor - amount, 0);
  const newHealth = Math.max(player.health - faceDamage, 0);
  await prisma.player.update({
    where: { id },
    data: { health: newHealth, armor: newArmor },
  });
  revalidatePath("/");
}
