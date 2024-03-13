import { redirect } from "next/navigation";
import { getEncounter } from "../lib/enemies/getEncounter";
import { getServerSession } from "next-auth";
import { adventure } from "../lib/actions/game/adventure";

export default async function GamePage() {
  if (!(await getServerSession())) {
    redirect("/");
  }
  if (await getEncounter()) {
    redirect("/game/combat");
  }
  return (
    <form action={adventure}>
      <button type="submit" className="bg-blue-500 text-white p-4 rounded-lg">
        Adventure!
      </button>
    </form>
  );
}
