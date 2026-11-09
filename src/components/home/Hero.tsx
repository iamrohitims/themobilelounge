"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import {
  Search,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Gift,
  ShieldCheck,
  CreditCard,
  Flame,
  CheckCircle2,
  Zap,
} from "lucide-react";

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"iphone" | "samsung">("iphone");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/phones?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/phones");
    }
  };

  const quickPills = [
    { label: "🍎 iPhone 16", query: "iPhone 16" },
    { label: "🌌 Galaxy S25", query: "Galaxy S25" },
    { label: "⚡ OnePlus 13", query: "OnePlus" },
    { label: "📸 Vivo V40", query: "Vivo" },
    { label: "₹ Under ₹15K", href: "/phones/under/10000-to-15000" },
    { label: "💳 0% EMI", href: "/emi" },
  ];

  const marqueePerks = [
    { icon: "📱", text: "Top Brands: Apple • Samsung • OnePlus • Vivo • Realme" },
    { icon: "💳", text: "0% Paperless EMI: Bajaj Finserv, IDFC & TVS in 5 Mins" },
    { icon: "🎁", text: "Assured Free Smartwatch & ANC Buds with Every Phone" },
    { icon: "🛡️", text: "100% Genuine Sealed Pack with GST Bill & Brand Warranty" },
    { icon: "⚡", text: "Instant Old Phone Exchange with Spot Bill Discount" },
    { icon: "👑", text: "Offline Deal Prices That Beat Online Daily in Kakod" },
  ];

  return (
    <section className="relative rounded-3xl gradient-hero p-4 sm:p-7 lg:p-8 shadow-2xl overflow-hidden border border-white/20 space-y-6">
      {/* Ambient Radial Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid: Left Hero Copy & Search + Right Product Visual (12 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
        {/* Left Column: Compact Headline, Search, Quick Chips, Actions (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#c5e84a] animate-ping" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white">
              📍 KAKOD’S #1 VERIFIED STORE • BY VISHAL DISTRIBUTORS
            </span>
          </div>

          {/* Compact Main Headline */}
          <div className="space-y-1">
            <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
              Upgrade To Flagship. <span className="text-[#c5e84a]">₹0 Downpayment.</span>
            </h1>
            <p className="text-pink-200 font-extrabold text-sm sm:text-lg">
              Official Brand Warranty + Assured Free Gift Box 🎁
            </p>
          </div>

          <p className="text-white/90 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
            Get 100% genuine sealed-pack <strong className="text-white">Apple iPhones, Samsung Galaxy, OnePlus & Vivo</strong> at
            lower than online prices with instant 5-minute EMI approval in Kakod Main Market.
          </p>

          {/* Search Capsule */}
          <form onSubmit={handleSearch} className="max-w-xl pt-1">
            <div className="search-capsule py-1.5 px-3">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                placeholder="Search phone (iPhone 16, S25 Ultra, OnePlus, Vivo)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none font-medium"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-full bg-[#ff5a1f] hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1 shadow-md transition transform active:scale-95 shrink-0"
                aria-label="Search"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Quick Filter Capsule Pills (Horizontal Scroll) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
            <span className="text-[10px] font-black text-white/70 uppercase tracking-wide shrink-0">
              Quick:
            </span>
            {quickPills.map((pill) =>
              pill.href ? (
                <Link
                  key={pill.label}
                  href={pill.href}
                  className="bg-black/40 hover:bg-white hover:text-black text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20 whitespace-nowrap transition"
                >
                  {pill.label}
                </Link>
              ) : (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => router.push(`/phones?q=${encodeURIComponent(pill.query!)}`)}
                  className="bg-black/40 hover:bg-white hover:text-black text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20 whitespace-nowrap transition"
                >
                  {pill.label}
                </button>
              )
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <Link
              href="/phones"
              className="bg-[#ff5a1f] hover:bg-orange-600 text-white font-black text-xs sm:text-sm py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition transform active:scale-95"
            >
              <span>Explore All 40+ Phones</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                "Namaste The Mobile Lounge Kakod! I saw your website and want to check today's special deal prices and free gift bundle."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c5e84a] hover:bg-lime-400 text-black font-black text-xs sm:text-sm py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Unlock Secret Deal on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Flagship Showcase Card (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white text-zinc-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/60 relative overflow-hidden transition duration-300">
            {/* Header Switcher: iPhone vs Samsung */}
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100">
              <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
                <button
                  onClick={() => setActiveTab("iphone")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-black transition ${
                    activeTab === "iphone"
                      ? "bg-black text-white shadow-xs"
                      : "text-zinc-600 hover:text-black"
                  }`}
                >
                  🍎 iPhone 16 Pro
                </button>
                <button
                  onClick={() => setActiveTab("samsung")}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-black transition ${
                    activeTab === "samsung"
                      ? "bg-black text-white shadow-xs"
                      : "text-zinc-600 hover:text-black"
                  }`}
                >
                  🌌 Galaxy S25
                </button>
              </div>

              <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <Flame className="w-3 h-3 text-rose-600 fill-current" />
                <span>HOT SELLER</span>
              </span>
            </div>

            {/* Product Meta */}
            <div className="pt-2.5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="bg-[#c5e84a] text-black font-extrabold text-[9px] uppercase px-1.5 py-0.2 rounded">
                      👑 In Stock
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold">
                      Main Market Kakod
                    </span>
                  </div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-zinc-950 leading-tight">
                    {activeTab === "iphone"
                      ? "iPhone 16 Pro Max"
                      : "Samsung Galaxy S25 5G"}
                  </h3>
                  <p className="text-[11px] font-semibold text-zinc-500">
                    {activeTab === "iphone"
                      ? "Desert Titanium • 256GB • A18 Pro"
                      : "Snapdragon 8 Elite • Navy • 256GB"}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-400 block">
                    Official MRP
                  </span>
                  <span className="text-xs font-bold text-zinc-500 line-through">
                    {activeTab === "iphone" ? "₹1,44,900" : "₹82,999"}
                  </span>
                </div>
              </div>

              {/* High-Res Studio Image Stage */}
              <Link
                href={
                  activeTab === "iphone"
                    ? "/phones/apple-iphone-16-pro-max"
                    : "/phones/samsung-galaxy-s25-5g"
                }
                className="relative block w-full h-40 sm:h-44 bg-gradient-to-b from-zinc-50 via-white to-amber-50/30 rounded-xl border border-zinc-100 overflow-hidden group cursor-pointer"
              >
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                  <span className="bg-white/95 backdrop-blur-md text-[9px] font-extrabold text-zinc-800 px-1.5 py-0.5 rounded shadow-xs border border-zinc-200">
                    ⚡ 0% EMI Available
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-200">
                    Free Gifts
                  </span>
                </div>

                <div className="relative w-full h-full p-2 flex items-center justify-center">
                  <Image
                    src={
                      activeTab === "iphone"
                        ? "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/w/z/h/-original-imahggetkf6y67sr.jpeg?q=70"
                        : "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/s/a/7/-original-imahrkn2ecbgzzqt.jpeg?q=70"
                    }
                    alt={
                      activeTab === "iphone"
                        ? "Apple iPhone 16 Pro Max Studio Photo"
                        : "Samsung Galaxy S25 5G Studio Photo"
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                    priority
                  />
                </div>

                <div className="absolute bottom-2 right-2 z-10">
                  <span className="bg-black/80 hover:bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur shadow-xs flex items-center gap-1 transition">
                    <span>Full Specs</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>

              {/* Free Gift Strip */}
              <div className="bg-[#c5e84a]/20 border border-[#c5e84a] rounded-xl p-2 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#c5e84a] flex items-center justify-center shrink-0 text-black">
                  <Gift className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-black text-zinc-900 leading-tight">
                    Free Gift Hamper Included Today!
                  </p>
                  <p className="text-[10px] font-medium text-zinc-600 truncate">
                    Smartwatch / ANC Buds + 20W Fast Charger with every purchase
                  </p>
                </div>
              </div>

              {/* WhatsApp Call to Action */}
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  `Namaste The Mobile Lounge Kakod! What is your best secret offline deal price for ${
                    activeTab === "iphone" ? "iPhone 16 Pro Max" : "Samsung Galaxy S25 5G"
                  }?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs sm:text-sm py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-500/25 transition transform active:scale-98"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Unlock Deal Price on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dynamic Continuous Scrolling Text Ticker (Replaces Bulky 4-Card Grid) */}
      <div className="pt-2 border-t border-white/15 relative overflow-hidden">
        <div className="animate-marquee gap-3 py-1 items-center">
          {[...marqueePerks, ...marqueePerks].map((perk, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white text-xs font-bold whitespace-nowrap shadow-xs hover:border-[#c5e84a] transition"
            >
              <span>{perk.icon}</span>
              <span className="font-extrabold">{perk.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
