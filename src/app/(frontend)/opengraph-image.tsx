import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = "The Mobile Lounge Kakod | #1 iPhone & 5G Smartphone Hub";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
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
            "radial-gradient(circle at 90% 15%, rgba(255, 90, 31, 0.25) 0%, transparent 50%), radial-gradient(circle at 10% 85%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)",
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
          {/* Brand pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 22px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 90, 31, 0.5)",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#ff5a1f",
              }}
            />
            <span
              style={{
                fontSize: "18px",
                fontWeight: 800,
                letterSpacing: "0.05em",
                color: "#ffffff",
              }}
            >
              {siteConfig.name.toUpperCase()}
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#a1a1aa",
              }}
            >
              by Vishal Distributors
            </span>
          </div>

          {/* Reviews Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
            }}
          >
            <span style={{ fontSize: "16px", color: "#fbbf24" }}>★★★★★</span>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#34d399",
              }}
            >
              4.9 / 5.0 Google Rating
            </span>
          </div>
        </div>

        {/* Center Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              fontWeight: 800,
              color: "#fbbf24",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span>📍 KAKOD MANDI • BULANDSHAHR • UP</span>
          </div>

          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Kakod&apos;s #1 iPhone &amp;</span>
            <span style={{ color: "#ff5a1f" }}>5G Smartphone Hub</span>
          </div>

          <p
            style={{
              fontSize: "22px",
              fontWeight: 500,
              color: "#a1a1aa",
              margin: 0,
              maxWidth: "950px",
            }}
          >
            100% Genuine Sealed-Pack Smartphones with Official GST Bill &amp; Indian Warranty
          </p>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "18px 24px",
              borderRadius: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <span style={{ fontSize: "18px", fontWeight: 800, color: "#34d399" }}>
              💳 ₹0 Downpayment EMI
            </span>
            <span style={{ fontSize: "14px", color: "#a1a1aa", marginTop: "4px" }}>
              5-Min Approval on Aadhaar &amp; PAN
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "18px 24px",
              borderRadius: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <span style={{ fontSize: "18px", fontWeight: 800, color: "#fb923c" }}>
              🎁 Free 5-in-1 Gift Box
            </span>
            <span style={{ fontSize: "14px", color: "#a1a1aa", marginTop: "4px" }}>
              Smartwatch or ANC Earbuds with Phone
            </span>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "18px 24px",
              borderRadius: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <span style={{ fontSize: "18px", fontWeight: 800, color: "#60a5fa" }}>
              🔄 Best Exchange Value
            </span>
            <span style={{ fontSize: "14px", color: "#a1a1aa", marginTop: "4px" }}>
              Spot Discount + Free Data Transfer
            </span>
          </div>
        </div>

        {/* Footer Contact */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "14px",
            fontWeight: 700,
            color: "#71717a",
          }}
        >
          <span>AUTHORIZED BRANDS: APPLE • SAMSUNG • ONEPLUS • VIVO • REALME</span>
          <span style={{ color: "#22c55e", fontWeight: 800 }}>
            📞 WhatsApp: +91 70172 89590
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
