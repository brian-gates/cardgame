import { enemyDetailsById } from "./enemies";
import { getEnemy } from "./enemies/getEnemy";
import { Avatar } from "./Avatar";

export async function EnemyAvatar() {
  const enemy = await getEnemy();
  if (!enemy) return null;

  const { title, maxHealth, image } = enemyDetailsById[enemy.enemyId];
  const { health, armor } = enemy;

  return (
    <Avatar
      {...{
        image,
        title,
        health,
        maxHealth,
        armor,
      }}
    />
  );
}
