/*
  Warnings:

  - You are about to drop the column `authorId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `currentPage` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `finishedAt` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `format` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_authorId_fkey";

-- DropIndex
DROP INDEX "Book_authorId_idx";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "authorId",
DROP COLUMN "currentPage",
DROP COLUMN "finishedAt",
DROP COLUMN "format",
DROP COLUMN "notes",
DROP COLUMN "price",
DROP COLUMN "rating",
DROP COLUMN "startedAt",
DROP COLUMN "status",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "publisher" TEXT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "Author";

-- CreateIndex
CREATE INDEX "Book_author_idx" ON "Book"("author");
