-- DropForeignKey
ALTER TABLE "PlayerTest" DROP CONSTRAINT "PlayerTest_sessionId_fkey";

-- AddForeignKey
ALTER TABLE "PlayerTest" ADD CONSTRAINT "PlayerTest_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TestSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
