/*
  Warnings:

  - You are about to alter the column `Proofoftransfer` on the `order` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `Proofoftransfer` VARCHAR(191) NULL;
