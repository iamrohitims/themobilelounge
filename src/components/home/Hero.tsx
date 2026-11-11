"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { SafeImage } from "@/components/ui/SafeImage";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Product } from "@/types/product";
import { formatPrice, calculateDiscountPercent } from "@/lib/format";
import {
  Search,
  MessageSquare,
  ArrowRight,
  Gift,
  Flame,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

// Top Flagship Hot Deals for Kakod Showroom
const HOT_DEALS = [
  {
    slug: "apple-iphone-16-pro-max",
    name: "Apple iPhone 16 Pro Max",
    brandTag: "🍎 Apple Flagship",
    specBadge: "Desert Titanium • A18 Pro • 48MP Fusion",
    storage: "256GB",
    mrp: 144900,
    price: 134990,
    emiMonthly: 5999,
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/w/z/h/-original-imahggetkf6y67sr.jpeg?q=70",
    badge: "HOT SELLER",
    gift: "Smartwatch + 20W Fast Charger Free",
  },
  {
    slug: "samsung-galaxy-s25-5g",
    name: "Samsung Galaxy S25 5G",
    brandTag: "🌌 Galaxy AI Flagship",
    specBadge: "Snapdragon 8 Elite • Navy • 120Hz Dynamic AMOLED",
    storage: "256GB",
    mrp: 79999,
    price: 74999,
    emiMonthly: 3999,
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/s/a/7/-original-imahrkn2ecbgzzqt.jpeg?q=70",
    badge: "NEW LAUNCH",
    gift: "Free ANC Earbuds + 45W Adapter",
  },
  {
    slug: "oneplus-12-5g",
    name: "OnePlus 12 5G",
    brandTag: "⚡ OnePlus Flagship",
    specBadge: "Snapdragon 8 Gen 3 • Hasselblad 50MP • 5400mAh",
    storage: "256GB",
    mrp: 64999,
    price: 58990,
    emiMonthly: 2999,
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/1/a/a/mini-mini-jmax-resized-original-imahmstnzmjdhtyk.jpeg",
    badge: "VIP CHOICE",
    gift: "OnePlus Buds + Fast Car Charger",
  },
  {
    slug: "vivo-v40-pro-5g",
    name: "Vivo V40 Pro 5G",
    brandTag: "📸 ZEISS Camera King",
    specBadge: "50MP ZEISS Multifocal • 5500mAh • Ganges Blue",
    storage: "256GB",
    mrp: 54999,
    price: 49990,
    emiMonthly: 2499,
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/h/s/b/-original-imah3hvbysfwxydc.jpeg",
    badge: "ZEISS PORTRAIT",
    gift: "Smart Fitness Band + Premium Case",
  },
  {
    slug: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brandTag: "👑 200MP Quad Cam",
    specBadge: "Titanium Gray • Built-in S-Pen • Galaxy AI",
    storage: "256GB",
    mrp: 129999,
    price: 109990,
    emiMonthly: 5499,
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/y/s/g/-original-imahgfmy2zgqvjmy.jpeg?q=70",
    badge: "MEGA DISCOUNT",
    gift: "Galaxy Buds FE + Fast Wireless Pad",
  },
  {
    slug: "oneplus-nord-4-5g",
    name: "OnePlus Nord 4 5G",
    brandTag: "🔥 Metal Unibody",
    specBadge: "Snapdragon 7+ Gen 3 • 100W SuperVOOC • 5500mAh",
    storage: "128GB",
    mrp: 29999,
    price: 27990,
    emiMonthly: 1499,
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/v/v/n/nord-6-nord-6-one-plus-resized-original-imahmbwsnuf5g5vh.jpeg",
    badge: "KAKOD BESTSELLER",
    gift: "Free Tempered Glass + Heavy Case",
  },
];

export function Hero({
  hotDeals,
  phones,
}: {
  hotDeals?: any[] | null;
  phones?: Product[];
} = {}) {
  const router = useRouter();
  const activeDeals = hotDeals && hotDeals.length > 0 ? hotDeals : HOT_DEALS;

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scrolling Hot Deals State
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Live phone products for instant autocomplete from database
  const allPhones: Product[] = useMemo(() => {
    return (phones || []).filter((p) => p.category === "phone");
  }, [phones]);

  // Filtered search results matching query
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return allPhones
      .filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const brandMatch = p.brand.toLowerCase().includes(q);
        const highlightMatch = p.highlights?.some((h) => h.toLowerCase().includes(q));
        const subtitleMatch = p.subtitle?.toLowerCase().includes(q);
        return nameMatch || brandMatch || highlightMatch || subtitleMatch;
      })
      .slice(0, 6);
  }, [allPhones, searchQuery]);

  // Execute Search
  const executeSearch = useCallback((term: string) => {
    setIsSearchOpen(false);
    if (term.trim()) {
      router.push(`/phones?q=${encodeURIComponent(term.trim())}`);
    } else {
      router.push("/phones");
    }
  }, [router]);

  // Handle Search Keyboard Navigation
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSearchOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsSearchOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSearchIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSearchIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedSearchIndex >= 0 && searchResults[selectedSearchIndex]) {
        setIsSearchOpen(false);
        router.push(`/phones/${searchResults[selectedSearchIndex].slug}`);
      } else {
        executeSearch(searchQuery);
      }
    } else if (e.key === "Escape") {
      setIsSearchOpen(false);
    }
  };

  // Close search dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  // Auto-scrolling interval for Hot Deals Showcase (4000ms)
  useEffect(() => {
    if (isCarouselPaused) return;

    const timer = setInterval(() => {
      setCurrentDealIndex((prev) => (prev + 1) % activeDeals.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isCarouselPaused, activeDeals.length]);

  // Manual Carousel controls
  const handlePrevDeal = () => {
    setCurrentDealIndex((prev) =>
      prev === 0 ? activeDeals.length - 1 : prev - 1
    );
  };

  const handleNextDeal = () => {
    setCurrentDealIndex((prev) => (prev + 1) % activeDeals.length);
  };

  const activeDeal = activeDeals[currentDealIndex];
  const activeDiscount = calculateDiscountPercent(activeDeal.mrp, activeDeal.price);

  const quickPills = [
    { label: "🍎 iPhone 16", query: "iPhone 16" },
    { label: "🌌 Galaxy S25", query: "Galaxy S25" },
    { label: "⚡ OnePlus", query: "OnePlus" },
    { label: "📸 Vivo", query: "Vivo" },
    { label: "₹ Under ₹15K", href: "/phones/under/10000-to-15000" },
    { label: "💳 0% EMI", href: "/emi" },
  ];

  const marqueePerks = [
    { icon: "📱", text: "Official Brands: Apple • Samsung • OnePlus • Vivo • Realme" },
    { icon: "💳", text: "0% Paperless EMI: Bajaj, IDFC & TVS in 5 Mins" },
    { icon: "🎁", text: "Assured Free Smartwatch & ANC Buds with Every Phone" },
    { icon: "🛡️", text: "100% Genuine Sealed Pack with GST Bill & Brand Warranty" },
    { icon: "⚡", text: "Instant Old Phone Exchange with Spot Discount" },
    { icon: "🔄", text: "Free WhatsApp Data Transfer: 100% Contacts & Photos Moved" },
  ];

  return (
    <section className="relative rounded-3xl gradient-hero p-4 sm:p-7 lg:p-8 shadow-2xl overflow-hidden border border-white/20 space-y-5 sm:space-y-6">
      {/* Ambient Radial Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid: Left Hero Copy & Search + Right Auto-scrolling Hot Deals Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
        {/* Left Column: Headline, Live Autocomplete Search, Quick Chips, Actions (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 shadow-xs max-w-full">
            <span className="w-2 h-2 rounded-full bg-[#c5e84a] animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white truncate">
              📍 KAKOD’S #1 VERIFIED STORE • BY VISHAL DISTRIBUTORS
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-1">
            <h1 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
              Upgrade To Flagship.{" "}
              <span className="text-[#c5e84a] drop-shadow-sm">₹0 Downpayment.</span>
            </h1>
            <p className="text-pink-200 font-extrabold text-xs sm:text-base">
              Official Brand Warranty + Assured Free Gift Box 🎁
            </p>
          </div>

          <p className="text-white/90 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
            100% genuine sealed-pack <strong className="text-white">Apple, Samsung, OnePlus & Vivo</strong> at
            lower than online prices with instant 5-minute EMI in Kakod Main Market.
          </p>

          {/* Live Search Capsule with Dynamic Autocomplete Dropdown */}
          <div ref={searchContainerRef} className="relative max-w-xl pt-0.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeSearch(searchQuery);
              }}
              className="relative z-20"
            >
              <div className="search-capsule py-2 px-3.5 bg-white rounded-2xl flex items-center gap-2.5 shadow-xl border-2 border-transparent focus-within:border-[#c5e84a] transition-all">
                <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Type to search iPhone 16, S25, OnePlus, Vivo..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                    setSelectedSearchIndex(-1);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  onKeyDown={handleSearchKeyDown}
                  className="w-full min-w-0 bg-transparent text-xs sm:text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none font-semibold"
                  aria-label="Search mobile phones in Kakod showroom"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedSearchIndex(-1);
                    }}
                    className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 transition shrink-0"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#ff5a1f] hover:bg-[#e04812] text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition shrink-0 active:scale-95"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Floating Live Autocomplete Dropdown (Options on Keypress) */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white text-zinc-900 rounded-2xl shadow-2xl border-2 border-zinc-200 overflow-hidden z-50 max-h-[380px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
                {/* 1. When user has typed a query */}
                {searchQuery.trim().length > 0 ? (
                  searchResults.length > 0 ? (
                    <div>
                      <div className="p-2.5 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between text-[11px] font-black text-zinc-500 uppercase tracking-wider">
                        <span>Matching Phones in Kakod ({searchResults.length})</span>
                        <span className="text-[10px] text-zinc-400 font-semibold">
                          Use ↑ ↓ to navigate
                        </span>
                      </div>

                      <div className="divide-y divide-zinc-100">
                        {searchResults.map((phone, idx) => {
                          const isSelected = selectedSearchIndex === idx;
                          const primaryVariant = phone.variants?.[0];
                          const thumb = phone.images?.[0]?.src;

                          return (
                            <Link
                              key={phone.id || phone.slug}
                              href={`/phones/${phone.slug}`}
                              onClick={() => setIsSearchOpen(false)}
                              onMouseEnter={() => setSelectedSearchIndex(idx)}
                              className={`flex items-center gap-3 p-3 transition ${
                                isSelected
                                  ? "bg-zinc-100 text-zinc-950 font-bold"
                                  : "hover:bg-zinc-50 text-zinc-800"
                              }`}
                            >
                              {/* Thumbnail */}
                              <div className="relative w-11 h-11 rounded-lg bg-zinc-50 border border-zinc-200 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                                {thumb ? (
                                  <SafeImage
                                    src={thumb}
                                    alt={phone.name}
                                    fill
                                    sizes="44px"
                                    className="object-contain p-0.5"
                                  />
                                ) : (
                                  <span className="text-xs font-bold text-zinc-400">
                                    {phone.brand[0]}
                                  </span>
                                )}
                              </div>

                              {/* Phone Info */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-zinc-200 text-zinc-700">
                                    {phone.brand}
                                  </span>
                                  <p className="font-extrabold text-xs sm:text-sm text-zinc-950 truncate">
                                    {phone.name}
                                  </p>
                                </div>
                                <p className="text-[11px] text-zinc-500 truncate">
                                  {phone.subtitle || phone.highlights?.[0] || "100% Genuine Sealed Pack"}
                                </p>
                              </div>

                              {/* Price & EMI Pill */}
                              <div className="text-right shrink-0">
                                <span className="font-black text-xs sm:text-sm text-[#ff5a1f] block">
                                  {primaryVariant ? formatPrice(primaryVariant.price) : "Best Deal"}
                                </span>
                                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                  0% EMI
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* View All Matches Footer Button */}
                      <button
                        type="button"
                        onClick={() => executeSearch(searchQuery)}
                        className="w-full p-2.5 bg-zinc-50 hover:bg-zinc-100 border-t border-zinc-200 text-zinc-900 font-extrabold text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <span>View all results for &quot;{searchQuery}&quot;</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#ff5a1f]" />
                      </button>
                    </div>
                  ) : (
                    /* No Results Found State */
                    <div className="p-5 text-center space-y-2">
                      <p className="font-black text-sm text-zinc-800">
                        No phone matching &quot;{searchQuery}&quot; found
                      </p>
                      <p className="text-xs text-zinc-500">
                        Looking for a specific model? Vishal bhai can arrange any phone within 2 hours!
                      </p>
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                          `Namaste Vishal bhai! Do you have ${searchQuery} in stock at Kakod showroom?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-black px-3.5 py-2 rounded-xl shadow-xs hover:bg-[#20ba59] transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>Ask on WhatsApp</span>
                      </a>
                    </div>
                  )
                ) : (
                  /* 2. When search input is empty: Quick Trending Suggestions */
                  <div className="p-3.5 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-black text-zinc-700">
                      <TrendingUp className="w-4 h-4 text-[#ff5a1f]" />
                      <span>TRENDING IN KAKOD STORE TODAY</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeDeals.slice(0, 4).map((hot) => (
                        <Link
                          key={hot.slug}
                          href={`/phones/${hot.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-2 p-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 transition text-left"
                        >
                          <div className="relative w-8 h-8 rounded-lg bg-white border border-zinc-200 shrink-0 p-0.5">
                            <SafeImage
                              src={hot.image}
                              alt={hot.name}
                              fill
                              sizes="32px"
                              className="object-contain"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-extrabold text-[11px] text-zinc-900 truncate">
                              {hot.name}
                            </p>
                            <span className="font-black text-[10px] text-[#ff5a1f]">
                              {formatPrice(hot.price)}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="pt-1 border-t border-zinc-100 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] font-bold text-zinc-400">Quick:</span>
                      {["iPhone 16", "Galaxy S25", "OnePlus", "Vivo", "Under ₹15,000"].map((kw) => (
                        <button
                          key={kw}
                          type="button"
                          onClick={() => {
                            setSearchQuery(kw);
                            executeSearch(kw);
                          }}
                          className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition"
                        >
                          {kw}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Filter Capsule Pills (Horizontal Scroll) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 max-w-full">
            <span className="text-[10px] font-black text-white/70 uppercase tracking-wide shrink-0">
              Quick:
            </span>
            {quickPills.map((pill) =>
              pill.href ? (
                <Link
                  key={pill.label}
                  href={pill.href}
                  className="bg-black/40 hover:bg-white hover:text-black text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20 whitespace-nowrap transition shrink-0"
                >
                  {pill.label}
                </Link>
              ) : (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => router.push(`/phones?q=${encodeURIComponent(pill.query!)}`)}
                  className="bg-black/40 hover:bg-white hover:text-black text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/20 whitespace-nowrap transition shrink-0"
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
              className="bg-[#ff5a1f] hover:bg-orange-600 text-white font-black text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition transform active:scale-95"
            >
              <span>Explore All Phones</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                "Namaste The Mobile Lounge Kakod! I saw your website and want to check today's special deal prices and free gift bundle."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c5e84a] hover:bg-lime-400 text-black font-black text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Unlock Secret Deal on WhatsApp</span>
            </a>
          </div>

          {/* 3-Point Store Trust Highlights (Responsive Glassmorphism Badges) */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 pt-2.5 border-t border-white/15">
            {/* 1. Genuine Sealed Pack */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 hover:border-[#c5e84a]/60 hover:bg-black/45 transition-all text-center sm:text-left shadow-xs">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#c5e84a]/15 border border-[#c5e84a]/30 flex items-center justify-center text-[#c5e84a] shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-[11px] sm:text-xs text-white leading-tight">
                  100% Sealed Pack
                </p>
                <p className="text-[9px] sm:text-[10px] text-white/75 font-semibold truncate">
                  GST Bill & Warranty
                </p>
              </div>
            </div>

            {/* 2. Paperless 0% EMI */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 hover:border-[#c5e84a]/60 hover:bg-black/45 transition-all text-center sm:text-left shadow-xs">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#c5e84a]/15 border border-[#c5e84a]/30 flex items-center justify-center text-[#c5e84a] shrink-0">
                <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-[11px] sm:text-xs text-white leading-tight">
                  5-Min 0% EMI
                </p>
                <p className="text-[9px] sm:text-[10px] text-white/75 font-semibold truncate">
                  Bajaj, IDFC & TVS
                </p>
              </div>
            </div>

            {/* 3. Assured Gift Hamper */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-black/35 backdrop-blur-md border border-white/15 hover:border-[#c5e84a]/60 hover:bg-black/45 transition-all text-center sm:text-left shadow-xs">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#c5e84a]/15 border border-[#c5e84a]/30 flex items-center justify-center text-[#c5e84a] shrink-0">
                <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-[11px] sm:text-xs text-white leading-tight">
                  Assured Free Gift
                </p>
                <p className="text-[9px] sm:text-[10px] text-white/75 font-semibold truncate">
                  Watch or ANC Buds
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Auto-Scrolling Hot Deals & Hot Sellers Showcase (5 Cols) */}
        <div
          className="lg:col-span-5"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
          onTouchStart={() => setIsCarouselPaused(true)}
          onTouchEnd={() => setIsCarouselPaused(false)}
        >
          <div className="bg-white text-zinc-900 rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-white/80 relative overflow-hidden transition-all duration-300">
            {/* Carousel Header: Brand Pill + Hot Seller Badge + Arrow Navigation */}
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100 gap-2">
              <span className="font-extrabold text-xs text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-lg border border-zinc-200">
                {activeDeal.brandTag}
              </span>

              <div className="flex items-center gap-2">
                <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Flame className="w-3 h-3 text-rose-600 fill-current animate-pulse" />
                  <span>{activeDeal.badge}</span>
                </span>

                {/* Scroller Arrows */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handlePrevDeal}
                    className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition"
                    aria-label="Previous hot deal"
                    title="Previous deal"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextDeal}
                    className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center transition"
                    aria-label="Next hot deal"
                    title="Next deal"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Meta & Pricing */}
            <div className="pt-3 space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="bg-[#c5e84a] text-black font-black text-[9px] uppercase px-1.5 py-0.5 rounded shadow-xs">
                      👑 In Stock
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold">
                      Kakod Showroom
                    </span>
                  </div>

                  <h3 className="font-display font-black text-lg sm:text-xl text-zinc-950 leading-tight truncate">
                    {activeDeal.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-zinc-500 truncate">
                    {activeDeal.specBadge}
                  </p>
                </div>

                {/* Price block */}
                <div className="text-right shrink-0">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-zinc-400 block">
                    MRP: <span className="line-through">{formatPrice(activeDeal.mrp)}</span>
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#ff5a1f] block leading-tight">
                    {formatPrice(activeDeal.price)}
                  </span>
                  {activeDiscount > 0 && (
                    <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      Save {activeDiscount}%
                    </span>
                  )}
                </div>
              </div>

              {/* High-Res Studio Image Stage with Direct Specs Link */}
              <Link
                href={`/phones/${activeDeal.slug}`}
                className="relative block w-full h-40 sm:h-48 bg-gradient-to-b from-zinc-50 via-white to-amber-50/20 rounded-2xl border border-zinc-100 overflow-hidden group cursor-pointer"
              >
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                  <span className="bg-white/95 backdrop-blur-md text-[9px] font-black text-zinc-800 px-2 py-0.5 rounded shadow-xs border border-zinc-200">
                    ⚡ 0% EMI: Starts ₹{activeDeal.emiMonthly.toLocaleString("en-IN")}/mo
                  </span>
                </div>

                <div className="relative w-full h-full p-2 flex items-center justify-center">
                  <SafeImage
                    key={activeDeal.slug}
                    src={activeDeal.image}
                    alt={activeDeal.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 drop-shadow-md animate-in fade-in zoom-in-95 duration-300"
                    priority
                  />
                </div>

                <div className="absolute bottom-2 right-2 z-10">
                  <span className="bg-black/80 hover:bg-black text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded backdrop-blur shadow-xs flex items-center gap-1 transition">
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
                  <p className="text-[10px] sm:text-[11px] font-black text-zinc-900 leading-tight">
                    Assured Gift Hamper With This Phone!
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-medium text-zinc-600 truncate">
                    {activeDeal.gift}
                  </p>
                </div>
              </div>

              {/* WhatsApp Call to Action Button */}
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  `Namaste Vishal bhai! What is your best secret offline deal price for ${activeDeal.name} at Kakod showroom?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs sm:text-sm py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/25 transition transform active:scale-98"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Unlock Deal Price on WhatsApp</span>
              </a>

              {/* Scroller Dots & Auto-Scroll Progress Pill */}
              <div className="pt-1 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {activeDeals.map((deal, idx) => (
                    <button
                      key={deal.slug}
                      type="button"
                      onClick={() => setCurrentDealIndex(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        currentDealIndex === idx
                          ? "w-6 h-1.5 bg-[#ff5a1f]"
                          : "w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400"
                      }`}
                      aria-label={`Show ${deal.name}`}
                    />
                  ))}
                </div>

                <span className="text-[10px] font-bold text-zinc-400">
                  Deal {currentDealIndex + 1} of {activeDeals.length} • Auto-rotating
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Continuous Scrolling Text Ticker */}
      <div className="pt-2 border-t border-white/15 relative overflow-hidden w-full">
        <div className="animate-marquee gap-3 py-1 items-center">
          {[...marqueePerks, ...marqueePerks].map((perk, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white text-[11px] sm:text-xs font-bold whitespace-nowrap shadow-xs hover:border-[#c5e84a] transition"
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

export default Hero;
