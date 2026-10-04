import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Form from "./components/books";
export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 font-sans text-zinc-950 sm:px-6 sm:py-14 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">Add a book</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Make room for your next read in your library.
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-xs hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800">
              Menu
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-44 rounded-lg border border-zinc-200 bg-white p-1 text-zinc-950 shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            >
              <DropdownMenuItem
                render={<Link href="/" aria-current="page" />}
                className="rounded-md px-3 py-2 text-sm data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-800"
              >
                Add a book
              </DropdownMenuItem>
              <DropdownMenuItem
                render={<Link href="/books" />}
                className="rounded-md px-3 py-2 text-sm data-highlighted:bg-zinc-100 dark:data-highlighted:bg-zinc-800"
              >
                Your library
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <Form />
      </div>
    </main>
  );
}
