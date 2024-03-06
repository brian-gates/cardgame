import { cardComponentsById, templateIds } from "@/app/_lib/cards";
import { CardTemplate } from "@prisma/client";

export default function RewardPage() {
  return <CardChoice />;
}

function CardChoice() {
  const card1 = getRandomCard();
  const card2 = getRandomCard({ omit: [card1] });
  const card3 = getRandomCard({ omit: [card1, card2] });

  const cardIds = [card1, card2, card3];

  return (
    <form className="position absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="flex flex-col gap-4 items-center rounded-lg p-5">
        <h2 className="text-4xl">Choose a card</h2>
        <div className="flex flex-row gap-5">
          {cardIds.map((templateId) => {
            const CardComponent = cardComponentsById[templateId];
            return <CardComponent key={templateId} templateId={templateId} />;
          })}
        </div>
      </div>
    </form>
  );
}

function getRandomCard({ omit = [] }: { omit?: CardTemplate[] } = {}) {
  const cards = templateIds.filter((card) => !omit.includes(card));
  return cards[Math.floor(Math.random() * cards.length)];
}
