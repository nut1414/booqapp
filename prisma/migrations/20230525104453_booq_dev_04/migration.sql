/*
  Warnings:

  - You are about to drop the column `Main` on the `publisherbank` table. All the data in the column will be lost.
  - Added the required column `Mainbank` to the `publisher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `publisher` ADD COLUMN `Mainbank` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `publisherbank` DROP COLUMN `Main`;
