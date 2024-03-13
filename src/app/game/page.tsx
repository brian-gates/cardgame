import { redirect } from "next/navigation";
import { getEncounter } from "../lib/enemies/getEncounter";
import { getServerSession } from "next-auth";
import { adventure } from "../lib/actions/game/adventure";

export default async function GamePage({}: {}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  const encounter = await getEncounter();
  if (encounter) {
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
