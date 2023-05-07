/*
  Warnings:

  - The primary key for the `orderbook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BookId` on the `orderbook` table. All the data in the column will be lost.
  - Added the required column `BookID` to the `orderbook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orderbook` DROP FOREIGN KEY `OrderBook_BookID_fkey`;

-- AlterTable
ALTER TABLE `orderbook` DROP PRIMARY KEY,
    DROP COLUMN `BookId`,
    ADD COLUMN `BookID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`OrderID`, `BookID`);

-- AddForeignKey
ALTER TABLE `orderbook` ADD CONSTRAINT `OrderBook_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `bookdetails`(`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;
