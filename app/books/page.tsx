"use client";
import Image from "next/image";
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
    <main className="min-h-screen bg-zinc-50 px-4 py-10 font-sans text-zinc-950 sm:px-6 sm:py-14 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Your library</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            All your books, in one place.
          </p>
        </header>

        {error && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article
              key={book.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              {book.coverImageUrl && (
                <div className="relative h-56 border-b border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/50">
                  <Image
                    src={book.coverImageUrl}
                    alt={`Cover of ${book.title}`}
                    fill
                    unoptimized
                    className="object-contain p-5"
                  />
                </div>
              )}

              <header className="space-y-3 p-6 pb-4">
                <span className="inline-flex max-w-full rounded-md border border-zinc-200 px-2 py-0.5 text-xs font-medium wrap-break-words dark:border-zinc-700">
                  {book.genre}
                </span>
                <div className="space-y-1.5">
                  <h2 className="text-xl leading-snug font-semibold tracking-tight wrap-break-words">
                    {book.title}
                  </h2>
                  <p className="text-sm wrap-break-words text-zinc-500 dark:text-zinc-400">
                    by {book.author}
                  </p>
                </div>
              </header>

              <div className="flex-1 space-y-5 px-6 pb-6">
                {book.description && (
                  <p className="text-sm leading-relaxed wrap-break-words text-zinc-600 dark:text-zinc-400">
                    {book.description}
                  </p>
                )}
                <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                  <div className="min-w-0 space-y-1">
                    <dt className="text-xs text-zinc-500 dark:text-zinc-400">Pages</dt>
                    <dd className="font-medium">{book.pageCount}</dd>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <dt className="text-xs text-zinc-500 dark:text-zinc-400">Language</dt>
                    <dd className="font-medium wrap-break-words">{book.language}</dd>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <dt className="text-xs text-zinc-500 dark:text-zinc-400">Publisher</dt>
                    <dd className="font-medium wrap-break-words">{book.publisher || "Not listed"}</dd>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <dt className="text-xs text-zinc-500 dark:text-zinc-400">Published</dt>
                    <dd className="font-medium">
                      {book.publishedAt ? (
                        <time dateTime={book.publishedAt}>{book.publishedAt.slice(0, 10)}</time>
                      ) : "Not listed"}
                    </dd>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <dt className="text-xs text-zinc-500 dark:text-zinc-400">ISBN</dt>
                    <dd className="font-mono text-xs break-all">{book.isbn}</dd>
                  </div>
                </dl>
              </div>

              <footer className="flex justify-end border-t border-zinc-200 bg-zinc-50/70 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950/30">
                <button
                  type="button"
                  aria-label={`Delete ${book.title}`}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-red-600 shadow-xs transition-colors hover:border-red-200 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-red-400 dark:hover:border-red-900 dark:hover:bg-red-950/40"
                >
                  Delete
                </button>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
