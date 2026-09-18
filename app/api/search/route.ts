"use server"

export async function submitBookInfo(formData: FormData) {
    const email = formData.get("title")
    const author = formData.get("author")
    console.log(email, author)
  
}
