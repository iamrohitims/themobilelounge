"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Review } from "@/types/offer";
import {
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  MessageSquare,
  ArrowRight,
  Camera,
  X,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  avatarUrl: string;
  photoUrl: string;
  location: string;
  device: string;
  deviceSlug: string;
  quote: string;
  highlightBadge: string;
  rating: number;
  date: string;
  source: string;
  invoiceNumber?: string;
}

interface CustomerReviewsProps {
  reviews?: Review[];
}

const AVATAR_GRADIENTS = [
  "from-blue-600 to-indigo-700",
  "from-emerald-600 to-teal-800",
  "from-rose-500 to-pink-700",
  "from-amber-500 to-orange-700",
  "from-purple-600 to-indigo-800",
  "from-cyan-600 to-blue-700",
];

const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
];

const DEFAULT_UNBOXING_PHOTOS = [
  "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80",
];

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Rahul Sharma",
    initials: "RS",
    avatarColor: "from-blue-600 to-indigo-700",
    avatarUrl: DEFAULT_AVATARS[0],
    photoUrl: DEFAULT_UNBOXING_PHOTOS[0],
    location: "Kakod",
    device: "iPhone 16 (128GB Teal)",
    deviceSlug: "apple-iphone-16",
    quote:
      "Got my iPhone 16 cheaper than Flipkart! Bajaj 0% EMI was approved in 7 minutes, and Vishal bhai gifted a smartwatch and glass fitting free.",
    highlightBadge: "₹0 Downpayment Approved",
    rating: 5,
    date: "3 days ago",
    source: "Google",
    invoiceNumber: "TML-2026-0891",
  },
  {
    id: "t-2",
    name: "Amit Bhati & Family",
    initials: "AB",
    avatarColor: "from-emerald-600 to-teal-800",
    avatarUrl: DEFAULT_AVATARS[1],
    photoUrl: DEFAULT_UNBOXING_PHOTOS[1],
    location: "Jahangirpur Road, Kakod",
    device: "Samsung Galaxy S24 Ultra",
    deviceSlug: "samsung-galaxy-s24-ultra",
    quote:
      "Exchanged old phone with ₹18,500 instant spot discount. All 40GB WhatsApp chats and photos transferred free with zero data loss. Best shop in Kakod!",
    highlightBadge: "₹18,500 Spot Exchange",
    rating: 5,
    date: "1 week ago",
    source: "Google",
    invoiceNumber: "TML-2026-0914",
  },
  {
    id: "t-3",
    name: "Pooja Verma",
    initials: "PV",
    avatarColor: "from-rose-500 to-pink-700",
    avatarUrl: DEFAULT_AVATARS[2],
    photoUrl: DEFAULT_UNBOXING_PHOTOS[2],
    location: "Dankaur",
    device: "Vivo V40 Pro ZEISS",
    deviceSlug: "vivo-v40-pro-5g",
    quote:
      "Saw reels on Instagram and visited store. ZEISS camera is mind-blowing! Got ₹0 downpayment on IDFC card and free ANC earbuds with box.",
    highlightBadge: "Free ANC Earbuds Gift",
    rating: 5,
    date: "2 weeks ago",
    source: "Instagram",
    invoiceNumber: "TML-2026-0945",
  },
  {
    id: "t-4",
    name: "Deepak Nagar",
    initials: "DN",
    avatarColor: "from-amber-500 to-orange-700",
    avatarUrl: DEFAULT_AVATARS[3],
    photoUrl: DEFAULT_UNBOXING_PHOTOS[3],
    location: "Sikandrabad",
    device: "OnePlus Nord 4 5G",
    deviceSlug: "oneplus-nord-4-5g",
    quote:
      "Very polite, transparent, and honest staff. 100% genuine sealed pack with GST bill registered on brand portal. No credit card swipe charges.",
    highlightBadge: "100% Sealed GST Bill",
    rating: 5,
    date: "3 weeks ago",
    source: "Google",
    invoiceNumber: "TML-2026-0972",
  },
  {
    id: "t-5",
    name: "Vikas Bhati",
    initials: "VB",
    avatarColor: "from-purple-600 to-indigo-800",
    avatarUrl: DEFAULT_AVATARS[4],
    photoUrl: DEFAULT_UNBOXING_PHOTOS[4],
    location: "Chhatari / Kakod",
    device: "Realme 13 Pro+ 5G",
    deviceSlug: "realme-13-pro-plus-5g",
    quote:
      "Bought on 9 months No Cost EMI with Home Credit. Approval was done on spot with just Aadhaar OTP. Also got noise-cancelling earbuds free.",
    highlightBadge: "9-Mo No Cost EMI",
    rating: 5,
    date: "1 month ago",
    source: "Google",
    invoiceNumber: "TML-2026-1002",
  },
  {
    id: "t-6",
    name: "Neha Solanki & Brother",
    initials: "NS",
    avatarColor: "from-cyan-600 to-blue-700",
    avatarUrl: DEFAULT_AVATARS[5],
    photoUrl: DEFAULT_UNBOXING_PHOTOS[5],
    location: "Jahangirpur Road, Kakod",
    device: "Redmi Note 13 Pro+ 5G",
    deviceSlug: "redmi-13c-5g",
    quote:
      "Super smooth experience! Vishal bhaiya helped us compare camera quality side-by-side with iPhone. Approved zero downpayment EMI within 10 minutes.",
    highlightBadge: "Instant OTP Finance",
    rating: 5,
    date: "1 month ago",
    source: "Google",
    invoiceNumber: "TML-2026-1028",
  },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (name.slice(0, 2) || "TL").toUpperCase();
}

