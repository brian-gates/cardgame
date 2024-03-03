import { IoShieldSharp } from "react-icons/io5";
import { GiHealthNormal } from "react-icons/gi";

export function Stats({
  health,
  maxHealth,
  armor,
}: {
  health: number;
  maxHealth: number;
  armor: number;
}) {
  const percentHealth = Math.floor((health / maxHealth) * 100);

  return (
    <div className="flex flex-row gap-1">
      <div className="flex flex-col gap-1">
        <div className="text-xs flex flex-row items-center gap-1">
          <GiHealthNormal />
          <div>
            {health} / {maxHealth} ({percentHealth}%)
          </div>
        </div>

        <div className="w-36 h-4 bg-gradient-to-b to-red-400 from-red-700 rounded-md overflow-hidden flex flex-row">
          <div
            className={`bg-gradient-to-b from from-green-400 to-green-700 h-full shadow-2xl transition-transform`}
            style={{ width: `${percentHealth}%`, transition: "width 1s" }}
          ></div>
        </div>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <IoShieldSharp />
        <div>{armor}</div>
      </div>
    </div>
  );
}
