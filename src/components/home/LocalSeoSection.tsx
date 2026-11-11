import Link from "next/link";
import { MapPin, Navigation, ShieldCheck, CreditCard, Gift, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const TOWNS = [
  {
    name: "Kakod Mandi",
    distance: "Showroom Location",
    desc: "Main Market, Nr. SBI Bank & Vishal Distributors. Hands-on flagship demos.",
    badge: "CENTRAL HUB",
    color: "border-[#ff5a1f]/40 bg-[#ff5a1f]/10 text-[#ff5a1f]",
  },
  {
    name: "Jahangirpur",
    distance: "6 km • 10 mins",
    desc: "Direct daily visitors for instant 5-minute Bajaj Finserv & IDFC EMI approvals.",
    badge: "5-MIN EMI",
    color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  {
    name: "Dankaur",
    distance: "16 km • 20 mins",
    desc: "Customers choose our sealed-pack genuine stock and free smartwatch gift hamper.",
    badge: "FREE GIFTS",
    color: "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-400",
  },
  {
    name: "Bulandshahr City",
    distance: "26 km • 35 mins",
    desc: "Wholesale retail pricing on Apple iPhone, Samsung Galaxy & OnePlus flagships.",
    badge: "BEST PRICE",
    color: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  {
    name: "Sikandrabad",
    distance: "22 km • 30 mins",
    desc: "Highest trade-in exchange value for old 4G/5G mobiles with spot bill deduction.",
    badge: "TOP EXCHANGE",
    color: "border-purple-500/40 bg-purple-500/10 text-purple-700 dark:text-purple-400",
  },
  {
    name: "Jewar & Yamuna Exp.",
    distance: "20 km • 25 mins",
    desc: "Free contact & WhatsApp chat data transfer, zero data loss guarantee.",
    badge: "DATA TRANSFER",
    color: "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-400",
  },
];

export function LocalSeoSection() {
  return (
    <section className="bento-card p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#121624] border border-zinc-200 dark:border-white/10 space-y-6 shadow-lg overflow-hidden w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5e84a]/20 border border-[#c5e84a]/40 text-black dark:text-[#c5e84a] text-[11px] font-black uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>REGIONAL COVERAGE • GREATER BULANDSHAHR & NCR</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-zinc-950 dark:text-white tracking-tight">
            The #1 Choice for Kakod &amp; Surrounding Towns
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
            Over 5,000+ happy families skip overpriced city stores and online shipping risks to buy 100% genuine
            sealed-pack smartphones with official GST warranty right here at The Mobile Lounge (by Vishal Distributors).
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black font-black text-xs transition shadow-md shrink-0"
        >
          <Navigation className="w-4 h-4 text-[#ff5a1f]" />
          <span>Get Directions &amp; Map</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {TOWNS.map((town) => (
          <div
            key={town.name}
            className="p-4 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 hover:border-[#ff5a1f]/50 dark:hover:border-[#c5e84a]/50 transition-all duration-200 space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-zinc-950 dark:text-white">{town.name}</span>
              </div>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${town.color}`}>
                {town.badge}
              </span>
            </div>
            <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
              📍 {town.distance}
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {town.desc}
            </p>
          </div>
        ))}
      </div>

      {/* SEO Guarantee Micro-bar */}
      <div className="pt-2 border-t border-zinc-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>100% Genuine Sealed Pack with GST Bill</span>
        </span>
        <span className="flex items-center gap-1.5">
          <CreditCard className="w-4 h-4 text-[#ff5a1f] shrink-0" />
          <span>₹0 Downpayment EMI (Bajaj, IDFC, TVS)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Gift className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Free 5-in-1 Gift Box with Every Phone</span>
        </span>
      </div>
    </section>
  );
}
