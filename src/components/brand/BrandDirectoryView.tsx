"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Brand } from "@/types/brand";
import { siteConfig } from "@/config/site";
import {
  Search,
  ShieldCheck,
  ArrowRight,
  Smartphone,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

interface BrandDirectoryViewProps {
  brands: Brand[];
}

type CategoryFilter = "all" | "stock" | "flagship" | "performance" | "camera" | "budget";

const CATEGORY_MAP: Record<CategoryFilter, string[]> = {
  all: [],
  stock: [], // dynamically checked: phoneCount > 0
  flagship: ["apple", "samsung", "google", "oneplus", "sony"],
  performance: ["iqoo", "poco", "asus", "nothing", "realme"],
  camera: ["vivo", "oppo", "xiaomi", "honor", "motorola"],
  budget: ["tecno", "infinix", "lava", "nokia", "poco"],
};

export function BrandDirectoryView({ brands }: BrandDirectoryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const totalInStock = brands.reduce((acc, b) => acc + (b.phoneCount || 0), 0);

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      // 1. Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        brand.name.toLowerCase().includes(q) ||
        brand.slug.toLowerCase().includes(q) ||
        brand.tagline?.toLowerCase().includes(q) ||
        brand.popularModels?.some((m) => m.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      // 2. Category Filter
      if (activeCategory === "all") return true;
      if (activeCategory === "stock") return (brand.phoneCount || 0) > 0;

      const allowedSlugs = CATEGORY_MAP[activeCategory];
      return allowedSlugs.includes(brand.slug?.toLowerCase());
    });
  }, [brands, searchQuery, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-zinc-900 via-zinc-950 to-black p-6 sm:p-10 border border-white/10 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5a1f]/15 border border-[#ff5a1f]/30 text-[#ff5a1f] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Brand Showroom Directory</span>
          </div>

          <h1 className="font-display font-black text-2xl xs:text-3xl sm:text-5xl tracking-tight leading-tight">
            All Smartphone Brands at <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-zinc-200 to-[#ff5a1f]">
              The Mobile Lounge Kakod
            </span>
          </h1>

          <p className="text-zinc-400 text-xs sm:text-base leading-relaxed">
            Shop 100% genuine sealed-pack phones with authorized brand warranty, GST invoice,
            instant ₹0 downpayment EMI, and free accessories with every phone.
          </p>

          {/* Quick Stats Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-zinc-300">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{brands.length} Global Brands</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{totalInStock} Ready Showroom Phones</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>0% EMI on Bajaj, HDFC & TVS</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant Old Phone Exchange</span>
            </div>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff5a1f]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3 bg-white dark:bg-[#161a26] p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search brands, models (e.g. Apple, S25, Nord, ZEISS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-[#ff5a1f] transition"
            />
          </div>

          {/* Result Count Indicator */}
          <div className="text-xs text-zinc-500 dark:text-zinc-400 font-bold self-end sm:self-center">
            Showing {filteredBrands.length} of {brands.length} Brands
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-zinc-100 dark:border-white/5">
          {[
            { id: "all", label: `All Brands (${brands.length})` },
            { id: "stock", label: `In Stock Showroom (${brands.filter((b) => b.phoneCount > 0).length})` },
            { id: "flagship", label: "Flagship & Premium" },
            { id: "camera", label: "Camera & Portrait" },
            { id: "performance", label: "Gaming & Performance" },
            { id: "budget", label: "Budget & Value 5G" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as CategoryFilter)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-[#ff5a1f] text-white shadow-xs"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brands Grid */}
      {filteredBrands.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#161a26] rounded-2xl border border-zinc-200 dark:border-white/10 p-8 space-y-3">
          <Smartphone className="w-12 h-12 text-zinc-400 mx-auto" />
          <h3 className="font-display font-black text-lg text-zinc-950 dark:text-white">
            No brands found matching "{searchQuery}"
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Try clearing your search query or choosing "All Brands".
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="px-4 py-2 bg-[#ff5a1f] text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredBrands.map((brand) => {
            const isMonochrome = ["apple", "nothing", "honor", "sony"].includes(
              brand.slug?.toLowerCase()
            );
            const inStock = (brand.phoneCount || 0) > 0;
            const logoSrc = brand.logo && brand.logo.trim() ? brand.logo : "/brand/logo.png";

            const waText = encodeURIComponent(
              `Hi Vishal Distributors / The Mobile Lounge! I want to check latest deal & price for ${brand.name} smartphones in Kakod showroom.`
            );
            const waUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${waText}`;

            return (
              <div
                key={brand.slug}
                className="group relative flex flex-col justify-between bg-white dark:bg-[#161a26] rounded-2xl border border-zinc-200 dark:border-white/10 p-5 hover:border-[#ff5a1f] dark:hover:border-[#ff5a1f] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Top Row: Logo & Status Badge */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    {/* Brand Logo Showcase */}
                    <div className="w-20 h-20 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-white/10 flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-200 shadow-xs">
                      <img
                        src={logoSrc}
                        alt={`${brand.name} logo`}
                        className={`max-h-full max-w-full object-contain filter ${
                          isMonochrome ? "dark:invert" : ""
                        }`}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/brand/logo.png";
                        }}
                      />
                    </div>

                    {/* Stock status indicator */}
                    <div className="text-right">
                      {inStock ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{brand.phoneCount} In Stock</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 border border-zinc-200/60 dark:border-white/5">
                          On Order
                        </span>
                      )}

                      {brand.featured && (
                        <span className="block mt-1 text-[10px] font-black uppercase tracking-wider text-[#ff5a1f]">
                          ★ Featured Brand
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Brand Name & Tagline */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-display font-black text-xl text-zinc-950 dark:text-white group-hover:text-[#ff5a1f] transition">
                        {brand.name}
                      </h2>
                      <ShieldCheck className="w-4 h-4 text-[#ff5a1f] shrink-0" />
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {brand.tagline || `Official ${brand.name} Showroom in Kakod`}
                    </p>
                  </div>

                  {/* Popular Models Chips */}
                  {brand.popularModels && brand.popularModels.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/5 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        Popular Models:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {brand.popularModels.slice(0, 3).map((model) => (
                          <span
                            key={model}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300"
                          >
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-white/10 flex items-center gap-2">
                  <Link
                    href={`/phones/brand/${brand.name}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-black hover:bg-[#ff5a1f] dark:hover:bg-[#ff5a1f] dark:hover:text-white transition active:scale-95 shadow-xs"
                  >
                    <span>{inStock ? "Browse Stock" : "View Showroom"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Enquire about ${brand.name} on WhatsApp`}
                    className="p-2.5 rounded-xl border border-zinc-200 dark:border-white/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trust & Showroom Assurance Footer Section */}
      <div className="rounded-3xl bg-linear-to-r from-zinc-100 via-white to-zinc-100 dark:from-zinc-900 dark:via-[#161a26] dark:to-zinc-900 p-6 sm:p-8 border border-zinc-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#ff5a1f]/10 text-[#ff5a1f] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-zinc-950 dark:text-white">100% Genuine Sealed Pack</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Every phone comes with an official GST invoice and brand warranty valid across India.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-zinc-950 dark:text-white">Instant ₹0 Downpayment EMI</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Bajaj Finserv, HDFC, IDFC, and TVS Credit spot approval with zero processing fee.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-zinc-950 dark:text-white">Free Setup & Gifts</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Complimentary screen guard, case fitting, and free data transfer from your old phone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
