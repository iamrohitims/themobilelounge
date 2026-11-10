import Link from "next/link";
import { Brand } from "@/types/brand";
import { ArrowRight } from "lucide-react";

interface BrandGridProps {
  brands: Brand[];
}

export function BrandGrid({ brands }: BrandGridProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-200 dark:border-white/10 pb-3">
        <div>
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#ff5a1f]">
            OFFICIAL BRAND STORE
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl text-zinc-950 dark:text-white">
            Shop By Brand
          </h2>
        </div>
        <Link
          href="/phones"
          className="text-xs sm:text-sm font-bold text-[#ff5a1f] dark:text-[#c5e84a] hover:underline flex items-center gap-1"
        >
          <span>View All ({brands.reduce((acc, b) => acc + b.phoneCount, 0)} Phones)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3.5">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/phones/brand/${brand.name}`}
            className="bento-card p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/10 hover:border-[#ff5a1f] flex flex-col justify-between space-y-2.5 group transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-base sm:text-lg text-zinc-950 dark:text-white group-hover:text-[#ff5a1f] transition">
                {brand.name}
              </span>
              <span className="text-[9px] sm:text-[10px] bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/15 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded-full font-bold">
                {brand.phoneCount}
              </span>
            </div>

            <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">{brand.tagline}</p>

            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-zinc-400 dark:text-zinc-500 pt-2 border-t border-zinc-100 dark:border-white/10 group-hover:text-zinc-950 dark:group-hover:text-white transition">
              <span>View Stock</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition text-[#ff5a1f]" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
