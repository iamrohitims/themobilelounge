"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import { Brand } from "@/types/brand";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/format";
import {
  SlidersHorizontal,
  Search,
  Grid,
  List,
  RotateCcw,
  X,
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
      const minPrice = Math.min(...p.variants.map((v) => v.mrp));
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
          const priceA = Math.min(...a.variants.map((v) => v.mrp));
          const priceB = Math.min(...b.variants.map((v) => v.mrp));
          return priceA - priceB;
        });
        break;
      case "price-desc":
        list.sort((a, b) => {
          const priceA = Math.max(...a.variants.map((v) => v.mrp));
          const priceB = Math.max(...b.variants.map((v) => v.mrp));
          return priceB - priceA;
        });
        break;
      case "newest":
        list.sort(
          (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
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
    sortOption,
    searchQuery,
    selectedRam,
    fiveGOnly,
    emiOnly,
  ]);

  const resetFilters = () => {
    setSelectedBrand("all");
    setMaxPrice(200000);
    setSortOption("featured");
    setSearchQuery("");
    setSelectedRam([]);
    setFiveGOnly(false);
    setEmiOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-5 sm:space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="font-display font-black text-2xl sm:text-4xl text-zinc-950 dark:text-white">
          {pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          {pageDescription}
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-white dark:bg-[#161a26] p-3 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-xs">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search phones by model, brand, chipset..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-950 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[#ff5a1f]"
          />
        </div>

        {/* View toggles & Sort dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs font-bold text-zinc-800 dark:text-white flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:inline">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-2.5 py-2 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-white/10">
            <button
              onClick={() => setIsListView(false)}
              className={`p-1 rounded-lg transition ${
                !isListView ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs" : "text-zinc-500"
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsListView(true)}
              className={`p-1 rounded-lg transition ${
                isListView ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs" : "text-zinc-500"
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Sidebar */}
        <aside
          className={`lg:col-span-3 space-y-4 ${
            mobileFilterOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="bento-card p-4 space-y-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200 dark:border-white/10">
              <span className="font-display font-extrabold text-xs sm:text-sm text-zinc-950 dark:text-white flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#ff5a1f]" />
                <span>Filters</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetFilters}
                  className="text-[10px] text-zinc-500 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
                {mobileFilterOpen && (
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="lg:hidden p-1 rounded-md text-zinc-500 hover:text-black dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Brand Filter */}
            {!lockedBrand && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide block">
                  Brand:
                </label>
                <div className="space-y-0.5 max-h-48 overflow-y-auto no-scrollbar">
                  <button
                    onClick={() => setSelectedBrand("all")}
                    className={`w-full text-left px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                      selectedBrand === "all"
                        ? "bg-[#ff5a1f] text-white shadow-xs font-black"
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
                      className={`w-full text-left px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center justify-between ${
                        selectedBrand.toLowerCase() === b.name.toLowerCase()
                          ? "bg-[#ff5a1f] text-white shadow-xs font-black"
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
              <div className="space-y-1.5 pt-2.5 border-t border-zinc-200 dark:border-white/10">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide text-[11px]">
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
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>₹10,000</span>
                  <span>₹2,00,000</span>
                </div>
              </div>
            )}

            {/* Quick Toggle Checkboxes */}
            <div className="space-y-2 pt-2.5 border-t border-zinc-200 dark:border-white/10 text-xs font-bold">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={fiveGOnly}
                  onChange={(e) => setFiveGOnly(e.target.checked)}
                  className="rounded bg-zinc-100 dark:bg-zinc-900 border-zinc-300 text-[#ff5a1f] focus:ring-0"
                />
                <span>5G Phones Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={emiOnly}
                  onChange={(e) => setEmiOnly(e.target.checked)}
                  className="rounded bg-zinc-100 dark:bg-zinc-900 border-zinc-300 text-[#ff5a1f] focus:ring-0"
                />
                <span>0% EMI Eligible</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Product Grid */}
        <div className="lg:col-span-9 space-y-3.5">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              Showing <strong className="text-zinc-950 dark:text-white">{filteredProducts.length}</strong> phones
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bento-card p-8 sm:p-12 text-center space-y-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-xs">
              <p className="text-3xl">🔍</p>
              <h3 className="font-display font-extrabold text-base text-zinc-950 dark:text-white">
                No smartphones match your filters
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Try widening your price budget or clearing brand selections.
              </p>
              <button
                onClick={resetFilters}
                className="bg-[#ff5a1f] hover:bg-orange-600 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-3 sm:gap-4 ${
                isListView
                  ? "grid-cols-1"
                  : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
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
