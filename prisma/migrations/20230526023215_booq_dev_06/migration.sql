-- AlterTable
ALTER TABLE `bookdetails` ADD COLUMN `Available` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `BookCover` LONGBLOB NULL;
