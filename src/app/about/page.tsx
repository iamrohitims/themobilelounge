import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Store,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About The Mobile Lounge Kakod | by Vishal Distributors",
  description:
    "Learn about The Mobile Lounge in Kakod. Over 5,000+ satisfied customers, authorized brand stock, 0% EMI financing, and genuine warranties.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-8 sm:space-y-12 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff1e42]/15 border border-[#ff1e42]/30 text-[#ff1e42] text-[11px] sm:text-xs font-extrabold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OUR STORY • THE MOBILE LOUNGE</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl text-zinc-950 dark:text-white tracking-tight">
          Kakod’s Most Trusted Smartphone Destination
        </h1>
        <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Founded in Kakod and powered by <strong className="text-zinc-950 dark:text-white">Vishal Distributors</strong>,
          The Mobile Lounge bridges the gap between big-city showroom pricing, authentic brand
          warranties, and personalized local retail trust.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        {siteConfig.stats.map((s) => (
          <div
            key={s.label}
            className="bento-card p-3.5 sm:p-5 text-center space-y-0.5 sm:space-y-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none"
          >
            <p className="font-display font-extrabold text-xl sm:text-3xl text-emerald-600 dark:text-[#a3e635]">
              {s.value}
            </p>
            <p className="font-extrabold text-xs text-zinc-950 dark:text-white">{s.label}</p>
            <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">{s.sublabel}</p>
          </div>
        ))}
      </div>

      {/* Story Sections */}
      <div className="bento-card p-4 sm:p-8 space-y-5 sm:space-y-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
        <h2 className="font-display font-extrabold text-xl sm:text-2xl text-zinc-950 dark:text-white">
          Why We Started The Mobile Lounge in Kakod
        </h2>
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            For years, smartphone buyers in Kakod, Jahangirpur, Dankaur, and surrounding areas had to
            either make long trips to Noida or Delhi for genuine iPhones and flagships, or order
            online without the ability to inspect the box or receive personalized setup support.
          </p>
          <p>
            We created <strong className="text-zinc-950 dark:text-white">The Mobile Lounge</strong> to bring the premier
            tech retail experience right to Kakod Main Market. Every customer who walks into our
            showroom experiences transparent pricing that beats online portals, instant 5-minute
            paperless EMI approval, guaranteed free gifts, and complete data transfer support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-zinc-200 dark:border-white/10">
          <div className="space-y-2">
            <span className="w-10 h-10 rounded-xl bg-rose-500/10 text-[#ff1e42] flex items-center justify-center font-bold">
              100%
            </span>
            <h4 className="font-extrabold text-sm text-zinc-950 dark:text-white">Genuine Brand Stock</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Only original sealed-pack phones with brand warranty and GST invoice.
            </p>
          </div>

          <div className="space-y-2">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-[#a3e635] flex items-center justify-center font-bold">
              0%
            </span>
            <h4 className="font-extrabold text-sm text-zinc-950 dark:text-white">Paperless EMI Finance</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Direct tie-ups with Bajaj, IDFC, TVS and Home Credit at 0% interest schemes.
            </p>
          </div>

          <div className="space-y-2">
            <span className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 dark:text-sky-400 flex items-center justify-center font-bold">
              100%
            </span>
            <h4 className="font-extrabold text-sm text-zinc-950 dark:text-white">Brand Warranty & Support</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Authorized service center coverage and full in-store assistance for every device.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bento-card p-8 text-center space-y-4 bg-zinc-100 dark:bg-gradient-to-r dark:from-zinc-900 dark:via-zinc-950 dark:to-black border border-zinc-200 dark:border-white/10">
        <h3 className="font-display font-extrabold text-2xl text-zinc-950 dark:text-white">
          Visit Us in Kakod Today!
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
          Experience live smartphone demos, check your instant EMI eligibility, and claim your
          assured gift hamper.
        </p>
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <Link
            href="/phones"
            className="bg-[#ff1e42] hover:bg-rose-600 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition shadow-md"
          >
            Browse Phones
          </Link>
          <Link
            href="/contact"
            className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-extrabold text-xs px-6 py-3 rounded-xl transition"
          >
            Get Store Directions
          </Link>
        </div>
      </div>
    </div>
  );
}
