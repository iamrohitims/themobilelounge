import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, "../public/og");
const outputPath = path.join(outputDir, "og-image.png");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="50%" stop-color="#12121c"/>
      <stop offset="100%" stop-color="#08080c"/>
    </linearGradient>

    <!-- Ambient Glows -->
    <radialGradient id="glowOrange" cx="85%" cy="20%" r="45%">
      <stop offset="0%" stop-color="#ff5a1f" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ff5a1f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowBlue" cx="15%" cy="80%" r="45%">
      <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowEmerald" cx="50%" cy="100%" r="35%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>

    <!-- Card Gradients -->
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1e2d" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#141420" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff5a1f"/>
      <stop offset="100%" stop-color="#ff1e42"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#glowOrange)"/>
  <rect width="1200" height="630" fill="url(#glowBlue)"/>
  <rect width="1200" height="630" fill="url(#glowEmerald)"/>

  <!-- Subtle Grid Pattern -->
  <g opacity="0.07" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="90" x2="1200" y2="90" />
    <line x1="0" y1="180" x2="1200" y2="180" />
    <line x1="0" y1="270" x2="1200" y2="270" />
    <line x1="0" y1="360" x2="1200" y2="360" />
    <line x1="0" y1="450" x2="1200" y2="450" />
    <line x1="0" y1="540" x2="1200" y2="540" />
    <line x1="150" y1="0" x2="150" y2="630" />
    <line x1="300" y1="0" x2="300" y2="630" />
    <line x1="450" y1="0" x2="450" y2="630" />
    <line x1="600" y1="0" x2="600" y2="630" />
    <line x1="750" y1="0" x2="750" y2="630" />
    <line x1="900" y1="0" x2="900" y2="630" />
    <line x1="1050" y1="0" x2="1050" y2="630" />
  </g>

  <!-- Outer Border Frame -->
  <rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="#2d2d42" stroke-width="2"/>
  <rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="url(#badgeGrad)" stroke-width="2" stroke-dasharray="140 900"/>

  <!-- TOP BAR: Store Identity + Google Rating Pill -->
  <!-- Left: Brand Tag -->
  <g transform="translate(60, 68)">
    <rect width="360" height="42" rx="21" fill="#1e1e2f" stroke="#ff5a1f" stroke-width="1.5" stroke-opacity="0.4"/>
    <circle cx="22" cy="21" r="7" fill="#ff5a1f"/>
    <text x="38" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#ffffff" letter-spacing="1">THE MOBILE LOUNGE</text>
    <text x="248" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#94a3b8">by Vishal Dist.</text>
  </g>

  <!-- Right: 4.9 Google Reviews Pill -->
  <g transform="translate(800, 68)">
    <rect width="340" height="42" rx="21" fill="#15241b" stroke="#10b981" stroke-width="1.5"/>
    <text x="22" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#fbbf24">★ ★ ★ ★ ★</text>
    <text x="145" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#34d399">4.9 / 5.0</text>
    <text x="220" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#a7f3d0">(420+ Reviews)</text>
  </g>

  <!-- HERO TITLE -->
  <g transform="translate(60, 160)">
    <!-- Location Pill -->
    <rect width="210" height="30" rx="15" fill="#292015" stroke="#f59e0b" stroke-width="1"/>
    <text x="16" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="#fbbf24" letter-spacing="1">📍 KAKOD MANDI • BULANDSHAHR</text>

    <!-- Main Headline Line 1 -->
    <text x="0" y="86" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="900" fill="#ffffff" letter-spacing="-1">
      Kakod's #1 iPhone &amp;
    </text>
    <!-- Main Headline Line 2 (Gradient Colored) -->
    <text x="0" y="152" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="56" font-weight="900" fill="#ff6b2c" letter-spacing="-1">
      5G Smartphone Hub
    </text>

    <!-- Subtitle / Value statement -->
    <text x="0" y="200" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="500" fill="#94a3b8">
      100% Genuine Sealed-Pack Smartphones with Official GST Bill &amp; Indian Warranty
    </text>
  </g>

  <!-- 3 FEATURE VALUE PROPOSITION CARDS -->
  <g transform="translate(60, 395)">
    <!-- Card 1: 0% EMI -->
    <g transform="translate(0, 0)">
      <rect width="345" height="105" rx="16" fill="url(#cardGrad)" stroke="#2e2e46" stroke-width="1.5"/>
      <rect x="18" y="18" width="40" height="40" rx="10" fill="#223229"/>
      <text x="28" y="44" font-size="20">💳</text>
      <text x="70" y="40" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#34d399">₹0 Downpayment EMI</text>
      <text x="70" y="64" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#94a3b8">5-Minute Approval on Aadhaar</text>
      <text x="70" y="84" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#64748b">Bajaj • IDFC • TVS Credit</text>
    </g>

    <!-- Card 2: Free Gift Hamper -->
    <g transform="translate(365, 0)">
      <rect width="345" height="105" rx="16" fill="url(#cardGrad)" stroke="#2e2e46" stroke-width="1.5"/>
      <rect x="18" y="18" width="40" height="40" rx="10" fill="#38251e"/>
      <text x="28" y="44" font-size="20">🎁</text>
      <text x="70" y="40" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#fb923c">Free 5-in-1 Gift Box</text>
      <text x="70" y="64" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#94a3b8">Smartwatch / ANC Earbuds</text>
      <text x="70" y="84" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#64748b">Tempered Glass + Cover Included</text>
    </g>

    <!-- Card 3: Top Exchange Value -->
    <g transform="translate(730, 0)">
      <rect width="350" height="105" rx="16" fill="url(#cardGrad)" stroke="#2e2e46" stroke-width="1.5"/>
      <rect x="18" y="18" width="40" height="40" rx="10" fill="#1e293b"/>
      <text x="28" y="44" font-size="20">🔄</text>
      <text x="70" y="40" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#60a5fa">Best Exchange Value</text>
      <text x="70" y="64" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#94a3b8">Instant Spot Cash Discount</text>
      <text x="70" y="84" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#64748b">Free WhatsApp &amp; Data Transfer</text>
    </g>
  </g>

  <!-- BOTTOM FOOTER BAR -->
  <g transform="translate(60, 535)">
    <!-- Brand Badges -->
    <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#94a3b8" letter-spacing="1.5">
      AUTHORIZED STOCK:
    </text>
    <text x="165" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#ffffff" letter-spacing="1">
      APPLE • SAMSUNG • ONEPLUS • VIVO • REALME • XIAOMI • MOTOROLA
    </text>

    <!-- Contact Info Right -->
    <g transform="translate(810, 2)">
      <rect width="270" height="36" rx="18" fill="#152e20" stroke="#22c55e" stroke-width="1.5"/>
      <text x="18" y="23" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#4ade80">
        📞 WhatsApp: 70172 89590
      </text>
    </g>
  </g>
</svg>
`;

async function run() {
  await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile(outputPath);
  console.log("Successfully generated OG image at:", outputPath);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
