import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const notifySchema = z.object({
  phone: z.string().min(10, "Valid phone number is required"),
  productSlug: z.string().min(1, "Product slug is required"),
  notifyType: z.enum(["in_stock", "price_drop"]),
  targetPrice: z.number().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = notifySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.format() },
        { status: 400 }
      );
    }

    const { phone, productSlug, notifyType, targetPrice } = result.data;

    console.log(
      `[ALERT REGISTERED] Type: ${notifyType} | Product: ${productSlug} | Phone: ${phone} | TargetPrice: ${targetPrice || "N/A"}`
    );

    return NextResponse.json({
      success: true,
      message: "Alert preference saved! We will notify you via WhatsApp as soon as stock updates.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
