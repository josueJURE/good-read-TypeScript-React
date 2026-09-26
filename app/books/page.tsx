"use client";
import { useEffect, useState } from "react";
import { bookSchemaResponseSchema, type bookSchemaType } from "../zod-schemas";
import { z } from "zod";

export default function DisplayBooks() {
  const [books, setBooks] = useState<bookSchemaType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`);

        const data = bookSchemaResponseSchema.parse(await response.json());

        if (data.success) {
          setBooks(data.books);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError(
          err instanceof z.ZodError
            ? err.issues[0]?.message ?? "Invalid book"
            : err instanceof Error
            ? err.message
            : "Could not load books"
        );
      }
    };
    void fetchBooks();
  }, []);

  // if (err instanceof z.ZodError) {
  //   return {message: err.issues[0].message ?? "Invalid book"}
  // }

  return (
    <>
      <ul>
        {books.map((book) => (
          <>
            <div key={book.id}>
              <h1>{book.title}</h1>
              <li>{book.author}</li>
              <li>{book.pageCount}</li>
              <li>{book.isbn}</li>
              <li>{book.language}</li>
              <li>{book.pageCount}</li>
              <li>{book.publishedAt}</li>
              <li>{book.publisher}</li>
              <li>{book.description}</li>
              <li>{book.coverImageUrl}</li>
            </div>
          </>
        ))}
      </ul>
      <div>{error && <p role="alert">{error}</p>}</div>
    </>
  );
}
