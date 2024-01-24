/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Our_Service` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Our_Work` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Our_Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Our_Work` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Our_Service" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Our_Work" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Our_Service_userId_key" ON "Our_Service"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Our_Work_userId_key" ON "Our_Work"("userId");

-- AddForeignKey
ALTER TABLE "Our_Work" ADD CONSTRAINT "Our_Work_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Our_Service" ADD CONSTRAINT "Our_Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
