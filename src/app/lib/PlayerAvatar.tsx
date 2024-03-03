import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { Stats } from "./Stats";
import Image from "next/image";

export async function PlayerAvatar() {
  const session = await getServerSession();
  const user = session?.user;
  if (!session || !user) return null;
  const id = session?.user?.email;
  if (!id) return null;
  const player = await prisma.player.findUnique({
    where: { id },
  });

  if (!player) return null;
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        {user.image && (
          <div className="rounded-full overflow-hidden w-8 h-8">
            <Image src={user.image} width={32} height={32} alt="user avatar" />
          </div>
        )}

        {session.user?.name}
      </h2>
      <Stats
        health={player?.health ?? 10}
        maxHealth={player?.maxHealth ?? 10}
        armor={player?.armor ?? 0}
      />
    </div>
  );
}
