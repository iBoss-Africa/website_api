-- DropForeignKey
ALTER TABLE "Our_Service" DROP CONSTRAINT "Our_Service_userId_fkey";

-- DropForeignKey
ALTER TABLE "Our_Work" DROP CONSTRAINT "Our_Work_userId_fkey";

-- DropIndex
DROP INDEX "Our_Work_userId_key";

-- AlterTable
ALTER TABLE "Our_Work" ALTER COLUMN "userId" DROP NOT NULL;
