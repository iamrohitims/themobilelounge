"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { siteConfig } from "@/config/site";
import { Offer } from "@/types/offer";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Flame,
  Gift,
  CreditCard,
  RefreshCw,
  Copy,
  Check,
  Pause,
  Play,
  Clock,
  ArrowRight,
  ShieldCheck,
  Tag,
} from "lucide-react";

interface DealsBannerProps {
  offers?: Offer[];
  offer?: Offer;
}

// Helper to dynamically theme ANY offer stored in the database
function getOfferTheme(offer: Offer, index: number) {
  const badgeLower = (offer.badge || "").toLowerCase();
  const catLower = (offer.applicableCategory || "").toLowerCase();
  const titleLower = (offer.title || "").toLowerCase();
  const idLower = (offer.id || "").toLowerCase();

  // 1. Combo deals & Accessories
  if (
    badgeLower.includes("combo") ||
    catLower === "accessories" ||
    titleLower.includes("adapter") ||
    titleLower.includes("earbud") ||
    idLower.includes("tws") ||
    idLower.includes("combo")
  ) {
    return {
      gradient: "from-[#20053b] via-[#43126f] to-[#6b1160]",
      border: "border-purple-400/40",
      glow: "rgba(168, 85, 247, 0.35)",
      badgeBg: "bg-amber-400",
      badgeText: "text-slate-950 font-black",
      icon: Flame,
      accentColor: "#c5e84a",
      countdownBg: "bg-black/60",
      pillBg: "bg-purple-900/40",
    };
  }

  // 2. Zero Down Payment / 0% Interest EMI & Finance
  if (
    badgeLower.includes("emi") ||
    badgeLower.includes("finance") ||
    catLower === "emi" ||
    titleLower.includes("down payment") ||
    titleLower.includes("interest") ||
    idLower.includes("emi")
  ) {
    return {
      gradient: "from-[#02231c] via-[#064e3b] to-[#115e59]",
      border: "border-emerald-400/40",
      glow: "rgba(16, 185, 129, 0.35)",
      badgeBg: "bg-emerald-400",
      badgeText: "text-slate-950 font-black",
      icon: CreditCard,
      accentColor: "#6ee7b7",
      countdownBg: "bg-black/60",
      pillBg: "bg-emerald-900/40",
    };
  }

  // 3. Exchange & Upgrade bonus
  if (
    badgeLower.includes("exchange") ||
    badgeLower.includes("upgrade") ||
    catLower === "exchange" ||
    titleLower.includes("exchange") ||
    idLower.includes("exchange")
  ) {
    return {
      gradient: "from-[#381403] via-[#7c2d12] to-[#4a044e]",
      border: "border-amber-400/40",
      glow: "rgba(245, 158, 11, 0.35)",
      badgeBg: "bg-orange-500",
      badgeText: "text-white font-black",
      icon: RefreshCw,
      accentColor: "#fed7aa",
      countdownBg: "bg-black/60",
      pillBg: "bg-amber-900/40",
    };
  }

  // 4. Festive Gifts, Hampers & Store Signatures
  if (
    badgeLower.includes("gift") ||
    badgeLower.includes("hamper") ||
    badgeLower.includes("signature") ||
    badgeLower.includes("festive") ||
    titleLower.includes("gift") ||
    idLower.includes("festive")
  ) {
    return {
      gradient: "from-[#3b0821] via-[#75133d] to-[#991b1b]",
      border: "border-rose-400/40",
      glow: "rgba(244, 63, 94, 0.35)",
      badgeBg: "bg-rose-500",
      badgeText: "text-white font-black",
      icon: Gift,
      accentColor: "#fde047",
      countdownBg: "bg-black/60",
      pillBg: "bg-rose-900/40",
    };
  }

  // 5. Dynamic fallback for any newly added offers in DB
  const dynamicFallbacks = [
    {
      gradient: "from-[#1e1b4b] via-[#312e81] to-[#4338ca]",
      border: "border-indigo-400/40",
      glow: "rgba(99, 102, 241, 0.35)",
      badgeBg: "bg-indigo-400",
      badgeText: "text-slate-950 font-black",
      icon: Tag,
      accentColor: "#a5b4fc",
      countdownBg: "bg-black/60",
      pillBg: "bg-indigo-900/40",
    },
    {
      gradient: "from-[#38105c] via-[#6d1fae] to-[#ff5a1f]",
      border: "border-white/30",
      glow: "rgba(255, 90, 31, 0.35)",
      badgeBg: "bg-[#ff5a1f]",
      badgeText: "text-white font-black",
      icon: Sparkles,
      accentColor: "#c5e84a",
      countdownBg: "bg-black/60",
      pillBg: "bg-black/30",
    },
  ];

  return dynamicFallbacks[index % dynamicFallbacks.length];
}

const AUTOSCROLL_DURATION = 5500; // 5.5 seconds per slide

