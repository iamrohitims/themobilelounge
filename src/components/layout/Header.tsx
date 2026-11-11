"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/config/nav";
import { useCompareStore } from "@/store/compare";
import {
  Menu,
  X,
  Phone,
  MessageSquare,
  ArrowLeftRight,
  MapPin,
  Flame,
  Search,
  Smartphone,
  Headphones,
  CreditCard,
  Tag,
  RefreshCw,
  Wrench,
  Store,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { LiveStatusBadge } from "./LiveStatusBadge";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  siteLogo?: string;
  announcement?: {
    show?: boolean;
    badge?: string;
    items?: string[];
    locationText?: string;
    locationUrl?: string;
    timings?: string;
  };
}

export function Header({
  siteLogo = "/brand/logo.png",
  announcement = {
    show: true,
    badge: "Kakod Hub",
    items: [
      "iPhone 16 Series In-Stock • 0% Downpayment EMI • Free Smartwatch on Flagships",
      "100% Genuine Sealed Pack with GST Bill & Brand Warranty",
      "Instant 5-Minute Paperless EMI via Bajaj Finserv, TVS & IDFC",
      "Spot Old Phone Exchange with Instant Cash Discount",
    ],
    locationText: "Main Market, Kakod",
    locationUrl: siteConfig.location.googleMapsUrl,
    timings: "Open 9:30 AM – 9:00 PM",
  },
}: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const compareItems = useCompareStore((state) => state.items);

  // Close drawers and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Map icons for navigation tiles
  const navIconMap: Record<string, any> = {
    "/phones": Smartphone,
    "/brands": Sparkles,
    "/accessories": Headphones,
    "/emi": CreditCard,
    "/offers": Tag,
    "/exchange": RefreshCw,
    "/services": Wrench,
    "/contact": Store,
  };

  // Split navigation: Top 5 prominent links on desktop, remaining 3 in "More" menu
  const primaryNav = mainNav.slice(0, 5); // Phones, Brands, Accessories, 0% EMI, Offers
  const secondaryNav = mainNav.slice(5); // Exchange, Services, Store Info

  const isSecondaryActive = secondaryNav.some((item) => pathname === item.href);

  return (
    <header className="sticky top-0 z-50 w-full shadow-xs">
      {/* 1. Top Announcement Marquee Ticker (Dynamic from Admin, with toggle to hide) */}
      {announcement?.show !== false && (
        <div className="bg-gradient-to-r from-[#ff5a1f] via-[#7b2fbe] to-[#cc0074] text-white py-1 px-2.5 sm:px-4 text-xs font-black tracking-wide border-b border-white/20 w-full max-w-full overflow-hidden select-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 w-full">
            {/* Left: Badge + Infinite Continuous Marquee Ticker */}
            <div className="flex items-center gap-2 overflow-hidden min-w-0 flex-1 relative group">
              <span className="bg-black/40 text-[#c5e84a] px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] uppercase font-black shrink-0 flex items-center gap-1 border border-white/10 z-10">
                <Flame className="w-2.5 h-2.5 text-amber-300 fill-current" />
                <span>{announcement.badge || "Kakod Hub"}</span>
              </span>

              {/* Infinite Horizontal Smooth Marquee Track */}
              <div className="overflow-hidden relative flex-1 min-w-0 mask-linear">
                <div className="animate-marquee hover:pause flex items-center gap-6 whitespace-nowrap text-[10px] sm:text-xs font-semibold py-0.5">
                  {/* First Track Copy */}
                  {(announcement.items && announcement.items.length > 0
                    ? announcement.items
                    : [
                        "iPhone 16 Series In-Stock • 0% Downpayment EMI • Free Smartwatch on Flagships",
                        "100% Genuine Sealed Pack with GST Bill & Brand Warranty",
                        "Instant 5-Minute Paperless EMI via Bajaj Finserv, TVS & IDFC",
                      ]
                  ).map((item, idx) => (
                    <span key={`ticker-1-${idx}`} className="inline-flex items-center gap-2">
                      <span>{item}</span>
                      <span className="text-white/40">•</span>
                    </span>
                  ))}

                  {/* Duplicate Track Copy for Seamless Gapless Loop */}
                  {(announcement.items && announcement.items.length > 0
                    ? announcement.items
                    : [
                        "iPhone 16 Series In-Stock • 0% Downpayment EMI • Free Smartwatch on Flagships",
                        "100% Genuine Sealed Pack with GST Bill & Brand Warranty",
                        "Instant 5-Minute Paperless EMI via Bajaj Finserv, TVS & IDFC",
                      ]
                  ).map((item, idx) => (
                    <span key={`ticker-2-${idx}`} className="inline-flex items-center gap-2">
                      <span>{item}</span>
                      <span className="text-white/40">•</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Store Map Location & Timings (Hidden on very narrow mobile to prioritize scroller) */}
            <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px] z-10 pl-2">
              <a
                href={announcement.locationUrl || siteConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1 text-white font-medium transition"
              >
                <MapPin className="w-3 h-3 text-[#c5e84a]" />
                <span>{announcement.locationText || "Main Market, Kakod"}</span>
              </a>
              <span className="text-white/40">•</span>
              <span className="text-[#c5e84a] font-black">{announcement.timings || "Open 9:30 AM – 9:00 PM"}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <div className="bg-white/95 dark:bg-[#0c101b]/95 backdrop-blur-xl border-b border-zinc-200/80 dark:border-white/10 px-3 sm:px-6 py-2 transition-colors duration-200 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 w-full">
          
          {/* Brand Identity - Cleanly calibrated for phone screens like OnePlus 11R */}
          <Link
            href="/"
            className="shrink-0 flex items-center gap-2 sm:gap-2.5 group select-none py-0.5"
            title={`${siteConfig.name} - Kakod`}
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0 border border-zinc-200 dark:border-white/15 bg-zinc-950">
              <Image
                src={siteLogo}
                alt={siteConfig.name}
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-sm sm:text-base text-zinc-950 dark:text-white tracking-tight leading-none whitespace-nowrap group-hover:text-[#ff5a1f] transition-colors">
                  {siteConfig.name}
                </span>
                <span className="bg-[#c5e84a]/20 text-[#3f6212] dark:text-[#c5e84a] text-[8px] font-black px-1 py-0.5 rounded-full border border-[#c5e84a]/30 hidden sm:inline-flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  Verified
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap leading-tight mt-0.5">
                Kakod Showroom <span className="hidden sm:inline">• by Vishal Distributors</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Visible on lg: 1024px and up) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {primaryNav.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-[0.97] ${
                    isActive
                      ? "bg-zinc-100 text-zinc-950 dark:bg-white/15 dark:text-white shadow-xs font-black"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/10"
                  }`}
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="bg-[#ff1e42] text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* "More" Dropdown Menu for secondary items (Exchange, Services, Contact) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                aria-expanded={moreDropdownOpen}
                aria-haspopup="true"
                className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap active:scale-[0.97] ${
                  isSecondaryActive || moreDropdownOpen
                    ? "bg-zinc-100 text-zinc-950 dark:bg-white/15 dark:text-white font-black"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/10"
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white/98 dark:bg-[#121624]/98 backdrop-blur-2xl border border-zinc-200/90 dark:border-white/15 rounded-2xl p-1.5 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-150 z-50">
                  {secondaryNav.map((item) => {
                    const Icon = navIconMap[item.href] || Sparkles;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                          isActive
                            ? "bg-zinc-100 text-zinc-950 dark:bg-white/15 dark:text-white font-black"
                            : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/5"
                        }`}
                      >
                        <div className="w-5 h-5 rounded-lg bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                          <Icon className="w-3 h-3" />
                        </div>
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions Bar - Strict dimensions to guarantee 100% responsiveness on mobile */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Search Phones */}
            <Link
              href="/phones"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-700 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white transition active:scale-95 flex items-center justify-center shrink-0"
              title="Search Phones"
              aria-label="Search Phones"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center p-0 shrink-0" />

            {/* Compare Phones Pill - Visible on mobile when active to prevent header clipping */}
            <Link
              href="/compare"
              className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-700 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white transition active:scale-95 items-center justify-center shrink-0 ${
                compareItems.length > 0 ? "flex" : "hidden sm:flex"
              }`}
              title="Compare Phones"
              aria-label="Compare Phones"
            >
              <ArrowLeftRight className="w-4 h-4" />
              {compareItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#ff1e42] text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-xs animate-in zoom-in">
                  {compareItems.length}
                </span>
              )}
            </Link>

            {/* Direct Phone Call Button (Medium screens & up) */}
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="hidden xl:inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 px-2.5 py-1.5 rounded-xl text-xs font-bold text-zinc-800 dark:text-white transition active:scale-95 shrink-0"
              title="Call Showroom Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-lime-400" />
              <span>{siteConfig.contact.phone}</span>
            </a>

            {/* WhatsApp Deal Button (Visible on md and up) */}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                "Namaste The Mobile Lounge Kakod! I want to check today's best smartphone offers and unlock counter deals."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs px-3 py-1.5 rounded-xl items-center gap-1.5 shadow-xs transition active:scale-95 shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile & Tablet Hamburger Toggle (lg:hidden) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-white transition active:scale-95 flex items-center justify-center shrink-0"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-[#0c101b]/98 backdrop-blur-2xl border-b border-zinc-200 dark:border-white/15 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto w-full max-w-full">
          {/* Top Live Status & WhatsApp Banner */}
          <div className="pb-3 border-b border-zinc-200 dark:border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <LiveStatusBadge />
              <span className="text-xs text-zinc-500 font-medium">Main Market, Kakod</span>
            </div>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                "Namaste The Mobile Lounge Kakod! I want to check today's best smartphone offers and counter deals."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Unlock Secret Deal on WhatsApp</span>
            </a>
          </div>

          {/* Categorized Navigation Tiles */}
          <div className="grid grid-cols-2 gap-2">
            {mainNav.map((item) => {
              const Icon = navIconMap[item.href] || Smartphone;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl border transition flex flex-col justify-between space-y-1.5 active:scale-[0.98] ${
                    isActive
                      ? "bg-zinc-100 dark:bg-white/15 border-zinc-400 dark:border-white/30 text-zinc-950 dark:text-white shadow-xs font-black"
                      : "bg-zinc-50 dark:bg-[#161d2a] border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 rounded-lg bg-zinc-200 dark:bg-white/10 flex items-center justify-center text-zinc-800 dark:text-white">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    {item.badge ? (
                      <span className="bg-[#ff1e42] text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className="w-3 h-3 text-zinc-400 opacity-60" />
                    )}
                  </div>
                  <span className="text-xs font-extrabold">{item.title}</span>
                </Link>
              );
            })}

            {/* Compare Phones Tile in Mobile Drawer */}
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl border transition flex items-center justify-between active:scale-[0.98] bg-zinc-50 dark:bg-[#161d2a] border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 col-span-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-zinc-200 dark:bg-white/10 flex items-center justify-center text-zinc-800 dark:text-white">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-extrabold">Compare Specifications</span>
              </div>
              {compareItems.length > 0 ? (
                <span className="bg-[#ff1e42] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {compareItems.length} Selected
                </span>
              ) : (
                <span className="text-[10px] text-zinc-400 font-medium">Add phones to compare</span>
              )}
            </Link>
          </div>

          {/* Direct Call & Directions Buttons */}
          <div className="pt-2 border-t border-zinc-200 dark:border-white/10 grid grid-cols-2 gap-2">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/15 text-xs font-bold text-zinc-800 dark:text-white flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-lime-400" />
              <span>Call Store</span>
            </a>

            <a
              href={siteConfig.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/15 text-xs font-bold text-zinc-800 dark:text-white flex items-center justify-center gap-1.5 active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Directions</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
