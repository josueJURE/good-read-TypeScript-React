

import  Form  from "./components/books";


export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 font-sans text-zinc-950 sm:px-6 sm:py-14 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Add a book</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Make room for your next read in your library.
          </p>
        </header>
        <Form/>
      </div>
    </main>
  );
}
