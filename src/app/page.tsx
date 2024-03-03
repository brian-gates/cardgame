import { getServerSession } from "next-auth";
import prisma from "./_lib/prisma";
import { Game } from "./_lib/Game";
import Link from "next/link";

export default async function App() {
  const session = await getServerSession();
  if (!session) return null;
  const email = session?.user?.email;
  if (!email) return null;
  await prisma.player.upsert({
    where: { email },
    update: {
      lastActive: new Date(),
    },
    create: {
      email,
      armor: 0,
      health: 10,
      maxHealth: 10,
    },
  });
  return (
    <div className="flex flex-col gap-3 items-center p-3 rounded-md">
      <Link
        className="text-2xl border border-gray-300 p-5 rounded-md"
        href="/game"
      >
        Play
      </Link>
    </div>
  );
}
