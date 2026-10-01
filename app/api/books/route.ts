import { connection, NextResponse } from "next/server";
import { bookResponseSchema } from "@/app/zod-schemas";
// import { type Prisma } from '@prisma/client';

import { prisma } from "@/lib/prisma";
import { bookid } from "@/app/zod-schemas";
import { z } from "zod";
import { title } from "process";

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
    const bookIdValidation = bookid.parse(await request.json());

    const books = await prisma.book.delete({
      where: {
        id: bookIdValidation.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: `${books.title} has been successfully deleted from your database`,
    });
  } catch (err) {
    return err instanceof z.ZodError
      ? NextResponse.json({
          success: false,
          error: err.issues[0]?.message ?? "Invalid data sent to server",
        })
      : NextResponse.json({
          success: false,
          error: "Invalid data sent to server",
        });
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();

    const bookSchemaValidation = bookResponseSchema.parse(data.updatedBook);
  
    const { id, ...rest } = bookSchemaValidation;
  
    const bookId = Number(id);
  
    const books = await prisma.book.update({
      where: {
        id: bookId,
      },
  
      data: {
        ...rest,
      },
    });
  
    return NextResponse.json({
      message: `${books.title} has been updated`,
    });
  } catch (err) {
    if(err instanceof z.ZodError) {
      NextResponse.json({
        message: `${err.issues[0].message}`
      })
    } else {
      NextResponse.json({
        message: 'internal sever Error'
      })
    }
  }

  }

