/*
  Warnings:

  - Added the required column `Name` to the `shippingaddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shippingaddress` ADD COLUMN `Name` VARCHAR(191) NOT NULL;
