-- CreateTable
CREATE TABLE "CoachOnCenter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,

    CONSTRAINT "CoachOnCenter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoachOnCenter_userId_key" ON "CoachOnCenter"("userId");

-- AddForeignKey
ALTER TABLE "CoachOnCenter" ADD CONSTRAINT "CoachOnCenter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachOnCenter" ADD CONSTRAINT "CoachOnCenter_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
