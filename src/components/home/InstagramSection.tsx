"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Play,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Flame,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

interface ReelHighlight {
  id: string;
  title: string;
  badge: string;
  views: string;
  customer: string;
  location: string;
  caption: string;
  dealOffer: string;
}

export function InstagramSection() {
  const [activeTab, setActiveTab] = useState<"live" | "highlights">("live");

  const reelHighlights: ReelHighlight[] = [
    {
      id: "1",
      title: "iPhone 16 Pro Max Desert Titanium Delivery in Kakod 🔥",
      badge: "🍎 iPHONE UNBOXING",
      views: "34.8K Views",
      customer: "Rahul Sharma",
      location: "Kakod Mandi",
      caption: "Sealed pack iPhone 16 Pro Max unboxing at our counter with 5 assured gift hampers + GST bill!",
      dealOffer: "₹0 Downpayment EMI • Free Smartwatch & MagSafe Case",
    },
    {
      id: "2",
      title: "5 Free Gifts With Every 5G Smartphone Purchase! 🎁",
      badge: "🎁 VIRAL GIFT HAMPER",
      views: "48.2K Views",
      customer: "Amit & Family",
      location: "Jahangirpur Road, Kakod",
      caption: "Smartwatch + ANC Earbuds + 9H Tempered Glass + Shockproof Case gifted on spot at our counter!",
      dealOffer: "Assured gift box on every brand (Apple, Samsung, Vivo, OnePlus)",
    },
    {
      id: "3",
      title: "₹0 Downpayment EMI Approved in Just 5 Minutes ⚡",
      badge: "💳 ZERO DOWNPAYMENT",
      views: "29.1K Views",
      customer: "Mohd. Zeeshan",
      location: "Dankaur",
      caption: "Instant approval on Bajaj Finserv & IDFC First Bank with zero advance payment! Walked out with iPhone 15.",
      dealOffer: "Paperless 5-minute approval with just Aadhaar & PAN card",
    },
    {
      id: "4",
      title: "Samsung S24 Ultra 200MP Zoom Live Test in Store 🌌",
      badge: "📸 100X CAMERA DEMO",
      views: "26.7K Views",
      customer: "Vipin Bhati",
      location: "Main Market, Kakod",
      caption: "Testing 100x Space Zoom live on Kakod Clock Tower from our shop counter! Come try it yourself.",
      dealOffer: "Exchange bonus + spot old phone evaluation",
    },
    {
      id: "5",
      title: "OnePlus 12 Flowy Emerald Unboxing & Free Data Transfer ⚡",
      badge: "⚡ ONEPLUS UNBOXING",
      views: "21.9K Views",
      customer: "Deepak Kumar",
      location: "Bulandshahr Road",
      caption: "All WhatsApp chats, photos, contacts transferred to new OnePlus 12 in 10 minutes free of charge!",
      dealOffer: "100% Free Data Transfer & 9H Glass Machine Fitting",
    },
  ];

  return (
    <section className="space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-zinc-200 dark:border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-pink-600 dark:text-pink-400 font-extrabold text-[11px] sm:text-xs uppercase tracking-wider mb-1.5">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>OFFICIAL INSTAGRAM • @{siteConfig.contact.instagramHandle}</span>
          </div>
          <h2 className="font-display font-extrabold text-xl xs:text-2xl sm:text-4xl text-zinc-950 dark:text-white">
            Watch Kakod Customer Deliveries & Live Demos
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1 max-w-2xl">
            Live reels, customer unboxings, and gift drops directly from our official Instagram channel{" "}
            <strong className="text-zinc-950 dark:text-white">@{siteConfig.contact.instagramHandle}</strong> (by Vishal Distributors).
          </p>
        </div>

        {/* View on Instagram Link & Fullscreen Reels Mode */}
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 self-start sm:self-end shrink-0 w-full xs:w-auto">
          <Link
            href="/reels"
            className="bg-[#ff1e42] hover:bg-rose-600 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,30,66,0.35)] transition text-center"
          >
            <Play className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>Watch Reels</span>
          </Link>

          <a
            href={siteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition text-center"
          >
            <InstagramIcon className="w-4 h-4 shrink-0" />
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-80 shrink-0" />
          </a>
        </div>
      </div>

      {/* Main Grid: Live Instagram Reel Box (Left) + Customer Highlights (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Official Instagram Embed Box (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bento-card rounded-3xl p-4 sm:p-5 bg-white dark:bg-[#162032] border-2 border-zinc-200 dark:border-white/15 space-y-3 shadow-xl dark:shadow-2xl">
            {/* Header of Embed Box */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <InstagramIcon className="w-4 h-4 text-pink-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-zinc-950 dark:text-white leading-tight">
                      @{siteConfig.contact.instagramHandle}
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    The Mobile Lounge, Kakod • 52+ Reels & Posts
                  </p>
                </div>
              </div>

              <span className="bg-pink-500/20 text-pink-600 dark:text-pink-300 border border-pink-500/30 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-500 dark:text-amber-400 fill-current" />
                <span>LIVE FEED</span>
              </span>
            </div>

            {/* Embedded Instagram Reel Frame from @themobilelounge_kakod (No external video!) */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-zinc-200 dark:border-white/10 min-h-[520px] sm:min-h-[580px] flex flex-col justify-center items-center">
              <iframe
                src="https://www.instagram.com/themobilelounge_kakod/embed"
                className="w-full h-[520px] sm:h-[580px] border-0 bg-black"
                loading="lazy"
                title="The Mobile Lounge Kakod Official Instagram Reels"
                allow="encrypted-media"
              />
            </div>

            {/* Bottom In-Box Footer Note */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 text-zinc-600 dark:text-zinc-300">
              <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#22c55e]" />
                <span>Scroll inside the box above to view daily Kakod customer deliveries</span>
              </span>
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 dark:text-pink-400 font-extrabold hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Open in Instagram App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Verified Customer Delivery Highlights & WhatsApp Video Request (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-lg text-zinc-950 dark:text-white">
              Trending Deliveries From This Account
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Tap any customer unboxing below to claim the same offer on WhatsApp:
            </p>
          </div>

          {/* List of Verified Customer Reels from @themobilelounge_kakod */}
          <div className="space-y-3">
            {reelHighlights.map((reel) => (
              <div
                key={reel.id}
                className="bento-card p-4 rounded-2xl bg-white dark:bg-[#162032] border border-zinc-200 dark:border-white/15 space-y-2.5 hover:border-emerald-500/40 transition group shadow-sm"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="bg-[#ff5a1f] text-white font-extrabold px-2 py-0.5 rounded-full">
                    {reel.badge}
                  </span>
                  <span className="text-emerald-700 dark:text-[#22c55e] font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {reel.views}
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-extrabold text-xs sm:text-sm text-zinc-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-[#22c55e] transition leading-snug">
                    {reel.title}
                  </h4>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-300 mt-1 line-clamp-2">
                    {reel.caption}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium truncate max-w-[170px]">
                    📍 {reel.customer} ({reel.location})
                  </span>

                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                      `Namaste The Mobile Lounge! I saw your reel: "${reel.title}" on @themobilelounge_kakod and want to claim this offer!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#22c55e] hover:bg-emerald-400 text-black font-extrabold text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1 transition shrink-0"
                  >
                    <MessageSquare className="w-3 h-3 fill-current" />
                    <span>Claim Deal ↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Live Video Demo & Counter Verification Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-[#ff1e42]/15 border border-pink-500/30 space-y-2.5">
            <div className="flex items-center gap-2 text-pink-300 font-extrabold text-xs">
              <PhoneCall className="w-4 h-4" />
              <span>REQUEST LIVE VIDEO DEMO BEFORE VISITING</span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed">
              Want to inspect a sealed pack phone or see your gift hamper live before you leave home? We offer a direct WhatsApp video call from our shop counter!
            </p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                "Namaste Vishal bhai! I want a live WhatsApp video call demo of your phone stock & gift box before visiting The Mobile Lounge."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white text-black font-extrabold text-xs px-3.5 py-2 rounded-xl hover:bg-zinc-200 transition"
            >
              <span>Schedule Live Video Call ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
