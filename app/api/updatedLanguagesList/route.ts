import { NextResponse, NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";



 export async function GET(request: NextRequest) {


    const languages = await prisma.book.findMany({
        select: {language: true}
    });

    console.log("languages", languages)

    return NextResponse.json({
        success: true,
        languages,
    })

}
