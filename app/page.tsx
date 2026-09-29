"use client";

import { useActionState } from "react";
import { submitBookInfo } from "./action";

const initialState = {
  message: "",
};

const inputClassName =
  "w-full min-w-0 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-950 shadow-xs transition-colors placeholder:text-zinc-400 focus-visible:border-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 dark:border-zinc-700 dark:bg-zinc-950/30 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:border-zinc-500 dark:focus-visible:outline-zinc-500";

const labelClassName = "block text-sm font-medium";

export default function Home() {
  const [state, formAction, pending] = useActionState(submitBookInfo, initialState);
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 font-sans text-zinc-950 sm:px-6 sm:py-14 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Add a book</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Make room for your next read in your library.
          </p>
        </header>

        <form
          action={formAction}
          className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <header className="space-y-1.5 border-b border-zinc-200 p-6 dark:border-zinc-800">
            <h2 className="text-xl font-semibold tracking-tight">Book details</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Fields marked with * are required.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 p-6 sm:grid-cols-2">
            <div className="min-w-0 space-y-2">
              <label htmlFor="title" className={labelClassName}>Title *</label>
              <input id="title" required name="title" placeholder="Book title" className={inputClassName} />
            </div>
            <div className="min-w-0 space-y-2">
              <label htmlFor="author" className={labelClassName}>Author *</label>
              <input id="author" required name="author" placeholder="Author name" className={inputClassName} />
            </div>
            <div className="min-w-0 space-y-2">
              <label htmlFor="pageCount" className={labelClassName}>Pages *</label>
              <input id="pageCount" required type="number" name="pageCount" placeholder="Number of pages" className={inputClassName} />
            </div>
            <div className="min-w-0 space-y-2">
              <label htmlFor="isbn" className={labelClassName}>ISBN *</label>
              <input id="isbn" required type="number" name="isbn" placeholder="10 or 13 digits" className={inputClassName} />
            </div>
            <div className="min-w-0 space-y-2 sm:col-span-2">
              <label htmlFor="description" className={labelClassName}>
                Description <span className="font-normal text-zinc-500 dark:text-zinc-400">(optional)</span>
              </label>
              <textarea id="description" name="description" rows={3} placeholder="A little about the book…" className={`${inputClassName} resize-y`} />
            </div>
            <div className="min-w-0 space-y-2">
              <label htmlFor="genre" className={labelClassName}>Genre *</label>
              <input id="genre" required name="genre" placeholder="e.g. Fiction" className={inputClassName} />
            </div>
            <div className="min-w-0 space-y-2">
              <label htmlFor="publisher" className={labelClassName}>Publisher *</label>
              <input id="publisher" required name="publisher" placeholder="Publisher name" className={inputClassName} />
            </div>
            <div className="min-w-0 space-y-2">
              <label htmlFor="publishedAt" className={labelClassName}>
                Published <span className="font-normal text-zinc-500 dark:text-zinc-400">(optional)</span>
              </label>
              <input id="publishedAt" name="publishedAt" type="date" className={`${inputClassName} dark:scheme-dark`} />
            </div>
            <div className="min-w-0 space-y-2">
              <label htmlFor="language" className={labelClassName}>Language *</label>
              <input id="language" required name="language" placeholder="e.g. English" className={inputClassName} />
            </div>
            <div className="min-w-0 space-y-2 sm:col-span-2">
              <label htmlFor="coverImageUrl" className={labelClassName}>
                Cover image URL <span className="font-normal text-zinc-500 dark:text-zinc-400">(optional)</span>
              </label>
              <input id="coverImageUrl" name="coverImageUrl" placeholder="https://example.com/book-cover.jpg" className={inputClassName} />
            </div>
          </div>

          <footer className="flex flex-col gap-4 border-t border-zinc-200 bg-zinc-50/70 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-950/30">
            <p aria-live="polite" className="text-sm wrap-break-words text-zinc-600 dark:text-zinc-400">
              {state.message}
            </p>
            <button
              disabled={pending}
              type="submit"
              className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:border-zinc-300 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 disabled:cursor-wait disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
            >
              {pending ? "Request is being submitted..." : "Add book"}
            </button>
          </footer>
        </form>
      </div>
    </main>
  );
}
