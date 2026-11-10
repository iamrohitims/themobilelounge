"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import curatedReels from "@/data/reels.json";
import { Reel } from "@/types/reel";
import {
  Play,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Flame,
  ArrowRight,
  ExternalLink,
  Eye,
  Heart,
  X,
  Layers,
  Radio,
  Share2,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export function InstagramSection() {
  const [activeTab, setActiveTab] = useState<"reels_grid" | "live_feed">("reels_grid");
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const reels: Reel[] = curatedReels as Reel[];

  return (
    <section className="space-y-6 w-full max-w-full overflow-hidden">
      {/* 1. Header & Social Proof Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-amber-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 font-extrabold text-xs uppercase tracking-wider">
            <InstagramIcon className="w-3.5 h-3.5 shrink-0" />
            <span>OFFICIAL INSTAGRAM • @{siteConfig.contact.instagramHandle}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl text-zinc-950 dark:text-white tracking-tight">
            Watch Kakod Customer Deliveries & Live Unboxings
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Real customer deliveries, sealed-pack iPhone unboxings, 0% EMI approvals, and assured gift giveaways directly from our showroom in Main Market, Kakod.
          </p>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Mode Switcher */}
          <div className="flex items-center bg-zinc-100 dark:bg-white/10 p-1 rounded-2xl border border-zinc-200 dark:border-white/10 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("reels_grid")}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === "reels_grid"
                  ? "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-sm font-black"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#ff5a1f]" />
              <span>Reel Showcase</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("live_feed")}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === "live_feed"
                  ? "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-sm font-black"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
              <span>Live Profile</span>
            </button>
          </div>

          {/* Follow on Instagram CTA */}
          <a
            href={siteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition active:scale-95"
          >
            <InstagramIcon className="w-3.5 h-3.5 shrink-0" />
            <span>Follow 1.1K+ Fam</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>

          {/* Fullscreen Reels Link */}
          <Link
            href="/reels"
            className="bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition active:scale-95 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Fullscreen</span>
          </Link>
        </div>
      </div>

      {/* 2. Main Content: Either the Visual Reel Cards Showcase or the Clean Live Feed Frame */}
      {activeTab === "reels_grid" ? (
        /* Visual Reel Showcase: 2-col on mobile, 3-col on tablet, 6-col on laptop/desktop */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {reels.map((reel) => {
            const waDealUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
              `Namaste The Mobile Lounge Kakod! I saw your reel for *${reel.phoneTag}* on Instagram and want to lock in this price with free gifts!`
            )}`;

            return (
              <div
                key={reel.id}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-md hover:shadow-2xl hover:border-[#ff5a1f]/60 transition-all duration-300 flex flex-col justify-between aspect-[9/16] cursor-pointer"
                onClick={() => setSelectedReel(reel)}
              >
                {/* Background Poster Image */}
                <Image
                  src={reel.thumbnailUrl}
                  alt={reel.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Dark Gradient Vignettes for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/60 pointer-events-none" />

                {/* Top Overlay: Category Badge & View Count */}
                <div className="relative z-10 p-2.5 sm:p-3 flex items-center justify-between gap-1">
                  <span className="bg-[#ff1e42]/90 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                    {reel.isStoreDemo ? "LIVE DEMO" : "UNBOXING"}
                  </span>

                  <span className="bg-black/60 backdrop-blur-md text-zinc-200 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 border border-white/15">
                    <Eye className="w-2.5 h-2.5 text-emerald-400" />
                    <span>
                      {reel.views && reel.views > 1000
                        ? `${(reel.views / 1000).toFixed(1)}K`
                        : (reel.views ?? "2.5K")}
                    </span>
                  </span>
                </div>

                {/* Center Hover Play Icon */}
                <div className="relative z-10 self-center opacity-85 group-hover:opacity-100 group-hover:scale-110 transition duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay: Author, Phone Tag, Price & WhatsApp CTA */}
                <div className="relative z-10 p-2.5 sm:p-3 space-y-2">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-pink-300 truncate">
                      @{siteConfig.contact.instagramHandle}
                    </p>
                    <h3 className="font-display font-black text-xs sm:text-sm text-white line-clamp-2 leading-snug">
                      {reel.phoneTag}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-[#c5e84a] font-black text-xs sm:text-sm">
                      {reel.dealPrice}
                    </span>
                    <span className="text-zinc-300 bg-white/15 px-1.5 py-0.5 rounded text-[9px]">
                      0% EMI
                    </span>
                  </div>

                  {/* 1-Tap Quick Action Row */}
                  <div className="pt-1.5 border-t border-white/15 flex items-center gap-1.5">
                    <a
                      href={waDealUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-[10px] py-1.5 px-2 rounded-xl flex items-center justify-center gap-1 shadow-sm transition active:scale-95"
                    >
                      <MessageSquare className="w-3 h-3 fill-current shrink-0" />
                      <span>Claim Deal</span>
                    </a>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReel(reel);
                      }}
                      className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition shrink-0"
                      title="Preview Reel"
                      aria-label="Preview Reel"
                    >
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Live Profile Mode: Beautiful Centered Mockup Layout for Laptop */
        <div className="bento-card p-4 sm:p-8 rounded-3xl bg-white dark:bg-[#121624] border-2 border-zinc-200 dark:border-white/15 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Story Highlights & Instructions (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-md shrink-0">
                  <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center">
                    <InstagramIcon className="w-6 h-6 text-pink-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-black text-lg sm:text-xl text-zinc-950 dark:text-white">
                      @{siteConfig.contact.instagramHandle}
                    </h3>
                    <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] font-black flex items-center justify-center">
                      ✓
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    The Mobile Lounge, Kakod (by Vishal Distributors) • 1,150+ Followers • 52+ Reels
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                <p>
                  Watch real customers from <strong className="text-zinc-950 dark:text-white">Kakod, Jahangirpur, and Dankaur</strong> unbox their brand-new Apple iPhones, Samsung Galaxy, OnePlus, and Vivo devices with assured free gift hampers and 0% paperless EMI.
                </p>
              </div>

              {/* Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 space-y-1">
                  <p className="font-black text-xs text-zinc-950 dark:text-white flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#ff5a1f]" />
                    <span>Daily Unboxings</span>
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    See live customer deliveries recorded right at our showroom counter.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 space-y-1">
                  <p className="font-black text-xs text-zinc-950 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Gift Box Revealed</span>
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Watch the actual smartwatches and ANC earbuds given with each smartphone.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Open Instagram Profile Page</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveTab("reels_grid")}
                  className="bg-zinc-100 hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/20 text-zinc-900 dark:text-white font-extrabold text-xs px-4 py-3 rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <Layers className="w-4 h-4 text-[#ff5a1f]" />
                  <span>Switch to Reel Cards Grid</span>
                </button>
              </div>
            </div>

            {/* Right Live Instagram Embed Mockup Frame (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-3xl overflow-hidden bg-black border-4 border-zinc-800 dark:border-zinc-700 shadow-2xl relative">
                <div className="p-2.5 bg-zinc-950 border-b border-white/10 flex items-center justify-between text-xs text-white">
                  <span className="font-bold">@{siteConfig.contact.instagramHandle}</span>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>

                <div className="w-full h-[540px] bg-black">
                  <iframe
                    src="https://www.instagram.com/themobilelounge_kakod/embed"
                    className="w-full h-full border-0 bg-black"
                    loading="lazy"
                    title="The Mobile Lounge Kakod Instagram Feed"
                    allow="encrypted-media"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Bottom Video Call Demo Banner (Full Width) */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-[#ff1e42]/15 border border-pink-500/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-pink-600 dark:text-pink-300 font-extrabold text-xs uppercase tracking-wide">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>VIP LIVE VIDEO CALL DEMO FROM KAKOD COUNTER</span>
          </div>
          <h3 className="font-display font-black text-base sm:text-lg text-zinc-950 dark:text-white">
            Want to see your sealed-pack phone & free gifts live before visiting?
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Connect directly with Vishal bhai via WhatsApp video call. We will show you the original brand seal, unboxing experience, and exact gift hamper live from our store counter!
          </p>
        </div>

        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
            "Namaste Vishal bhai! I saw your Instagram reels and want a live WhatsApp video call demo of your phone stock & free gifts before visiting The Mobile Lounge Kakod."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg transition active:scale-95 shrink-0 self-stretch md:self-auto justify-center"
        >
          <MessageSquare className="w-4 h-4 fill-current shrink-0" />
          <span>Request Live Video Demo</span>
        </a>
      </div>

      {/* 4. Interactive Reel Modal Preview Dialog */}
      {selectedReel && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-white/20 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-3.5 bg-black/90 border-b border-white/10 flex items-center justify-between z-10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <InstagramIcon className="w-4 h-4 text-pink-400" />
                  </div>
                </div>
                <div>
                  <p className="font-extrabold text-xs text-white">
                    @{siteConfig.contact.instagramHandle}
                  </p>
                  <p className="text-[10px] text-zinc-400">{selectedReel.postedAt}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReel(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                aria-label="Close reel modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Reel Body: Real Instagram Live Embed Frame */}
            <div className="flex-1 overflow-y-auto bg-black p-3 space-y-3">
              <div className="relative w-full aspect-[9/14] sm:aspect-[9/15] rounded-2xl overflow-hidden bg-black border border-white/10">
                <iframe
                  src="https://www.instagram.com/themobilelounge_kakod/embed"
                  className="w-full h-full border-0 bg-black"
                  loading="lazy"
                  title={selectedReel.phoneTag}
                  allow="encrypted-media"
                />
              </div>

              <div className="space-y-1.5 p-2 bg-zinc-900/80 rounded-2xl border border-white/10 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-white">
                    {selectedReel.phoneTag}
                  </span>
                  <span className="font-black text-sm text-[#c5e84a]">
                    {selectedReel.dealPrice}
                  </span>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  {selectedReel.caption}
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-3 bg-zinc-950 border-t border-white/10 flex items-center gap-2 shrink-0">
              <a
                href={selectedReel.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-pink-500 to-rose-600 hover:opacity-90 text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition text-center"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Open in Instagram</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  `Namaste The Mobile Lounge! I saw your reel for *${selectedReel.phoneTag}* and want to lock in this deal with free gifts!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition text-center"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Unlock Deal on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
