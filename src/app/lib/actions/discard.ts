import { revalidatePath } from "next/cache";

export async function discard(id: string) {
  await prisma.card.update({
    where: { id },
    data: { location: "discard" },
  });
  revalidatePath("/");
}
