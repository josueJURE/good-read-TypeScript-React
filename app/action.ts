"use server";

import { NextResponse } from "next/server";
import { success, z } from "zod";

const bookSchema = z.object({
  title: z.string().min(1).max(50),
  author: z.number(),
});

export async function submitBookInfo(initialState: any, formData: FormData) {
  const {
    $ACTION_ID_40c0f02203185cff8d94b2031c040d0ce912f880ed,
    ...bookObject
  } = Object.fromEntries(formData);

  console.log(bookObject);

  const bookSchemaValidation = bookSchema.safeParse(bookObject);

  if (!bookSchemaValidation.success) {
    return { message: "false" };
  }

  return { message: "true" };

  console.log(true);
}
