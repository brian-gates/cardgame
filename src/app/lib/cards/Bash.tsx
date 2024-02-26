import { getServerSession } from "next-auth";

export function Bash() {
  async function execute() {
    "use server";
    const session = await getServerSession();
    const id = session?.user?.email;
    if (!id) return;
    const player = await prisma.player.findUnique({
      where: { id },
      include: {
        Encounter: {
          include: { enemy: true },
        },
      },
    });
    const enemy = player?.Encounter[0].enemy;
    if (!enemy) return;
    await prisma.enemy.update({
      where: { id: enemy.id },
      data: { health: Math.max(enemy.health - 4, 0) },
    });
    // TODO: apply vulnerable
  }
  return (
    <form action={execute}>
      <button
        name="action"
        value="bash"
        type="submit"
        className="w-36 h-56 bg-slate-100 rounded-md shadow-md border-2 hover:border-2 hover:scale-125 transition cursor-pointer flex flex-col"
      >
        <h4 className="text-lg font-bold text-center border-b w-full">Bash</h4>
        <div className="p-1 grow gap-1 flex flex-col">
          <div className="h-20 w-full bg-slate-300 self-center rounded-sm shadow-inner"></div>
          <p className="text-sm p-2 text-left shadow-inner rounded-sm h-fit border-2 border-green-300 grow">
            Deal 4 damage. Apply vulnerable.
          </p>
        </div>
      </button>
    </form>
  );
}
