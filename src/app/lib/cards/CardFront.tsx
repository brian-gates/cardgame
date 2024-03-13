import { CardTemplate } from "@prisma/client";
import { cardComponentsById } from ".";

export function CardFront({ templateId }: { templateId: CardTemplate }) {
  return cardComponentsById[templateId];
}
