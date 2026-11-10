import type { Metadata } from "next";
import { ExchangeForm } from "@/components/forms/ExchangeForm";
import { RefreshCw, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Old Phone Exchange in Kakod | Highest Trade-In Value",
  description:
    "Exchange your old Android phone or iPhone at The Mobile Lounge Kakod. Instant spot valuation, immediate deduction from new phone bill, and free data transfer.",
};

export default function ExchangePage() {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-6 sm:space-y-8 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff1e42]/15 border border-[#ff1e42]/30 text-[#ff1e42] text-[11px] sm:text-xs font-extrabold uppercase">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>INSTANT UPGRADE BONUS • KAKOD</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl text-zinc-950 dark:text-white tracking-tight">
          Exchange Old Phone For Best Market Value
        </h1>
        <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Upgrade to a brand-new 5G smartphone or iPhone today! We inspect your old phone in 3
          minutes and deduct its value directly on your new invoice.
        </p>
      </div>

      {/* Steps Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 text-center space-y-1 shadow-sm dark:shadow-none">
          <span className="text-xl">⏱️</span>
          <p className="font-extrabold text-xs text-zinc-950 dark:text-white">3-Minute Inspection</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Fast physical test at counter</p>
        </div>
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 text-center space-y-1 shadow-sm dark:shadow-none">
          <span className="text-xl">💰</span>
          <p className="font-extrabold text-xs text-zinc-950 dark:text-white">Spot Bill Discount</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Directly reduced from price</p>
        </div>
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 text-center space-y-1 shadow-sm dark:shadow-none">
          <span className="text-xl">📲</span>
          <p className="font-extrabold text-xs text-zinc-950 dark:text-white">Free Data Transfer</p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">WhatsApp & contacts moved free</p>
        </div>
      </div>

      {/* Form */}
      <ExchangeForm />
    </div>
  );
}
