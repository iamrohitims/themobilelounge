"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  instagramReels as defaultReels,
  getCanonicalReelUrl,
  extractReelShortcode,
} from "@/data/instagramReels";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import {
  ExternalLink,
  MessageSquare,
  PhoneCall,
  Play,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: (element?: HTMLElement) => void;
      };
    };
  }
}

const INSTAGRAM_SCRIPT_ID = "instagram-embed-script";

export interface InstagramReelsProps {
  /**
   * Array of Instagram Reel URLs.
   * If omitted, falls back to the centralized `instagramReels` list in `@/data/instagramReels`.
   */
  reels?: string[];
  /** Section title override */
  title?: string;
  /** Section subtitle override */
  subtitle?: string;
  /** Whether to show the top header with profile badge and actions */
  showHeader?: boolean;
  /** Whether to show the VIP live video demo banner at the bottom */
  showVipBanner?: boolean;
  /** Optional extra CSS classes for the root container */
  className?: string;
}

export function InstagramReels({
  reels = defaultReels,
  title = "Watch Kakod Customer Deliveries & Live Unboxings",
  subtitle = "Swipe through live unboxings, customer handovers, and assured gift hampers directly from our official Instagram channel @themobilelounge_kakod (by Vishal Distributors).",
  showHeader = true,
  showVipBanner = true,
  className = "",
}: InstagramReelsProps) {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter and sanitize reel URLs
  const validReels = useMemo(() => {
    if (!Array.isArray(reels)) return [];
    return reels
      .map((url) => {
        const canonical = getCanonicalReelUrl(url);
        const shortcode = extractReelShortcode(url);
        if (!canonical || !shortcode) return null;
        return { original: url, canonical, shortcode };
      })
      .filter((item): item is { original: string; canonical: string; shortcode: string } => item !== null);
  }, [reels]);

  // Client-side mount flag
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check scroll positions and active index
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active card index
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 360;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(validReels.length - 1, index)));
  }, [validReels.length]);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  // Scroll left/right handler
  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 360;
    const offset = direction === "left" ? -cardWidth : cardWidth;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  // Scroll directly to a specific slide index
  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 360;
    el.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  // Efficient official Instagram embed script loader
  useEffect(() => {
    if (!mounted) return;

    let isSubscribed = true;

    const runProcess = () => {
      try {
        if (window.instgrm?.Embeds?.process) {
          window.instgrm.Embeds.process();
        }
      } catch (err) {
        console.warn("Instagram embed process notice:", err);
      }
    };

    let script = document.getElementById(INSTAGRAM_SCRIPT_ID) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = INSTAGRAM_SCRIPT_ID;
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        runProcess();
      };
      script.onerror = () => {
        console.warn("Failed to load Instagram embed script.");
      };
      document.body.appendChild(script);
    } else {
      if (window.instgrm?.Embeds) {
        runProcess();
      } else {
        script.addEventListener("load", runProcess);
      }
    }

    const timer1 = setTimeout(runProcess, 300);
    const timer2 = setTimeout(runProcess, 1200);

    return () => {
      isSubscribed = false;
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (script) {
        script.removeEventListener("load", runProcess);
      }
    };
  }, [mounted, validReels]);

  return (
    <section className={`w-full max-w-full space-y-5 overflow-hidden ${className}`}>
      {/* 1. Header Section with Controls */}
      {showHeader && (
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-amber-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 font-extrabold text-xs uppercase tracking-wider">
              <InstagramIcon className="w-3.5 h-3.5 shrink-0" />
              <span>OFFICIAL INSTAGRAM • @{siteConfig.contact.instagramHandle}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl text-zinc-950 dark:text-white tracking-tight">
              {title}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Social Proof, Linkouts & Scroller Controls */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Follow on Instagram */}
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition active:scale-95"
            >
              <InstagramIcon className="w-3.5 h-3.5 shrink-0" />
              <span>Follow @{siteConfig.contact.instagramHandle}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            {/* Fullscreen Video Player */}
            <Link
              href="/reels"
              className="bg-zinc-100 hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/15 text-zinc-900 dark:text-white font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition active:scale-95 border border-zinc-200 dark:border-white/10"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>All Reels</span>
            </Link>

            {/* Left / Right Carousel Arrow Buttons */}
            {validReels.length > 1 && (
              <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-zinc-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition border ${
                    canScrollLeft
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-zinc-700 active:scale-95 shadow-sm"
                      : "bg-zinc-100 dark:bg-white/5 text-zinc-400 dark:text-zinc-600 border-zinc-200/50 dark:border-white/5 cursor-not-allowed opacity-50"
                  }`}
                  aria-label="Previous reel"
                  title="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition border ${
                    canScrollRight
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-white/15 hover:bg-zinc-100 dark:hover:bg-zinc-700 active:scale-95 shadow-sm"
                      : "bg-zinc-100 dark:bg-white/5 text-zinc-400 dark:text-zinc-600 border-zinc-200/50 dark:border-white/5 cursor-not-allowed opacity-50"
                  }`}
                  aria-label="Next reel"
                  title="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Horizontal Left-to-Right Scroller Track */}
      {validReels.length === 0 ? (
        <div className="p-8 text-center rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 space-y-3">
          <p className="font-bold text-sm text-zinc-600 dark:text-zinc-400">
            No Instagram Reels to display right now.
          </p>
          <a
            href={siteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-black text-pink-600 hover:underline"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Visit @{siteConfig.contact.instagramHandle} on Instagram</span>
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-1 -mx-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {validReels.map((reel, index) => {
              const waDealUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                `Namaste Vishal bhai! I saw your Kakod customer delivery Reel on Instagram (${reel.canonical}) and want to inquire about current price & free gift offer.`
              )}`;

              return (
                <div
                  key={reel.shortcode}
                  className="w-[86vw] xs:w-[340px] sm:w-[360px] md:w-[380px] shrink-0 snap-center sm:snap-start rounded-3xl overflow-hidden bg-white dark:bg-[#11141e] border-2 border-zinc-200 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Header Pill */}
                  <div className="p-3 bg-zinc-50 dark:bg-white/5 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shrink-0">
                        <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center">
                          <InstagramIcon className="w-3 h-3 text-pink-500" />
                        </div>
                      </div>
                      <span className="font-extrabold text-zinc-900 dark:text-white truncate">
                        Reel #{index + 1} • Kakod Delivery
                      </span>
                    </div>

                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                      Verified
                    </span>
                  </div>

                  {/* Embed Container with Min-Height & Shimmer Fallback */}
                  <div className="relative w-full min-h-[480px] sm:min-h-[520px] bg-zinc-100 dark:bg-zinc-900/60 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                    {/* Underlay Skeleton / Fallback State */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 pointer-events-none opacity-60">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg animate-pulse">
                        <InstagramIcon className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                        Loading Reel from Instagram...
                      </p>
                      <span className="text-[10px] text-zinc-400">
                        Main Market, Kakod Showroom
                      </span>
                    </div>

                    {/* Official Instagram Embed Blockquote */}
                    {mounted && (
                      <blockquote
                        className="instagram-media relative z-10 w-full"
                        data-instgrm-captioned
                        data-instgrm-permalink={reel.canonical}
                        data-instgrm-version="14"
                        style={{
                          background: "#FFF",
                          border: 0,
                          borderRadius: "16px",
                          margin: "0 auto",
                          maxWidth: "100%",
                          minWidth: "280px",
                          padding: 0,
                          width: "100%",
                        }}
                      >
                        <div className="p-4 text-center">
                          <a
                            href={reel.canonical}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center justify-center gap-1.5"
                          >
                            <InstagramIcon className="w-4 h-4 shrink-0" />
                            <span>Watch Reel on Instagram</span>
                          </a>
                        </div>
                      </blockquote>
                    )}
                  </div>

                  {/* Bottom Card Action Bar */}
                  <div className="p-3 bg-zinc-50 dark:bg-white/5 border-t border-zinc-200 dark:border-white/10 flex items-center gap-2">
                    <a
                      href={waDealUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current shrink-0" />
                      <span>Claim Deal on WhatsApp</span>
                    </a>

                    <a
                      href={reel.canonical}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-zinc-200/80 hover:bg-zinc-300 dark:bg-white/10 dark:hover:bg-white/20 text-zinc-800 dark:text-zinc-200 transition shrink-0"
                      title="Open on Instagram"
                      aria-label="Open Reel on Instagram"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroller Pagination Dots & Mobile Swipe Hint */}
          <div className="flex items-center justify-between px-1 pt-1">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {validReels.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  className={`transition-all duration-200 rounded-full ${
                    activeIndex === i
                      ? "w-6 h-2 bg-[#ff5a1f]"
                      : "w-2 h-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
                  }`}
                  aria-label={`Go to reel ${i + 1}`}
                />
              ))}
              <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 ml-2">
                Reel {activeIndex + 1} of {validReels.length}
              </span>
            </div>

            {/* Mobile swipe helper */}
            <div className="sm:hidden flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              <span>Swipe left</span>
              <ArrowRight className="w-3 h-3 text-[#ff5a1f]" />
            </div>
          </div>
        </div>
      )}

      {/* 3. Bottom VIP Live Video Call Demo Banner */}
      {showVipBanner && (
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
      )}
    </section>
  );
}

export default InstagramReels;
