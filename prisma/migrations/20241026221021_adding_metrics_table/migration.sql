/*
  Warnings:

  - Added the required column `metricsId` to the `PlayerTest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Foot" AS ENUM ('LEFT', 'RIGHT', 'BOTH');

-- AlterTable
ALTER TABLE "PlayerTest" ADD COLUMN     "metricsId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "requiredMetrics" TEXT[];

-- CreateTable
CREATE TABLE "TestMetrics" (
    "id" TEXT NOT NULL,
    "playerTestId" TEXT NOT NULL,
    "accuracy" DOUBLE PRECISION,
    "bodyPosition" DOUBLE PRECISION,
    "totalTime" DOUBLE PRECISION,
    "Attempts" INTEGER,
    "successes" INTEGER,
    "power" DOUBLE PRECISION,
    "conesTouched" INTEGER,
    "foot" "Foot",
    "errors" INTEGER,
    "distance" DOUBLE PRECISION,
    "ballControll" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TestMetrics_playerTestId_idx" ON "TestMetrics"("playerTestId");

-- AddForeignKey
ALTER TABLE "TestMetrics" ADD CONSTRAINT "TestMetrics_playerTestId_fkey" FOREIGN KEY ("playerTestId") REFERENCES "PlayerTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
