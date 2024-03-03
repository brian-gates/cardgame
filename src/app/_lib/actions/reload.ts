"use server";

import { revalidatePath } from "next/cache";

export async function reload() {
  revalidatePath("/game", "page");
}
