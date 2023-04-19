/*
  Warnings:

  - You are about to drop the column `Postcode` on the `publisheraddress` table. All the data in the column will be lost.
  - You are about to drop the column `FirstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `user` table. All the data in the column will be lost.
  - Added the required column `Proofoftransfer` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Zipcode` to the `publisheraddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `Proofoftransfer` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `publisheraddress` DROP COLUMN `Postcode`,
    ADD COLUMN `Zipcode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `FirstName`,
    DROP COLUMN `LastName`,
    ADD COLUMN `Name` VARCHAR(191) NOT NULL;
