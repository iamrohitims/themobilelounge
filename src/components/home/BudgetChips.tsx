"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/format";
import { Product } from "@/types/product";
import { Sparkles, MessageSquare, ArrowRight, Gift } from "lucide-react";

interface BudgetChipsProps {
  phones: Product[];
}

export function BudgetChips({ phones }: BudgetChipsProps) {
  const [selectedBudget, setSelectedBudget] = useState<number>(30000);

  const budgetOptions = [
    { label: "Under ₹10,000", max: 10000 },
    { label: "Under ₹15,000", max: 15000 },
    { label: "Under ₹25,000", max: 25000 },
    { label: "Under ₹40,000", max: 40000 },
    { label: "Under ₹80,000", max: 80000 },
    { label: "₹80,000+ Flagships", max: 200000 },
  ];

  const recommendedPhones = phones
    .filter((p) => {
      const minPrice = Math.min(...p.variants.map((v) => v.mrp));
      if (selectedBudget === 200000) return minPrice >= 70000;
      return minPrice <= selectedBudget && minPrice > selectedBudget * 0.45;
    })
    .slice(0, 4);

  // Fallback if filter is empty
  const displayPhones = recommendedPhones.length > 0 ? recommendedPhones : phones.slice(0, 4);

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-200 dark:border-white/10 pb-3">
        <div>
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#ff5a1f]">
            SMART BUDGET RECOMMENDER
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl text-zinc-950 dark:text-white">
            Find Your Next Phone By Budget
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
            Select your budget to view in-stock phones with ₹0 downpayment EMI & free gifts in Kakod.
          </p>
        </div>

        <Link
          href="/phones"
          className="text-xs sm:text-sm font-bold text-[#ff5a1f] dark:text-[#c5e84a] hover:underline flex items-center gap-1 shrink-0 self-start sm:self-end"
        >
          <span>Browse All Phones</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Clean Budget Filter Chips Bar (Horizontal Scroll on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {budgetOptions.map((opt) => {
          const isSelected = selectedBudget === opt.max;
          return (
            <button
              key={opt.label}
              onClick={() => setSelectedBudget(opt.max)}
              className={`text-xs font-black px-3.5 py-2 rounded-xl transition-all duration-200 whitespace-nowrap border shrink-0 ${
                isSelected
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-black border-zinc-950 dark:border-white shadow-md scale-102"
                  : "bg-white dark:bg-[#161a26] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:border-zinc-400"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Compact Recommended Phones Grid (2 cols mobile, 4 cols desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {displayPhones.map((phone) => {
          const variant = phone.variants[0];
          const phoneImage = phone.images[0]?.src || "/products/placeholder.svg";
          const waQuery = `Namaste The Mobile Lounge Kakod! I saw ${phone.name} under ${formatPrice(selectedBudget)} on your website. What is today's best offline deal price and free gift offer?`;
          const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(waQuery)}`;

          return (
            <div
              key={phone.id}
              className="bento-card p-3 rounded-2xl bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/10 hover:border-[#ff5a1f] flex flex-col justify-between space-y-2 group transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {/* Thumbnail */}
              <Link href={`/phones/${phone.slug}`} className="block">
                <div className="relative h-28 sm:h-36 rounded-xl bg-zinc-50 dark:bg-black/40 p-2 flex items-center justify-center border border-zinc-100 dark:border-white/5">
                  <Image
                    src={phoneImage}
                    alt={phone.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-contain p-1 group-hover:scale-105 transition"
                  />
                  <div className="absolute top-1.5 left-1.5">
                    <span className="text-[9px] font-black uppercase text-[#ff5a1f] bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/40 px-1.5 py-0.2 rounded">
                      {phone.brand}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Title & Price */}
              <div className="space-y-1">
                <Link href={`/phones/${phone.slug}`}>
                  <h4 className="font-display font-black text-xs sm:text-sm text-zinc-950 dark:text-white line-clamp-1 group-hover:text-[#ff5a1f] transition">
                    {phone.name}
                  </h4>
                </Link>

                <div className="flex items-baseline justify-between text-[11px]">
                  <span className="text-zinc-500 font-medium">MRP:</span>
                  <span className="font-extrabold text-zinc-900 dark:text-zinc-200">
                    {formatPrice(variant.mrp)}
                  </span>
                </div>

                <div className="text-[10px] text-emerald-700 dark:text-[#c5e84a] font-bold">
                  EMI: ~{formatPrice(Math.round(variant.mrp / 12))}/mo*
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-[11px] py-1.5 rounded-lg flex items-center justify-center gap-1 transition shadow-xs"
              >
                <MessageSquare className="w-3 h-3 fill-current" />
                <span>Ask Deal Price</span>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
