"use server";

import { z } from "zod";
import { prisma } from "../lib/prisma";

const bookSchema = z.object({
  title: z.string().trim().min(1).max(50),
  author: z.string().trim().min(1),
  pageCount: z.int().positive(),
  isbn: z.string().min(10).max(13),
  description: z.string().max(8000).nullish(),
  genre: z.string().min(1).max(50),
  publisher: z.string().min(1).max(50).nullish(),
  publishedAt: z.date().nullish(),
  coverImageUrl: z.url({ protocol: /^https?$/ }).nullish(),
  language: z.string().min(1).max(50),
});

export async function submitBookInfo(
  _previousState: { message: string },
  formData: FormData,
   
) {

  const pageCounter = Number(formData.get("pageCount"))

  const publishedAtInput = formData.get("publishedAt");

  const date =
    typeof publishedAtInput === "string" && publishedAtInput.trim() !== ""
      ? new Date(publishedAtInput)
      : null;
try {
  const bookSchemaValidation = bookSchema.parse({
    title: formData.get("title"),
    author: formData.get("author"),
    pageCount: pageCounter,
    isbn: formData.get("isbn"),
    description: formData.get("description"),
    genre: formData.get("genre"),
    publisher: formData.get("publisher"),
    publishedAt: date,
    coverImageUrl: formData.get("coverImageUrl"),
    language: formData.get("language"),
  });


  
    const {
      title,
      author,
      pageCount,
      isbn,
      description,
      genre,
      publisher,
      publishedAt,
      coverImageUrl,
      language,
    } = bookSchemaValidation;
  
  
  
    await prisma.book.create({
      data: {
        title,
        author,
        pageCount,
        isbn,
        description,
        genre,
        publisher,
        publishedAt,
        coverImageUrl,
        language,
  
        // pageCount, isbn, genre, language
      },
    });
    return { message: "Book information submitted." };

} catch (err) {
  if (err instanceof z.ZodError) {
    return {message: err.issues[0].message ?? "Invalid book"}
  }
}

  
return { message: "Could not save the book. Please try again." };
  


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
