import { Stats } from "./Stats";
import Image from "next/image";

export function Avatar({
  image,
  title,
  health,
  maxHealth,
  armor,
}: {
  image?: string;
  title: string;
  health: number;
  maxHealth: number;
  armor: number;
}) {
  return (
    <div className="flex flex-row gap-3">
      {image && (
        <div className="rounded-full overflow-hidden w-[100px] h-[100px] shadow-lg">
          <Image src={image} width={100} height={100} alt={title.charAt(0)} />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h2>{title}</h2>
        <Stats health={health} maxHealth={maxHealth} armor={armor} />
      </div>
    </div>
  );
}
