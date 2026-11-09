import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ExitIntentModal } from "@/components/layout/ExitIntentModal";
import { ThemeProvider } from "@/context/ThemeContext";
import { getLocalBusinessSchema } from "@/lib/seo";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Kakod's #1 iPhone & 5G Smartphone Hub`,
    template: `%s | ${siteConfig.name} Kakod`,
  },
  description: siteConfig.description,
  keywords: [
    "mobile shop in Kakod",
    "iPhone shop Kakod",
    "mobile phone store near me Kakod",
    "0% EMI mobile Kakod",
    "Vishal Distributors Kakod",
    "The Mobile Lounge",
    "buy smartphone Kakod Bulandshahr",
    "Samsung Galaxy S24 Kakod",
    "Bajaj Finserv mobile EMI Kakod",
  ],
  authors: [{ name: "The Mobile Lounge by Vishal Distributors" }],
  creator: "The Mobile Lounge",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} | Kakod's #1 iPhone & 5G Smartphone Hub`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Kakod`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Kakod's #1 iPhone & 5G Smartphone Hub`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
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
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = getLocalBusinessSchema();

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
        <script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileActionBar />
          <ExitIntentModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
