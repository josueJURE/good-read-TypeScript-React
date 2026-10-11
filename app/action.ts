"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { bookSchema } from "./zod-schemas";

export async function submitBookInfo(
  _previousState: { message: string },
  formData: FormData
) {
  const pageCounter = Number(formData.get("pageCount"));

  const publishedAtInput = formData.get("publishedAt");

  const readingStart = formData.get("StartedReading");
  const readingEnd = formData.get("FinishedReading");

  console.log("readingStart", readingStart);
  console.log("readingEnd", readingEnd);

  function narrowDateType(value: FormDataEntryValue | null): Date | null {
    return typeof value === "string" && value.trim() !== ""
      ? new Date(value)
      : null;
  }

  const readingS = narrowDateType(readingStart);

  const readingE = narrowDateType(readingEnd);

  const publishedA = narrowDateType(publishedAtInput);

  try {
    const bookSchemaValidation = bookSchema.parse({
      title: formData.get("title"),
      author: formData.get("author"),
      pageCount: pageCounter,
      isbn: formData.get("isbn"),
      description: formData.get("description"),
      genre: formData.get("genre"),
      publisher: formData.get("publisher"),
      publishedAt: publishedA,
      coverImageUrl: formData.get("coverImageUrl"),
      language: formData.get("language"),
      startedReading: readingS,
      finishedReading: readingE,
    });

    const {
      title,
      startedReading,
      finishedReading,
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
        startedReading,
        finishedReading,
        author,
        pageCount,
        isbn,
        description,
        genre,
        publisher,
        publishedAt,
        coverImageUrl,
        language,
      },
    });
    return { message: "Book information submitted." };
  } catch (err) {
    console.error("Failed to save book:", err);
    if (err instanceof z.ZodError) {
      return { message: err.issues[0]?.message ?? "Invalid book" };
    }
  }

  return { message: "Could not save the book. Please try again." };
}
