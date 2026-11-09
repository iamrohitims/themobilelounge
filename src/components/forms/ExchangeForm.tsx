"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getExchangeWhatsAppUrl } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/format";
import { RefreshCw, MessageSquare, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";

const exchangeSchema = z.object({
  brand: z.string().min(1, "Please enter your old phone brand"),
  model: z.string().min(1, "Please enter your phone model"),
  storage: z.string().optional(),
  ageYears: z.string().min(1, "Please select device age"),
  condition: z.enum([
    "Flawless (No scratches, looks brand new)",
    "Good (Minor pocket scratches, works 100%)",
    "Average (Visible dents/scuffs, works fine)",
    "Screen Cracked / Minor Damage",
  ]),
  targetPhone: z.string().optional(),
});

type ExchangeFormValues = z.infer<typeof exchangeSchema>;

export function ExchangeForm() {
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ExchangeFormValues>({
    resolver: zodResolver(exchangeSchema),
    defaultValues: {
      condition: "Good (Minor pocket scratches, works 100%)",
      ageYears: "1-2 Years",
    },
  });

  const onSubmit = (data: ExchangeFormValues) => {
    // Calculative heuristic based on condition and age for indicative estimate
    let baseVal = 8000;
    if (data.brand.toLowerCase().includes("apple") || data.brand.toLowerCase().includes("iphone")) {
      baseVal = 24000;
    } else if (data.brand.toLowerCase().includes("samsung")) {
      baseVal = 14000;
    } else if (data.brand.toLowerCase().includes("oneplus")) {
      baseVal = 16000;
    }

    if (data.condition.includes("Flawless")) baseVal *= 1.25;
    else if (data.condition.includes("Average")) baseVal *= 0.75;
    else if (data.condition.includes("Cracked")) baseVal *= 0.45;

    if (data.ageYears === "Less than 1 Year") baseVal *= 1.2;
    else if (data.ageYears === "More than 3 Years") baseVal *= 0.6;

    const finalEstimate = Math.round(baseVal / 500) * 500;
    setEstimatedValue(finalEstimate);

    // Open WhatsApp with complete details
    const waUrl = getExchangeWhatsAppUrl({
      currentBrand: data.brand,
      currentModel: data.model,
      condition: data.condition,
      targetPhone: data.targetPhone,
      estimatedValue: finalEstimate,
    });

    window.open(waUrl, "_blank");
  };

  return (
    <div className="bento-card p-6 sm:p-8 space-y-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
      <div className="space-y-1">
        <h3 className="font-display font-extrabold text-xl text-zinc-950 dark:text-white">
          Enter Your Old Phone Details
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Get an instant indicative trade-in valuation and bring your phone to our Kakod store.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Brand */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Old Phone Brand *</label>
            <input
              type="text"
              placeholder="e.g. Apple, Samsung, OnePlus, Vivo"
              {...register("brand")}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#a3e635]"
            />
            {errors.brand && (
              <p className="text-[11px] text-rose-500 font-bold">{errors.brand.message}</p>
            )}
          </div>

          {/* Model */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Exact Model Name *</label>
            <input
              type="text"
              placeholder="e.g. iPhone 12 / Galaxy S21 / Vivo V25"
              {...register("model")}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#a3e635]"
            />
            {errors.model && (
              <p className="text-[11px] text-rose-500 font-bold">{errors.model.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Age */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">How old is the phone?</label>
            <select
              {...register("ageYears")}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-zinc-950 dark:text-white focus:outline-none"
            >
              <option value="Less than 1 Year">Less than 1 Year (In Brand Warranty)</option>
              <option value="1-2 Years">1 to 2 Years Old</option>
              <option value="2-3 Years">2 to 3 Years Old</option>
              <option value="More than 3 Years">More than 3 Years Old</option>
            </select>
          </div>

          {/* New Phone Target */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Which phone do you want to upgrade to? (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. iPhone 16 / S24 Ultra"
              {...register("targetPhone")}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#a3e635]"
            />
          </div>
        </div>

        {/* Physical Condition */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Current Device Condition *</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Flawless (No scratches, looks brand new)",
              "Good (Minor pocket scratches, works 100%)",
              "Average (Visible dents/scuffs, works fine)",
              "Screen Cracked / Minor Damage",
            ].map((cond) => (
              <label
                key={cond}
                className="flex items-center gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 cursor-pointer hover:border-zinc-300 dark:hover:border-white/20 text-xs text-zinc-800 dark:text-zinc-200"
              >
                <input
                  type="radio"
                  value={cond}
                  {...register("condition")}
                  className="text-[#a3e635] focus:ring-0"
                />
                <span>{cond}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Disclaimer Alert */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <p>
            <strong>Note:</strong> Online valuation is an indicative estimate. The final exchange
            amount is determined at our Kakod store counter after a fast 3-minute physical inspection
            of display touch, cameras, and battery health.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#a3e635] hover:bg-lime-400 text-black font-extrabold text-sm py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(163,230,53,0.35)] transition"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>Get Instant WhatsApp Estimate & Exchange Voucher</span>
        </button>
      </form>

      {estimatedValue && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1 animate-in fade-in">
          <p className="text-xs text-emerald-700 dark:text-emerald-300 font-bold">Estimated Trade-In Value:</p>
          <p className="font-display font-extrabold text-3xl text-emerald-600 dark:text-[#a3e635]">
            {formatPrice(estimatedValue)}*
          </p>
          <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
            Deductible directly from your new phone bill at Kakod counter!
          </p>
        </div>
      )}
    </div>
  );
}
