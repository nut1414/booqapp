/*
  Warnings:

  - Added the required column `Recieved` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `Recieved` BOOLEAN NOT NULL,
    MODIFY `TrackingNo` VARCHAR(191) NULL,
    MODIFY `TransactionTime` DATE NULL,
    MODIFY `TransactionApprove` BOOLEAN NULL,
    MODIFY `Proofoftransfer` VARCHAR(191) NULL;
