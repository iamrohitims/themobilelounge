"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { useCompareStore } from "@/store/compare";
import { useWishlistStore } from "@/store/wishlist";
import {
  MessageSquare,
  ArrowLeftRight,
  Heart,
  Check,
  Gift,
  Star,
  ArrowRight,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const { items: compareItems, addItem: addCompare, removeItem: removeCompare } =
    useCompareStore();
  const { isInWishlist, toggleItem: toggleWishlist } = useWishlistStore();

  const inCompare = compareItems.some((p) => p.id === product.id);
  const inWish = isInWishlist(product.id);

  // EMI calculated on MRP for transparent customer reference
  const emiPerMonth =
    product.minEmiPerMonth || Math.round(activeVariant.mrp / 12);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeCompare(product.id);
    } else {
      const res = addCompare(product);
      if (!res.success && res.message) {
        alert(res.message);
      }
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const primaryImage =
    product.images.find((img) => img.color === activeVariant.color) ||
    product.images[0];

  const waQuery = `Namaste The Mobile Lounge Kakod! What is your best offer & deal price for *${product.name} (${activeVariant.color}${activeVariant.storage ? ` - ${activeVariant.storage}GB` : ""})* (Official MRP ${formatPrice(activeVariant.mrp)})? Is today's free gift hamper available?`;
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(waQuery)}`;

  return (
    <div className="bento-card group p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/10 hover:border-[#ff5a1f]/60 transition-all duration-300 shadow-md hover:shadow-xl dark:shadow-xl">
      <div className="space-y-3">
        {/* Top Image Showcase Frame */}
        <div className="relative h-48 sm:h-56 rounded-2xl bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-900/90 dark:to-black/80 border border-zinc-200 dark:border-white/10 p-3 flex items-center justify-center overflow-hidden">
          {/* Top Tag Badges */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
            {product.tags.includes("flagship") ? (
              <span className="bg-[#ff5a1f] text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                👑 FLAGSHIP
              </span>
            ) : product.tags.includes("new") ? (
              <span className="bg-[#c5e84a] text-black text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                ⚡ NEW LAUNCH
              </span>
            ) : product.tags.includes("bestseller") ? (
              <span className="bg-amber-400 text-black text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                🔥 BESTSELLER
              </span>
            ) : (
              <span className="bg-zinc-800 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full">
                5G READY
              </span>
            )}
            <span className="bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.2 rounded-full backdrop-blur-md">
              ₹0 DOWNPAYMENT
            </span>
          </div>

          {/* Top Right Quick Actions (Rating & Compare/Wishlist) */}
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1">
            <button
              onClick={handleCompareClick}
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition border ${
                inCompare
                  ? "bg-[#ff5a1f] border-[#ff5a1f] text-white"
                  : "bg-white/90 dark:bg-black/75 border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white shadow-sm"
              }`}
              title={inCompare ? "Remove from compare" : "Add to compare"}
              aria-label="Compare"
            >
              {inCompare ? <Check className="w-3 h-3" /> : <ArrowLeftRight className="w-3 h-3" />}
            </button>

            <button
              onClick={handleWishlistClick}
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition border ${
                inWish
                  ? "bg-rose-500 border-rose-500 text-white"
                  : "bg-white/90 dark:bg-black/75 border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-zinc-300 hover:text-rose-500 shadow-sm"
              }`}
              title={inWish ? "Remove from wishlist" : "Add to wishlist"}
              aria-label="Wishlist"
            >
              <Heart className={`w-3 h-3 ${inWish ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Real Phone Photography Image with Link */}
          <Link href={`/phones/${product.slug}`} className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full transform group-hover:scale-105 transition duration-300">
              <Image
                src={primaryImage.src}
                alt={primaryImage.alt || product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                priority={false}
              />
            </div>
          </Link>

          {/* Bottom Gift Overlay */}
          <div className="absolute bottom-2 inset-x-2 flex items-center justify-between pointer-events-none text-[9px] sm:text-[10px]">
            <span className="bg-white/90 dark:bg-black/85 backdrop-blur-md text-[#3f6212] dark:text-[#c5e84a] border border-[#c5e84a]/60 font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
              <Gift className="w-2.5 h-2.5 text-amber-500 dark:text-amber-300" />
              <span>+Free Gift Box</span>
            </span>
            <span className="bg-white/90 dark:bg-black/85 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-semibold border border-zinc-200 dark:border-white/10 shadow-sm">
              Ready in Kakod
            </span>
          </div>
        </div>

        {/* Title, Brand, Variant Selectors */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-black text-[#ff5a1f] uppercase tracking-wider">
              {product.brand}
            </span>
            <span className="font-extrabold text-[#3f6212] dark:text-[#c5e84a] bg-[#c5e84a]/20 px-1.5 py-0.5 rounded text-[10px] border border-[#c5e84a]/30">
              0% EMI: ~{formatPrice(emiPerMonth)}/mo*
            </span>
          </div>

          <Link href={`/phones/${product.slug}`} className="block">
            <h3 className="font-display font-black text-sm sm:text-base text-zinc-950 dark:text-white hover:text-[#ff5a1f] dark:hover:text-[#c5e84a] transition leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Storage / Variant Pills */}
          <div className="flex flex-wrap gap-1 pt-0.5">
            {product.variants.map((v, idx) => (
              <button
                key={`${v.color}-${v.storage || idx}`}
                onClick={() => setSelectedVariantIndex(idx)}
                className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md transition border ${
                  selectedVariantIndex === idx
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-black border-zinc-950 dark:border-white shadow-xs font-black"
                    : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30"
                }`}
              >
                {v.storage ? (v.storage >= 1000 ? `${v.storage / 1000}TB` : `${v.storage}GB`) : v.color}
              </button>
            ))}
          </div>

          {/* Clean Price Strip */}
          <div className="pt-2 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium text-[11px]">MRP:</span>
            <span className="font-display font-black text-sm sm:text-base text-zinc-950 dark:text-zinc-100">
              {formatPrice(activeVariant.mrp)}
            </span>
          </div>
        </div>
      </div>

      {/* Clean Unified Action Row (No duplicate WhatsApp buttons!) */}
      <div className="grid grid-cols-5 gap-1.5 pt-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-3 bg-gradient-to-r from-[#ff5a1f] to-rose-600 hover:opacity-95 text-white font-black text-xs py-2 px-2 rounded-xl flex items-center justify-center gap-1 shadow-sm transition transform active:scale-98"
          title="Unlock deal price on WhatsApp"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span className="truncate">Unlock Deal ↗</span>
        </a>

        <Link
          href={`/phones/${product.slug}`}
          className="col-span-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/15 font-bold text-xs py-2 px-1.5 rounded-xl flex items-center justify-center gap-0.5 transition"
        >
          <span>Specs</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
