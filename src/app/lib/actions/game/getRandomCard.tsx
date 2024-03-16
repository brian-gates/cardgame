import { templateIds } from "@/app/lib/cards";
import { CardTemplate } from "@prisma/client";

export function getRandomCard({ omit = [] }: { omit?: CardTemplate[] } = {}) {
  const cards = templateIds.filter((card) => !omit.includes(card));
  return cards[Math.floor(Math.random() * cards.length)];
}
