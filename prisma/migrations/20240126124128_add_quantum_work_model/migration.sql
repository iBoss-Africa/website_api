/*
  Warnings:

  - Made the column `userId` on table `Our_Work` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Our_Work" ALTER COLUMN "userId" SET NOT NULL;
