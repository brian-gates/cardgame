import { CardTemplate } from "@prisma/client";
import { cardTemplatesById } from ".";

export function CardFront({ templateId }: { templateId: CardTemplate }) {
  return cardTemplatesById[templateId];
}
