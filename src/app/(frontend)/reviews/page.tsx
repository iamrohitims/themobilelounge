import type { Metadata } from "next";
import { dataRepo } from "@/lib/repo";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import { Star, CheckCircle2, MessageSquare, ThumbsUp, ShieldCheck } from "lucide-react";

const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

export const metadata: Metadata = {
  title: "Customer Reviews & Ratings (4.9★) | The Mobile Lounge Kakod",
  description:
    "Read genuine customer reviews for The Mobile Lounge in Kakod (by Vishal Distributors). 4.9/5 stars based on 420+ verified buyers of Apple iPhones, Samsung, and 5G smartphones in Bulandshahr.",
  keywords: [
    "The Mobile Lounge Kakod reviews",
    "Vishal Distributors reviews",
    "best mobile shop ratings Kakod",
    "customer experiences smartphone store Kakod",
    "Google reviews The Mobile Lounge",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${baseUrl}/reviews`,
    siteName: `${siteConfig.name} (by Vishal Distributors)`,
    title: "Customer Reviews (4.9★) | The Mobile Lounge Kakod",
    description:
      "4.9 / 5.0 Google Rating from 420+ happy customers in Kakod, Jahangirpur, and Dankaur.",
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Mobile Lounge Kakod 4.9 Star Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Reviews (4.9★) | The Mobile Lounge Kakod",
    description: "420+ verified reviews for iPhones, Samsung & 0% EMI in Kakod.",
    images: [`${baseUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/reviews`,
  },
};

export default async function ReviewsPage() {
  const [reviews, stats] = await Promise.all([
    dataRepo.reviews.getAll(),
    dataRepo.reviews.getStats(),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Customer Reviews", url: "/reviews" },
  ]);

  return (
    <>
      <script
        id="breadcrumb-reviews-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Header & Rating Overview */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a3e635]/15 border border-[#a3e635]/30 text-emerald-700 dark:text-[#a3e635] text-xs font-extrabold uppercase">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>VERIFIED STORE FEEDBACK • 4.9 / 5.0 RATING</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-zinc-950 dark:text-white tracking-tight">
          What Kakod Says About Us
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Real reviews from real local customers who bought their sealed-pack smartphones, claimed
          free gifts, and enjoyed 5-minute EMI approval at The Mobile Lounge.
        </p>
      </div>

      {/* Stats Summary Bar */}
      <div className="bento-card p-6 sm:p-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="font-display font-extrabold text-5xl text-zinc-950 dark:text-white">4.9</div>
          <div className="space-y-1">
            <div className="flex text-amber-500 dark:text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Based on Google & In-Store Customer Ratings in Kakod
            </p>
          </div>
        </div>

        <a
          href="https://g.page/r/themobilelounge/review"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-extrabold text-xs px-5 py-3 rounded-2xl transition shadow-md shrink-0 flex items-center gap-2"
        >
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>Write a Review on Google</span>
        </a>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bento-card p-5 sm:p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff1e42] to-amber-500 text-white font-extrabold text-sm flex items-center justify-center">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-sm text-zinc-950 dark:text-white">{rev.author}</h4>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.2 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    📍 {rev.location} • Bought: <strong className="text-zinc-800 dark:text-zinc-200">{rev.phoneBought}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-amber-500 dark:text-amber-400">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pt-1">
              &quot;{rev.comment}&quot;
            </p>

            <div className="pt-2 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
              <span>Source: {rev.source} Reviews</span>
              <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                <ThumbsUp className="w-3 h-3" />
                <span>{rev.helpfulCount} people found this helpful</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
