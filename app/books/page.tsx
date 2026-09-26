"use client";
import { useEffect, useState } from "react";

type Book = {
  id: number;
  title: string;
};

export default function DisplayBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        if (!response.ok)
        throw new Error(`Response status: ${response.status}`);
        const result = await response.json();
        setBooks(result.data);
        console.log(books);
      } catch (error) {
        console.error("error");
      }
    };
    void fetchBooks();
  }, []);

  return (
    <>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </>
  );
}
