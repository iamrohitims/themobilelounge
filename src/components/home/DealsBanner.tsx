"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Offer } from "@/types/offer";
import { Sparkles, MessageSquare, Clock, ArrowRight, Flame } from "lucide-react";

interface DealsBannerProps {
  offer: Offer;
}

export function DealsBanner({ offer }: DealsBannerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 28, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="rounded-3xl gradient-purple-orange p-5 sm:p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden border border-white/20 w-full max-w-full">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
              🔥 {offer.badge}
            </span>
            <span className="text-xs text-[#c5e84a] font-black flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{offer.discountValue || "Assured Free Gift Box"}</span>
            </span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl text-white leading-tight">
            {offer.title}
          </h2>
          <p className="text-xs sm:text-base text-white/90 leading-relaxed font-medium">
            {offer.description}
          </p>
        </div>

        {/* Countdown & Action Button (Trips24x7 Style) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
          {/* Live Countdown */}
          <div className="flex items-center gap-2 text-center font-mono">
            <div className="bg-black/50 backdrop-blur-md border border-white/20 px-3 py-2 rounded-2xl shadow-md min-w-[54px]">
              <span className="text-base sm:text-xl font-black text-[#c5e84a]">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <p className="text-[9px] text-white/70 font-sans font-bold">HOURS</p>
            </div>
            <span className="text-white/60 font-black text-xl">:</span>
            <div className="bg-black/50 backdrop-blur-md border border-white/20 px-3 py-2 rounded-2xl shadow-md min-w-[54px]">
              <span className="text-base sm:text-xl font-black text-[#c5e84a]">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <p className="text-[9px] text-white/70 font-sans font-bold">MINS</p>
            </div>
            <span className="text-white/60 font-black text-xl">:</span>
            <div className="bg-black/50 backdrop-blur-md border border-white/20 px-3 py-2 rounded-2xl shadow-md min-w-[54px]">
              <span className="text-base sm:text-xl font-black text-white">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <p className="text-[9px] text-white/70 font-sans font-bold">SECS</p>
            </div>
          </div>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
              `Namaste The Mobile Lounge Kakod! I want to claim today's offer: *${offer.title}* with the free gifts!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white hover:bg-zinc-100 text-black font-black text-xs sm:text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition transform active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-current text-[#ff5a1f]" />
            <span>Claim on WhatsApp ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
