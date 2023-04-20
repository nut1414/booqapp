/*
  Warnings:

  - A unique constraint covering the columns `[AuthorName]` on the table `author` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Author_AuthorName_key` ON `author`(`AuthorName`);
