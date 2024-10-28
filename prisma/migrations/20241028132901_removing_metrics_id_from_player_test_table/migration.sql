/*
  Warnings:

  - You are about to drop the column `metricsId` on the `PlayerTest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlayerTest" DROP COLUMN "metricsId",
ALTER COLUMN "results" DROP NOT NULL;
