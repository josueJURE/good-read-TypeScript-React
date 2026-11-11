import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { z } from "zod";

const searchSchema = z
  .string()
  .trim()
  .min(1)
  .max(100)
  .regex(/^[a-z]+$/i);

export async function GET(request: NextRequest) {
  const titleValidation = searchSchema.safeParse(
    request.nextUrl.searchParams.get("search")
  );

  console.log("titleValidation", titleValidation);

  if (!titleValidation.success) {
    return NextResponse.json({
      success: false,
    });
  }

  // if (url === null)
  //   return NextResponse.json({
  //     success: false,
  //   });

  const books = await prisma.book.findMany({
    where: {
      title: { contains: titleValidation.data, mode: "insensitive" },
    },
  });

  return NextResponse.json({
    success: true,
    books,
  });
}
