import type { Metadata } from "next";
import { dataRepo } from "@/lib/repo";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import {
  Gift,
  Tag,
  Clock,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

export const metadata: Metadata = {
  title: "Festive Deals & Offers in Kakod | Free Gifts & Discounts (The Mobile Lounge)",
  description:
    "Check today's active offers at The Mobile Lounge Kakod (by Vishal Distributors). Free 5-in-1 gift hampers, ₹0 downpayment 0% EMI schemes, and old phone exchange bonuses in Bulandshahr.",
  keywords: [
    "mobile offers in Kakod",
    "best smartphone deals Kakod",
    "free gifts mobile shop Bulandshahr",
    "iPhone discount Kakod",
    "The Mobile Lounge offers",
    "Vishal Distributors deals",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${baseUrl}/offers`,
    siteName: `${siteConfig.name} (by Vishal Distributors)`,
    title: "Festive Deals & Offers in Kakod | The Mobile Lounge",
    description:
      "Exclusive offline smartphone offers, free smartwatch/earbuds hampers, and ₹0 downpayment EMI in Kakod.",
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Mobile Lounge Kakod Offers & Free Gifts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deals & Offers | The Mobile Lounge Kakod",
    description: "Free gift boxes, 0% EMI and extra exchange bonus in Kakod.",
    images: [`${baseUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/offers`,
  },
};

export default async function OffersPage() {
  const offers = await dataRepo.offers.getAll();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Special Offers", url: "/offers" },
  ]);

  return (
    <>
      <script
        id="breadcrumb-offers-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-6 sm:space-y-8 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff1e42]/15 border border-[#ff1e42]/30 text-[#ff1e42] text-[11px] sm:text-xs font-extrabold uppercase">
          <Gift className="w-3.5 h-3.5" />
          <span>CURRENT DEALS & PROMOTIONS • KAKOD</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl text-zinc-950 dark:text-white tracking-tight">
          Today’s Special Offers & Free Gifts
        </h1>
        <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          Grab guaranteed free gifts, zero-downpayment EMI vouchers, and trade-in bonuses at The
          Mobile Lounge (by Vishal Distributors). Show these offers at our Kakod store counter or
          claim instantly via WhatsApp.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bento-card p-4 sm:p-7 space-y-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-[#ff1e42] text-white text-[10px] sm:text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow">
                  {offer.badge}
                </span>
                {offer.discountValue && (
                  <span className="text-emerald-700 dark:text-[#a3e635] text-[11px] sm:text-xs font-extrabold bg-emerald-500/10 dark:bg-[#a3e635]/10 px-2.5 py-1 rounded-xl">
                    {offer.discountValue}
                  </span>
                )}
              </div>

              <h3 className="font-display font-extrabold text-lg sm:text-2xl text-zinc-950 dark:text-white">
                {offer.title}
              </h3>
              <p className="text-xs text-rose-600 dark:text-rose-300 font-bold">{offer.tagline}</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{offer.description}</p>

              {/* Offer Terms */}
              <div className="pt-2 border-t border-zinc-200 dark:border-white/10 space-y-1">
                <p className="text-[10px] font-extrabold uppercase text-zinc-500">Offer Terms:</p>
                <ul className="text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1">
                  {offer.terms.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#a3e635] shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              {offer.code && (
                <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/15 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-zinc-900 dark:text-white text-center sm:text-left">
                  CODE: <span className="text-emerald-600 dark:text-[#a3e635]">{offer.code}</span>
                </div>
              )}

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  `Namaste The Mobile Lounge Kakod! I want to claim the offer: *${offer.title}* (Code: ${offer.code || "None"}). Please confirm availability.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#a3e635] hover:bg-lime-400 text-black font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition sm:ml-auto shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>Claim on WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
