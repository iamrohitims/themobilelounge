import Link from "next/link";
import { Brand } from "@/types/brand";
import { ArrowRight, Sparkles } from "lucide-react";

interface BrandGridProps {
  brands: Brand[];
}

export function BrandGrid({ brands }: BrandGridProps) {
  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-200 dark:border-white/10 pb-3">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#ff5a1f]">
            OFFICIAL BRAND STORE
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-zinc-950 dark:text-white">
            Shop By Official Brand
          </h2>
        </div>
        <Link
          href="/phones"
          className="text-xs sm:text-sm font-bold text-[#ff5a1f] dark:text-[#c5e84a] hover:underline flex items-center gap-1"
        >
          <span>View All Stock ({brands.reduce((acc, b) => acc + b.phoneCount, 0)} Phones)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/phones/brand/${brand.name}`}
            className="bento-card p-4 rounded-2xl bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/10 hover:border-[#ff5a1f] flex flex-col justify-between space-y-3 group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-lg text-zinc-950 dark:text-white group-hover:text-[#ff5a1f] transition">
                {brand.name}
              </span>
              <span className="text-[10px] bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/15 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-full font-bold">
                {brand.phoneCount} Models
              </span>
            </div>

            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-1">{brand.tagline}</p>

            <div className="flex items-center justify-between text-[11px] font-bold text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-white/10 group-hover:text-zinc-950 dark:group-hover:text-white transition">
              <span>View Stock</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition text-[#ff5a1f]" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
