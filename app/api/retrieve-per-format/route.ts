import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookSchema } from "@/app/zod-schemas";


export async function GET(request: NextRequest) {
  let digitalValidation = bookSchema.shape.digital.safeParse(
    request.nextUrl.searchParams.get("digital") === "true" ? true : false
  );

  if (!digitalValidation.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Something has gone wrong",
      },
      { status: 400 }
    );
  }

//   console.log("format", digitalValidation);
//   console.log(typeof digitalValidation);
//   console.log(typeof Boolean(digitalValidation));

  if (digitalValidation === null || digitalValidation === undefined) {
    return NextResponse.json({
      message: "Something has gone wrong",
    });
  }

  console.log("format server", digitalValidation);

  

  console.log("format", digitalValidation.data);
  console.log(typeof digitalValidation);

  const books = await prisma.book.findMany({
    where: { digital: digitalValidation.data },
  });

  return NextResponse.json({
    success: true, books
  });
}
