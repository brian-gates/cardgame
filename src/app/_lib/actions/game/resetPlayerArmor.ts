"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function resetPlayerArmor() {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) return;

  await prisma.player.update({
    where: { email },
    data: {
      armor: 0,
    },
  });
  revalidatePath("/game");
}
