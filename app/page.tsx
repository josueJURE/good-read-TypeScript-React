"use client";

import { useActionState } from "react";
import { submitBookInfo } from "./action";

const initialState = {
  message: "",
};

export default function Home() {
  const [state, formAction, pending] = useActionState(submitBookInfo, initialState);
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center  bg-white dark:bg-black sm:items-start">
        <h1>Welcome to the reading habit tracker website </h1>

        <form action={formAction}>
          <input required name="title" placeholder="title" />
          <input required name="author" placeholder="author"/>
          <input required type="number" name="pageCount" placeholder="page count"/>
          <input required type="number" name="isbn" placeholder="isbn"/>
          <input name="description" placeholder="description"/>
          <input required name="genre" placeholder="genre"/>
          <input required name="publisher" placeholder="publisher"/>
          <input name="publishedAt" type="date" placeholder="published at"/>
          <input name="coverImageUrl" placeholder="cover Image url"/>
          <input required name="language" placeholder="language"/>
          <button disabled={pending} type="submit">
            {pending ? "Request is being submitted..." : "Submit"}
          </button>
          <p aria-live="polite">{state.message}</p>
        </form>
      </main>
    </div>
  );
}
