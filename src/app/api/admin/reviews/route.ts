import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import reviewsData from "@/data/reviews.json";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filterStatus = searchParams.get("status"); // all, pending, published, rejected

  try {
    const payload = await getPayload({ config });
    const query: any = {
      collection: "reviews",
      limit: 100,
      sort: "-createdAt",
    };

    if (filterStatus && filterStatus !== "all") {
      query.where = {
        status: { equals: filterStatus },
      };
    }

    const res = await payload.find(query);
    const docs = res.docs || [];

    const stats = {
      total: docs.length,
      pending: docs.filter((d: any) => d.status === "pending").length,
      published: docs.filter((d: any) => d.status === "published" || !d.status).length,
      rejected: docs.filter((d: any) => d.status === "rejected").length,
    };

    return NextResponse.json({
      success: true,
      stats,
      reviews: docs,
    });
  } catch (err) {
    // Fallback to JSON reviews
    const all = reviewsData as any[];
    let filtered = all;
    if (filterStatus && filterStatus !== "all") {
      filtered = all.filter((r) => r.status === filterStatus);
    }
    return NextResponse.json({
      success: true,
      stats: {
        total: all.length,
        pending: all.filter((r) => r.status === "pending").length,
        published: all.filter((r) => r.status === "published" || !r.status).length,
        rejected: all.filter((r) => r.status === "rejected").length,
      },
      reviews: filtered,
    });
  }
}
