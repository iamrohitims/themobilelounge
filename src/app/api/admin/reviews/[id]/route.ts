import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const allowedFields = [
      "status",
      "comment",
      "author",
      "location",
      "phoneBought",
      "verifiedPurchase",
      "rating",
      "photoUrl",
      "invoiceNumber",
    ];

    const updateData: Record<string, any> = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updateData[key] = body[key];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid fields provided for update" },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });
    const updated = await payload.update({
      collection: "reviews",
      id,
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: `Review updated successfully. Status: ${updated.status || "published"}`,
      review: updated,
    });
  } catch (err: any) {
    console.error("Admin review update error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update review" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const payload = await getPayload({ config });
    await payload.delete({
      collection: "reviews",
      id,
    });

    return NextResponse.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err: any) {
    console.error("Admin review delete error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete review" },
      { status: 500 }
    );
  }
}