export function DealsBanner({ offers, offer }: DealsBannerProps) {
  const shouldReduceMotion = useReducedMotion();

  // Combine and normalize offers
  const allOffers = useMemo(() => {
    if (offers && offers.length > 0) return offers;
    if (offer) return [offer];
    return [];
  }, [offers, offer]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Synchronized countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 28, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Safe navigation handlers
  const totalOffers = allOffers.length;

  const goToNext = useCallback(() => {
    if (totalOffers <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalOffers);
  }, [totalOffers]);

  const goToPrev = useCallback(() => {
    if (totalOffers <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalOffers) % totalOffers);
  }, [totalOffers]);

  const selectOffer = useCallback(
    (idx: number) => {
      if (idx === currentIndex) return;
      setDirection(idx > currentIndex ? 1 : -1);
      setCurrentIndex(idx);
    },
    [currentIndex]
  );

  // Strictly sequential autoscroll (1 -> 2 -> 3 -> 4 -> 1)
  useEffect(() => {
    if (totalOffers <= 1 || isPaused || shouldReduceMotion) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalOffers);
    }, AUTOSCROLL_DURATION);

    return () => clearInterval(timer);
  }, [totalOffers, isPaused, shouldReduceMotion]);

  // Touch Swipe gestures for responsive mobile handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only trigger horizontal swipe if delta X > 45px and dominant over vertical scroll
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      goToNext();
    } else if (e.key === "ArrowLeft") {
      goToPrev();
    }
  };

  // Copy coupon code with toast feedback
  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    } catch {
      // Fallback
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  if (totalOffers === 0) return null;

  const currentOffer = allOffers[currentIndex];
  const theme = getOfferTheme(currentOffer, currentIndex);
  const OfferIcon = theme.icon;

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring" as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  return (
    <section
      className="space-y-3 w-full max-w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Today's Hot Deals and Combo Offers"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* ================= 1. FAST TICKER STRIP (ALL OFFERS QUICK PREVIEW) ================= */}
      {totalOffers > 1 && (
        <div className="relative overflow-hidden rounded-full bg-slate-900/90 dark:bg-black/60 border border-zinc-200 dark:border-white/10 px-3 py-1.5 flex items-center justify-between text-xs backdrop-blur-md shadow-xs">
          <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-zinc-300 dark:border-white/10">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5a1f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5a1f]"></span>
            </span>
            <span className="font-extrabold uppercase tracking-wider text-[10px] text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
              <span>LIVE OFFERS</span>
              <span className="text-zinc-500 font-mono">({currentIndex + 1}/{totalOffers})</span>
            </span>
          </div>

          {/* Marquee ticker running all deals */}
          <div className="overflow-hidden flex-1 px-3 mask-fade">
            <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-[11px] font-medium text-zinc-300">
              {allOffers.map((o) => (
                <button
                  key={o.id}
                  onClick={() => selectOffer(allOffers.findIndex((item) => item.id === o.id))}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="font-bold text-[#c5e84a]">★ {o.badge}:</span>
                  <span className="text-white font-semibold">{o.title}</span>
                  {o.discountValue && (
                    <span className="bg-[#ff5a1f]/20 text-[#ff5a1f] px-1.5 py-0.2 rounded text-[10px] font-bold">
                      {o.discountValue}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Auto-scroll Pause / Play Toggle (WCAG 2.2.2 Compliant) */}
          <div className="flex items-center gap-1.5 pl-3 border-l border-zinc-300 dark:border-white/10 shrink-0">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? "Resume offer autoscroll" : "Pause offer autoscroll"}
              aria-pressed={isPaused}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-white"
              title={isPaused ? "Resume Autoscroll" : "Pause Autoscroll"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}

      {/* ================= 2. MAIN INTERACTIVE HERO OFFER CARD ================= */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`rounded-3xl bg-gradient-to-br ${theme.gradient} text-white shadow-2xl relative overflow-hidden border ${theme.border} transition-colors duration-500 w-full min-h-[340px] sm:min-h-[290px] flex flex-col justify-between p-5 sm:p-7 lg:p-9`}
        style={{
          boxShadow: `0 20px 40px -15px ${theme.glow}, 0 0 20px 0 ${theme.glow}`,
        }}
      >
        {/* Ambient radial blur glows */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-60"
          style={{ background: theme.glow }}
        />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        {/* Top Control Bar: Offer Count & Nav Arrows */}
        <div className="flex items-center justify-between relative z-20 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-sm ${theme.badgeBg} ${theme.badgeText}`}
            >
              <OfferIcon className="w-3.5 h-3.5 fill-current" />
              <span>{currentOffer.badge}</span>
            </span>

            {currentOffer.discountValue && (
              <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-black text-[#c5e84a] bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-[#c5e84a]" />
                <span>{currentOffer.discountValue}</span>
              </span>
            )}
          </div>

          {/* Nav Controls */}
          {totalOffers > 1 && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] font-mono font-bold text-white/70 hidden xs:inline px-2 py-0.5 rounded-md bg-black/30">
                {currentIndex + 1} / {totalOffers}
              </span>

              <button
                onClick={goToPrev}
                aria-label="Previous offer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition active:scale-95 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={goToNext}
                aria-label="Next offer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center transition active:scale-95 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Animated Main Slide Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentOffer.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Left Column: Title, Tagline, Description & Terms */}
              <div className="lg:col-span-7 space-y-3">
                {currentOffer.tagline && (
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300/95 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{currentOffer.tagline}</span>
                  </p>
                )}

                <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-tight text-balance">
                  {currentOffer.title}
                </h2>

                <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed font-normal text-pretty max-w-xl">
                  {currentOffer.description}
                </p>

                {/* Promo Code & Highlights */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {currentOffer.code && (
                    <button
                      onClick={() => handleCopyCode(currentOffer.code!)}
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 hover:bg-black/70 border border-white/25 text-xs font-mono font-bold text-white transition-all active:scale-95"
                      title="Click to copy promo code"
                    >
                      <span className="text-white/70">USE CODE:</span>
                      <span className="text-[#c5e84a] font-black tracking-wide">
                        {currentOffer.code}
                      </span>
                      {copiedCode === currentOffer.code ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-sans text-[11px]">
                          <Check className="w-3.5 h-3.5" /> Copied!
                        </span>
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-white/60 group-hover:text-white" />
                      )}
                    </button>
                  )}

                  {currentOffer.terms && currentOffer.terms.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-white/80 bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{currentOffer.terms[0]}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Countdown Box & WhatsApp CTA */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 w-full">
                {/* Live Urgency Countdown Box */}
                <div className="w-full sm:w-auto lg:w-full max-w-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-white/80 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      <span>Offer Refreshes In</span>
                    </span>
                    <span className="text-emerald-300 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Kakod Counter</span>
                    </span>
                  </div>

                  {/* Digits with Tabular Nums */}
                  <div className="flex items-center justify-between gap-2 text-center font-mono w-full">
                    <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/20 py-2 px-1 rounded-2xl shadow-md min-w-[50px]">
                      <span className="text-lg sm:text-xl font-black text-[#c5e84a] tabular-nums">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                      <p className="text-[9px] text-white/70 font-sans font-bold">HOURS</p>
                    </div>
                    <span className="text-white/60 font-black text-lg">:</span>
                    <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/20 py-2 px-1 rounded-2xl shadow-md min-w-[50px]">
                      <span className="text-lg sm:text-xl font-black text-[#c5e84a] tabular-nums">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                      <p className="text-[9px] text-white/70 font-sans font-bold">MINS</p>
                    </div>
                    <span className="text-white/60 font-black text-lg">:</span>
                    <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/20 py-2 px-1 rounded-2xl shadow-md min-w-[50px]">
                      <span className="text-lg sm:text-xl font-black text-white tabular-nums">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                      <p className="text-[9px] text-white/70 font-sans font-bold">SECS</p>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Claim Button */}
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                    `Namaste The Mobile Lounge Kakod! I want to claim today's ${currentOffer.badge}: *${currentOffer.title}*${
                      currentOffer.code ? ` (Promo Code: ${currentOffer.code})` : ""
                    }! Please share stock & best price.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto lg:w-full bg-white hover:bg-zinc-100 text-slate-950 font-black text-xs sm:text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 group"
                >
                  <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600 shrink-0" />
                  <span className="truncate">Claim {currentOffer.badge} on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= 3. BOTTOM INTERACTIVE PROGRESS TABS ================= */}
        {totalOffers > 1 && (
          <div className="relative z-20 pt-4 sm:pt-6 mt-4 border-t border-white/15">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {allOffers.map((o, idx) => {
                const isActive = idx === currentIndex;
                const tabTheme = getOfferTheme(o, idx);
                const TabIcon = tabTheme.icon;

                return (
                  <button
                    key={o.id}
                    onClick={() => selectOffer(idx)}
                    className={`relative text-left p-2 sm:p-2.5 rounded-xl border transition-all duration-200 overflow-hidden group ${
                      isActive
                        ? "bg-black/50 border-white/40 shadow-lg text-white"
                        : "bg-black/20 hover:bg-black/35 border-white/10 text-white/70 hover:text-white"
                    }`}
                  >
                    {/* Active Progress Bar Countdown Indicator */}
                    {isActive && (
                      <div
                        key={`bar-${currentIndex}-${isPaused}`}
                        className="absolute bottom-0 left-0 top-0 bg-white/20 pointer-events-none"
                        style={{
                          animation: shouldReduceMotion
                            ? "none"
                            : `progressFill ${AUTOSCROLL_DURATION}ms linear forwards`,
                          animationPlayState: isPaused ? "paused" : "running",
                        }}
                      />
                    )}

                    <div className="relative z-10 flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                          isActive ? tabTheme.badgeBg : "bg-white/10 text-white/70"
                        }`}
                      >
                        <TabIcon
                          className={`w-3 h-3 ${isActive ? tabTheme.badgeText : "text-white/80"}`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider truncate flex items-center justify-between">
                          <span className={isActive ? "text-white" : "text-white/80"}>
                            {o.badge}
                          </span>
                          {isActive && (
                            <span className="text-[9px] text-[#c5e84a] font-mono hidden md:inline">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-white/70 truncate hidden sm:block">
                          {o.discountValue || o.title}
                        </div>
                      </div>
                    </div>

                    {/* Bottom active accent line */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-[#c5e84a] to-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
