import { cardTitlesById, isCardTemplate } from "./cards";
import { shuffle } from "./actions/game/shuffle";
import { LuShuffle, LuSwords } from "react-icons/lu";
import { startEncounter } from "./actions/game/startEncounter";
import { revalidatePath } from "next/cache";
import { RxExit, RxReset } from "react-icons/rx";
import { leaveEncounter } from "./actions/game/leaveEncounter";
import { getSessionPlayer } from "./actions/getSessionPlayer";
import { setPlayerHealth } from "./actions/game/setPlayerHealth";
import { GiCardDraw, GiHealthNormal } from "react-icons/gi";
import { resetToStarterDeck } from "./actions/game/resetToStarterDeck";
import { draw1 } from "./actions/game/draw";
import { IoReload } from "react-icons/io5";
import { reload } from "./actions/game/reload";
import { addCard } from "./actions/game/addCard";

export function AdminPanel() {
  return (
    <div className="border-2 border-slate-300 p-4 rounded-md absolute left-0 ml-4">
      <h3 className="text-xl font-bold">Admin</h3>
      <AddCard />
      <NewEncounter />
      <LeaveEncounter />
      <Shuffle />
      <Health />
      <ResetToStarterDeck />
      <Draw />
      <Reload />
    </div>
  );
}

function AddCard() {
  async function execute(formData: FormData) {
    "use server";
    const templateId = formData.get("templateId");
    if (typeof templateId !== "string") return;
    if (!isCardTemplate(templateId)) return;
    await addCard({ templateId, location: "draw" });
    revalidatePath("/game");
  }
  return (
    <form action={execute} className="flex gap-2 items-center">
      <button type="submit" className="flex items-center gap-1">
        <GiCardDraw /> Add
      </button>
      <select
        name="templateId"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {Object.entries(cardTitlesById).map(([templateId, title]) => (
          <option key={templateId} value={templateId}>
            {title}
          </option>
        ))}
      </select>
    </form>
  );
}

function Reload() {
  return (
    <form action={reload}>
      <button type="submit" className="flex items-center gap-1">
        <IoReload /> Reload
      </button>
    </form>
  );
}

function Draw() {
  return (
    <form action={draw1}>
      <button type="submit" className="flex items-center gap-1">
        <GiCardDraw /> Draw 1
      </button>
    </form>
  );
}

function ResetToStarterDeck() {
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
    revalidatePath("/game");
  }

  return (
    <div className="flex gap-2 items-center">
      <div className="flex items-center gap-1">
        <GiHealthNormal /> Health
      </div>
      <form action={update}>
        <input
          className="w-14 text-center text-slate-900"
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
function NewEncounter() {
  return (
    <form action={startEncounter}>
      <button type="submit" className="flex items-center gap-1">
        <LuSwords />
        New Encounter
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
