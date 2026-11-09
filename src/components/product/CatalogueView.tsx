"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product, ProductTag } from "@/types/product";
import { Brand } from "@/types/brand";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/format";
import {
  SlidersHorizontal,
  Search,
  Grid,
  List,
  RotateCcw,
  Sparkles,
  Check,
} from "lucide-react";

interface CatalogueViewProps {
  initialProducts: Product[];
  brands: Brand[];
  pageTitle?: string;
  pageDescription?: string;
  lockedBrand?: string;
  lockedMaxPrice?: number;
}

export function CatalogueView({
  initialProducts,
  brands,
  pageTitle = "All Smartphones in Kakod",
  pageDescription = "Browse current in-stock smartphones with verified deal prices, 0% EMI and assured free gift hampers at The Mobile Lounge.",
  lockedBrand,
  lockedMaxPrice,
}: CatalogueViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state initialization
  const initialBrand = lockedBrand || searchParams.get("brand") || "all";
  const initialMaxPrice = lockedMaxPrice || parseInt(searchParams.get("maxPrice") || "200000", 10);
  const initialSort = searchParams.get("sort") || "featured";
  const initialSearch = searchParams.get("q") || "";

  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);
  const [maxPrice, setMaxPrice] = useState<number>(initialMaxPrice);
  const [sortOption, setSortOption] = useState<string>(initialSort);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedRam, setSelectedRam] = useState<number[]>([]);
  const [fiveGOnly, setFiveGOnly] = useState<boolean>(false);
  const [emiOnly, setEmiOnly] = useState<boolean>(false);
  const [isListView, setIsListView] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync state to URL for shareable search/filter links
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedBrand !== "all" && !lockedBrand) params.set("brand", selectedBrand);
    if (maxPrice < 200000 && !lockedMaxPrice) params.set("maxPrice", maxPrice.toString());
    if (sortOption !== "featured") params.set("sort", sortOption);
    if (searchQuery.trim()) params.set("q", searchQuery.trim());

    const queryString = params.toString();
    const newPath = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState(null, "", newPath);
  }, [selectedBrand, maxPrice, sortOption, searchQuery, lockedBrand, lockedMaxPrice]);

  // Client filtering and sorting
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Filter by Brand
    if (selectedBrand !== "all") {
      list = list.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Filter by Max Price
    list = list.filter((p) => {
      const minPrice = Math.min(...p.variants.map((v) => v.price));
      return minPrice <= maxPrice;
    });

    // Filter by RAM
    if (selectedRam.length > 0) {
      list = list.filter((p) =>
        p.variants.some((v) => v.ram && selectedRam.includes(v.ram))
      );
    }

    // Filter by 5G
    if (fiveGOnly) {
      list = list.filter((p) => p.tags.includes("5g") || p.name.includes("5G"));
    }

    // Filter by EMI Available
    if (emiOnly) {
      list = list.filter((p) => p.emiAvailable);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortOption) {
      case "price-asc":
        list.sort((a, b) => {
          const priceA = Math.min(...a.variants.map((v) => v.price));
          const priceB = Math.min(...b.variants.map((v) => v.price));
          return priceA - priceB;
        });
        break;
      case "price-desc":
        list.sort((a, b) => {
          const priceA = Math.max(...a.variants.map((v) => v.price));
          const priceB = Math.max(...b.variants.map((v) => v.price));
          return priceB - priceA;
        });
        break;
      case "newest":
        list.sort(
          (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
        break;
      case "discount":
        list.sort((a, b) => {
          const discA = Math.max(
            ...a.variants.map((v) => ((v.mrp - v.price) / (v.mrp || 1)) * 100)
          );
          const discB = Math.max(
            ...b.variants.map((v) => ((v.mrp - v.price) / (v.mrp || 1)) * 100)
          );
          return discB - discA;
        });
        break;
      case "featured":
      default:
        list.sort((a, b) => {
          const scoreA =
            (a.tags.includes("bestseller") ? 2 : 0) + (a.tags.includes("new") ? 3 : 0);
          const scoreB =
            (b.tags.includes("bestseller") ? 2 : 0) + (b.tags.includes("new") ? 3 : 0);
          return scoreB - scoreA;
        });
        break;
    }

    return list;
  }, [
    initialProducts,
    selectedBrand,
    maxPrice,
    selectedRam,
    fiveGOnly,
    emiOnly,
    searchQuery,
    sortOption,
  ]);

  const resetFilters = () => {
    if (!lockedBrand) setSelectedBrand("all");
    if (!lockedMaxPrice) setMaxPrice(200000);
    setSelectedRam([]);
    setFiveGOnly(false);
    setEmiOnly(false);
    setSearchQuery("");
    setSortOption("featured");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5a1f]/15 border border-[#ff5a1f]/30 text-[#ff5a1f] text-xs font-extrabold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OFFICIAL SMARTPHONE SHOWROOM • KAKOD</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-zinc-950 dark:text-white tracking-tight">
          {pageTitle}
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          {pageDescription}
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search phones by model, brand, chipset..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f]"
          />
        </div>

        {/* View toggles & Sort dropdown */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs font-bold text-zinc-800 dark:text-white flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:inline">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="featured">Featured & Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Releases</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-white/10">
            <button
              onClick={() => setIsListView(false)}
              className={`p-1.5 rounded-lg transition ${
                !isListView ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsListView(true)}
              className={`p-1.5 rounded-lg transition ${
                isListView ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm" : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar Filters + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar (3 Cols) */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            mobileFilterOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="bento-card p-5 space-y-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/10">
              <span className="font-display font-extrabold text-sm text-zinc-950 dark:text-white flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#ff5a1f]" />
                <span>Filter Catalogue</span>
              </span>
              <button
                onClick={resetFilters}
                className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Brand Filter */}
            {!lockedBrand && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide block">
                  Select Brand:
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedBrand("all")}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                      selectedBrand === "all"
                        ? "bg-[#ff5a1f] text-white shadow-sm font-black"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5"
                    }`}
                  >
                    <span>All Brands</span>
                    <span className="text-[10px] opacity-75">{initialProducts.length}</span>
                  </button>

                  {brands.map((b) => (
                    <button
                      key={b.slug}
                      onClick={() => setSelectedBrand(b.name)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                        selectedBrand.toLowerCase() === b.name.toLowerCase()
                          ? "bg-[#ff5a1f] text-white shadow-sm font-black"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <span>{b.name}</span>
                      <span className="text-[10px] opacity-75">{b.phoneCount}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Slider Filter */}
            {!lockedMaxPrice && (
              <div className="space-y-2 pt-3 border-t border-zinc-200 dark:border-white/10">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                    Max Budget:
                  </label>
                  <span className="font-bold text-emerald-700 dark:text-[#c5e84a]">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={200000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                />
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>₹10,000</span>
                  <span>₹2,00,000</span>
                </div>
              </div>
            )}

            {/* RAM Filter Pills */}
            <div className="space-y-2 pt-3 border-t border-zinc-200 dark:border-white/10">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide block">
                RAM Size:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[4, 6, 8, 12, 16].map((ramVal) => {
                  const isSelected = selectedRam.includes(ramVal);
                  return (
                    <button
                      key={ramVal}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedRam(selectedRam.filter((r) => r !== ramVal));
                        } else {
                          setSelectedRam([...selectedRam, ramVal]);
                        }
                      }}
                      className={`text-xs font-bold px-2.5 py-1 rounded-xl transition border ${
                        isSelected
                          ? "bg-[#ff5a1f] text-white border-[#ff5a1f]"
                          : "bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30"
                      }`}
                    >
                      {ramVal}GB
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Toggle Checkboxes (5G, EMI) */}
            <div className="space-y-2.5 pt-3 border-t border-zinc-200 dark:border-white/10 text-xs font-bold">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white">
                <input
                  type="checkbox"
                  checked={fiveGOnly}
                  onChange={(e) => setFiveGOnly(e.target.checked)}
                  className="rounded bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-white/20 text-[#ff5a1f] focus:ring-0"
                />
                <span>5G Phones Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white">
                <input
                  type="checkbox"
                  checked={emiOnly}
                  onChange={(e) => setEmiOnly(e.target.checked)}
                  className="rounded bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-white/20 text-[#ff5a1f] focus:ring-0"
                />
                <span>0% Downpayment EMI Eligible</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Product Grid (9 Cols) */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              Showing <strong className="text-zinc-950 dark:text-white">{filteredProducts.length}</strong> smartphones
              in Kakod
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bento-card p-12 text-center space-y-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm">
              <p className="text-4xl">🔍</p>
              <h3 className="font-display font-extrabold text-lg text-zinc-950 dark:text-white">
                No smartphones match your exact filters
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                Try widening your price budget or clearing RAM/brand selections to view available
                stock.
              </p>
              <button
                onClick={resetFilters}
                className="bg-[#ff5a1f] hover:bg-orange-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition shadow"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-4 ${
                isListView
                  ? "grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
