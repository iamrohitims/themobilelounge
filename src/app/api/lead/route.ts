import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid 10-digit phone number is required"),
  productName: z.string().optional(),
  type: z.enum(["reserve", "emi_quote", "exchange", "general"]),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.format() },
        { status: 400 }
      );
    }

    const { name, phone, productName, type, honeypot } = result.data;

    // Honeypot spam check
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Lead captured" });
    }

    // In Phase 1, log to server console / local record
    console.log(`[LEAD CAPTURED] Type: ${type} | Name: ${name} | Phone: ${phone} | Product: ${productName || "General"}`);

    return NextResponse.json({
      success: true,
      message: "Lead received! The Mobile Lounge Kakod team will assist you shortly.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
