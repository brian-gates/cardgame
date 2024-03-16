import { CardBorder } from "./CardBorder";
import { IoShieldSharp } from "react-icons/io5";

export function Defend() {
  return <DefendTemplate />;
}

export function DefendTemplate() {
  return (
    <CardBorder title="Defend" image="/cards/defend.png">
      <p className="text-2xl text-center">
        1 <IoShieldSharp className="inline" />
      </p>
    </CardBorder>
  );
}