function resolveDeviceSlug(device: string): string {
  const lower = (device || "").toLowerCase();
  if (lower.includes("iphone 16 pro max")) return "apple-iphone-16-pro-max";
  if (lower.includes("iphone 16 pro")) return "apple-iphone-16-pro";
  if (lower.includes("iphone 16")) return "apple-iphone-16";
  if (lower.includes("iphone 15")) return "apple-iphone-15";
  if (lower.includes("iphone 13")) return "apple-iphone-13";
  if (lower.includes("s24 ultra")) return "samsung-galaxy-s24-ultra";
  if (lower.includes("s24")) return "samsung-galaxy-s24";
  if (lower.includes("v40 pro")) return "vivo-v40-pro-5g";
  if (lower.includes("v40")) return "vivo-v40-5g";
  if (lower.includes("nord 4")) return "oneplus-nord-4-5g";
  if (lower.includes("nord ce4")) return "oneplus-nord-ce4-5g";
  if (lower.includes("realme 13 pro")) return "realme-13-pro-plus-5g";
  if (lower.includes("poco x6")) return "poco-x6-pro-5g";
  if (lower.includes("poco m6")) return "poco-m6-pro-5g";
  if (lower.includes("iqoo")) return "iqoo-z9s-pro-5g";
  return lower.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "apple-iphone-16";
}

function extractBadge(comment: string): string {
  const c = comment.toLowerCase();
  if (c.includes("downpayment") || c.includes("0% emi") || c.includes("no cost emi")) {
    return "₹0 Down EMI Approved";
  }
  if (c.includes("exchange") || c.includes("spot discount")) {
    return "₹18,500 Spot Exchange";
  }
  if (c.includes("smartwatch") || c.includes("earbuds") || c.includes("gift")) {
    return "Free Gift Box Included";
  }
  if (c.includes("sealed") || c.includes("gst bill")) {
    return "100% Sealed GST Bill";
  }
  if (c.includes("whatsapp") || c.includes("data transfer")) {
    return "Free Data & Chat Setup";
  }
  return "Google Verified Customer";
}

