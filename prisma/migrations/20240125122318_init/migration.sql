-- DropForeignKey
-- ALTER TABLE "Our_Service" DROP CONSTRAINT "Our_Service_userId_fkey";

-- DropForeignKey
-- ALTER TABLE "Our_Work" DROP CONSTRAINT "Our_Work_userId_fkey";

-- DropIndex
-- DROP INDEX "Our_Work_userId_key";

-- CreateTable
CREATE TABLE "Our_Work_Quantum" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Our_Work_Quantum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Our_Service_Quantum" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Our_Service_Quantum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscribers_Quantum" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_Quantum_email_key" ON "Subscribers_Quantum"("email");
