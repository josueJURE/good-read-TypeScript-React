import { connection, NextResponse } from "next/server";
// import { type Prisma } from '@prisma/client';

import { prisma } from "../../../lib/prisma";
import { bookid } from "../../zod-schemas";
import {z} from "zod";

export async function GET(request: Request) {
  await connection();

  const books = await prisma.book.findMany();

  return NextResponse.json({
    success: true,
    books,
  });
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
    error: err.issues[0].message ?? "Invalid data sent to server"
  }) : NextResponse.json({
    error: "Invalid data sent to server"
  })

}

}
