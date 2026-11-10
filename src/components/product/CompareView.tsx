"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCompareStore } from "@/store/compare";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import {
  ArrowLeftRight,
  Trash2,
  Plus,
  MessageSquare,
  X,
  MoveHorizontal,
} from "lucide-react";

interface CompareViewProps {
  allPhones: Product[];
}

export function CompareView({ allPhones }: CompareViewProps) {
  const { items, removeItem, clearAll, addItem } = useCompareStore();
  const [highlightDifferences, setHighlightDifferences] = useState(true);

  const emptySlotsCount = Math.max(0, 3 - items.length);

  const compareFields: {
    label: string;
    getValue: (p: Product) => string | number;
  }[] = [
    { label: "Official MRP", getValue: (p) => formatPrice(p.variants[0]?.mrp || 0) },
    {
      label: "Est. 0% EMI",
      getValue: (p) =>
        `${formatPrice(p.minEmiPerMonth || Math.round((p.variants[0]?.mrp || 0) / 12))}/mo`,
    },
    { label: "Brand", getValue: (p) => p.brand },
    {
      label: "Display",
      getValue: (p) => p.specs.display["Size & Type"] || p.specs.display["Size"] || "AMOLED",
    },
    {
      label: "Processor",
      getValue: (p) =>
        p.specs.performance["Processor"] ||
        p.specs.performance["Chipset"] ||
        p.specs.performance["Chip"] ||
        "Octa-Core 5G",
    },
    {
      label: "Main Camera",
      getValue: (p) => p.specs.camera["Main"] || p.specs.camera["Setup"] || "50MP AI",
    },
    {
      label: "Battery & Charging",
      getValue: (p) => {
        const cap = p.specs.battery["Capacity"] || "5000 mAh";
        const chg = p.specs.battery["Charging"] || "Fast Charging";
        return `${cap} • ${chg}`;
      },
    },
    {
      label: "5G Support",
      getValue: (p) => (p.tags.includes("5g") || p.name.includes("5G") ? "Yes (Dual 5G)" : "4G LTE"),
    },
    { label: "Warranty", getValue: (p) => p.warranty },
    {
      label: "Free Gifts at Kakod",
      getValue: (p) => p.freeGiftBundle?.join(", ") || "Smartwatch / Earbuds + 9H Glass + Case",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5a1f]/15 border border-[#ff5a1f]/30 text-[#ff5a1f] text-xs font-extrabold uppercase mb-1">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>SIDE-BY-SIDE SMARTPHONE COMPARISON</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-zinc-950 dark:text-white">
            Compare Smartphones in Kakod
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
            Compare specs, offline deal prices, and monthly EMI for up to 3 phones side-by-side.
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={highlightDifferences}
                onChange={(e) => setHighlightDifferences(e.target.checked)}
                className="rounded bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-white/20 text-[#ff5a1f] focus:ring-0"
              />
              <span>Highlight Differences</span>
            </label>

            <button
              onClick={clearAll}
              className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 px-3 py-1.5 rounded-xl transition shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Swipe Hint on Mobile */}
      {items.length > 0 && (
        <div className="sm:hidden flex items-center gap-1.5 text-[11px] text-zinc-500 bg-zinc-100 dark:bg-white/5 px-3 py-1.5 rounded-xl w-fit">
          <MoveHorizontal className="w-3.5 h-3.5 text-[#ff5a1f]" />
          <span>Swipe left / right to compare phones</span>
        </div>
      )}

      {/* Comparison Grid Matrix */}
      {items.length === 0 ? (
        <div className="bento-card p-8 sm:p-12 text-center space-y-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm">
          <p className="text-4xl">⚖️</p>
          <h3 className="font-display font-extrabold text-xl text-zinc-950 dark:text-white">
            No phones in your compare list
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            Browse our Kakod smartphone catalogue and tap the compare icon on any phone card to
            compare side-by-side.
          </p>
          <div className="pt-2">
            <Link
              href="/phones"
              className="bg-[#ff5a1f] hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl inline-flex items-center gap-2 shadow-md transition"
            >
              <span>Browse Smartphones</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bento-card rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 shadow-md">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-xs text-left min-w-[580px] sm:min-w-[700px]">
              {/* Table Header: Phone Cards */}
              <thead className="bg-zinc-50 dark:bg-[#101016] border-b border-zinc-200 dark:border-white/10">
                <tr>
                  <th className="sticky left-0 bg-zinc-50 dark:bg-[#101016] z-20 p-3 sm:p-4 w-32 sm:w-44 text-zinc-500 dark:text-zinc-400 uppercase text-[10px] sm:text-[11px] font-extrabold shadow-[2px_0_6px_rgba(0,0,0,0.06)]">
                    Feature
                  </th>
                  {items.map((p) => {
                    const variant = p.variants[0];
                    return (
                      <th key={p.id} className="p-3 sm:p-4 w-48 sm:w-60 align-top">
                        <div className="space-y-2.5">
                          <div className="relative h-32 sm:h-36 bg-zinc-100 dark:bg-black/60 rounded-2xl p-2 border border-zinc-200 dark:border-white/10 flex items-center justify-center">
                            <button
                              onClick={() => removeItem(p.id)}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-[#ff5a1f] hover:text-white text-zinc-700 dark:text-white flex items-center justify-center text-xs transition"
                              title="Remove from compare"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="relative w-full h-full">
                              <Image
                                src={p.images[0]?.src || "/products/placeholder.svg"}
                                alt={p.name}
                                fill
                                sizes="180px"
                                className="object-contain"
                              />
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-extrabold text-[#ff5a1f] dark:text-[#c5e84a] uppercase">
                              {p.brand}
                            </span>
                            <Link href={`/phones/${p.slug}`} className="block">
                              <h4 className="font-display font-extrabold text-xs sm:text-sm text-zinc-950 dark:text-white hover:text-[#ff5a1f] dark:hover:text-[#c5e84a] transition leading-snug line-clamp-1">
                                {p.name}
                              </h4>
                            </Link>
                            <p className="font-extrabold text-zinc-900 dark:text-zinc-200 text-xs sm:text-sm mt-0.5">
                              MRP: {formatPrice(variant.mrp)}
                            </p>
                          </div>

                          <a
                            href={getProductWhatsAppUrl(p, variant)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs py-2 rounded-xl flex items-center justify-center gap-1 transition shadow-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5 fill-current" />
                            <span>Unlock Deal ↗</span>
                          </a>
                        </div>
                      </th>
                    );
                  })}

                  {/* Empty Slots */}
                  {Array.from({ length: emptySlotsCount }).map((_, slotIdx) => (
                    <th key={`empty-${slotIdx}`} className="p-3 sm:p-4 w-48 sm:w-60 align-top">
                      <div className="h-56 border-2 border-dashed border-zinc-200 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center p-3 text-center space-y-2 text-zinc-400">
                        <Plus className="w-6 h-6 text-zinc-400" />
                        <p className="text-xs font-bold text-zinc-500">Add Phone</p>
                        <select
                          onChange={(e) => {
                            const found = allPhones.find((p) => p.id === e.target.value);
                            if (found) addItem(found);
                          }}
                          defaultValue=""
                          className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-white/10 rounded-xl px-2 py-1 text-[11px] text-zinc-900 dark:text-zinc-200 max-w-full focus:outline-none"
                        >
                          <option value="" disabled>
                            Select phone...
                          </option>
                          {allPhones
                            .filter((p) => !items.some((i) => i.id === p.id))
                            .map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.brand} - {p.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Rows Comparison Body */}
              <tbody className="divide-y divide-zinc-200 dark:divide-white/5">
                {compareFields.map((field) => {
                  const values = items.map((p) => field.getValue(p));
                  const isDifferent =
                    items.length > 1 && new Set(values.map((v) => String(v).toLowerCase())).size > 1;

                  return (
                    <tr
                      key={field.label}
                      className={
                        highlightDifferences && isDifferent
                          ? "bg-amber-500/10 dark:bg-[#ff1e42]/5 hover:bg-amber-500/15"
                          : "hover:bg-zinc-50 dark:hover:bg-white/2"
                      }
                    >
                      <td className="sticky left-0 bg-white dark:bg-zinc-950 z-10 p-3 sm:p-3.5 font-bold text-zinc-600 dark:text-zinc-400 shadow-[2px_0_6px_rgba(0,0,0,0.06)] text-[11px] sm:text-xs">
                        <div className="flex items-center gap-1.5">
                          {highlightDifferences && isDifferent && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f] shrink-0" />
                          )}
                          <span className="truncate">{field.label}</span>
                        </div>
                      </td>
                      {items.map((p) => (
                        <td key={p.id} className="p-3 sm:p-3.5 text-zinc-900 dark:text-zinc-200 font-semibold align-top text-[11px] sm:text-xs">
                          {field.getValue(p)}
                        </td>
                      ))}
                      {Array.from({ length: emptySlotsCount }).map((_, idx) => (
                        <td key={`empty-cell-${idx}`} className="p-3 sm:p-3.5 text-zinc-400 dark:text-zinc-600">
                          —
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
