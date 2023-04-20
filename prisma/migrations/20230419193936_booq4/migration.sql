/*
  Warnings:

  - A unique constraint covering the columns `[GenreName]` on the table `genre` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Genre_GenreName_key` ON `genre`(`GenreName`);
