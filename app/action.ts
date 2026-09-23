"use server";

import { z } from "zod";

const bookSchema = z.object({
  title: z.string().trim().min(1).max(50),
  author: z.string().trim().min(1),
});

export async function submitBookInfo(
  _previousState: { message: string },
  formData: FormData,
) {
  const bookSchemaValidation = bookSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
  });

  if (!bookSchemaValidation.success) {
    return { message: "Enter a title (1–50 characters) and an author." };
  }

  console.log(bookSchemaValidation.data);

  return { message: "Book information submitted." };
}
