import { Stats } from "./Stats";
import Image from "next/image";
import { cn } from "./cn";

export function Avatar({
  image,
  name,
  health,
  maxHealth,
  armor,
  isSelected,
}: {
  image?: string;
  name: string;
  health: number;
  maxHealth: number;
  armor: number;
  isSelected: boolean;
}) {
  return (
    <div
      className={cn(`flex flex-row gap-3 p-3 rounded-lg`, {
        "border-4 border-blue-500": isSelected,
      })}
    >
      {image && (
        <div className="rounded-full overflow-hidden w-[100px] h-[100px] shadow-lg">
          <Image src={image} width={100} height={100} alt={name} />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h2>{name}</h2>
        <Stats health={health} maxHealth={maxHealth} armor={armor} />
      </div>
    </div>
  );
}
