-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_ShippingAddressID_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_UserID_fkey`;

-- DropForeignKey
ALTER TABLE `publisher` DROP FOREIGN KEY `Publisher_PublisherID_fkey`;

-- DropForeignKey
ALTER TABLE `publisheraddress` DROP FOREIGN KEY `PublisherAddress_PublisherID_fkey`;

-- DropForeignKey
ALTER TABLE `publisherbank` DROP FOREIGN KEY `PublisherBank_BankID_fkey`;

-- DropForeignKey
ALTER TABLE `publisherbank` DROP FOREIGN KEY `PublisherBank_PublisherID_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `ShippingAddressID` INTEGER NULL;

-- AlterTable
ALTER TABLE `publisheraddress` MODIFY `PaddressID` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `publisherbank` MODIFY `BankID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `Order_ShippingAddressID_fkey` FOREIGN KEY (`ShippingAddressID`) REFERENCES `shippingaddress`(`ShippingAddressID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `Order_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publisher` ADD CONSTRAINT `Publisher_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `user`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publisheraddress` ADD CONSTRAINT `PublisherAddress_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `publisher`(`PublisherID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publisherbank` ADD CONSTRAINT `PublisherBank_BankID_fkey` FOREIGN KEY (`BankID`) REFERENCES `bank`(`BankID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publisherbank` ADD CONSTRAINT `PublisherBank_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `publisher`(`PublisherID`) ON DELETE CASCADE ON UPDATE CASCADE;
