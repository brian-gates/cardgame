import prisma from "../src/app/lib/prisma";

export async function seed() {
    console.time('seed')
    await prisma.card.create({
        data: {
            id: 'strike',
            title: 'Strike'
        },
    })
    debugger
    await prisma.card.create({
        data: {
            id: 'defend',
            title: 'Defend'
        }
    })
    await prisma.card.create({
        data: {
            id: 'bash',
            title: 'Bash'
        }
    })
    console.timeEnd('seed')
}

seed()