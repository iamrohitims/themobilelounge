import type { Metadata } from "next";
import { ReelsFeed } from "@/components/reels/ReelsFeed";
import curatedReels from "@/data/reels.json";
import { siteConfig } from "@/config/site";
import { Reel } from "@/types/reel";

export const metadata: Metadata = {
  title: "Watch Customer Deliveries & Live Reels | The Mobile Lounge Kakod",
  description:
    "Watch live customer delivery videos, unboxings, 0% EMI demos, and festive gift giveaways directly from @themobilelounge_kakod showroom in Kakod Main Market.",
  openGraph: {
    title: "Watch Customer Deliveries & Live Reels | The Mobile Lounge Kakod",
    description:
      "Watch live customer delivery videos, unboxings, 0% EMI demos, and festive gift giveaways directly from @themobilelounge_kakod showroom in Kakod Main Market.",
    url: `${siteConfig.url}/reels`,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.logo}`,
        width: 800,
        height: 800,
        alt: "The Mobile Lounge Kakod Reels",
      },
    ],
    type: "website",
  },
};

export default function ReelsPage() {
  const initialReels: Reel[] = curatedReels as Reel[];

  return <ReelsFeed initialReels={initialReels} />;
}
