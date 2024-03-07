import { CardBorder } from "./CardBorder";
import { LuSwords } from "react-icons/lu";

export function Bash() {
  return <BashTemplate />;
}

export function BashTemplate() {
  return (
    <CardBorder title="Bash" image={"/cards/bash.png"}>
      <p className="text-2xl text-center">
        d3 <LuSwords className="inline" />
      </p>
    </CardBorder>
  );
}
