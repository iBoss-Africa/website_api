/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('ADMIN', 'EDITOR');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "userRole" NOT NULL DEFAULT 'ADMIN';

-- DropEnum
DROP TYPE "Role";
