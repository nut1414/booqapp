-- DropForeignKey
ALTER TABLE `bookauthor` DROP FOREIGN KEY `BookAuthor_BookID_fkey`;

-- AddForeignKey
ALTER TABLE `bookauthor` ADD CONSTRAINT `BookAuthor_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `bookdetails`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;
