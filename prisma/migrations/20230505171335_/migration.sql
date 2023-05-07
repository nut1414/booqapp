-- AddForeignKey
ALTER TABLE `bookdetails` ADD CONSTRAINT `BookDetails_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `publisher`(`PublisherID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `iteminbasket` ADD CONSTRAINT `ItemInBasket_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `bookdetails`(`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderbook` ADD CONSTRAINT `OrderBook_BookID_fkey` FOREIGN KEY (`BookId`) REFERENCES `bookdetails`(`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;
