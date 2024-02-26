import prisma from "../src/app/lib/prisma";

export async function seed() {
  console.time("seed");
  const player = await prisma.player
    .create({
      data: {
        id: "brian.g.gates@gmail.com",
        health: 10,
        maxHealth: 10,
      },
    })
    .catch((e) => {
      console.error(e);
    });
  await prisma.card
    .create({
      data: {
        id: "strike",
        title: "Strike",
      },
    })
    .catch((e) => {
      console.error(e);
    });
  await prisma.card
    .create({
      data: {
        id: "defend",
        title: "Defend",
      },
    })
    .catch((e) => {
      console.error(e);
    });
  await prisma.card
    .create({
      data: {
        id: "bash",
        title: "Bash",
      },
    })
    .catch((e) => {
      console.error(e);
    });
  const slime = await prisma.enemy
    .create({
      data: {
        id: "slime",
        health: 10,
        maxHealth: 10,
      },
    })
    .catch((e) => {
      console.error(e);
    });
  if (slime && player)
    await prisma.encounter
      .create({
        data: {
          enemyId: slime.id,
          playerId: player.id,
        },
      })
      .catch((e) => {
        console.error(e);
      });
  console.timeEnd("seed");
}

seed();
