import { cardIds } from "./cards";
import { CardId } from "@prisma/client";
import { shuffle } from "./actions/shuffle";
import { LuShuffle, LuSwords } from "react-icons/lu";
import { startEncounter } from "./actions/startEncounter";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { RxExit } from "react-icons/rx";
import { leaveEncounter } from "./actions/leaveEncounter";

export function AdminPanel() {
  return (
    <div className="border-2 border-slate-300 p-4 rounded-md">
      <h3 className="text-xl font-bold">Admin</h3>
      {cardIds.map((cardId) => (
        <AddCard key={cardId} cardId={cardId as CardId} />
      ))}
      <StartEncounter />
      <LeaveEncounter />
      <Shuffle />
    </div>
  );
}

function Shuffle() {
  return (
    <form action={shuffle}>
      <button type="submit" className="flex items-center gap-1">
        <LuShuffle /> Shuffle
      </button>
    </form>
  );
}
export function StartEncounter() {
  return (
    <form action={startEncounter}>
      <button type="submit" className="flex items-center gap-1">
        <LuSwords />
        Start Encounter
      </button>
    </form>
  );
}

export function LeaveEncounter() {
  return (
    <form action={leaveEncounter}>
      <button type="submit" className="flex items-center gap-1">
        <RxExit /> Leave Encounter
      </button>
    </form>
  );
}

export function AddCard({ cardId }: { cardId: CardId }) {
  async function execute() {
    "use server";
    const session = await getServerSession();
    const id = session?.user?.email;
    if (!id) return;
    await prisma.card.create({
      data: {
        cardId,
        ownerId: id,
        location: "draw",
      },
    });
    revalidatePath("/");
  }
  return (
    <form action={execute}>
      <button type="submit">Add {cardId}</button>
    </form>
  );
}
