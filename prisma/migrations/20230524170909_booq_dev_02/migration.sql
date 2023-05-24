/*
  Warnings:

  - You are about to drop the column `Zipcode` on the `publisheraddress` table. All the data in the column will be lost.
  - Added the required column `ZipCode` to the `publisheraddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `publisheraddress` DROP COLUMN `Zipcode`,
    ADD COLUMN `ZipCode` VARCHAR(191) NOT NULL;
