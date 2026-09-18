import {submitBookInfo} from './api/search/route'



export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center  bg-white dark:bg-black sm:items-start">
        <h1>Welcome to the reading habit tracker website</h1>

        <form action={submitBookInfo} method="POST">
          <input name="title" placeholder="title" />
          <input name="author" placeholder="author"/>
          <button type="submit">Search</button>
        </form>
      </main>
    </div>
  );
}
