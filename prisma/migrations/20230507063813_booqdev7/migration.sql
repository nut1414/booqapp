-- AlterTable
ALTER TABLE `orderbook` MODIFY `PromotionID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `orderbook` ADD CONSTRAINT `OrderBook_PromotionID_fkey` FOREIGN KEY (`PromotionID`) REFERENCES `promotion`(`PromotionID`) ON DELETE SET NULL ON UPDATE CASCADE;
