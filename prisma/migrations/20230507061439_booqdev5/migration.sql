/*
  Warnings:

  - You are about to drop the column `Recieved` on the `order` table. All the data in the column will be lost.
  - Added the required column `Received` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `Recieved`,
    ADD COLUMN `Received` BOOLEAN NOT NULL;
