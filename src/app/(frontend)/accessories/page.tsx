import type { Metadata } from "next";
import { dataRepo } from "@/lib/repo";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import { ProductCard } from "@/components/product/ProductCard";
import { Sparkles, Headphones, Shield, Zap, Watch } from "lucide-react";

const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

export const metadata: Metadata = {
  title: "Mobile Accessories & Gadgets in Kakod | Chargers, Covers, Earbuds",
  description:
    "Original 20W/65W fast chargers, MagSafe shockproof covers, 9H tempered glass, AMOLED smartwatches, and ANC earbuds at The Mobile Lounge Kakod (by Vishal Distributors) in Bulandshahr.",
  keywords: [
    "mobile accessories Kakod",
    "iPhone charger Kakod",
    "mobile cover shop Bulandshahr",
    "tempered glass installation Kakod Mandi",
    "ANC earbuds smartwatch store Kakod",
    "The Mobile Lounge accessories",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${baseUrl}/accessories`,
    siteName: `${siteConfig.name} (by Vishal Distributors)`,
    title: "Mobile Accessories & Gadgets in Kakod | The Mobile Lounge",
    description:
      "Original Apple/Samsung adapters, military-grade cases, tempered glass & wearables in Kakod.",
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Mobile Lounge Kakod Accessories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Accessories & Gadgets | The Mobile Lounge Kakod",
    description: "Chargers, MagSafe cases, 9H glass & smartwatches in Kakod.",
    images: [`${baseUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/accessories`,
  },
};

export default async function AccessoriesPage() {
  const accessories = await dataRepo.products.getAll("accessory");
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Mobile Accessories", url: "/accessories" },
  ]);

  return (
    <>
      <script
        id="breadcrumb-accessories-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a3e635]/15 border border-[#a3e635]/30 text-[#a3e635] text-xs font-extrabold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ORIGINAL ACCESSORIES & GEN-Z DRIP • KAKOD</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-zinc-950 dark:text-white tracking-tight">
          Trending Mobile Accessories & Gadgets
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          Upgrade your gear with 100% original Apple and Samsung adapters, military-grade MagSafe
          covers, 9H Gorilla glass (free machine fitting in-store), ANC earbuds, and AMOLED
          smartwatches.
        </p>
      </div>

      {/* Category Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bento-card p-4 text-center space-y-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
          <Zap className="w-6 h-6 text-amber-500 dark:text-amber-400 mx-auto" />
          <p className="font-extrabold text-xs text-zinc-950 dark:text-white">Fast Chargers</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">20W / 25W / 65W / 80W</p>
        </div>
        <div className="bento-card p-4 text-center space-y-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
          <Shield className="w-6 h-6 text-[#ff1e42] mx-auto" />
          <p className="font-extrabold text-xs text-zinc-950 dark:text-white">9H Glass & Cases</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Free Machine Fitting</p>
        </div>
        <div className="bento-card p-4 text-center space-y-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
          <Headphones className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto" />
          <p className="font-extrabold text-xs text-zinc-950 dark:text-white">ANC Earbuds</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Deep Bass TWS Pods</p>
        </div>
        <div className="bento-card p-4 text-center space-y-1.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
          <Watch className="w-6 h-6 text-emerald-600 dark:text-[#a3e635] mx-auto" />
          <p className="font-extrabold text-xs text-zinc-950 dark:text-white">Smartwatches</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">AMOLED Calling Watches</p>
        </div>
      </div>

      {/* Accessories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {accessories.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
    </>
  );
}
