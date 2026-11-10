import { siteConfig } from "@/config/site";
import {
  ShieldCheck,
  CreditCard,
  Gift,
  RefreshCw,
  Headphones,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export function WhyBuyFromUs() {
  const iconMap: Record<string, any> = {
    ShieldCheck,
    CreditCard,
    Gift,
    RefreshCw,
    Headphones,
    Sparkles,
  };

  return (
    <section className="space-y-4 w-full max-w-full overflow-hidden">
      {/* Section Container: Clean, high-contrast bento styling */}
      <div className="rounded-3xl bg-white dark:bg-[#121624] p-5 sm:p-8 lg:p-10 shadow-lg border border-zinc-200 dark:border-white/10 space-y-6 relative overflow-hidden">
        {/* Subtle accent glow in background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff5a1f]/5 dark:bg-[#ff5a1f]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c5e84a]/5 dark:bg-[#c5e84a]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
          <span className="bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-[#c5e84a] border border-zinc-200 dark:border-white/15 font-black text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
            🤝 THE MOBILE LOUNGE PROMISE
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-zinc-950 dark:text-white pt-1 tracking-tight">
            Why Kakod Chooses The Mobile Lounge
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
            Transparent pricing that beats online portals, ₹0 downpayment 0% EMI, and guaranteed gift hampers with official brand warranty.
          </p>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 relative z-10">
          {siteConfig.perks.map((perk, idx) => {
            const Icon = iconMap[perk.icon] || ShieldCheck;
            return (
              <div
                key={perk.title}
                className="bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 hover:border-[#ff5a1f]/60 dark:hover:border-[#c5e84a]/60 rounded-2xl p-4 sm:p-5 space-y-2.5 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/15 flex items-center justify-center text-[#ff5a1f] dark:text-[#c5e84a] group-hover:scale-105 transition shadow-xs">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-200 dark:border-white/10">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-sm sm:text-base text-zinc-950 dark:text-white pt-1">
                    {perk.title}
                  </h3>

                  <p className="text-xs font-hindi text-[#ff5a1f] dark:text-[#c5e84a] font-bold">
                    {perk.hindi}
                  </p>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {perk.desc}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-zinc-200 dark:border-white/10 flex items-center gap-1.5 text-[10px] text-emerald-700 dark:text-[#22c55e] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Verified Daily at Kakod Counter</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
