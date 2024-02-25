export default function Board() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-violet-100">
      <PlayerAvatar />
      <PlayerHand />
    </main>
  );
}

function PlayerHand() {
  return <div className="flex flex-row gap-1">
    <Card title="Strike" />
    <Card title="Defend" />
    <Card title="Bash" />
    <Card title="Flex" />
  </div>;
}

function Card({ title }: { title: string }) {
  return <div className="w-24 h-36 bg-white rounded-md shadow-md hover:border-2 hover:border-blue-500 hover:scale-125">
    <h3>{title}</h3>
  </div>;
}

function PlayerAvatar() {
  return <div className="w-24 h-24 bg-white rounded-full shadow-md"></div>;
}

