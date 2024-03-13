"use server";
import { redirect } from "next/navigation";
import { leaveEncounter } from "./leaveEncounter";
import { resetToStarterDeck } from "./resetToStarterDeck";
import { resetToStarterPlayer } from "./resetToStarterPlayer";
import { revalidatePath } from "next/cache";

export async function newGame() {
  await resetToStarterPlayer();
  await resetToStarterDeck();
  await leaveEncounter();
  revalidatePath("/game");
  redirect("/game");
}
