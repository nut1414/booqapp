/*
  Warnings:

  - Made the column `TransactionApprove` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `orderbook` DROP FOREIGN KEY `OrderBook_OrderID_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `TransactionApprove` BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE `orderbook` ADD CONSTRAINT `OrderBook_OrderID_fkey` FOREIGN KEY (`OrderID`) REFERENCES `order`(`OrderID`) ON DELETE CASCADE ON UPDATE CASCADE;
