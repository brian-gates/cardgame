import { damagePlayer } from "../actions/game/damagePlayer";
import { EnemyDetails } from ".";

export const slime: EnemyDetails = {
  name: "Slime",
  description: "A slime.",
  maxHealth: 10,
  image: "/enemies/slime.png",
  actions: [() => damagePlayer(1)],
};
