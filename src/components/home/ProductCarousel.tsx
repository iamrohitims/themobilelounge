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
      const offset = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="space-y-4">
      {/* Header and Scroll Buttons (Trips24x7 Style) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200 dark:border-white/10 pb-3">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#ff5a1f]">
            {badge}
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-zinc-950 dark:text-white">
            {title}
          </h2>
          {subtitle && <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-end">
          <Link
            href={viewAllHref}
            className="text-xs font-bold text-[#ff5a1f] dark:text-[#c5e84a] hover:underline mr-2 hidden sm:inline"
          >
            View All ({products.length}) →
          </Link>

          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-[#ff5a1f] hover:text-white dark:bg-white/10 dark:hover:bg-[#ff5a1f] border border-zinc-200 dark:border-white/20 text-zinc-800 dark:text-white flex items-center justify-center transition shadow-md"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-[#ff5a1f] hover:text-white dark:bg-white/10 dark:hover:bg-[#ff5a1f] border border-zinc-200 dark:border-white/20 text-zinc-800 dark:text-white flex items-center justify-center transition shadow-md"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 scroll-smooth"
      >
        {products.map((product) => (
          <div key={product.id} className="shrink-0 w-[275px] sm:w-[300px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
