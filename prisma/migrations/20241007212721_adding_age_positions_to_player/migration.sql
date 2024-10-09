/*
  Warnings:

  - Added the required column `age` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "age" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "positions" TEXT[];
