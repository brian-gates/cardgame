import { cardIds, cardTitlesById } from "./cards";
import { CardId } from "@prisma/client";
import { shuffle } from "./actions/shuffle";
import { LuShuffle, LuSwords } from "react-icons/lu";
import { startEncounter } from "./actions/startEncounter";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { RxExit, RxReset } from "react-icons/rx";
import { leaveEncounter } from "./actions/leaveEncounter";
import { getSessionPlayer } from "./actions/getSessionPlayer";
import { setPlayerHealth } from "./actions/setPlayerHealth";
import { GiCardDraw } from "react-icons/gi";
import { resetToStarterDeck } from "./actions/resetToStarterDeck";

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
      <Health />
      <ResetToStarterDeck />
    </div>
  );
}

async function ResetToStarterDeck() {
  return (
    <form action={resetToStarterDeck}>
      <button type="submit" className="flex items-center gap-1">
        <RxReset /> Reset to Starter Deck
      </button>
    </form>
  );
}

async function Health() {
  const player = await getSessionPlayer();
  if (!player) return null;

  async function update(formData: FormData) {
    "use server";
    const health = formData.get("health");
    if (typeof health !== "string") return;
    await setPlayerHealth(Number(health));
    revalidatePath("/");
  }

  return (
    <div className="flex gap-2">
      <div>Health</div>
      <form action={update}>
        <input
          className="w-14 text-center"
          type="number"
          defaultValue={player.health}
          name="health"
        />
        <button type="submit">Set</button>
      </form>
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
function StartEncounter() {
  return (
    <form action={startEncounter}>
      <button type="submit" className="flex items-center gap-1">
        <LuSwords />
        Start Encounter
      </button>
    </form>
  );
}

function LeaveEncounter() {
  return (
    <form action={leaveEncounter}>
      <button type="submit" className="flex items-center gap-1">
        <RxExit /> Leave Encounter
      </button>
    </form>
  );
}

function AddCard({ cardId }: { cardId: CardId }) {
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
  const title = cardTitlesById[cardId];
  return (
    <form action={execute}>
      <button type="submit" className="flex items-center gap-1">
        <GiCardDraw /> Add {title}
      </button>
    </form>
  );
}
