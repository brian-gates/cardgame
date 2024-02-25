export default function Board() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-violet-100 text-slate-800">
      <div className="flex flex-row gap-4">
        <PlayerAvatar />
        <EnemyAvatar />
      </div>
      <PlayerHand />
    </main>
  );
}

function PlayerHand() {
  async function playCard(...args: any[]) {
    'use server';
    console.log("play card", args);
  }
  return (
    <form action={playCard} className="flex flex-row gap-1">
      <Card id="strike" title="Strike" description="Deal 6 damage." />
      <Card id="defend" title="Defend" description="Gain 5 block." />
      <Card id="bash" title="Bash" description="Deal 8 damage and apply 2 vulnerable." />
      <Card id="flex" title="Flex" description="Gain 2 strength." />
    </form>
  );
}

function Card({
  title,
  description,
  id,
}: {
  title: string;
  description: string;
  id: string;
}) {
  return (
    <button
      name="action"
      value={id}
      type="submit"
      className="w-36 h-56 bg-slate-100 rounded-md shadow-md border-2 hover:border-2 hover:border-blue-500 hover:scale-125 transition cursor-pointer"
    >
      <h4 className="text-lg font-bold text-center">{title}</h4>
      <div className="flex flex-col gap-1">
        <div className="p-1">
          <div className="h-20 w-full bg-slate-300 self-center rounded-sm shadow-inner"></div>
        </div>
        <p className="text-sm p-2">{description}</p>
      </div>
    </button>
  );
}

function PlayerAvatar() {
  return (
    <div className="flex flex-col gap-1">
      <Stats />
    </div>
  );
}

function EnemyAvatar() {
  return (
    <div className="flex flex-col gap-1">
      <Stats />
    </div>
  );
}

function Stats() {
  return (
    <div className="flex flex-row gap-1">
      <div className="w-24 h-4 bg-red-500 rounded-md overflow-hidden">
        <div className="bg-gradient-to-b from-green-400 to-green-700 w-full h-full"></div>
      </div>
      <div className="w-24 h-4 bg-blue-500 rounded-md overflow-hidden">
        <div className="bg-gradient-to-b from-blue-400 to-blue-700 w-full h-full"></div>
      </div>
    </div>
  );
}
