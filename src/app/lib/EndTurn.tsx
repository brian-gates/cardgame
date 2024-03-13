import { endTurn } from "./actions/game/endTurn";
import { GiCardDraw } from "react-icons/gi";
import { getSessionPlayer } from "./actions/getSessionPlayer";
import { getEncounter } from "./enemies/getEncounter";

export async function EndTurn() {
  if (!(await getSessionPlayer())) return;
  if (!(await getEncounter())) return;
  return (
    <form action={endTurn}>
      <button
        type="submit"
        className="bg-slate-800 text-slate-100 p-3 rounded-md shadow-md flex flex-row items-center gap-2"
      >
        <GiCardDraw /> End Turn
      </button>
    </form>
  );
}
