import { revalidatePath } from "next/cache";
import { drawCard } from "./drawCard";

export async function endTurn() {
  "use server";
  await drawCard(5);
  revalidatePath("/");
}
