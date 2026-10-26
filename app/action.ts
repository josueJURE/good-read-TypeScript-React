"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { bookSchema } from "./zod-schemas";

export async function submitBookInfo(
  _previousState: { message: string },
  formData: FormData
) {
  const pageCounter = Number(formData.get("pageCount"));

  const digitalBoolean = Boolean(formData.get("digital"))

function turnStringIntoBoolean(param: boolean | string) : boolean {
  return param === "true" ? formData.get("digital") === "true" : formData.get("digital") === "false"

}

// 4820195736142
// https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ40Rvpkw2TiuVikYCNBSeyli5cNu7P0sxssR5jXSI2KLVDIvsJmsI5Wp8YL_HI0i6gDMDScPOz3RM26eylSLY2nTP_QrHA_xoTjo-_pa9X&usqp=CAc

// https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSpBWo8CzHhoQwnAyEL3sKSzIwyLiG_ux1eKKTx1whIz3XTEitYEkPiD_fVRnjen4ChphZNvV6ZWUlwBNIHX1yK5IOdJ32WHVWsqtOQNbuM&usqp=CAc

// https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR6twboHrfce6T8GKI_VHevDti0YjWSBKXX7tf2zyiRju5I5F_ICMawBPxKbnYH0TZ53a1wPjmEk7BXrSciLsz6jM8ElUOQU3IllGhk1Vo&usqp=CAc

  const publishedAtInput = formData.get("publishedAt");

  const readingStart = formData.get("StartedReading");
  const readingEnd = formData.get("FinishedReading");

  function parseFormDate(value: FormDataEntryValue | null): Date | null {
    return typeof value === "string" && value.trim() !== ""
      ? new Date(value)
      : null;
  }

  try {
    const bookSchemaValidation = bookSchema.parse({
      title: formData.get("title"),
      author: formData.get("author"),
      pageCount: pageCounter,
      isbn: formData.get("isbn"),
      description: formData.get("description"),
      genre: formData.get("genre"),
      publisher: formData.get("publisher"),
      publishedAt: parseFormDate(publishedAtInput),
      coverImageUrl: formData.get("coverImageUrl"),
      language: formData.get("language"),
      startedReading: parseFormDate(readingStart),
      finishedReading: parseFormDate(readingEnd),
      digital: digitalBoolean
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
      digital
      
    } = bookSchemaValidation;


    console.log("digitalBoolean", digitalBoolean)
    console.log(typeof digital)

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
        digital
     
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