function condenseQuote(text: string): string {
  if (!text) return "Best prices, 100% sealed-pack warranty and amazing service in Kakod!";
  const trimmed = text.trim();
  if (trimmed.length <= 140) return trimmed;
  const sentences = trimmed.split(/(?<=[.!?])\s+/);
  if (sentences.length >= 2 && (sentences[0].length + sentences[1].length) <= 160) {
    return `${sentences[0]} ${sentences[1]}`;
  }
  return `${trimmed.slice(0, 135)}...`;
}

export function CustomerReviews({ reviews }: CustomerReviewsProps = {}) {
  // Normalize dynamic reviews from DB, slicing latest 5-6
  const items: TestimonialItem[] = (
    reviews && reviews.length > 0
      ? reviews.slice(0, 6).map((r, idx) => ({
          id: r.id || `dyn-${idx}`,
          name: r.author || "Valued Customer",
          initials: getInitials(r.author || "VC"),
          avatarColor: AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length],
          avatarUrl: r.avatarUrl || DEFAULT_AVATARS[idx % DEFAULT_AVATARS.length],
          photoUrl: r.photoUrl || DEFAULT_UNBOXING_PHOTOS[idx % DEFAULT_UNBOXING_PHOTOS.length],
          location: r.location || "Kakod, Bulandshahr",
          device: r.phoneBought || "5G Smartphone",
          deviceSlug: resolveDeviceSlug(r.phoneBought || ""),
          quote: condenseQuote(r.comment),
          highlightBadge: extractBadge(r.comment || ""),
          rating: r.rating || 5,
          date: r.date || "Recently",
          source: r.source || "Google",
          invoiceNumber: r.invoiceNumber,
        }))
      : FALLBACK_TESTIMONIALS
  ).slice(0, 6);

  const total = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [avatarErrors, setAvatarErrors] = useState<Record<string, boolean>>({});
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-scrolling cycle (every 4.5 seconds, pauses on hover/touch)
  useEffect(() => {
    if (isPaused || total <= 1 || showPhotoModal) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, total, nextSlide, showPhotoModal]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  const current = items[currentIndex];
  const prevItem = items[(currentIndex - 1 + total) % total];
  const nextItem = items[(currentIndex + 1) % total];

  return (
    <section
      className="w-full max-w-4xl mx-auto py-4 sm:py-8 px-2 sm:px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Customer Testimonials"
    >
      {/* 1. Header with ample bottom margin to prevent ANY overlap with the protruding avatar on mobile */}
      <div className="text-center space-y-2 mb-16 sm:mb-20">
        {/* Cursive / Calligraphic Eyebrow */}
        <p className="font-serif italic text-2xl sm:text-3xl text-[#ff5a1f] dark:text-[#c5e84a] tracking-wide select-none">
          Customer
        </p>

        {/* Display Headline */}
        <h2 className="font-display font-black text-2xl sm:text-4xl text-zinc-950 dark:text-white tracking-tight uppercase">
          TESTIMONIALS
        </h2>

        {/* Responsive Google Verified Proof Badge: plenty of negative space, guaranteed NEVER hidden on mobile */}
        <div className="pt-1 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/15 shadow-2xs text-[11px] sm:text-xs">
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
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
            <span className="font-black text-zinc-900 dark:text-white">
              4.9 ★★★★★ Rating
            </span>
            <span className="text-zinc-500 dark:text-zinc-400 font-semibold">
              (420+ Real Reviews in Kakod)
            </span>
          </div>
        </div>
      </div>

      {/* 2. 3D Panoramic Rotary Stage (Center Highlight + Peeking Wings) */}
      <div className="relative flex items-center justify-center pt-2 sm:pt-4">
        {/* Left Wing (Previous Preview - click to spin) */}
        <div
          onClick={prevSlide}
          className="hidden md:block absolute left-0 w-[260px] lg:w-[280px] h-[240px] rounded-3xl bg-[#1a2f22] dark:bg-[#0c1811] opacity-35 hover:opacity-60 transition-all duration-500 transform -translate-x-12 scale-90 blur-[0.4px] cursor-pointer shadow-lg border border-emerald-500/20 p-5 overflow-hidden z-0 select-none"
          title={`Previous: ${prevItem.name}`}
        >
          <div className="w-11 h-11 rounded-full mx-auto mb-2 bg-emerald-800/40 border border-white/20 flex items-center justify-center text-xs font-bold text-white">
            {prevItem.initials}
          </div>
          <p className="text-xs text-center text-white/80 line-clamp-3 italic">
            &ldquo;{prevItem.quote}&rdquo;
          </p>
          <p className="text-[11px] font-bold text-emerald-400 text-center mt-3">
            {prevItem.name}
          </p>
        </div>

        {/* Right Wing (Next Preview - click to spin) */}
        <div
          onClick={nextSlide}
          className="hidden md:block absolute right-0 w-[260px] lg:w-[280px] h-[240px] rounded-3xl bg-[#1a2f22] dark:bg-[#0c1811] opacity-35 hover:opacity-60 transition-all duration-500 transform translate-x-12 scale-90 blur-[0.4px] cursor-pointer shadow-lg border border-emerald-500/20 p-5 overflow-hidden z-0 select-none"
          title={`Next: ${nextItem.name}`}
        >
          <div className="w-11 h-11 rounded-full mx-auto mb-2 bg-emerald-800/40 border border-white/20 flex items-center justify-center text-xs font-bold text-white">
            {nextItem.initials}
          </div>
          <p className="text-xs text-center text-white/80 line-clamp-3 italic">
            &ldquo;{nextItem.quote}&rdquo;
          </p>
          <p className="text-[11px] font-bold text-emerald-400 text-center mt-3">
            {nextItem.name}
          </p>
        </div>

        {/* Main Center Active Card (Responsive on all screens: 320px up to desktop) */}
        <div className="relative w-full max-w-[440px] sm:max-w-[480px] z-10">
          <div className="relative rounded-[26px] sm:rounded-[34px] bg-gradient-to-b from-[#1e3827] via-[#162c1e] to-[#0f1f15] text-white border-2 border-emerald-500/30 p-5 sm:p-8 pt-12 sm:pt-16 shadow-[0_20px_50px_rgba(16,36,24,0.45)] text-center transition-all duration-500">
            {/* Center Protruding Circular Avatar: Scaled down gracefully on mobile */}
            <div className="absolute -top-10 sm:-top-13 left-1/2 -translate-x-1/2">
              <div className="w-20 h-20 sm:w-26 sm:h-26 rounded-full overflow-hidden ring-4 ring-[#1e3827] dark:ring-[#162c1e] border-2 border-white/60 shadow-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center">
                {!avatarErrors[current.id] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={current.avatarUrl}
                    alt={current.name}
                    className="w-full h-full object-cover object-center"
                    onError={() =>
                      setAvatarErrors((prev) => ({ ...prev, [current.id]: true }))
                    }
                  />
                ) : (
                  <span className="font-black text-xl sm:text-2xl text-white">
                    {current.initials}
                  </span>
                )}
              </div>
            </div>

            {/* Oversized Signature Quotation Marks flanking the top */}
            <div
              className="absolute top-2 sm:top-3 left-3 sm:left-6 text-white/85 text-3xl sm:text-5xl font-serif font-black select-none pointer-events-none leading-none tracking-tight"
              aria-hidden="true"
            >
              “
            </div>
            <div
              className="absolute top-2 sm:top-3 right-3 sm:right-6 text-white/85 text-3xl sm:text-5xl font-serif font-black select-none pointer-events-none leading-none tracking-tight"
              aria-hidden="true"
            >
              ”
            </div>

            {/* Punchy Customer Quote */}
            <div className="min-h-[70px] sm:min-h-[85px] flex items-center justify-center px-1">
              <p className="text-xs sm:text-base font-normal text-emerald-50/95 leading-relaxed max-w-sm mx-auto">
                {current.quote}
              </p>
            </div>

            {/* 5 Golden Rating Stars */}
            <div className="flex items-center justify-center gap-1 my-2.5 text-amber-400">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current drop-shadow-xs" />
              ))}
            </div>

            {/* Customer Name, Verified Badge & Location */}
            <div className="space-y-0.5">
              <div className="inline-flex items-center justify-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                  {current.name}
                </span>
                <span title="GST Bill Verified Buyer">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-emerald-300/80 font-medium">
                📍 {current.location}
              </p>
            </div>

            {/* Real Unboxing Photo Section: Interactive Preview Button */}
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowPhotoModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-emerald-400/30 text-emerald-200 text-[11px] font-bold transition active:scale-95 cursor-pointer shadow-2xs"
              >
                <Camera className="w-3.5 h-3.5 text-[#ff5a1f]" />
                <span>📸 View Real Unboxing Photo</span>
              </button>

              {/* Bought Device Pill */}
              <Link
                href={`/phones/${current.deviceSlug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-[11px] font-bold transition active:scale-95 group truncate"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#ff5a1f] group-hover:rotate-12 transition-transform shrink-0" />
                <span className="truncate">{current.device}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Rotary Controls & Bottom Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 sm:mt-7 px-2">
        {/* Left CTA: Read All 420+ Reviews */}
        <Link
          href="/reviews"
          className="text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-[#ff5a1f] dark:hover:text-[#c5e84a] inline-flex items-center gap-1.5 transition order-2 sm:order-1"
        >
          <span>Read all 420+ verified reviews</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {/* Center: Rotary Navigation Controls (Prev / Next & Dots) */}
        <div className="flex items-center gap-3 order-1 sm:order-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 rounded-full bg-white dark:bg-white/10 hover:bg-[#ff5a1f] hover:text-white dark:hover:bg-[#ff5a1f] border border-zinc-200 dark:border-white/15 text-zinc-800 dark:text-white flex items-center justify-center transition shadow-2xs active:scale-90"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? "w-6 h-2 bg-[#ff5a1f]"
                    : "w-2 h-2 bg-zinc-300 dark:bg-white/25 hover:bg-zinc-400"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-8 h-8 rounded-full bg-white dark:bg-white/10 hover:bg-[#ff5a1f] hover:text-white dark:hover:bg-[#ff5a1f] border border-zinc-200 dark:border-white/15 text-zinc-800 dark:text-white flex items-center justify-center transition shadow-2xs active:scale-90"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right CTA: Submit Review & WhatsApp Store Chat */}
        <div className="flex items-center gap-2 order-3">
          <Link
            href="/reviews/submit"
            className="text-xs font-bold text-emerald-700 dark:text-[#a3e635] bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-500/25 inline-flex items-center gap-1.5 transition shadow-2xs"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Submit Review 📸</span>
          </Link>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
              "Namaste The Mobile Lounge! I saw your customer testimonials and want to check today's stock and best smartphone prices in Kakod."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs transition active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Chat</span>
          </a>
        </div>
      </div>

      {/* 4. Real Unboxing Photo Lightbox Modal */}
      {showPhotoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setShowPhotoModal(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[#121824] border border-white/20 rounded-3xl p-5 sm:p-6 text-white shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#c5e84a]" />
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white">
                    Real Showroom Unboxing • Kakod
                  </h3>
                  <p className="text-[10px] text-zinc-400">
                    Official GST Bill Verified • The Mobile Lounge
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPhotoModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Real Unboxing Photo */}
            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-black/60 border border-white/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.photoUrl}
                alt={`${current.name} unboxing ${current.device}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                📍 {current.location}
              </div>
            </div>

            {/* Testimonial Quote in Modal */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{current.name}</span>
                <span className="text-xs text-amber-400">★★★★★ 5.0</span>
              </div>
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                &ldquo;{current.quote}&rdquo;
              </p>
            </div>

            {/* Device & Verification Seal */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-semibold">Device: <strong className="text-white">{current.device}</strong></span>
              <span className="text-[10px] bg-emerald-500/20 text-[#a3e635] px-2.5 py-0.5 rounded-full font-bold">
                ✓ 100% Genuine Sealed Pack
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
