-- CreateTable
CREATE TABLE `author` (
    `AuthorID` INTEGER NOT NULL AUTO_INCREMENT,
    `AuthorName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Author_AuthorName_key`(`AuthorName`),
    PRIMARY KEY (`AuthorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bank` (
    `BankID` INTEGER NOT NULL,
    `BankName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`BankID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookauthor` (
    `BookID` INTEGER NOT NULL,
    `AuthorID` INTEGER NOT NULL,

    INDEX `BookAuthor_AuthorID_fkey`(`AuthorID`),
    PRIMARY KEY (`BookID`, `AuthorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookdetails` (
    `BookID` INTEGER NOT NULL AUTO_INCREMENT,
    `BookName` VARCHAR(191) NOT NULL,
    `Price` INTEGER NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `FormatTypeID` INTEGER NOT NULL,
    `Weight` DOUBLE NOT NULL,
    `ReleaseDate` DATE NOT NULL,
    `PublisherID` INTEGER NOT NULL,

    INDEX `BookDetails_FormatTypeID_fkey`(`FormatTypeID`),
    PRIMARY KEY (`BookID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookgenre` (
    `BookID` INTEGER NOT NULL,
    `GenreID` INTEGER NOT NULL,

    PRIMARY KEY (`BookID`, `GenreID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `formattype` (
    `FormatTypeID` INTEGER NOT NULL AUTO_INCREMENT,
    `TypeName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`FormatTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genre` (
    `GenreID` INTEGER NOT NULL AUTO_INCREMENT,
    `GenreName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Genre_GenreID_key`(`GenreID`),
    UNIQUE INDEX `Genre_GenreName_key`(`GenreName`),
    PRIMARY KEY (`GenreID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `iteminbasket` (
    `ItemID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `BookID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,

    INDEX `ItemInBasket_UserID_fkey`(`UserID`),
    PRIMARY KEY (`ItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `OrderID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `OrderDate` DATE NOT NULL,
    `ShippingAddressID` INTEGER NULL,
    `PublisherID` INTEGER NOT NULL,
    `TrackingNo` VARCHAR(191) NULL,
    `TransactionTime` DATE NULL,
    `TotalPrice` DOUBLE NOT NULL,
    `TotalShipping` DOUBLE NOT NULL,
    `Proofoftransfer` VARCHAR(191) NULL,
    `TransactionApprove` BOOLEAN NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `ZipCode` VARCHAR(191) NOT NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,
    `Received` BOOLEAN NOT NULL,

    INDEX `Order_PublisherID_fkey`(`PublisherID`),
    INDEX `Order_ShippingAddressID_fkey`(`ShippingAddressID`),
    INDEX `Order_UserID_fkey`(`UserID`),
    PRIMARY KEY (`OrderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderbook` (
    `OrderBookID` INTEGER NOT NULL AUTO_INCREMENT,
    `OrderID` INTEGER NOT NULL,
    `BookID` INTEGER NULL,
    `PromotionID` INTEGER NULL,
    `Quantity` INTEGER NOT NULL,

    PRIMARY KEY (`OrderBookID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotion` (
    `PromotionID` INTEGER NOT NULL AUTO_INCREMENT,
    `DiscountPercent` DOUBLE NOT NULL,
    `PromotionDetail` VARCHAR(191) NOT NULL,
    `Verified` BOOLEAN NOT NULL DEFAULT false,
    `StartDate` DATE NOT NULL,
    `EndDate` DATE NOT NULL,
    `PublisherID` INTEGER NOT NULL,

    INDEX `Promotion_PublisherID_fkey`(`PublisherID`),
    PRIMARY KEY (`PromotionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotionbook` (
    `PromotionID` INTEGER NOT NULL,
    `BookID` INTEGER NOT NULL,

    INDEX `PromotionBook_BookID_fkey`(`BookID`),
    PRIMARY KEY (`PromotionID`, `BookID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publisher` (
    `PublisherID` INTEGER NOT NULL AUTO_INCREMENT,
    `PublisherName` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,
    `VerifyStatusID` INTEGER NOT NULL,
    `VerificationDocument` LONGBLOB NULL,

    INDEX `Publisher_VerifyStatusID_fkey`(`VerifyStatusID`),
    PRIMARY KEY (`PublisherID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publisheraddress` (
    `PublisherID` INTEGER NOT NULL,
    `PaddressID` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `Zipcode` VARCHAR(191) NOT NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,

    INDEX `PublisherAddress_PublisherID_fkey`(`PublisherID`),
    PRIMARY KEY (`PaddressID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publisherbank` (
    `PublisherID` INTEGER NOT NULL,
    `PBankID` INTEGER NOT NULL AUTO_INCREMENT,
    `BankName` VARCHAR(191) NOT NULL,
    `AccountNumber` VARCHAR(191) NOT NULL,
    `Main` BOOLEAN NOT NULL,
    `BankID` INTEGER NULL,

    INDEX `PublisherBank_BankID_fkey`(`BankID`),
    INDEX `PublisherBank_PublisherID_fkey`(`PublisherID`),
    PRIMARY KEY (`PBankID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `BookID` INTEGER NOT NULL,
    `UserID` INTEGER NOT NULL,
    `OrderID` INTEGER NOT NULL,
    `Rate` INTEGER NOT NULL,
    `Comment` VARCHAR(191) NOT NULL,
    `ReviewDate` DATE NOT NULL,

    INDEX `Review_OrderID_fkey`(`OrderID`),
    INDEX `Review_UserID_fkey`(`UserID`),
    PRIMARY KEY (`BookID`, `UserID`, `OrderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `RoleID` INTEGER NOT NULL,
    `RoleName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`RoleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shippingaddress` (
    `ShippingAddressID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `ZipCode` VARCHAR(191) NOT NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,

    INDEX `ShippingAddress_UserID_fkey`(`UserID`),
    PRIMARY KEY (`ShippingAddressID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserName` VARCHAR(191) NOT NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `RoleID` INTEGER NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `JoinDate` DATE NOT NULL,

    UNIQUE INDEX `User_UserName_key`(`UserName`),
    UNIQUE INDEX `User_PhoneNumber_key`(`PhoneNumber`),
    INDEX `User_RoleID_fkey`(`RoleID`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verificationstatus` (
    `VerifyStatusID` INTEGER NOT NULL,
    `Name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`VerifyStatusID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookauthor` ADD CONSTRAINT `BookAuthor_AuthorID_fkey` FOREIGN KEY (`AuthorID`) REFERENCES `author`(`AuthorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookauthor` ADD CONSTRAINT `BookAuthor_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `bookdetails`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookdetails` ADD CONSTRAINT `BookDetails_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `publisher`(`PublisherID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookdetails` ADD CONSTRAINT `BookDetails_FormatTypeID_fkey` FOREIGN KEY (`FormatTypeID`) REFERENCES `formattype`(`FormatTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookgenre` ADD CONSTRAINT `BookGenre_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `bookdetails`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookgenre` ADD CONSTRAINT `BookGenre_GenreID_fkey` FOREIGN KEY (`GenreID`) REFERENCES `genre`(`GenreID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `iteminbasket` ADD CONSTRAINT `ItemInBasket_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `bookdetails`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `iteminbasket` ADD CONSTRAINT `ItemInBasket_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `Order_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `publisher`(`PublisherID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `Order_ShippingAddressID_fkey` FOREIGN KEY (`ShippingAddressID`) REFERENCES `shippingaddress`(`ShippingAddressID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `Order_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderbook` ADD CONSTRAINT `OrderBook_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `bookdetails`(`BookID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderbook` ADD CONSTRAINT `OrderBook_OrderID_fkey` FOREIGN KEY (`OrderID`) REFERENCES `order`(`OrderID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderbook` ADD CONSTRAINT `OrderBook_PromotionID_fkey` FOREIGN KEY (`PromotionID`) REFERENCES `promotion`(`PromotionID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotion` ADD CONSTRAINT `Promotion_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `publisher`(`PublisherID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotionbook` ADD CONSTRAINT `PromotionBook_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `bookdetails`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotionbook` ADD CONSTRAINT `PromotionBook_PromotionID_fkey` FOREIGN KEY (`PromotionID`) REFERENCES `promotion`(`PromotionID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publisher` ADD CONSTRAINT `Publisher_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `user`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publisher` ADD CONSTRAINT `Publisher_VerifyStatusID_fkey` FOREIGN KEY (`VerifyStatusID`) REFERENCES `verificationstatus`(`VerifyStatusID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publisheraddress` ADD CONSTRAINT `PublisherAddress_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `publisher`(`PublisherID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publisherbank` ADD CONSTRAINT `PublisherBank_BankID_fkey` FOREIGN KEY (`BankID`) REFERENCES `bank`(`BankID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `publisherbank` ADD CONSTRAINT `PublisherBank_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `publisher`(`PublisherID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `Review_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `bookdetails`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `Review_OrderID_fkey` FOREIGN KEY (`OrderID`) REFERENCES `order`(`OrderID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `Review_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shippingaddress` ADD CONSTRAINT `ShippingAddress_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `user`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_RoleID_fkey` FOREIGN KEY (`RoleID`) REFERENCES `role`(`RoleID`) ON DELETE RESTRICT ON UPDATE CASCADE;
