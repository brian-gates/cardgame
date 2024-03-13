"use server";
import prisma from "../prisma";
import { getSessionPlayer } from "../actions/getSessionPlayer";

export async function getEncounter() {
  const { id } = (await getSessionPlayer()) ?? {};

  if (!id) return;

  return prisma.encounter.findUnique({
    where: { playerId: id },
    include: { enemies: true },
  });
}
