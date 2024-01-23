/*
  Warnings:

  - You are about to drop the `Our_Service_Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Our_Work_Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Our_Service_Image" DROP CONSTRAINT "Our_Service_Image_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Our_Work_Image" DROP CONSTRAINT "Our_Work_Image_workId_fkey";

-- AlterTable
ALTER TABLE "Our_Service" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Our_Work" ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "Our_Service_Image";

-- DropTable
DROP TABLE "Our_Work_Image";
