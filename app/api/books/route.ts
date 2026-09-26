
import { connection, NextResponse } from 'next/server';
// import { type Prisma } from '@prisma/client';


import { prisma } from "../../../lib/prisma";


export async function GET(request: Request) {
    await connection()

    const books = await prisma.book.findMany();

    return  NextResponse.json({
        data: books
    })


    console.log(books)
}