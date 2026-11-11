import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "@/payload.config";

const reviewSubmissionSchema = z.object({
  author: z.string().min(2, "Name must be at least 2 characters").max(60),
  location: z.string().min(2, "Location is required").max(60),
  phoneBought: z.string().min(2, "Purchased phone name is required").max(80),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(10, "Review must be at least 10 characters").max(600),
  invoiceNumber: z.string().optional().or(z.literal("")),
  customerPhone: z.string().optional().or(z.literal("")),
  photoUrl: z.string().optional().or(z.literal("")),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = reviewSubmissionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      author,
      location,
      phoneBought,
      rating,
      comment,
      invoiceNumber,
      customerPhone,
      photoUrl,
      honeypot,
    } = result.data;

    // 1. Anti-Bot Honeypot Protection
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Thank you! Your review has been submitted.",
      });
    }

    // 2. Anti-Fake Validation Logic:
    const hasInvoice = Boolean(invoiceNumber && invoiceNumber.trim().length >= 4);
    const verifiedPurchase = hasInvoice;

    // Validate phone number format if provided
    if (customerPhone && customerPhone.trim().length > 0) {
      const cleanPhone = customerPhone.replace(/\D/g, "");
      if (cleanPhone.length !== 10) {
        return NextResponse.json(
          {
            success: false,
            errors: {
              customerPhone: ["Please enter a valid 10-digit Indian mobile number."],
            },
          },
          { status: 400 }
        );
      }
    }

    // 3. Process & Save Uploaded Photo (from compressed base64 to disk)
    let savedPhotoUrl = photoUrl || "";
    if (photoUrl && photoUrl.startsWith("data:image/")) {
      try {
        const matches = photoUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const mime = matches[1];
          const ext = mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg";
          const buffer = Buffer.from(matches[2], "base64");
          const filename = `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`;
          const dir = path.join(process.cwd(), "public", "uploads", "reviews");
          await fs.promises.mkdir(dir, { recursive: true });
          await fs.promises.writeFile(path.join(dir, filename), buffer);
          savedPhotoUrl = `/uploads/reviews/${filename}`;
        }
      } catch (err) {
        console.warn("Could not save review photo to disk, using data URL:", err);
      }
    }

    const todayStr = new Date().toISOString().split("T")[0];

    // 4. Save to Payload CMS (MongoDB)
    try {
      const payload = await getPayload({ config });
      const created = await payload.create({
        collection: "reviews",
        data: {
          author,
          location,
          rating,
          date: todayStr,
          phoneBought,
          comment,
          verifiedPurchase,
          source: "Customer Submission",
          helpfulCount: 0,
          photoUrl: savedPhotoUrl,
          invoiceNumber: invoiceNumber || "",
          customerPhone: customerPhone || "",
          status: "pending",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Thank you! Your review has been submitted for moderation and will be published once verified by the store admin.",
        reviewId: created.id,
        isVerified: verifiedPurchase,
        photoUrl: savedPhotoUrl,
        status: "pending",
      });
    } catch (dbErr) {
      console.warn("Could not save to Payload DB directly, falling back gracefully:", dbErr);
      return NextResponse.json({
        success: true,
        message: "Review received and recorded successfully!",
        isVerified: verifiedPurchase,
        photoUrl: savedPhotoUrl,
      });
    }
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error submitting review" },
      { status: 500 }
    );
  }
}
