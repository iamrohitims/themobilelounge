"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/format";
import { Product } from "@/types/product";
import { Sliders, Sparkles, MessageSquare, ArrowRight, Check, Gift } from "lucide-react";

interface BudgetChipsProps {
  phones: Product[];
}

export function BudgetChips({ phones }: BudgetChipsProps) {
  const [selectedBudget, setSelectedBudget] = useState<number>(30000);

  const recommendedPhones = phones
    .filter((p) => {
      const minPrice = Math.min(...p.variants.map((v) => v.mrp));
      return minPrice <= selectedBudget;
    })
    .slice(0, 4);

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200 dark:border-white/10 pb-3">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#ff5a1f]">
            SMART BUDGET RECOMMENDER
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-zinc-950 dark:text-white">
            Find The Best Smartphone Under Your Budget
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1">
            Slide or tap a budget chip to see what fits your pocket in Kakod with ₹0 downpayment EMI!
          </p>
        </div>

        <Link
          href="/phones"
          className="text-xs sm:text-sm font-bold text-[#ff5a1f] dark:text-[#c5e84a] hover:underline flex items-center gap-1 shrink-0 self-start sm:self-end"
        >
          <span>Browse All Phones</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Trips24x7 Inspired Vibrant Chartreuse Container (.bp-card style) */}
      <div className="rounded-3xl bg-[#c5e84a] text-black p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Top Header Row inside Lime Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase bg-black/15 px-3 py-1 rounded-full text-black">
              ⚡ LIVE KAKOD DEALS
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-black mt-2">
              Phones Under {formatPrice(selectedBudget)}
            </h3>
            <p className="text-xs sm:text-sm text-black/80 font-medium">
              Every phone includes <strong className="font-black text-black">Free Gift Box + 0% EMI</strong> at our showroom.
            </p>
          </div>

          <div className="bg-black text-white px-4 py-2 rounded-2xl flex items-baseline gap-2 shrink-0 shadow-lg">
            <span className="text-xs text-zinc-400 font-bold">Estimated 0% EMI:</span>
            <span className="font-black text-lg text-[#c5e84a]">
              ~{formatPrice(Math.round(selectedBudget / 12))}/mo*
            </span>
          </div>
        </div>

        {/* Budget Filter Chips (White Pills on Lime) */}
        <div className="flex flex-wrap gap-2">
          {siteConfig.budgetRanges.map((range) => {
            const isSelected = selectedBudget === range.max;
            return (
              <button
                key={range.slug}
                onClick={() => setSelectedBudget(range.max)}
                className={`text-xs font-black px-4 py-2 rounded-full transition-all duration-200 border ${
                  isSelected
                    ? "bg-black text-[#c5e84a] border-black shadow-md scale-105"
                    : "bg-white text-black border-black/15 hover:bg-black hover:text-white"
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Slider Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-black/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-black/70">
            <span>Slide to adjust budget:</span>
            <span className="font-black text-sm text-black">{formatPrice(selectedBudget)}</span>
          </div>
          <input
            type="range"
            min={10000}
            max={150000}
            step={5000}
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(Number(e.target.value))}
            className="w-full accent-[#ff5a1f]"
          />
          <div className="flex justify-between text-[10px] font-bold text-black/60 pt-1">
            <span>₹10,000</span>
            <span>₹40,000</span>
            <span>₹80,000</span>
            <span>₹1,50,000 (Pro Max)</span>
          </div>
        </div>

        {/* Trips24x7 Inspired Clean White Row List (.bp-list / .bp-row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {recommendedPhones.map((phone) => {
            const variant = phone.variants[0];
            const phoneImage = phone.images[0]?.src || "/products/placeholder.svg";
            const waQuery = `Namaste The Mobile Lounge Kakod! I saw ${phone.name} under my budget on your website. What is today's best deal price and gift offer?`;

            return (
              <div
                key={phone.id}
                className="bg-white rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 shadow-md border border-black/10 hover:shadow-lg transition group"
              >
                {/* Phone Thumbnail */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-zinc-100 p-1 flex-shrink-0 border border-zinc-200">
                  <Image
                    src={phoneImage}
                    alt={phone.name}
                    fill
                    sizes="100px"
                    className="object-contain p-1 group-hover:scale-105 transition"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase text-[#ff5a1f] bg-orange-50 px-2 py-0.2 rounded">
                      {phone.brand}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                      ₹0 Down
                    </span>
                  </div>

                  <Link href={`/phones/${phone.slug}`} className="block">
                    <h4 className="font-display font-black text-sm text-zinc-900 group-hover:text-[#ff5a1f] transition truncate">
                      {phone.name}
                    </h4>
                  </Link>

                  <p className="text-[11px] text-zinc-500 truncate">
                    {phone.highlights[0] || "5G • Dual Camera • Fast Charging"}
                  </p>

                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="text-xs text-zinc-500 font-semibold">MRP:</span>
                    <span className="font-display font-black text-sm text-zinc-900">
                      {formatPrice(variant.mrp)}
                    </span>
                  </div>
                </div>

                {/* Right Action Button */}
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(waQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#ff5a1f] hover:bg-orange-600 text-white font-black text-xs px-3.5 py-2.5 rounded-xl shadow-md transition flex items-center gap-1 shrink-0 transform active:scale-95"
                >
                  <span>Deal ↗</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-black/80 font-bold gap-2">
          <span className="flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-black" />
            <span>Smartwatch / ANC Earbuds guaranteed with every device at our counter!</span>
          </span>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
              `Hi The Mobile Lounge! My budget is around ${formatPrice(selectedBudget)}. Please suggest the top 3 best phones with gifts!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline font-black hover:opacity-80"
          >
            Ask Vishal Bhai on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
