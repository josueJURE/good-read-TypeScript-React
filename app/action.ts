"use server";

import { z } from "zod";
import { prisma } from "../lib/prisma";

const bookSchema = z.object({
  title: z.string().trim().min(1).max(50),
  author: z.string().trim().min(1),
  pageCount: z.int().positive(),
  isbn: z.string().min(10).max(13),
  description: z.string().max(8000).optional(),
  genre:  z.string().min(1).max(50), 
  publisher: z.string().min(1).max(50).optional(),
  publishedAt: z.date(),
  coverImageUrl: z.url({ protocol: /^https?$/ }).nullish(),
  language: z.string().min(1).max(50),
  createdAt: z.date(),
  updatedAt: z.date()


});

export async function submitBookInfo(
  _previousState: { message: string },
  formData: FormData
) {
  const bookSchemaValidation = bookSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
  });

  if (!bookSchemaValidation.success) {
    return { message: "Enter a title (1–50 characters) and an author." };
  }

  console.log("bookSchemaValidation.data", bookSchemaValidation.data);

  const { title, author } = bookSchemaValidation.data;

  await prisma.book.create({
    data: {
      title,
      author
    },
  });
  return { message: "Book information submitted." };
}

// const createMany = await prisma.user.createMany({
//   data: [
//     { name: "Bob", email: "bob@prisma.io" },
//     { name: "Bobo", email: "bob@prisma.io" }, // Duplicate unique key!
//     { name: "Yewande", email: "yewande@prisma.io" },
//     { name: "Angelique", email: "angelique@prisma.io" },
//   ],
//   skipDuplicates: true, // Skip 'Bobo'
// });
