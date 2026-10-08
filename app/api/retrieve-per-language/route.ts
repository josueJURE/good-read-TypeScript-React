import { NextRequest, NextResponse } from "next/server";
import { bookSchema } from "@/app/zod-schemas";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const languageValidation = bookSchema.shape.language
    .trim()
    .safeParse(request.nextUrl.searchParams.get("language"));

    console.log("languageValidation", languageValidation.data)

  if (!languageValidation.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Provide a language query parameter between 1 and 50 characters.",
      },
      { status: 400 }
    );
  }

  try {
    const books = await prisma.book.findMany({
      where: { language: languageValidation.data },
    });

    return NextResponse.json({ success: true, books });
  } catch (error) {
    console.error("Failed to fetch books by language:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Could not load books. Please try again.",
      },
      { status: 500 }
    );
  }
}
