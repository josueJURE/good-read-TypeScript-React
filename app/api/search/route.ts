import { NextResponse} from 'next/server'

export async function POST(request: Request) {

    const formData = await request.formData()
    const client = formData.get("title")
    const author = formData.get("author")
    console.log("client", client)
    console.log("author", author)


    return NextResponse.json({
        success: "BS"
    })

}

