import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const searchSchema = z.object({
  title: z.string().trim().min(0).max(50),

})




export async function GET(request: NextRequest) {
  const titleValidation = searchSchema.shape.title.safeParse(
    request.nextUrl.searchParams.get("search")
  );

  if (!titleValidation.success) {
    return NextResponse.json({
      success: false,
      error: "No books match your search"
    });
  }

  const books = await prisma.book.findMany({
    where: {
      title: { contains: titleValidation.data,
        mode: "insensitive",
       },
    },
  });

  return NextResponse.json({
    success: true,
    books,
  });
}
