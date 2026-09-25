/*
  Warnings:

  - Made the column `isbn` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pageCount` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `genre` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `language` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "isbn" SET NOT NULL,
ALTER COLUMN "pageCount" SET NOT NULL,
ALTER COLUMN "author" SET NOT NULL,
ALTER COLUMN "genre" SET NOT NULL,
ALTER COLUMN "language" SET NOT NULL;
