import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type. Please upload CSV or Excel files only.",
        },
        { status: 400 },
      )
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          error: "File size exceeds 10MB limit",
        },
        { status: 400 },
      )
    }

    console.log("[v0] Using filename:", file.name)

    const fileExtension = file.name.split(".").pop() || "csv"
    const timestamp = Date.now()
    const cleanFilename = `tickets-${timestamp}.${fileExtension}`

    console.log("[v0] Clean filename:", cleanFilename)

    const fileBuffer = await file.arrayBuffer()

    const blob = await put(cleanFilename, fileBuffer, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    console.log("[v0] File uploaded successfully:", blob.url)

    return NextResponse.json({
      url: blob.url,
      filename: file.name, // Return original filename for display
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
