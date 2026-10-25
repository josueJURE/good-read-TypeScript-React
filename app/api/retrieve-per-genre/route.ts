import { NextRequest, NextResponse } from "next/server";
import { bookSchema } from "@/app/zod-schemas";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const genreValidation = bookSchema.shape.genre
    .trim()
    .min(1)
    .safeParse(request.nextUrl.searchParams.get("genre"));

  if (!genreValidation.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Provide a genre query parameter between 1 and 50 characters.",
      },
      { status: 400 }
    );
  }

  try {
    const books = await prisma.book.findMany({
      where: { genre: genreValidation.data },
    });

    return NextResponse.json({ success: true, books });
  } catch (error) {
    console.error("Failed to fetch books by genre:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Could not load books. Please try again.",
      },
      { status: 500 }
    );
  }
}
