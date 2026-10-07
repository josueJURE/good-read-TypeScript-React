import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const languages = await prisma.book.findMany({
      select: { language: true },
    });

    console.log("languages", languages);

    return NextResponse.json({
      success: true,
      languages,
    });
  } catch (err) {
    console.error("Could not load languages", err);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
