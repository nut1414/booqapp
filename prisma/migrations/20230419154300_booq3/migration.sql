-- DropForeignKey
ALTER TABLE `shippingaddress` DROP FOREIGN KEY `ShippingAddress_UserID_fkey`;

-- AddForeignKey
ALTER TABLE `shippingaddress` ADD CONSTRAINT `ShippingAddress_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
