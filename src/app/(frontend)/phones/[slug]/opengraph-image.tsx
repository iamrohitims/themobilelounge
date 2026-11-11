import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { dataRepo } from "@/lib/repo";
import { jsonRepo } from "@/lib/repo/json-repo";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  let product = null;

  try {
    product = await dataRepo.products.getBySlug(slug);
    if (!product) {
      product = await jsonRepo.products.getBySlug(slug);
    }
  } catch {
    product = await jsonRepo.products.getBySlug(slug);
  }

  const productName = product?.name || "Official Smartphone";
  const brand = product?.brand || "Authorized Retail";
  const lowestPrice = product?.variants?.length
    ? Math.min(...product.variants.map((v) => v.mrp || v.price))
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "50px 60px",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(255, 90, 31, 0.3) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#ffffff",
          border: "2px solid #27272a",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 90, 31, 0.5)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#ff5a1f",
              }}
            />
            <span
              style={{
                fontSize: "16px",
                fontWeight: 800,
                letterSpacing: "0.05em",
                color: "#ffffff",
              }}
            >
              {siteConfig.name.toUpperCase()}
            </span>
            <span style={{ fontSize: "13px", color: "#a1a1aa" }}>
              • Kakod Mandi
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "999px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
            }}
          >
            <span style={{ fontSize: "14px", color: "#fbbf24" }}>★★★★★</span>
            <span style={{ fontSize: "14px", fontWeight: 800, color: "#34d399" }}>
              4.9★ Google Verified
            </span>
          </div>
        </div>

        {/* Center Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 90, 31, 0.2)",
                color: "#ff8a50",
                fontSize: "14px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {brand}
            </span>
            <span style={{ color: "#a1a1aa", fontSize: "14px", fontWeight: 600 }}>
              100% Genuine Sealed Pack • Official GST Warranty
            </span>
          </div>

          <div
            style={{
              fontSize: "56px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              maxWidth: "1050px",
            }}
          >
            {productName}
          </div>

          {lowestPrice ? (
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "16px",
                marginTop: "4px",
              }}
            >
              <span style={{ fontSize: "20px", color: "#a1a1aa", fontWeight: 600 }}>
                Official Price from:
              </span>
              <span
                style={{
                  fontSize: "44px",
                  fontWeight: 900,
                  color: "#34d399",
                }}
              >
                ₹{lowestPrice.toLocaleString("en-IN")}
              </span>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(52, 211, 153, 0.15)",
                  color: "#34d399",
                  fontSize: "14px",
                  fontWeight: 800,
                }}
              >
                0% EMI AVAILABLE
              </span>
            </div>
          ) : null}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderRadius: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#e4e4e7" }}>
              🎁 Free Smartwatch / Earbuds Hamper
            </span>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#e4e4e7" }}>
              ⚡ 5-Min Paperless EMI Approval
            </span>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#e4e4e7" }}>
              🔄 Old Phone Exchange
            </span>
          </div>

          <span style={{ fontSize: "14px", fontWeight: 800, color: "#22c55e" }}>
            📞 WhatsApp: 70172 89590
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
