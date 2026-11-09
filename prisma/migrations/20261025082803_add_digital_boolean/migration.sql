/*
  Warnings:

  - Added the required column `digital` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishedReading` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedReading` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "digital" BOOLEAN NOT NULL,
ADD COLUMN     "finishedReading" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startedReading" TIMESTAMP(3) NOT NULL;
