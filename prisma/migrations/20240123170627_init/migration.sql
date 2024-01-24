/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Avatar` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "userRoles" AS ENUM ('ADMIN', 'EDITOR');

-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "userRoles" NOT NULL DEFAULT 'ADMIN';

-- DropTable
DROP TABLE "Avatar";

-- DropEnum
DROP TYPE "userRole";
