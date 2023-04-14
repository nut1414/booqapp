-- CreateTable
CREATE TABLE `Role` (
    `RoleID` INTEGER NOT NULL,
    `RoleName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`RoleID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserName` VARCHAR(191) NOT NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `RoleID` INTEGER NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `FirstName` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `JoinDate` DATE NOT NULL,

    UNIQUE INDEX `User_UserName_key`(`UserName`),
    UNIQUE INDEX `User_PhoneNumber_key`(`PhoneNumber`),
    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShippingAddress` (
    `ShippingAddressID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `ZipCode` VARCHAR(191) NOT NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ShippingAddressID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemInBasket` (
    `ItemID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `BookID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `TimeStamp` DATE NOT NULL,

    PRIMARY KEY (`ItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookDetails` (
    `BookID` INTEGER NOT NULL AUTO_INCREMENT,
    `BookName` VARCHAR(191) NOT NULL,
    `Price` INTEGER NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `FormatTypeID` INTEGER NOT NULL,
    `Weight` DOUBLE NOT NULL,
    `ReleaseDate` DATE NOT NULL,
    `PublisherID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`BookID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormatType` (
    `FormatTypeID` INTEGER NOT NULL AUTO_INCREMENT,
    `TypeName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`FormatTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `BookID` INTEGER NOT NULL,
    `GenreID` INTEGER NOT NULL,
    `GenreName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Genre_GenreID_key`(`GenreID`),
    PRIMARY KEY (`BookID`, `GenreID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookGenre` (
    `BookID` INTEGER NOT NULL,
    `GenreID` INTEGER NOT NULL,

    PRIMARY KEY (`BookID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookAuthor` (
    `BookID` INTEGER NOT NULL,
    `AuthorID` INTEGER NOT NULL,

    PRIMARY KEY (`BookID`, `AuthorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Author` (
    `AuthorID` INTEGER NOT NULL AUTO_INCREMENT,
    `AuthorName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`AuthorID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `BookID` INTEGER NOT NULL,
    `UserID` INTEGER NOT NULL,
    `OrderID` INTEGER NOT NULL,
    `Rate` INTEGER NOT NULL,
    `Comment` VARCHAR(191) NOT NULL,
    `ReviewDate` DATE NOT NULL,

    PRIMARY KEY (`BookID`, `UserID`, `OrderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `OrderID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `OrderDate` DATE NOT NULL,
    `ShippingAddressID` INTEGER NOT NULL,
    `PublisherID` INTEGER NOT NULL,
    `TrackingNo` VARCHAR(191) NOT NULL,
    `TransactionTime` DATE NOT NULL,
    `TransactionApprove` BOOLEAN NOT NULL,

    PRIMARY KEY (`OrderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderBook` (
    `OrderID` INTEGER NOT NULL,
    `BookId` INTEGER NOT NULL,
    `PromotionID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,

    PRIMARY KEY (`OrderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PromotionBook` (
    `PromotionID` INTEGER NOT NULL,
    `BookID` INTEGER NOT NULL,

    PRIMARY KEY (`PromotionID`, `BookID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promotion` (
    `PromotionID` INTEGER NOT NULL AUTO_INCREMENT,
    `DiscountPercent` DOUBLE NOT NULL,
    `PromotionDetail` VARCHAR(191) NOT NULL,
    `StartDate` DATE NOT NULL,
    `EndDate` DATE NOT NULL,
    `PublisherID` INTEGER NOT NULL,

    PRIMARY KEY (`PromotionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publisher` (
    `PublisherID` INTEGER NOT NULL AUTO_INCREMENT,
    `PublisherName` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,
    `VerifyStatusID` INTEGER NOT NULL,

    PRIMARY KEY (`PublisherID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationStatus` (
    `VerifyStatusID` INTEGER NOT NULL,
    `Name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`VerifyStatusID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PublisherAddress` (
    `PublisherID` INTEGER NOT NULL,
    `PaddressID` INTEGER NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `Postcode` VARCHAR(191) NOT NULL,
    `PhoneNumber` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`PaddressID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PublisherBank` (
    `PublisherID` INTEGER NOT NULL,
    `PBankID` INTEGER NOT NULL,
    `BankName` VARCHAR(191) NOT NULL,
    `AccountNumber` VARCHAR(191) NOT NULL,
    `BankID` INTEGER NOT NULL,

    PRIMARY KEY (`PBankID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bank` (
    `BankID` INTEGER NOT NULL,
    `BankName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`BankID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_RoleID_fkey` FOREIGN KEY (`RoleID`) REFERENCES `Role`(`RoleID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShippingAddress` ADD CONSTRAINT `ShippingAddress_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemInBasket` ADD CONSTRAINT `ItemInBasket_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookDetails` ADD CONSTRAINT `BookDetails_FormatTypeID_fkey` FOREIGN KEY (`FormatTypeID`) REFERENCES `FormatType`(`FormatTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookGenre` ADD CONSTRAINT `BookGenre_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `BookDetails`(`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookGenre` ADD CONSTRAINT `BookGenre_GenreID_fkey` FOREIGN KEY (`GenreID`) REFERENCES `Genre`(`GenreID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookAuthor` ADD CONSTRAINT `BookAuthor_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `BookDetails`(`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookAuthor` ADD CONSTRAINT `BookAuthor_AuthorID_fkey` FOREIGN KEY (`AuthorID`) REFERENCES `Author`(`AuthorID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `BookDetails`(`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_OrderID_fkey` FOREIGN KEY (`OrderID`) REFERENCES `Order`(`OrderID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_ShippingAddressID_fkey` FOREIGN KEY (`ShippingAddressID`) REFERENCES `ShippingAddress`(`ShippingAddressID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `Publisher`(`PublisherID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderBook` ADD CONSTRAINT `OrderBook_OrderID_fkey` FOREIGN KEY (`OrderID`) REFERENCES `Order`(`OrderID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromotionBook` ADD CONSTRAINT `PromotionBook_PromotionID_fkey` FOREIGN KEY (`PromotionID`) REFERENCES `Promotion`(`PromotionID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromotionBook` ADD CONSTRAINT `PromotionBook_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `BookDetails`(`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promotion` ADD CONSTRAINT `Promotion_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `Publisher`(`PublisherID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publisher` ADD CONSTRAINT `Publisher_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publisher` ADD CONSTRAINT `Publisher_VerifyStatusID_fkey` FOREIGN KEY (`VerifyStatusID`) REFERENCES `VerificationStatus`(`VerifyStatusID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PublisherAddress` ADD CONSTRAINT `PublisherAddress_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `Publisher`(`PublisherID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PublisherBank` ADD CONSTRAINT `PublisherBank_PublisherID_fkey` FOREIGN KEY (`PublisherID`) REFERENCES `Publisher`(`PublisherID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PublisherBank` ADD CONSTRAINT `PublisherBank_BankID_fkey` FOREIGN KEY (`BankID`) REFERENCES `Bank`(`BankID`) ON DELETE RESTRICT ON UPDATE CASCADE;
