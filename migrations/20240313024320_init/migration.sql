-- CreateEnum
CREATE TYPE "CardLocation" AS ENUM ('hand', 'draw', 'discard', 'exhaust');

-- CreateEnum
CREATE TYPE "EnemyId" AS ENUM ('slime');

-- CreateEnum
CREATE TYPE "CardId" AS ENUM ('bash', 'strike', 'defend');

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "templateId" "CardId" NOT NULL,
    "ownerId" TEXT,
    "location" "CardLocation" NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "health" INTEGER NOT NULL DEFAULT 10,
    "maxHealth" INTEGER NOT NULL DEFAULT 10,
    "armor" INTEGER NOT NULL DEFAULT 0,
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Encounter" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,

    CONSTRAINT "Encounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enemy" (
    "id" TEXT NOT NULL,
    "templateId" "EnemyId" NOT NULL,
    "health" INTEGER NOT NULL DEFAULT 10,
    "armor" INTEGER NOT NULL DEFAULT 0,
    "encounterId" TEXT,

    CONSTRAINT "Enemy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_id_key" ON "Card"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");

-- CreateIndex
CREATE INDEX "Player_email_idx" ON "Player"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Encounter_id_key" ON "Encounter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Encounter_playerId_key" ON "Encounter"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Enemy_id_key" ON "Enemy"("id");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encounter" ADD CONSTRAINT "Encounter_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enemy" ADD CONSTRAINT "Enemy_encounterId_fkey" FOREIGN KEY ("encounterId") REFERENCES "Encounter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
