import { Card } from "@prisma/client";
import { ReactNode } from "react";
import { playCard } from "./actions/game/playCard";

export async function PlayableCard({
  card,
  children,
}: {
  card: Card;
  children: ReactNode;
}) {
  function submit(formData: FormData) {
    const cardId = formData.get("cardId");
    if (!cardId || typeof cardId !== "string") return;
    playCard(cardId);
  }
  return (
    <form action={submit}>
      <button type="submit" name="cardId" value={card.id}>
        {children}
      </button>
    </form>
  );
}
