"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductVariant } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import { useCompareStore } from "@/store/compare";
import { useWishlistStore } from "@/store/wishlist";
import { EMICalculator } from "@/components/emi/EMICalculator";
import { ProductCard } from "@/components/product/ProductCard";
import { siteConfig } from "@/config/site";
import {
  MessageSquare,
  ArrowLeftRight,
  Heart,
  ShieldCheck,
  Gift,
  Check,
  Star,
  Tag,
  CreditCard,
  ChevronRight,
  MapPin,
  Cpu,
  Camera,
  Battery,
  Layers,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  similarProducts: Product[];
  accessories: Product[];
}

export function ProductDetailClient({
  product,
  similarProducts,
  accessories,
}: ProductDetailClientProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const activeVariant: ProductVariant =
    product.variants[selectedVariantIndex] || product.variants[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { items: compareItems, addItem: addCompare, removeItem: removeCompare } =
    useCompareStore();
  const { isInWishlist, toggleItem: toggleWishlist } = useWishlistStore();

  const inCompare = compareItems.some((p) => p.id === product.id);
  const inWish = isInWishlist(product.id);

  const emiPerMonth =
    product.minEmiPerMonth || Math.round(activeVariant.mrp / 12);

  const currentUrl = `${siteConfig.url}/phones/${product.slug}`;
  const whatsappUrl = getProductWhatsAppUrl(product, activeVariant, currentUrl);
  const activeImage = product.images[activeImageIndex] || product.images[0];

  // Dynamic real-spec story cards tailored to this specific phone
  const dynamicStoryCards = [
    {
      title: "Processor & Performance",
      subtitle: product.specs.performance?.["Processor"] || product.specs.performance?.["Chipset"] || "High-Speed Octa-Core",
      desc: `Powered by ${product.specs.performance?.["Processor"] || product.specs.performance?.["Chipset"] || "advanced architecture"} with high efficiency cores for gaming, smooth multitasking, and everyday speed.`,
      icon: Cpu,
      badge: "PERFORMANCE",
    },
    {
      title: "Camera & Photography",
      subtitle: product.specs.camera?.["Main"] || product.specs.camera?.["Setup"] || "AI Ultra Camera",
      desc: `Capture stunning high-resolution details with ${product.specs.camera?.["Main"] || "advanced camera setup"} and smart optical processing for day and low-light shots.`,
      icon: Camera,
      badge: "PRO CAMERA",
    },
    {
      title: "Display & Viewing Experience",
      subtitle: product.specs.display?.["Size & Type"] || product.specs.display?.["Size"] || "Immersive Display",
      desc: `Experience sharp, vibrant visuals with ${product.specs.display?.["Resolution"] || "FHD+ clarity"} and ${product.specs.display?.["Refresh Rate"] || "smooth refresh rate"} for movies, social reels, and games.`,
      icon: Layers,
      badge: "DISPLAY",
    },
    {
      title: "Battery & Charging",
      subtitle: `${product.specs.battery?.["Capacity"] || "5000 mAh"} • ${product.specs.battery?.["Charging"] || "Fast Charging"}`,
      desc: `All-day power with ${product.specs.battery?.["Capacity"] || "long-lasting capacity"} and ${product.specs.battery?.["Charging"] || "rapid power delivery"} to keep you connected all day long.`,
      icon: Battery,
      badge: "BATTERY",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-8 sm:space-y-10">
      {/* 1. Flipkart Style Breadcrumb Bar */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 overflow-x-auto no-scrollbar py-1">
        <Link href="/" className="hover:text-zinc-950 dark:hover:text-white shrink-0">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
        <Link href="/phones" className="hover:text-zinc-950 dark:hover:text-white shrink-0">
          Phones
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
        <Link href={`/phones/brand/${product.brand}`} className="hover:text-zinc-950 dark:hover:text-white shrink-0">
          {product.brand}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
        <span className="text-zinc-900 dark:text-zinc-200 font-bold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main Top Grid: Gallery + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Gallery Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            {/* Thumbnail Rail */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[420px] no-scrollbar shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={`${img.src}-${idx}`}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition p-1 bg-white dark:bg-zinc-900 shrink-0 ${
                      activeImageIndex === idx
                        ? "border-[#ff5a1f] shadow-md scale-102"
                        : "border-zinc-200 dark:border-white/10 hover:border-zinc-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt || product.name}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image Stage */}
            <div className="relative flex-1 h-72 sm:h-96 md:h-[420px] rounded-3xl bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-900/90 dark:to-black/80 border border-zinc-200 dark:border-white/10 p-4 flex items-center justify-center overflow-hidden shadow-inner">
              {/* Wishlist & Compare Quick Floating Buttons */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                <button
                  onClick={() => {
                    if (inCompare) removeCompare(product.id);
                    else addCompare(product);
                  }}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition border ${
                    inCompare
                      ? "bg-[#ff5a1f] border-[#ff5a1f] text-white"
                      : "bg-white/90 dark:bg-black/75 border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-zinc-300"
                  }`}
                  title="Compare"
                  aria-label="Compare"
                >
                  {inCompare ? <Check className="w-3.5 h-3.5" /> : <ArrowLeftRight className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition border ${
                    inWish
                      ? "bg-rose-500 border-rose-500 text-white"
                      : "bg-white/90 dark:bg-black/75 border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-zinc-300 hover:text-rose-500"
                  }`}
                  title="Wishlist"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${inWish ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-[#ff5a1f] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md">
                  100% SEALED PACK
                </span>
              </div>

              {/* The Phone Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt || product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-contain p-2 drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
                  priority
                />
              </div>

              {/* Free Gift Strip */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[10px] pointer-events-none">
                <span className="bg-white/95 dark:bg-black/90 backdrop-blur-md text-[#3f6212] dark:text-[#c5e84a] border border-[#c5e84a]/50 font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Gift className="w-3 h-3 text-amber-500" />
                  <span>Free Smartwatch / ANC Buds</span>
                </span>
                <span className="bg-white/95 dark:bg-black/90 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded-lg font-bold border border-zinc-200 dark:border-white/10 shadow-sm">
                  In Stock Kakod
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Details Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Title & Brand */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#ff5a1f] uppercase tracking-wider">
                {product.brand} OFFICIAL
              </span>
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{product.warranty}</span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-zinc-950 dark:text-white leading-tight">
              {product.name} ({activeVariant.color}, {activeVariant.storage ? `${activeVariant.storage} GB` : "Standard"})
            </h1>

            {product.subtitle && (
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                {product.subtitle}
              </p>
            )}

            {/* Rating & Verified Badge */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <div className="inline-flex items-center gap-1 bg-emerald-600 text-white font-black px-2 py-0.5 rounded-md shadow-xs">
                <span>4.8</span>
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">Verified Customer Favorite</span>
              <span className="bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 font-black px-2 py-0.5 rounded-full">
                ✓ Kakod Store Verified
              </span>
            </div>
          </div>

          {/* Pricing & High-Converting WhatsApp Deal Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161a26] border-2 border-zinc-200 dark:border-white/15 space-y-3.5 shadow-md">
            <div>
              <p className="text-[10px] sm:text-[11px] font-black text-[#65a30d] dark:text-[#c5e84a] uppercase tracking-wider">
                🔥 SPECIAL OFFLINE STORE DEAL
              </p>
              <div className="flex flex-wrap items-baseline gap-2.5 mt-1">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Official Brand MRP:</span>
                <span className="font-display font-black text-2xl sm:text-3xl text-zinc-950 dark:text-zinc-100">
                  {formatPrice(activeVariant.mrp)}
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/15 px-2 py-0.5 rounded">
                  Counter Deal Beats Online
                </span>
              </div>
            </div>

            {/* Single Unified High-Converting CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#ff5a1f] to-rose-600 hover:opacity-95 text-white font-black text-xs sm:text-sm py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition transform active:scale-98"
              >
                <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                <span>Unlock Today’s Deal on WhatsApp</span>
              </a>

              <a
                href={siteConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#c5e84a] hover:bg-lime-400 text-black font-black text-xs sm:text-sm py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition transform active:scale-98"
              >
                <MapPin className="w-4 h-4 text-black shrink-0" />
                <span>Visit Kakod Showroom</span>
              </a>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 text-zinc-600 dark:text-zinc-300">
              <span>
                💳 <strong>0% No Cost EMI:</strong> Instant 5-min approval on Aadhaar & PAN
              </span>
              <span className="text-[#3f6212] dark:text-[#c5e84a] font-black bg-[#c5e84a]/20 px-2 py-0.5 rounded-lg border border-[#c5e84a]/30 self-start sm:self-auto">
                Starts ~{formatPrice(emiPerMonth)}/mo*
              </span>
            </div>
          </div>

          {/* Color & Storage Selectors */}
          <div className="space-y-3.5 pt-1">
            {/* Colors */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Color:</span>
                <span className="font-black text-zinc-900 dark:text-white">{activeVariant.color}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={`${v.color}-${idx}`}
                    onClick={() => {
                      setSelectedVariantIndex(idx);
                      const matchingImgIdx = product.images.findIndex(
                        (img) => img.color === v.color
                      );
                      if (matchingImgIdx !== -1) setActiveImageIndex(matchingImgIdx);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                      selectedVariantIndex === idx
                        ? "border-[#ff5a1f] bg-[#ff5a1f]/10 dark:bg-[#ff5a1f]/20 text-[#ff5a1f] dark:text-white font-black shadow-xs"
                        : "border-zinc-200 dark:border-white/15 bg-zinc-100 dark:bg-[#161a26] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                    }`}
                  >
                    {v.colorHex && (
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/20 shadow-inner"
                        style={{ backgroundColor: v.colorHex }}
                      />
                    )}
                    <span>{v.color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                Storage:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={`${v.storage}-${idx}`}
                    onClick={() => {
                      setSelectedVariantIndex(idx);
                      const matchingImgIdx = product.images.findIndex(
                        (img) => img.color === v.color
                      );
                      if (matchingImgIdx !== -1) setActiveImageIndex(matchingImgIdx);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                      selectedVariantIndex === idx
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-black border-zinc-950 dark:border-white shadow-xs font-black"
                        : "bg-zinc-100 dark:bg-[#161a26] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/15 hover:border-zinc-300"
                    }`}
                  >
                    {v.storage
                      ? v.storage >= 1000
                        ? `${v.storage / 1000} TB`
                        : `${v.storage} GB`
                      : "Standard"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-black text-zinc-950 dark:text-white uppercase tracking-wider">
              ⚡ Key Highlights:
            </h4>
            <div className="bg-zinc-50 dark:bg-[#161a26] rounded-2xl p-3.5 border border-zinc-200 dark:border-white/15 space-y-1.5">
              {product.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-200">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#c5e84a] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
              <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-200">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#c5e84a] shrink-0 mt-0.5" />
                <span>{product.warranty} with Store Assistance at Kakod Counter</span>
              </div>
            </div>
          </div>

          {/* In-Store Assurances Strip */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#ff5a1f] shrink-0" />
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Free Gift Box</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600 dark:text-lime-400 shrink-0" />
              <span className="font-bold text-zinc-800 dark:text-zinc-200">₹0 Down EMI</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Real Feature Story Cards (Dynamic from real specs) */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-white/15">
        <div className="space-y-1">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#ff5a1f]">
            SPEC HIGHLIGHTS
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-zinc-950 dark:text-white">
            Performance & Features: {product.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {dynamicStoryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bento-card p-4 rounded-2xl bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/15 space-y-2.5 shadow-sm hover:border-[#ff5a1f]/50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/15 flex items-center justify-center text-[#ff5a1f] dark:text-[#c5e84a]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black uppercase text-[#ff5a1f] bg-orange-50 dark:bg-black/40 px-2 py-0.5 rounded-full border border-orange-200 dark:border-white/10">
                    {card.badge}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h3 className="font-display font-black text-sm text-zinc-950 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#ff5a1f] dark:text-[#c5e84a] font-bold line-clamp-1">
                    {card.subtitle}
                  </p>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Specifications Sheet */}
      <section className="bento-card p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/15 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-white/15">
          <div>
            <h3 className="font-display font-black text-lg sm:text-xl text-zinc-950 dark:text-white">
              Full Technical Specifications
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Official manufacturer hardware specifications.
            </p>
          </div>
          <span className="text-xs font-black text-emerald-800 dark:text-[#c5e84a] bg-emerald-50 dark:bg-black/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-white/10 w-fit">
            ✓ Genuine Stock
          </span>
        </div>

        {/* Grouped Spec Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specs).map(([sectionKey, sectionObj]) => {
            const sectionTitles: Record<string, string> = {
              display: "Display Features",
              performance: "OS & Processor Features",
              camera: "Camera Features",
              battery: "Battery & Power Features",
              connectivity: "Connectivity Features",
              design: "Dimensions & Build Details",
            };

            return (
              <div key={sectionKey} className="space-y-1.5">
                <h4 className="font-display font-black text-xs text-[#ff5a1f] uppercase tracking-wider">
                  {sectionTitles[sectionKey] || sectionKey}
                </h4>
                <div className="rounded-xl border border-zinc-200 dark:border-white/15 overflow-hidden bg-zinc-50 dark:bg-black/40">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
                      {Object.entries(sectionObj).map(([key, val]) => (
                        <tr key={key} className="hover:bg-zinc-100 dark:hover:bg-white/5 transition">
                          <td className="p-2.5 w-2/5 font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-white/2 break-words">
                            {key}
                          </td>
                          <td className="p-2.5 text-zinc-900 dark:text-zinc-100 font-semibold break-words">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        {/* In The Box & Warranty Summary */}
        <div className="space-y-1.5 pt-2">
          <h4 className="font-display font-black text-xs text-[#ff5a1f] uppercase tracking-wider">
            In The Box & Warranty Summary
          </h4>
          <div className="rounded-xl border border-zinc-200 dark:border-white/15 overflow-hidden bg-zinc-50 dark:bg-black/40">
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
                <tr>
                  <td className="p-2.5 w-2/5 sm:w-1/4 font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-white/2">In The Box</td>
                  <td className="p-2.5 text-zinc-900 dark:text-zinc-100 font-semibold">
                    {product.boxContents.join(", ")}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 w-2/5 sm:w-1/4 font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-white/2">
                    Warranty
                  </td>
                  <td className="p-2.5 text-zinc-900 dark:text-zinc-100 font-semibold">
                    {product.warranty} Official Brand Domestic Warranty across Authorized Service Centers
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 w-2/5 sm:w-1/4 font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-white/2">
                    Store Assistance
                  </td>
                  <td className="p-2.5 text-emerald-800 dark:text-[#c5e84a] font-bold">
                    The Mobile Lounge, Main Market, Kakod (by Vishal Distributors)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Inline EMI Calculator */}
      <section className="space-y-3">
        <EMICalculator
          initialPrice={activeVariant.mrp}
          productName={`${product.name} (${activeVariant.color})`}
        />
      </section>

      {/* 6. Similar Phones in Stock */}
      {similarProducts.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-display font-black text-lg sm:text-xl text-zinc-950 dark:text-white">
            📱 Similar {product.brand} Smartphones in Kakod
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
