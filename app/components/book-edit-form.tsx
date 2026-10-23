"use client";

import { useId, useState, type FormEvent } from "react";
import { bookResponseSchema, type bookSchemaType } from "../zod-schemas";

type BookDraft = {
  [Field in Exclude<keyof bookSchemaType, "id">]-?: string;
};

type BookEditFormProps = {
  book: bookSchemaType;
  onSave: (
    book: bookSchemaType,
    message: string,
    areDateValid: boolean
  ) => void;
  onCancel: () => void;
};

const fields: {
  name: Exclude<keyof BookDraft, "description">;
  label: string;
  type?: "text" | "number" | "date" | "url";
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}[] = [
  { name: "title", label: "Title", required: true, maxLength: 50 },
  { name: "author", label: "Author", required: true },
  { name: "genre", label: "Genre", required: true, maxLength: 50 },
  { name: "pageCount", label: "Page count", type: "number", required: true },
  { name: "isbn", label: "ISBN", required: true, minLength: 10, maxLength: 13 },
  { name: "language", label: "Language", required: true, maxLength: 50 },
  { name: "publisher", label: "Publisher", maxLength: 50 },
  { name: "publishedAt", label: "Published date", type: "date" },
  {
    name: "startedReading",
    label: "Started Reading",
    type: "date",
    required: true,
  },
  {
    name: "finishedReading",
    label: "Finished Reading",
    type: "date",
    required: true,
  },
  { name: "coverImageUrl", label: "Cover image URL", type: "url" },
];

const inputClassName =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-700 dark:bg-zinc-950";

const labelClassName = "block text-sm font-medium";

// Store date input values (YYYY-MM-DD) at midnight UTC.
function dateInputToIsoString(date: string): string {
  return `${date}T00:00:00.000Z`;
}

function baseClassName(
  inputClassName: string,
  getFieldClassName: keyof BookDraft,
  hasError: boolean,
) {
  return `${inputClassName} ${
    getFieldClassName === "startedReading" && hasError
      ? "text-red-600 dark:text-red-400"
      : "text-zinc-950 dark:text-zinc-50"
  }`;
}

function trimToNull(input: string | null): string | null {
  return input?.trim() || null;
}

function resolveDateInput(
  draftDate: string,
  originalDate: string | null
): string | null {
  if (!draftDate) return null;
  if (draftDate === originalDate?.slice(0, 10)) return originalDate;

  return dateInputToIsoString(draftDate);
}

export default function BookEditForm({
  book,
  onSave,
  onCancel,
}: BookEditFormProps) {
  const formId = useId();
  const [draft, setDraft] = useState<BookDraft>(() => ({
    title: book.title,
    author: book.author,
    genre: book.genre,
    pageCount: String(book.pageCount),
    isbn: book.isbn,
    language: book.language,
    publisher: book.publisher ?? "",
    publishedAt: book.publishedAt?.slice(0, 10) ?? "",
    startedReading: book.startedReading.slice(0, 10),
    finishedReading: book.finishedReading.slice(0, 10),
    coverImageUrl: book.coverImageUrl ?? "",
    description: book.description ?? "",
  }));
  const [error, setError] = useState<string | null>(null);
  const [hasDateError, setHasDateError] = useState(false);

  function updateField(name: keyof BookDraft, value: string) {
    setDraft((current) => ({ ...current, [name]: value }));
    setError(null);
    setHasDateError(false);
  }

  // write test
  function getDaysBetweenDates(start: Date, end: Date): number {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return (
      Math.floor(end.getTime() / millisecondsPerDay) -
      Math.floor(start.getTime() / millisecondsPerDay)
    );
  }

  function validateReadingDates(start: Date, end: Date): boolean {
    const difference = getDaysBetweenDates(start, end);
    let value = false;
    if (!Number.isFinite(difference)) {
      setError("Reading dates unavailable");
      value = true;
    }

    if (difference < 0) {
      // setError("Start reading date is in the future");
      value = true;
    }

    return value;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = bookResponseSchema.safeParse({
      ...draft,
      id: book.id,
      author: draft.author.trim(),
      genre: draft.genre.trim(),
      language: draft.language.trim(),
      isbn: draft.isbn.trim(),
      pageCount: Number(draft.pageCount),
      publisher: trimToNull(draft.publisher),
      description: trimToNull(draft.description),
      coverImageUrl: trimToNull(draft.coverImageUrl),
      publishedAt: resolveDateInput(draft.publishedAt, book.publishedAt),
      startedReading: resolveDateInput(
        draft.startedReading,
        book.startedReading
      ),
      finishedReading: resolveDateInput(
        draft.finishedReading,
        book.finishedReading
      ),
    });

    if (!result.success) {
      const issue = result.error.issues[0];
      const label =
        fields.find((field) => field.name === issue?.path[0])?.label ??
        "Description";
      setError(`${label}: ${issue?.message ?? "Please check this field."}`);
      return;
    }

    if (!result.data) {
      setError("can't retirieve data");
      return;
    }

    const dateError = validateReadingDates(
      new Date(result.data.startedReading.slice(0, 10)),
      new Date(result.data.finishedReading.slice(0, 10))
    );
    setHasDateError(dateError);

    if (dateError) {
      setError("Start reading date is in the future");
      return;
    }

    if (!result.data.publishedAt) return;

    const datePuBlishingError = validateReadingDates(
      new Date(result.data.publishedAt.slice(0, 10)),
      new Date(result.data.startedReading.slice(0, 10))
    );

    if (datePuBlishingError) {
      setError("reading date can't be prior to publishing date");
      return;
    }

    const response = await fetch("/api/books", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updatedBook: result.data }),
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const serverResponse = await response.json();

    console.log(serverResponse.message);

    onSave(result.data, serverResponse.message, dateError);
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby={`${formId}-heading`}
      className="flex h-full flex-col"
    >
      <header className="space-y-2 p-6 pb-4">
        <h2
          id={`${formId}-heading`}
          className="text-xl font-semibold tracking-tight"
        >
          Edit book
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Update the details for {book.title}.
        </p>
      </header>

      <div className="flex-1 space-y-4 px-6 pb-6">
        {fields.map(({ name, label, type = "text", ...constraints }) => (
          <div key={name} className="space-y-1.5">
            <label
              htmlFor={`${formId}-${name}`}
              className={baseClassName(labelClassName, name, hasDateError)}
            >
              {label}
            </label>
            <input
              {...constraints}
              id={`${formId}-${name}`}
              name={name}
              type={type}
              value={draft[name]}
              onChange={(event) => updateField(name, event.target.value)}
              min={type === "number" ? 1 : undefined}
              step={type === "number" ? 1 : undefined}
              max={type === "date" ? "9999-12-31" : undefined}
              autoFocus={name === "title"}
              className={baseClassName(inputClassName, name, hasDateError)}
            />
          </div>
        ))}

        <div className="space-y-1.5">
          <label
            htmlFor={`${formId}-description`}
            className="block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id={`${formId}-description`}
            name="description"
            value={draft.description}
            onChange={(event) => updateField("description", event.target.value)}
            rows={5}
            maxLength={8000}
            className={`${inputClassName} resize-y text-zinc-950 dark:text-zinc-50`}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>

      <footer className="flex flex-wrap justify-end gap-3 border-t border-zinc-200 bg-zinc-50/70 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950/30">
        {/* <div spellCheck={isStartDateInFuture}></div> */}

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-zinc-950 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Save changes
        </button>
      </footer>
    </form>
  );
}
