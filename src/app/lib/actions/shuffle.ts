"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

// shuffle the player's discard pile back into their deck
export async function shuffle() {
  console.log("shuffle");
  const session = await getServerSession();
  const id = session?.user?.email;
  if (!id) return;

  await prisma.card.updateMany({
    where: {
      ownerId: id,
      location: "discard",
    },
    data: {
      location: "draw",
    },
  });
  revalidatePath("/");
}
