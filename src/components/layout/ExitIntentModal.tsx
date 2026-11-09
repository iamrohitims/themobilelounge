"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { X, Sparkles, MessageSquare, Gift, ShieldCheck } from "lucide-react";

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show on desktop screens
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const sessionKey = "tml_exit_popup_seen";
    if (sessionStorage.getItem(sessionKey)) return;

    // Trigger on mouse leaving viewport upwards (classic desktop exit-intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !sessionStorage.getItem(sessionKey)) {
        setIsOpen(true);
        sessionStorage.setItem(sessionKey, "true");
      }
    };

    // Fallback soft timer after 45 seconds of engagement
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem(sessionKey)) {
        setIsOpen(true);
        sessionStorage.setItem(sessionKey, "true");
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#121217] border-2 border-[#ff1e42]/40 rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center justify-center transition"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff1e42]/15 border border-[#ff1e42]/30 text-[#ff1e42] text-xs font-extrabold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Before You Go • Kakod Showroom Deal</span>
        </div>

        <h3 className="font-display font-extrabold text-2xl text-zinc-950 dark:text-white leading-tight">
          Get Today’s Secret Offline Store Price On WhatsApp! 🎁
        </h3>

        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Planning to buy an iPhone or 5G smartphone? We beat online prices daily and include an{" "}
          <strong className="text-zinc-950 dark:text-white">assured free smartwatch or ANC earbuds</strong> + official
          brand warranty at our Kakod counter!
        </p>

        {/* Perks list */}
        <div className="bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
            <Gift className="w-4 h-4 text-emerald-600 dark:text-[#a3e635] shrink-0" />
            <span>Guaranteed Free Gift Hamper with Phone</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
            <ShieldCheck className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
            <span>₹0 Downpayment Instant EMI Approval</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col gap-2">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
              "Hi The Mobile Lounge Kakod! I saw your exclusive website deal popup. What is your best secret offline price and gift bundle today?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full bg-[#a3e635] hover:bg-lime-400 text-black font-extrabold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(163,230,53,0.35)] transition"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Claim Offer on WhatsApp Now</span>
          </a>

          <button
            onClick={() => setIsOpen(false)}
            className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 py-1 transition"
          >
            No thanks, I will browse without extra gifts
          </button>
        </div>
      </div>
    </div>
  );
}
