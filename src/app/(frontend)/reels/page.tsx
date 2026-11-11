import type { Metadata } from "next";
import { ReelsFeed } from "@/components/reels/ReelsFeed";
import { getDetailedReels } from "@/lib/repo";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import { Reel } from "@/types/reel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

export const metadata: Metadata = {
  title: "Watch Customer Deliveries & Live Reels | The Mobile Lounge Kakod",
  description:
    "Watch live customer delivery videos, unboxings, 0% EMI demos, and festive gift giveaways directly from @themobilelounge_kakod showroom in Kakod Main Market.",
  keywords: [
    "mobile lounge instagram reels",
    "customer delivery videos Kakod",
    "iPhone unboxing Kakod Mandi",
    "The Mobile Lounge video reviews",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Watch Customer Deliveries & Live Reels | The Mobile Lounge Kakod",
    description:
      "Watch live customer delivery videos, unboxings, 0% EMI demos, and festive gift giveaways directly from @themobilelounge_kakod showroom in Kakod Main Market.",
    url: `${baseUrl}/reels`,
    siteName: `${siteConfig.name} (by Vishal Distributors)`,
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Mobile Lounge Kakod Reels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Deliveries & Live Reels | The Mobile Lounge Kakod",
    description:
      "Watch real customer unboxings and deliveries at The Mobile Lounge showroom in Kakod.",
    images: [`${baseUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/reels`,
  },
};

export default async function ReelsPage() {
  const initialReels: Reel[] = await getDetailedReels();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Customer Reels", url: "/reels" },
  ]);

  return (
    <>
      <script
        id="breadcrumb-reels-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ReelsFeed initialReels={initialReels} />
    </>
  );
}
