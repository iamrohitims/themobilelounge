import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name ? path.extname(file.name) || ".jpg" : ".jpg";
    const filename = `admin-rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "reviews");

    await fs.promises.mkdir(uploadDir, { recursive: true });
    await fs.promises.writeFile(path.join(uploadDir, filename), buffer);

    const photoUrl = `/uploads/reviews/${filename}`;

    return NextResponse.json({
      success: true,
      url: photoUrl,
      message: "Photo uploaded and saved successfully",
    });
  } catch (error: any) {
    console.error("Admin photo upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to upload photo" },
      { status: 500 }
    );
  }
}
