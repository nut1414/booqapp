-- DropForeignKey
ALTER TABLE `bookgenre` DROP FOREIGN KEY `BookGenre_BookID_fkey`;

-- DropForeignKey
ALTER TABLE `bookgenre` DROP FOREIGN KEY `BookGenre_GenreID_fkey`;

-- AlterTable
ALTER TABLE `genre` MODIFY `GenreID` INTEGER NOT NULL AUTO_INCREMENT;

-- AddForeignKey
ALTER TABLE `bookgenre` ADD CONSTRAINT `BookGenre_BookID_fkey` FOREIGN KEY (`BookID`) REFERENCES `bookdetails`(`BookID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookgenre` ADD CONSTRAINT `BookGenre_GenreID_fkey` FOREIGN KEY (`GenreID`) REFERENCES `genre`(`GenreID`) ON DELETE CASCADE ON UPDATE CASCADE;
