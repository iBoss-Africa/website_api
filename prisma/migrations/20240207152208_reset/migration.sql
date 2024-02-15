/*
  Warnings:

  - You are about to drop the `Our_Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Our_Service_Quantum` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Our_Work` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Our_Work_Quantum` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Website" AS ENUM ('IBOSS', 'QUANTUM');

-- DropTable
DROP TABLE "Our_Service";

-- DropTable
DROP TABLE "Our_Service_Quantum";

-- DropTable
DROP TABLE "Our_Work";

-- DropTable
DROP TABLE "Our_Work_Quantum";

-- CreateTable
CREATE TABLE "OurWork" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "userId" INTEGER,
    "website" "Website" NOT NULL,

    CONSTRAINT "OurWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OurService" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "userId" INTEGER NOT NULL,
    "website" "Website" NOT NULL,

    CONSTRAINT "OurService_pkey" PRIMARY KEY ("id")
);
