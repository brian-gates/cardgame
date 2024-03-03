import { getServerSession } from "next-auth";
import prisma from "./lib/prisma";
import { Board } from "./lib/Board";

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
  return <Board />;
}
