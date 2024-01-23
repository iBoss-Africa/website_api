/*
  Warnings:

  - You are about to drop the column `workId` on the `Our_Service_Image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serviceId]` on the table `Our_Service_Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceId` to the `Our_Service_Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Our_Service_Image" DROP CONSTRAINT "Our_Service_Image_workId_fkey";

-- DropIndex
DROP INDEX "Our_Service_Image_workId_key";

-- AlterTable
ALTER TABLE "Our_Service_Image" DROP COLUMN "workId",
ADD COLUMN     "serviceId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Our_Service_Image_serviceId_key" ON "Our_Service_Image"("serviceId");

-- AddForeignKey
ALTER TABLE "Our_Service_Image" ADD CONSTRAINT "Our_Service_Image_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Our_Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
