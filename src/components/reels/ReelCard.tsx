"use client";

import { useState } from "react";
import Link from "next/link";
import { Reel } from "@/types/reel";
import { siteConfig } from "@/config/site";
import {
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Check,
  Flame,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

interface ReelCardProps {
  reel: Reel;
  index: number;
  isActive: boolean;
  onVideoEnded?: (index: number) => void;
  setReelRef: (el: HTMLDivElement | null, index: number) => void;
}

export function ReelCard({
  reel,
  index,
  isActive,
  setReelRef,
}: ReelCardProps) {
  const [likesCount, setLikesCount] = useState<number>(reel.likes);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const triggerLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikesCount((prev) => prev + 1);
    } else {
      setHasLiked(false);
      setLikesCount((prev) => Math.max(0, prev - 1));
    }
  };

  const handleShare = async () => {
    const shareUrl = reel.instagramUrl || `https://www.instagram.com/${siteConfig.contact.instagramHandle}/`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `@${siteConfig.contact.instagramHandle} Reel`,
          text: reel.caption.slice(0, 100),
          url: shareUrl,
        });
      } catch {
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const waEnquiryText = `Namaste The Mobile Lounge Kakod! I was watching your Instagram Reel: "${
    reel.phoneTag || "Phone delivery"
  }". Can you please tell me today's offline deal price, free gifts, and 0% EMI schemes?`;
  const waUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    waEnquiryText
  )}`;

  return (
    <div
      ref={(el) => setReelRef(el, index)}
      data-reel-index={index}
      className="snap-start snap-always w-full h-[100dvh] sm:h-full relative flex flex-col justify-between bg-zinc-950 overflow-hidden select-none border-b sm:border-b-0 border-white/10"
    >
      {/* Top Header Strip inside card */}
      <div className="p-3 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <InstagramIcon className="w-4 h-4 text-pink-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs text-white">
                @{siteConfig.contact.instagramHandle}
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-sky-500 text-white text-[9px] font-black flex items-center justify-center">
                ✓
              </span>
            </div>
            <p className="text-[10px] text-zinc-400">Live Kakod Showroom Delivery</p>
          </div>
        </div>

        <a
          href={siteConfig.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 transition"
        >
          <Flame className="w-3 h-3 text-amber-400 fill-current" />
          <span>Real Reel</span>
        </a>
      </div>

      {/* Real Instagram Embed Frame */}
      <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden">
        <iframe
          src={`${reel.embedUrl || "https://www.instagram.com/themobilelounge_kakod/embed"}?utm_source=ig_web_copy_link`}
          className="w-full h-full border-0 bg-black"
          loading="lazy"
          title={`Instagram Reel by @${siteConfig.contact.instagramHandle}`}
          allow="encrypted-media; autoplay; clipboard-write"
        />

        {/* Floating Quick Action Rail (Right) */}
        <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-3">
          {/* Like */}
          <button
            onClick={triggerLike}
            className="flex flex-col items-center gap-1 text-white hover:scale-110 active:scale-95 transition"
            aria-label="Like"
          >
            <div
              className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg ${
                hasLiked
                  ? "bg-rose-500 text-white"
                  : "bg-black/60 text-white border border-white/20"
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? "fill-current" : ""}`} />
            </div>
            <span className="text-[10px] font-bold text-white drop-shadow">
              {likesCount}
            </span>
          </button>

          {/* WhatsApp Direct Inquiry */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-white hover:scale-110 active:scale-95 transition"
            aria-label="Enquire on WhatsApp"
            title="Ask Price on WhatsApp"
          >
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_0_15px_rgba(37,211,102,0.5)]">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <span className="text-[10px] font-bold text-[#a3e635] drop-shadow">Price</span>
          </a>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 text-white hover:scale-110 active:scale-95 transition"
            aria-label="Share"
            title="Share Reel Link"
          >
            <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-lg">
              {copiedLink ? (
                <Check className="w-4 h-4 text-[#a3e635]" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </div>
            <span className="text-[10px] font-bold text-white drop-shadow">
              {copiedLink ? "Copied" : "Share"}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Card Summary & WhatsApp CTA Bar */}
      <div className="p-3.5 bg-black/90 backdrop-blur-md border-t border-white/10 space-y-2 z-10 text-white">
        {/* Product Tag */}
        {reel.phoneTag && (
          <div className="flex items-center justify-between text-xs">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-white font-bold text-[11px]">
              <ShoppingBag className="w-3 h-3 text-[#a3e635]" />
              <span className="truncate max-w-[200px]">{reel.phoneTag}</span>
            </div>
            {reel.phoneSlug && (
              <Link
                href={`/phones/${reel.phoneSlug}`}
                className="text-xs text-[#a3e635] font-extrabold hover:underline flex items-center gap-1"
              >
                <span>Specs</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            )}
          </div>
        )}

        {/* Caption */}
        <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
          {reel.caption}
        </p>

        {/* WhatsApp Call to Action */}
        <div className="pt-1">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#a3e635] hover:bg-lime-400 text-black font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(163,230,53,0.35)] transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unlock Today&apos;s Store Deal Price on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
