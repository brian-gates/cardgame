export async function discard(id: string) {
  await prisma.card.update({
    where: { id },
    data: { location: "discard" },
  });
}
