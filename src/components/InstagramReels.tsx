"use client";

import { useEffect, useState, useMemo } from "react";
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
  Sparkles,
  Play,
  CheckCircle2,
  Share2,
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
  subtitle = "Live unboxings, customer deliveries, and assured gift hampers directly from our official Instagram channel @themobilelounge_kakod (by Vishal Distributors).",
  showHeader = true,
  showVipBanner = true,
  className = "",
}: InstagramReelsProps) {
  const [mounted, setMounted] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

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

  // Client-side mount flag to avoid SSR hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Efficient official Instagram embed script loader
  useEffect(() => {
    if (!mounted) return;

    let isSubscribed = true;

    const runProcess = () => {
      try {
        if (window.instgrm?.Embeds?.process) {
          window.instgrm.Embeds.process();
          if (isSubscribed) setScriptLoaded(true);
        }
      } catch (err) {
        console.warn("Instagram embed process notice:", err);
      }
    };

    // Check if script is already in the document
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
      // Script already loaded or currently loading
      if (window.instgrm?.Embeds) {
        runProcess();
      } else {
        script.addEventListener("load", runProcess);
      }
    }

    // Safety timeout to process once hydration finishes or DOM updates
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
    <section className={`w-full max-w-full space-y-6 overflow-hidden ${className}`}>
      {/* 1. Header Section */}
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

          {/* Social Proof & Quick Links */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition active:scale-95"
            >
              <InstagramIcon className="w-4 h-4 shrink-0" />
              <span>Follow @{siteConfig.contact.instagramHandle}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <Link
              href="/reels"
              className="bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition active:scale-95 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Full Video Player</span>
            </Link>
          </div>
        </div>
      )}

      {/* 2. Responsive Instagram Reels Grid */}
      {validReels.length === 0 ? (
        /* Fallback if no valid reel URLs provided */
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start justify-items-center w-full">
          {validReels.map((reel, index) => {
            const waDealUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
              `Namaste Vishal bhai! I saw your Kakod customer delivery Reel on Instagram (${reel.canonical}) and want to inquire about current price & free gift offer.`
            )}`;

            return (
              <div
                key={reel.shortcode}
                className="w-full max-w-[420px] rounded-3xl overflow-hidden bg-white dark:bg-[#11141e] border-2 border-zinc-200 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Reel Header Pill */}
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
