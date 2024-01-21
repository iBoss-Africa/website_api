-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "password" VARCHAR(8) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" SERIAL NOT NULL,
    "imageId" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Our_Work" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Our_Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Our_Work_Image" (
    "id" SERIAL NOT NULL,
    "imageId" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "workId" INTEGER NOT NULL,

    CONSTRAINT "Our_Work_Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Our_Service" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Our_Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Our_Service_Image" (
    "id" SERIAL NOT NULL,
    "imageId" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "workId" INTEGER NOT NULL,

    CONSTRAINT "Our_Service_Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscribers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_userId_key" ON "Avatar"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Our_Work_Image_workId_key" ON "Our_Work_Image"("workId");

-- CreateIndex
CREATE UNIQUE INDEX "Our_Service_Image_workId_key" ON "Our_Service_Image"("workId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_email_key" ON "Subscribers"("email");

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Our_Work_Image" ADD CONSTRAINT "Our_Work_Image_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Our_Work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Our_Service_Image" ADD CONSTRAINT "Our_Service_Image_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Our_Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
