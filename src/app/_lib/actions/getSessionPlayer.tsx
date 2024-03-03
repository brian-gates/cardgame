"use server";
import { getServerSession } from "next-auth";

export async function getSessionPlayer() {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) return null;
  return prisma.player.findUnique({
    where: {
      email,
    },
  });
}
