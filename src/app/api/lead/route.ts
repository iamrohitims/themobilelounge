import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getPayload } from "payload";
import config from "@/payload.config";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid 10-digit phone number is required"),
  productName: z.string().optional(),
  type: z.enum(["reserve", "emi_quote", "exchange", "general"]),
  honeypot: z.string().max(0, "Bot detected").optional(),
  details: z.string().optional(),
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

    const { name, phone, productName, type, honeypot, details } = result.data;

    // Honeypot spam check
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Lead captured" });
    }

    // Save lead to Payload / MongoDB Atlas
    try {
      const payload = await getPayload({ config });
      await payload.create({
        collection: "leads",
        data: {
          customerName: name,
          phone,
          phoneOfInterest: productName || "",
          leadType: type === "exchange" ? "exchange" : type === "emi_quote" ? "emi" : "whatsapp_query",
          details: details || `Inquiry for ${productName || "General Store Visit"}`,
          status: "new",
        },
      });
      console.log(`[LEAD SAVED TO MONGO] ${name} (${phone}) - ${productName || type}`);
    } catch (dbErr) {
      console.warn("Could not save lead to database, logged to console:", dbErr);
    }

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
