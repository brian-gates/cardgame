"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function gainArmor(amount: number) {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) return;

  await prisma.player.update({
    where: { email },
    data: {
      armor: {
        increment: amount,
      },
    },
  });
  revalidatePath("/game");
}
