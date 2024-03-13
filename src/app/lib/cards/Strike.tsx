import { CardBorder } from "./CardBorder";
import { LuSwords } from "react-icons/lu";

export function Strike() {
  return <StrikeTemplate />;
}

export function StrikeTemplate() {
  return (
    <CardBorder title="Strike" image="/cards/strike.png">
      <p className="text-2xl text-center">
        1 <LuSwords className="inline" />
      </p>
    </CardBorder>
  );
}
