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
    <section className="space-y-6">
      {/* Section Container with Trips24x7 Inspired Radiant Gradient */}
      <div className="rounded-3xl gradient-hero p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/20 space-y-8 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c5e84a]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-2 relative z-10">
          <span className="bg-black/40 backdrop-blur-md text-[#c5e84a] border border-[#c5e84a]/40 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider">
            🤝 THE MOBILE LOUNGE GUARANTEE • KAKOD
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white pt-1">
            Why Kakod Prefers Buying From Us
          </h2>
          <p className="text-xs sm:text-base text-white/90 leading-relaxed font-medium">
            When you walk into our showroom (by Vishal Distributors), you don’t just get a sealed box—you experience transparent pricing, instant 0% EMI, and guaranteed gifts!
          </p>
        </div>

        {/* 6 Grid Feature Cards with Trips24x7 Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {siteConfig.perks.map((perk, idx) => {
            const Icon = iconMap[perk.icon] || ShieldCheck;
            return (
              <div
                key={perk.title}
                className="bg-black/40 backdrop-blur-md border border-white/15 hover:border-white/40 rounded-2xl p-5 space-y-3 transition duration-300 flex flex-col justify-between shadow-lg group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-[#c5e84a] group-hover:scale-105 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-[#c5e84a] bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                      0{idx + 1}. PERK
                    </span>
                  </div>

                  <h3 className="font-display font-black text-base sm:text-lg text-white">
                    {perk.title}
                  </h3>

                  <p className="text-xs text-pink-200 font-bold">
                    {perk.hindi}
                  </p>

                  <p className="text-xs text-white/80 leading-relaxed font-normal">
                    {perk.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[#c5e84a] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified at Kakod counter</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
