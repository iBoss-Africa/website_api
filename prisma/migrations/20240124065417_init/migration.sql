/*
  Warnings:

  - You are about to drop the column `roles` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roles",
ADD COLUMN     "role" "userRole" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "userRoles";
