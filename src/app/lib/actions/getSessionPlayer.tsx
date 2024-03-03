"use server";
import { getServerSession } from "next-auth";

export async function getSessionPlayer() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return null;
  return prisma.player.findUnique({
    where: {
      id,
    },
  });
}
