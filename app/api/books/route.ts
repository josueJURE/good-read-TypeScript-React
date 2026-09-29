import { connection, NextResponse } from "next/server";
// import { type Prisma } from '@prisma/client';

import { prisma } from "@/lib/prisma";
import { bookid } from "@/app/zod-schemas";
import {z} from "zod";

export async function GET() {
  await connection();

  try {
    const books = await prisma.book.findMany();

    return NextResponse.json({
      success: true,
      books,
    });
  } catch (error) {
    console.error("Failed to fetch books:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Could not load books. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  await connection();

try {
  const bookIdValidation = bookid.parse(await request.json())

  console.log("validateBookId", bookIdValidation);
  console.log("lidateBookId.id", typeof bookIdValidation.id);


  

  const books = await prisma.book.delete({
    where : {
      id: bookIdValidation.id
    }
  })

  

  return NextResponse.json({
    success: true,
    message: `${books.title} has been successfully deleted from your database`
  });

} catch (err) {
  return err instanceof z.ZodError ? NextResponse.json({
    success: false,
    error: err.issues[0]?.message ?? "Invalid data sent to server"
  }) : NextResponse.json({
    success: false,
    error: "Invalid data sent to server"
  })

}

}
