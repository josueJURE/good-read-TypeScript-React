import { z } from "zod";

export const bookSchema = z.object({
  id: z.int().optional(),
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
  startedReading: z.date(),
  finishedReading: z.date()
});





// ${result === 'error' ? '<a href="#">link</a>' : ''}


export const apiErrorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});

export const bookDeletionSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    message: z.string(),
  }),
  apiErrorSchema,
]);

export const bookid = bookSchema.pick({ id: true });

export const bookResponseSchema = bookSchema.extend({
  // JSON serializes Date objects as ISO datetime strings.
  publishedAt: z.iso.datetime().nullable(),
  startedReading: z.iso.datetime(),
  finishedReading: z.iso.datetime(),
});





export const bookSchemaResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    books: z.array(bookResponseSchema),
  }),
  apiErrorSchema,
]);

// For books received through JSON:

export type bookSchemaType = z.infer<typeof bookResponseSchema>;
