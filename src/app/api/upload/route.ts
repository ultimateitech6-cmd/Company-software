import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file was selected" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure target folder public/uploads exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique name to prevent collisions
    const ext = path.extname(file.name) || ".jpg";
    const filename = `img-${Date.now()}-${Math.random().toString(36).substring(2, 6)}${ext}`;
    const filePath = path.join(uploadDir, filename);

    // Write file to disk
    fs.writeFileSync(filePath, buffer);

    const relativeUrl = `/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      url: relativeUrl
    });
  } catch (error) {
    console.error("File Upload API Error:", error);
    return NextResponse.json({ error: "Failed to save file on server" }, { status: 500 });
  }
}
