"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { LiveStatusBadge } from "./LiveStatusBadge";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const compareItems = useCompareStore((state) => state.items);

  // Close mobile drawer automatically when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Map icons for mobile drawer tiles
  const navIconMap: Record<string, any> = {
    "/phones": Smartphone,
    "/accessories": Headphones,
    "/emi": CreditCard,
    "/offers": Tag,
    "/exchange": RefreshCw,
    "/services": Wrench,
    "/contact": Store,
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* 1. Top Announcement Marquee Ticker (Trips24x7 Vibrant Gradient) */}
      <div className="bg-gradient-to-r from-[#ff5a1f] via-[#7b2fbe] to-[#cc0074] text-white py-1.5 px-3 overflow-hidden text-xs font-black tracking-wide border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-black/40 text-[#c5e84a] px-2.5 py-0.5 rounded-full text-[10px] uppercase font-black shrink-0 flex items-center gap-1 border border-white/10">
              <Flame className="w-3 h-3 text-amber-300 fill-current" />
              <span>Kakod Store</span>
            </span>
            <span className="truncate text-[11px] sm:text-xs font-semibold">
              iPhone 16 Ready Stock • ₹0 Downpayment 0% EMI (Bajaj/IDFC) • Free Smartwatch & Gifts on Every Smartphone!
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px]">
            <a
              href={siteConfig.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1 text-white font-medium"
            >
              <MapPin className="w-3 h-3 text-[#c5e84a]" />
              <span>Main Market, Kakod</span>
            </a>
            <span>•</span>
            <span className="text-[#c5e84a] font-black">Open 9:30 AM – 9:00 PM</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="bg-white/95 dark:bg-[#121624]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 px-3 sm:px-6 py-2.5 sm:py-3 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Identity & Store Subtitle */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition shrink-0 border border-zinc-200 dark:border-white/10 bg-zinc-950">
              <Image
                src="/brand/logo.png"
                alt={siteConfig.name}
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-sm sm:text-base lg:text-lg text-zinc-950 dark:text-white tracking-tight">
                  {siteConfig.name}
                </span>
                <span className="bg-[#c5e84a]/20 text-[#3f6212] dark:text-[#c5e84a] text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 rounded-full border border-[#c5e84a]/30 hidden xs:inline">
                  Verified
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-zinc-600 dark:text-zinc-300 font-medium">
                📍 Kakod • by Vishal Distributors
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links (Visible on lg: 1024px and up) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {mainNav.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? "bg-zinc-100 text-zinc-950 dark:bg-white/15 dark:text-white shadow-xs font-black"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/10"
                  }`}
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="bg-[#ff1e42] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quick Search Button (Routes to Catalogue) */}
            <Link
              href="/phones"
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-700 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white transition"
              title="Search Phones"
              aria-label="Search Phones"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle />

            {/* Compare Badge Link */}
            <Link
              href="/compare"
              className="relative p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-700 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white transition"
              title="Compare Phones"
              aria-label="Compare Phones"
            >
              <ArrowLeftRight className="w-4 h-4" />
              {compareItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff1e42] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-in zoom-in">
                  {compareItems.length}
                </span>
              )}
            </Link>

            {/* Direct Phone Call Button (Medium screens & up) */}
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="hidden md:flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 px-3 py-2 rounded-xl text-xs font-bold text-zinc-800 dark:text-white transition"
              title="Call Showroom"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-lime-400" />
              <span className="hidden xl:inline">{siteConfig.contact.phone}</span>
              <span className="xl:hidden">Call</span>
            </a>

            {/* WhatsApp Deal Button (Prominent Brand Pill) */}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                "Namaste The Mobile Lounge Kakod! I want to check today's best smartphone offers and unlock counter deals."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c5e84a] hover:bg-lime-400 text-black font-black text-xs px-3 sm:px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(197,232,74,0.35)] transition shrink-0 transform active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>

            {/* Mobile & Tablet Hamburger Toggle (Visible on screens under 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-white transition"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-[#0f141e]/98 backdrop-blur-2xl border-b border-zinc-200 dark:border-white/15 px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-2xl max-h-[calc(100vh-100px)] overflow-y-auto">
          {/* Top Live Status */}
          <div className="pb-3 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
            <LiveStatusBadge />
            <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">Main Market, Kakod</span>
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
                  className={`p-3 rounded-2xl border transition flex flex-col justify-between space-y-2 ${
                    isActive
                      ? "bg-zinc-100 dark:bg-white/15 border-zinc-400 dark:border-white/30 text-zinc-950 dark:text-white shadow-xs"
                      : "bg-zinc-50 dark:bg-[#161d2a] border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-white/10 flex items-center justify-center text-zinc-800 dark:text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    {item.badge ? (
                      <span className="bg-[#ff1e42] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400 opacity-60" />
                    )}
                  </div>
                  <span className="text-xs font-extrabold">{item.title}</span>
                </Link>
              );
            })}
          </div>

          {/* Action Row & Theme Switcher inside drawer */}
          <div className="pt-2 border-t border-zinc-200 dark:border-white/10 space-y-2">
            <ThemeToggle showLabel className="w-full justify-center py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900" />

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/15 text-xs font-bold text-zinc-800 dark:text-white flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              >
                <Phone className="w-4 h-4 text-emerald-600 dark:text-lime-400" />
                <span>Call Store</span>
              </a>

              <a
                href={siteConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/15 text-xs font-bold text-zinc-800 dark:text-white flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              >
                <MapPin className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
