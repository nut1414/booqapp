/*
  Warnings:

  - A unique constraint covering the columns `[PublisherName]` on the table `publisher` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Publisher_PublisherName_key` ON `publisher`(`PublisherName`);
