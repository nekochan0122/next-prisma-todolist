/*
  Warnings:

  - You are about to drop the column `content` on the `todo` table. All the data in the column will be lost.
  - You are about to drop the column `isDone` on the `todo` table. All the data in the column will be lost.
  - Added the required column `description` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todo` DROP COLUMN `content`,
    DROP COLUMN `isDone`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;
