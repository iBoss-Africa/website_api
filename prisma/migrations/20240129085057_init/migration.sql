/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Subscribers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_id_key" ON "Subscribers"("id");
