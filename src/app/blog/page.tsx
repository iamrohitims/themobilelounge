import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Smartphone Buying Guides & Tips | The Mobile Lounge Kakod",
  description:
    "Expert smartphone buying guides, local 5G comparisons, and EMI advice from Kakod's top mobile phone experts.",
};

export default function BlogPage() {
  const articles = [
    {
      slug: "best-5g-phones-under-15000-kakod",
      title: "Top 5 Best 5G Smartphones Under ₹15,000 to Buy in Kakod (2026 Edition)",
      excerpt:
        "Looking for a high-RAM 5G mobile with 5000mAh battery and smooth camera without spending over ₹15,000? Here are our top showroom recommendations.",
      date: "Nov 02, 2026",
      readTime: "4 min read",
      tag: "Budget Guide",
    },
    {
      slug: "how-to-buy-iphone-16-on-zero-downpayment-emi",
      title: "How to Buy Apple iPhone 16 on ₹0 Downpayment EMI in Kakod",
      excerpt:
        "Everything you need to know about Bajaj Finserv and IDFC bank card approval for iPhones with just your Aadhaar and PAN card.",
      date: "Oct 28, 2026",
      readTime: "5 min read",
      tag: "EMI & Finance",
    },
    {
      slug: "why-local-showroom-beats-online-phone-orders",
      title: "Why Buying Your Phone Offline at Kakod Beats Online Delivery Every Time",
      excerpt:
        "From free tempered glass machine fitting to instant WhatsApp chat transfer and assured free gift hampers, discover the VIP showroom advantage.",
      date: "Oct 15, 2026",
      readTime: "3 min read",
      tag: "Store Perks",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff1e42]/15 border border-[#ff1e42]/30 text-[#ff1e42] text-xs font-extrabold uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          <span>BUYING GUIDES & LOCAL TECH NEWS • KAKOD</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-zinc-950 dark:text-white tracking-tight">
          Smartphone Guides & Insights
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Expert recommendations, festive offer breakdowns, and step-by-step EMI guides to help you
          pick the best phone for your budget.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((art) => (
          <div
            key={art.slug}
            className="bento-card p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <span className="bg-emerald-500/15 dark:bg-[#a3e635]/20 text-emerald-700 dark:text-[#a3e635] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                {art.tag}
              </span>
              <h3 className="font-display font-extrabold text-lg text-zinc-950 dark:text-white leading-snug">
                {art.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{art.excerpt}</p>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{art.date}</span>
              </span>
              <Link
                href="/phones"
                className="text-emerald-700 dark:text-[#a3e635] font-extrabold flex items-center gap-1 hover:underline"
              >
                <span>Read More</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
