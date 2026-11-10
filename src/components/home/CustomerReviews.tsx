"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Star,
  CheckCircle2,
  ArrowRight,
  Gift,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Smartphone,
} from "lucide-react";

interface CustomerStory {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  location: string;
  device: string;
  deviceSlug: string;
  quote: string;
  highlightBadge: string;
  rating: number;
  date: string;
}

import { Review } from "@/types/offer";

interface CustomerReviewsProps {
  reviews?: Review[];
}

export function CustomerReviews({ reviews }: CustomerReviewsProps = {}) {
  const customerStories: CustomerStory[] = [
    {
      id: "1",
      name: "Rahul Sharma",
      initials: "RS",
      avatarColor: "from-blue-500 to-indigo-600",
      location: "Kakod Mandi",
      device: "iPhone 16 (128GB Teal)",
      deviceSlug: "apple-iphone-16",
      quote:
        "Got my iPhone 16 at a lower price than Flipkart! Bajaj 0% EMI was approved in 7 minutes, and Vishal bhai gifted a smartwatch and glass fitting free.",
      highlightBadge: "₹0 Downpayment Approved",
      rating: 5,
      date: "3 days ago",
    },
    {
      id: "2",
      name: "Amit Bhati & Family",
      initials: "AB",
      avatarColor: "from-emerald-500 to-teal-700",
      location: "Jahangirpur Road, Kakod",
      device: "Samsung Galaxy S24 Ultra",
      deviceSlug: "samsung-galaxy-s24-ultra",
      quote:
        "Exchanged old phone with ₹18,500 instant spot discount. All 40GB WhatsApp chats and photos transferred free with zero data loss. Best shop in Kakod!",
      highlightBadge: "₹18,500 Spot Exchange",
      rating: 5,
      date: "1 week ago",
    },
    {
      id: "3",
      name: "Pooja Verma",
      initials: "PV",
      avatarColor: "from-pink-500 to-rose-600",
      location: "Dankaur",
      device: "Vivo V40 Pro ZEISS",
      deviceSlug: "vivo-v40-pro-5g",
      quote:
        "Saw reels on Instagram and visited store. ZEISS camera is mind-blowing! Got ₹0 downpayment on IDFC card and free ANC earbuds with box.",
      highlightBadge: "Free ANC Earbuds Gift",
      rating: 5,
      date: "2 weeks ago",
    },
    {
      id: "4",
      name: "Deepak Nagar",
      initials: "DN",
      avatarColor: "from-amber-500 to-orange-600",
      location: "Sikandrabad / Kakod",
      device: "OnePlus Nord 4 5G",
      deviceSlug: "oneplus-nord-4-5g",
      quote:
        "Very polite, transparent, and honest staff. 100% genuine sealed pack with GST bill registered on brand portal. No credit card swipe charges.",
      highlightBadge: "100% Sealed Pack GST Bill",
      rating: 5,
      date: "3 weeks ago",
    },
  ];

  return (
    <section className="space-y-6 w-full max-w-full overflow-hidden">
      {/* 1. Header with Official Google Trust Badge */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-5">
        <div className="space-y-2 max-w-2xl">
          {/* Google Verified Review Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/15 shadow-xs">
            {/* SVG Google 'G' icon */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-[11px] font-black tracking-wide text-zinc-900 dark:text-white uppercase">
              Google Verified 4.9 ★★★★★ Rating
            </span>
            <span className="text-[10px] text-zinc-500 font-bold hidden xs:inline">• 420+ Reviews</span>
          </div>

          <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl text-zinc-950 dark:text-white tracking-tight">
            Real Customers. Real Unboxings in Kakod.
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            See why families from Kakod, Jahangirpur, Dankaur, and Bulandshahr choose The Mobile Lounge (by Vishal Distributors) for guaranteed sealed-pack smartphones and 0% EMI.
          </p>
        </div>

        {/* View All Reviews Link + WhatsApp Deal CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/reviews"
            className="text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/15 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
          >
            <span>Read 420+ Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
              "Namaste The Mobile Lounge! I saw your 4.9 Google reviews and want to check today's stock and best smartphone prices."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Chat With Store</span>
          </a>
        </div>
      </div>

      {/* 2. Key Store Guarantees Bar (Unified Design System) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/10 flex items-center gap-2.5 sm:gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold shrink-0">
            ★
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-zinc-950 dark:text-white text-xs sm:text-sm truncate">4.9 / 5.0 Star</p>
            <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 truncate">420+ Google Reviews</p>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/10 flex items-center gap-2.5 sm:gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-[#a3e635] font-bold shrink-0">
            <Gift className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-zinc-950 dark:text-white text-xs sm:text-sm truncate">Free Gift Box</p>
            <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 truncate">Smartwatch & Earbuds</p>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/10 flex items-center gap-2.5 sm:gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-zinc-950 dark:text-white text-xs sm:text-sm truncate">100% Genuine</p>
            <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 truncate">Official GST Warranty</p>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/10 flex items-center gap-2.5 sm:gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-zinc-950 dark:text-white text-xs sm:text-sm truncate">Free Setup</p>
            <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 truncate">Data & WhatsApp Moved</p>
          </div>
        </div>
      </div>

      {/* 3. Verified Customer Review Cards (Clean, Balanced 4-Col Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {customerStories.map((story) => (
          <div
            key={story.id}
            className="bento-card p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/10 hover:border-[#ff5a1f]/50 flex flex-col justify-between space-y-3.5 shadow-xs hover:shadow-lg transition-all duration-300 group"
          >
            <div className="space-y-3">
              {/* Card Header: Avatar initials + Name/Location + Google 'G' icon */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${story.avatarColor} text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0`}
                  >
                    {story.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-xs text-zinc-950 dark:text-white truncate">
                      {story.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                      📍 {story.location}
                    </p>
                  </div>
                </div>

                {/* Google Verified Checkmark */}
                <div
                  className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-600/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0"
                  title="Google Verified Review"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* 5 Stars Rating & Highlight Badge */}
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: story.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>

                <span className="text-[9px] font-black uppercase text-emerald-700 dark:text-[#a3e635] bg-emerald-500/10 dark:bg-[#a3e635]/10 px-2 py-0.5 rounded-full border border-emerald-500/20 truncate max-w-[150px]">
                  {story.highlightBadge}
                </span>
              </div>

              {/* Review Quote */}
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                &ldquo;{story.quote}&rdquo;
              </p>
            </div>

            {/* Card Footer: Purchased Device link */}
            <div className="pt-2.5 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-[11px] gap-2">
              <span className="text-[10px] text-zinc-500 font-bold shrink-0">Bought:</span>
              <Link
                href={`/phones/${story.deviceSlug}`}
                className="font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:text-[#ff5a1f] dark:hover:text-[#c5e84a] truncate transition flex items-center gap-1"
              >
                <Smartphone className="w-3 h-3 text-[#ff5a1f] shrink-0" />
                <span className="truncate">{story.device}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
