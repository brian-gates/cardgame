import { leaveEncounter } from "@/app/_lib/actions/game/leaveEncounter";
import { isCardTemplate } from "@/app/_lib/cards";
import { CardFront } from "@/app/_lib/cards/CardFront";
import { addCard } from "@/app/_lib/actions/game/addCard";
import { getRandomCard } from "@/app/_lib/actions/game/getRandomCard";

export async function CardChoice() {
  const card1 = getRandomCard();
  const card2 = getRandomCard({ omit: [card1] });
  const card3 = getRandomCard({ omit: [card1, card2] });

  const cardIds = [card1, card2, card3];

  async function pickCard(formData: FormData) {
    "use server";
    if (formData.get("leave") === "true") {
      await leaveEncounter();
      return;
    }
    const templateId = formData.get("templateId");
    if (typeof templateId !== "string") return;
    if (!isCardTemplate(templateId)) return;
    await addCard({ templateId, location: "draw" });
    await leaveEncounter();
  }

  return (
    <div className="position absolute h-full w-full top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-40 gap-5">
      <form
        action={pickCard}
        className="flex flex-col gap-10 items-center rounded-lg p-5"
      >
        <h1 className="text-4xl font-bold">Victory!</h1>
        <h2 className="text-xl">Choose a card</h2>
        <div className="flex flex-row gap-5">
          {cardIds.map((templateId) => {
            return (
              <button
                type="submit"
                name="templateId"
                value={templateId}
                key={templateId}
              >
                <CardFront templateId={templateId} />
              </button>
            );
          })}
        </div>
        <button
          type="submit"
          name="leave"
          value="true"
          className="p-2 rounded-lg bg-slate-700"
        >
          Skip
        </button>
      </form>
    </div>
  );
}
