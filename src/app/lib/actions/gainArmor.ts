"use server";

import { getServerSession } from "next-auth";

export async function gainArmor(amount: number) {
  "use server";
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

  await prisma.player.update({
    where: { id },
    data: {
      armor: player.armor + amount,
    },
  });
}
