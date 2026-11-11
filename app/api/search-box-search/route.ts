
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("search");

  console.log(url);

  

  if (url === null)
    return NextResponse.json({
      success: false,
    });

  const books = await prisma.book.findMany({
    where: {
      title: { contains: url },
    },
  
  });

  return NextResponse.json({
    success: true,
    books,
  });
}
