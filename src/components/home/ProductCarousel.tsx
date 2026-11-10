"use client";

import { useRef } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  badge?: string;
  products: Product[];
  viewAllHref: string;
}

export function ProductCarousel({
  title,
  subtitle,
  badge = "FEATURED",
  products,
  viewAllHref,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="space-y-4">
      {/* Header and Scroll Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200 dark:border-white/10 pb-3">
        <div>
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#ff5a1f]">
            {badge}
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl text-zinc-950 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-end">
          <Link
            href={viewAllHref}
            className="text-xs font-bold text-[#ff5a1f] dark:text-[#c5e84a] hover:underline mr-1 sm:mr-2"
          >
            View All ({products.length}) →
          </Link>

          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-100 hover:bg-[#ff5a1f] hover:text-white dark:bg-white/10 dark:hover:bg-[#ff5a1f] border border-zinc-200 dark:border-white/20 text-zinc-800 dark:text-white flex items-center justify-center transition shadow-xs"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-100 hover:bg-[#ff5a1f] hover:text-white dark:bg-white/10 dark:hover:bg-[#ff5a1f] border border-zinc-200 dark:border-white/20 text-zinc-800 dark:text-white flex items-center justify-center transition shadow-xs"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track with Native Snap-Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 scroll-smooth snap-x snap-mandatory"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="shrink-0 w-[240px] xs:w-[260px] sm:w-[290px] snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
