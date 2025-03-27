-- CreateTable
CREATE TABLE "UserThread" (
    "id" SERIAL NOT NULL,
    "threadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserThread_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserThread" ADD CONSTRAINT "UserThread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
