"use client";

import { useRef, useMemo } from "react";
import Link from "next/link";
import { Brand } from "@/types/brand";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

interface BrandGridProps {
  brands: Brand[];
}

export function BrandGrid({ brands }: BrandGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sort brands in descending order by number of phones (High to Low)
  const sortedBrands = useMemo(() => {
    return [...brands].sort((a, b) => {
      const countA = a.phoneCount ?? 0;
      const countB = b.phoneCount ?? 0;
      if (countB !== countA) {
        return countB - countA; // High to Low
      }
      return a.name.localeCompare(b.name);
    });
  }, [brands]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const totalPhones = sortedBrands.reduce((acc, b) => acc + (b.phoneCount || 0), 0);

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-200 dark:border-white/10 pb-3">
        <div>
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#ff5a1f] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            OFFICIAL BRAND STORE
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl text-zinc-950 dark:text-white">
            Shop By Brand
          </h2>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/brands"
            className="text-xs sm:text-sm font-black text-[#ff5a1f] dark:text-[#c5e84a] hover:underline flex items-center gap-1 bg-[#ff5a1f]/10 dark:bg-[#c5e84a]/10 px-2.5 py-1 rounded-lg"
          >
            <span>All Brands</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/phones"
            className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-1"
          >
            <span>View All ({totalPhones} Phones)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Desktop Single-Line Scroll Arrows */}
          <div className="hidden sm:flex items-center gap-1.5 ml-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll brands left"
              className="p-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161a26] text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:border-[#ff5a1f] transition active:scale-95 shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll brands right"
              className="p-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#161a26] text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:border-[#ff5a1f] transition active:scale-95 shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Single-Line Scrollable Row */}
      <div className="relative group/brandrow">
        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label="Brand list"
          className="flex items-stretch gap-3 overflow-x-auto scrollbar-none scroll-smooth pb-3 pt-1 px-0.5 focus:outline-hidden"
          style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
        >
          {sortedBrands.map((brand) => {
            const logoSrc = brand.logo && brand.logo.trim() ? brand.logo : "/brand/logo.png";
            const isMonochrome = ["apple", "nothing", "honor"].includes(brand.slug?.toLowerCase());

            return (
              <Link
                key={brand.slug}
                href={`/phones/brand/${brand.name}`}
                style={{ scrollSnapAlign: "start" }}
                className="shrink-0 w-36 sm:w-44 p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#161a26] border border-zinc-200/90 dark:border-white/10 hover:border-[#ff5a1f] dark:hover:border-[#ff5a1f] flex flex-col items-center text-center justify-between group transition-all duration-200 shadow-xs hover:shadow-lg hover:-translate-y-1"
              >
                {/* Brand Logo Container with App Logo Fallback */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 flex items-center justify-center p-2.5 mb-2 group-hover:scale-110 transition-transform duration-200">
                  <img
                    src={logoSrc}
                    alt={`${brand.name} logo`}
                    className={`max-h-full max-w-full object-contain filter transition-transform duration-200 ${
                      isMonochrome ? "dark:invert" : ""
                    }`}
                    onError={(e) => {
                      // Fallback to default app logo if brand logo is missing or broken
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/brand/logo.png";
                    }}
                  />
                </div>

                {/* Brand Name & Phone Count */}
                <div className="w-full">
                  <span className="font-display font-black text-sm sm:text-base text-zinc-950 dark:text-white group-hover:text-[#ff5a1f] transition block truncate">
                    {brand.name}
                  </span>
                  <span className="inline-block mt-1 text-[10px] bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 px-2 py-0.5 rounded-full font-bold">
                    {brand.phoneCount} {brand.phoneCount === 1 ? "Phone" : "Phones"}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-1.5 w-full">
                  {brand.tagline || `Official ${brand.name} Store`}
                </p>

                {/* Bottom View Stock Action */}
                <div className="w-full flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-zinc-400 dark:text-zinc-500 pt-2 border-t border-zinc-100 dark:border-white/10 group-hover:text-[#ff5a1f] transition mt-2">
                  <span>View Stock</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition text-[#ff5a1f]" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
