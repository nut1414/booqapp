/*
  Warnings:

  - The primary key for the `bookgenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BookID` on the `genre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bookgenre` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`BookID`, `GenreID`);

-- AlterTable
ALTER TABLE `genre` DROP PRIMARY KEY,
    DROP COLUMN `BookID`,
    ADD PRIMARY KEY (`GenreID`);
