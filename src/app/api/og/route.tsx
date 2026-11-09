import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "The Mobile Lounge";
  const subtitle =
    searchParams.get("subtitle") || "Kakod's #1 iPhone, 5G Smartphone & Gadget Hub";
  const price = searchParams.get("price");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "999px",
            background: "rgba(255, 30, 66, 0.25)",
            filter: "blur(120px)",
          }}
        />

        {/* Top Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "999px",
                backgroundColor: "#ff1e42",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 900,
                fontSize: "24px",
              }}
            >
              ML
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "white", fontWeight: 900, fontSize: "24px" }}>
                THE MOBILE LOUNGE
              </span>
              <span style={{ color: "#a3e635", fontWeight: 700, fontSize: "14px" }}>
                📍 KAKOD • BY VISHAL DISTRIBUTORS
              </span>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "999px",
              padding: "10px 24px",
              color: "#a3e635",
              fontWeight: 800,
              fontSize: "16px",
            }}
          >
            0% DOWNPAYMENT EMI
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              color: "white",
              fontSize: "52px",
              fontWeight: 900,
              lineHeight: 1.1,
              maxWidth: "950px",
            }}
          >
            {title}
          </span>
          <span style={{ color: "#a1a1aa", fontSize: "24px", fontWeight: 500 }}>
            {subtitle}
          </span>
          {price && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
              <span style={{ color: "#a3e635", fontSize: "44px", fontWeight: 900 }}>
                {price}
              </span>
              <span style={{ color: "#f43f5e", fontSize: "20px", fontWeight: 800 }}>
                + Free Smartwatch / Earbuds Gift Box 🎁
              </span>
            </div>
          )}
        </div>

        {/* Bottom Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: "24px",
            color: "#71717a",
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          <span>Main Market, Kakod, Bulandshahr (UP)</span>
          <span style={{ color: "#a3e635" }}>WhatsApp: +91 70172 89590</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
