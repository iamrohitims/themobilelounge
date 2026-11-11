import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ExitIntentModal } from "@/components/layout/ExitIntentModal";
import { ThemeProvider } from "@/context/ThemeContext";
import {
  getLocalBusinessSchema,
  getWebSiteSchema,
  getOrganizationSchema,
} from "@/lib/seo";
import { getStoreSettings } from "@/lib/services/site-settings";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.name} | Kakod's #1 iPhone, 5G Smartphone & Gadget Hub`,
    template: `%s | ${siteConfig.name} Kakod`,
  },
  description: siteConfig.description,
  keywords: [
    "mobile shop in Kakod",
    "iPhone shop Kakod",
    "mobile phone store near me Kakod",
    "best smartphone showroom Kakod",
    "0% EMI mobile Kakod",
    "Vishal Distributors Kakod",
    "The Mobile Lounge Kakod",
    "buy smartphone Kakod Bulandshahr",
    "Samsung Galaxy store Kakod",
    "OnePlus store Kakod Mandi",
    "Vivo 5G mobile shop Kakod",
    "Bajaj Finserv mobile EMI Kakod",
    "old phone exchange Kakod",
    "mobile accessories shop Bulandshahr",
    "mobile store Jahangirpur Dankaur",
  ],
  authors: [{ name: "The Mobile Lounge (by Vishal Distributors)", url: baseUrl }],
  creator: "The Mobile Lounge",
  publisher: "Vishal Distributors",
  category: "Shopping & Consumer Electronics",
  classification: "Mobile Phone Store, Consumer Electronics Retailer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: baseUrl,
    title: `${siteConfig.name} | Kakod's #1 iPhone, 5G Smartphone & Gadget Hub`,
    description:
      "Kakod's top-rated mobile showroom (by Vishal Distributors). Sealed-pack Apple iPhones, Samsung Galaxy, OnePlus, Vivo with ₹0 downpayment 0% EMI, GST bill & free gift hampers.",
    siteName: `${siteConfig.name} (by Vishal Distributors)`,
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Mobile Lounge Kakod - #1 Smartphone & Gadget Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Kakod's #1 iPhone & 5G Smartphone Hub`,
    description:
      "Buy sealed-pack Apple iPhones & 5G smartphones in Kakod with ₹0 downpayment 0% EMI and free gifts. 4.9★ Google verified rating.",
    images: [`${baseUrl}/og/og-image.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/logo-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/logo.png", sizes: "1080x1080", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: baseUrl,
  },
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Kakod, Bulandshahr, Uttar Pradesh",
    "geo.position": "28.256;77.834",
    ICBM: "28.256, 77.834",
    "business:contact_data:street_address": "Main Market, Near Vishal Distributors",
    "business:contact_data:locality": "Kakod",
    "business:contact_data:region": "Uttar Pradesh",
    "business:contact_data:postal_code": "203201",
    "business:contact_data:country_name": "India",
    "business:contact_data:phone_number": "+917017289590",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [localBusinessSchema, storeSettings] = await Promise.all([
    getLocalBusinessSchema(),
    getStoreSettings(),
  ]);

  const webSiteSchema = getWebSiteSchema();
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${plusJakartaSans.variable} ${inter.variable} min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans selection:bg-[#ff5a1f] selection:text-white transition-colors duration-250`}
      >
        <script
          id="theme-init"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('tml_theme');var m=window.matchMedia('(prefers-color-scheme: dark)');if(s==='dark'||(!s&&m.matches)){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}}catch(e){}})();`,
          }}
        />
        {/* Core Structured Data Schemas for Google Knowledge Graph & Local Pack */}
        <script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <ThemeProvider>
          <Header siteLogo={storeSettings.siteLogo} />
          <main className="flex-1 pb-16 sm:pb-0">{children}</main>
          <Footer siteLogo={storeSettings.siteLogo} />
          <MobileActionBar />
          <ExitIntentModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
