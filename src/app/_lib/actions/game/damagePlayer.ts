import { revalidatePath } from "next/cache";
import { getSessionPlayer } from "../getSessionPlayer";

export async function damagePlayer(amount: number) {
  const player = await getSessionPlayer();
  if (!player) return;
  const faceDamage = Math.max(0, amount - player.armor);
  const newArmor = Math.max(player.armor - amount, 0);
  const newHealth = Math.max(player.health - faceDamage, 0);
  await prisma.player.update({
    where: { id: player.id },
    data: { health: newHealth, armor: newArmor },
  });
  revalidatePath("/game");
  return { faceDamage, newArmor, newHealth };
}
