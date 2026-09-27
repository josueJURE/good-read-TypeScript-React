import { connection, NextResponse } from "next/server";
// import { type Prisma } from '@prisma/client';

import { prisma } from "../../../lib/prisma";


export async function GET(request: Request) {
  await connection();

  const books = await prisma.book.findMany();

  return NextResponse.json({
    success: true,
    books,
  });
}

export async function DELETE(request: Request) {
  const data =  await request.json();
  
  
  console.log("data", data)
  console.log("data.id", typeof data.id)

  return NextResponse.json({
    success: true,
  });
}
