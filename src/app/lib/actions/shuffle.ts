"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function shuffle() {
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return;

  await prisma.card.updateMany({
    where: {
      ownerId: id,
    },
    data: {
      location: "draw",
    },
  });
  revalidatePath("/");
}
