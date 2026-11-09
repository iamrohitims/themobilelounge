"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Reel } from "@/types/reel";
import { ReelCard } from "@/components/reels/ReelCard";
import { siteConfig } from "@/config/site";
import {
  ArrowLeft,
  Flame,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Layers,
  Radio,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import Image from "next/image";

interface ReelsFeedProps {
  initialReels: Reel[];
}

export function ReelsFeed({ initialReels }: ReelsFeedProps) {
  const router = useRouter();
  const [reels] = useState<Reel[]>(initialReels);
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"live_embed" | "snap_reels">("live_embed");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setReelRef = useCallback((el: HTMLDivElement | null, index: number) => {
    reelRefs.current[index] = el;
  }, []);

  // Set up IntersectionObserver when in snap_reels mode
  useEffect(() => {
    if (viewMode !== "snap_reels") return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const indexAttr = entry.target.getAttribute("data-reel-index");
            if (indexAttr !== null) {
              const idx = parseInt(indexAttr, 10);
              setActiveReelIndex(idx);
            }
          }
        });
      },
      {
        root: container,
        threshold: [0.6],
      }
    );

    reelRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [viewMode, reels]);

  const scrollToNext = () => {
    if (activeReelIndex < reels.length - 1) {
      reelRefs.current[activeReelIndex + 1]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToPrev = () => {
    if (activeReelIndex > 0) {
      reelRefs.current[activeReelIndex - 1]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const currentReel = reels[activeReelIndex] || reels[0];

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden flex flex-col items-center justify-between select-none">
      {/* Top Floating App Bar */}
      <header className="w-full z-40 p-3 sm:p-4 max-w-lg mx-auto flex items-center justify-between bg-black/80 backdrop-blur-md border-b border-white/10 shrink-0">
        <button
          onClick={() => router.push("/")}
          className="w-9 h-9 rounded-full bg-zinc-900 border border-white/20 text-white flex items-center justify-center hover:bg-zinc-800 transition"
          aria-label="Back to store"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-full border border-white/15">
          <button
            onClick={() => setViewMode("live_embed")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === "live_embed"
                ? "bg-[#ff1e42] text-white shadow-sm font-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Radio className="w-3 h-3 animate-pulse" />
            <span>Live Stream</span>
          </button>
          <button
            onClick={() => setViewMode("snap_reels")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === "snap_reels"
                ? "bg-[#a3e635] text-black shadow-sm font-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Snap Cards</span>
          </button>
        </div>

        {/* Instagram Profile Link */}
        <a
          href={siteConfig.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 flex items-center justify-center shadow hover:scale-105 transition"
          title="Open in Instagram App"
        >
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <InstagramIcon className="w-4 h-4 text-pink-400" />
          </div>
        </a>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-lg mx-auto relative overflow-hidden flex flex-col justify-center">
        {viewMode === "live_embed" ? (
          /* Mode 1: Live Instagram Profile & Reels Embed (100% Real from Instagram) */
          <div className="w-full h-full relative bg-black flex flex-col justify-between overflow-hidden">
            {/* Live Profile Header Info */}
            <div className="p-3 bg-zinc-950 border-b border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-extrabold text-white">
                  @{siteConfig.contact.instagramHandle}
                </span>
                <span className="text-zinc-400">• Official Live Account</span>
              </div>
              <span className="bg-white/10 text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                52+ Posts & Reels
              </span>
            </div>

            {/* Direct Official Instagram Feed Frame */}
            <div className="flex-1 w-full bg-black relative">
              <iframe
                src="https://www.instagram.com/themobilelounge_kakod/embed"
                className="w-full h-full border-0 bg-black"
                loading="lazy"
                title="The Mobile Lounge Kakod Live Instagram Reels"
                allow="encrypted-media; autoplay; clipboard-write"
              />
            </div>

            {/* Helpful Scroll Hint & WhatsApp Action */}
            <div className="p-3 bg-zinc-950 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span>👆 Tap any video inside the box to play with audio</span>
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open Instagram App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  "Hi The Mobile Lounge Kakod! I am watching your Instagram Reels. Please tell me today's best offline deal prices and free gift hamper!"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#a3e635] hover:bg-lime-400 text-black font-extrabold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(163,230,53,0.35)] transition"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Enquire About Phone Seen in Reels on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          /* Mode 2: Fullscreen Snap Cards with Real Instagram Embeds */
          <main
            ref={containerRef}
            className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar relative shadow-2xl bg-black"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reels.map((reel, index) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                index={index}
                isActive={index === activeReelIndex}
                setReelRef={setReelRef}
              />
            ))}
          </main>
        )}
      </div>

      {/* Desktop Vertical Nav Indicator (Only in snap mode) */}
      {viewMode === "snap_reels" && (
        <aside className="hidden xl:flex flex-col items-center gap-3 absolute right-8 top-1/2 -translate-y-1/2 z-30 text-white">
          <button
            onClick={scrollToPrev}
            disabled={activeReelIndex === 0}
            className="w-11 h-11 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition"
            aria-label="Previous reel"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          <span className="text-xs font-mono font-bold text-zinc-400">
            {activeReelIndex + 1} / {reels.length}
          </span>

          <button
            onClick={scrollToNext}
            disabled={activeReelIndex === reels.length - 1}
            className="w-11 h-11 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition"
            aria-label="Next reel"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </aside>
      )}
    </div>
  );
}
