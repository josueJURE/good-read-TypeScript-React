-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
