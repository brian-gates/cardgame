import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { Avatar } from "./Avatar";

export async function PlayerAvatar() {
  const session = await getServerSession();
  const user = session?.user;
  if (!session || !user) return null;
  const email = session?.user?.email;
  if (!email) return null;
  const player = await prisma.player.findUnique({
    where: { email },
  });

  if (!player) return null;

  if (!user.name) return null;

  return (
    <Avatar
      {...{
        image: user.image ?? undefined,
        title: user.name,
        health: player.health,
        maxHealth: player.maxHealth,
        armor: player.armor,
      }}
    />
  );
}
