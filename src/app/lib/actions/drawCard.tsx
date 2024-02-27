import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function drawCard(count: number): Promise<void> {
  "use server";
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return;
  const draw = await prisma.card.findMany({
    where: {
      ownerId: id,
      location: "draw",
    },
    take: count,
  });
  if (!draw) return;
  await prisma.card.updateMany({
    where: {
      id: {
        in: draw.map((card) => card.id),
      },
    },
    data: {
      location: "hand",
    },
  });
  revalidatePath("/");
}
