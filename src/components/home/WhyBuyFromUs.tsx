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
    <section className="space-y-4">
      {/* Section Container */}
      <div className="rounded-3xl gradient-hero p-3.5 sm:p-8 lg:p-10 shadow-xl border border-white/20 space-y-5 sm:space-y-6 relative overflow-hidden w-full max-w-full">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c5e84a]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto space-y-1.5 relative z-10">
          <span className="bg-black/40 backdrop-blur-md text-[#c5e84a] border border-[#c5e84a]/40 font-black text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
            🤝 THE MOBILE LOUNGE GUARANTEE
          </span>
          <h2 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white pt-1">
            Why Buy From Us in Kakod?
          </h2>
          <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-medium">
            Transparent pricing, ₹0 downpayment 0% EMI, and guaranteed gifts with official brand warranty.
          </p>
        </div>

        {/* Responsive Grid: 2 cols on mobile/tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
          {siteConfig.perks.map((perk, idx) => {
            const Icon = iconMap[perk.icon] || ShieldCheck;
            return (
              <div
                key={perk.title}
                className="bg-black/35 backdrop-blur-md border border-white/15 hover:border-white/35 rounded-2xl p-4 space-y-2 transition duration-200 flex flex-col justify-between shadow-md group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-[#c5e84a] group-hover:scale-105 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-black uppercase text-[#c5e84a] bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-sm sm:text-base text-white">
                    {perk.title}
                  </h3>

                  <p className="text-[11px] text-pink-200 font-bold">
                    {perk.hindi}
                  </p>

                  <p className="text-xs text-white/80 leading-relaxed font-normal">
                    {perk.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[10px] text-[#c5e84a] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified at Kakod Counter</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
