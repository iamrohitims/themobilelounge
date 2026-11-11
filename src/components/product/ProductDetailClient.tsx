"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { Product, ProductVariant } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import { useCompareStore } from "@/store/compare";
import { useWishlistStore } from "@/store/wishlist";
import { EMICalculator } from "@/components/emi/EMICalculator";
import { ProductCard } from "@/components/product/ProductCard";
import { siteConfig } from "@/config/site";
import {
  MessageSquare,
  ArrowLeftRight,
  Heart,
  Phone,
  Gift,
  Check,
  Star,
  Tag,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Cpu,
  Camera,
  Battery,
  Layers,
  Maximize2,
  X,
  ZoomIn,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  similarProducts: Product[];
  accessories: Product[];
}

export function ProductDetailClient({
  product,
  similarProducts,
  accessories,
}: ProductDetailClientProps) {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.variants[0]?.color?.trim() || ""
  );
  const [selectedStorage, setSelectedStorage] = useState<number | undefined>(
    product.variants[0]?.storage
  );
  const [selectedRam, setSelectedRam] = useState<number | undefined>(
    product.variants[0]?.ram
  );

  // Extract unique colors with their hex colors
  const uniqueColors = useMemo(() => {
    const list: { color: string; hex?: string }[] = [];
    const seen = new Set<string>();
    for (const v of product.variants) {
      if (v.color && !seen.has(v.color.trim())) {
        seen.add(v.color.trim());
        list.push({ color: v.color.trim(), hex: v.colorHex });
      }
    }
    return list;
  }, [product.variants]);

  // Extract unique RAM options
  const uniqueRams = useMemo(() => {
    const set = new Set<number>();
    for (const v of product.variants) {
      if (typeof v.ram === "number" && v.ram > 0) {
        set.add(v.ram);
      }
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [product.variants]);

  // Extract unique Storage options
  const uniqueStorages = useMemo(() => {
    const set = new Set<number>();
    for (const v of product.variants) {
      if (typeof v.storage === "number" && v.storage > 0) {
        set.add(v.storage);
      }
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [product.variants]);

  // Find the exact or best matching variant for user's selection
  const activeVariant: ProductVariant = useMemo(() => {
    // 1. Exact match: color + storage + ram
    let match = product.variants.find(
      (v) =>
        v.color?.trim().toLowerCase() === selectedColor.toLowerCase() &&
        (selectedStorage === undefined || v.storage === selectedStorage) &&
        (selectedRam === undefined || v.ram === selectedRam)
    );
    if (match) return match;

    // 2. Match: color + storage
    match = product.variants.find(
      (v) =>
        v.color?.trim().toLowerCase() === selectedColor.toLowerCase() &&
        (selectedStorage === undefined || v.storage === selectedStorage)
    );
    if (match) return match;

    // 3. Match: color + ram
    match = product.variants.find(
      (v) =>
        v.color?.trim().toLowerCase() === selectedColor.toLowerCase() &&
        (selectedRam === undefined || v.ram === selectedRam)
    );
    if (match) return match;

    // 4. Any variant with selectedColor
    match = product.variants.find(
      (v) => v.color?.trim().toLowerCase() === selectedColor.toLowerCase()
    );
    if (match) return match;

    // 5. Fallback to first variant
    return (
      product.variants[0] || {
        color: "Standard",
        mrp: 0,
        price: 0,
        inStock: true,
      }
    );
  }, [product.variants, selectedColor, selectedStorage, selectedRam]);

  // Flipkart-style handlers for Color, RAM, and Storage
  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);

    // If current storage or ram is not in this new color, choose available ones
    const match = product.variants.find(
      (v) =>
        v.color?.trim().toLowerCase() === colorName.toLowerCase() &&
        (selectedStorage === undefined || v.storage === selectedStorage) &&
        (selectedRam === undefined || v.ram === selectedRam)
    );
    if (!match) {
      const fallback = product.variants.find(
        (v) => v.color?.trim().toLowerCase() === colorName.toLowerCase()
      );
      if (fallback) {
        if (fallback.storage) setSelectedStorage(fallback.storage);
        if (fallback.ram) setSelectedRam(fallback.ram);
      }
    }

    // Auto-switch image to match color
    const matchingImgIdx = product.images.findIndex(
      (img) => img.color?.trim().toLowerCase() === colorName.toLowerCase()
    );
    if (matchingImgIdx !== -1) {
      setActiveImageIndex(matchingImgIdx);
    }
  };

  const handleRamSelect = (ramVal: number) => {
    setSelectedRam(ramVal);

    // Check if current color has this RAM
    const matchInColor = product.variants.find(
      (v) =>
        v.color?.trim().toLowerCase() === selectedColor.toLowerCase() &&
        v.ram === ramVal &&
        (selectedStorage === undefined || v.storage === selectedStorage)
    );

    if (!matchInColor) {
      // Find another storage in this color with this RAM
      const altStorage = product.variants.find(
        (v) =>
          v.color?.trim().toLowerCase() === selectedColor.toLowerCase() &&
          v.ram === ramVal
      );
      if (altStorage && altStorage.storage) {
        setSelectedStorage(altStorage.storage);
      } else {
        // Switch to a color that has this RAM
        const variantWithRam = product.variants.find((v) => v.ram === ramVal);
        if (variantWithRam) {
          if (variantWithRam.color) setSelectedColor(variantWithRam.color);
          if (variantWithRam.storage) setSelectedStorage(variantWithRam.storage);
          const imgIdx = product.images.findIndex(
            (img) =>
              img.color?.trim().toLowerCase() ===
              variantWithRam.color?.trim().toLowerCase()
          );
          if (imgIdx !== -1) setActiveImageIndex(imgIdx);
        }
      }
    }
  };

  const handleStorageSelect = (storageVal: number) => {
    setSelectedStorage(storageVal);

    // Check if current color has this storage
    const matchInColor = product.variants.find(
      (v) =>
        v.color?.trim().toLowerCase() === selectedColor.toLowerCase() &&
        v.storage === storageVal &&
        (selectedRam === undefined || v.ram === selectedRam)
    );

    if (!matchInColor) {
      // Find another RAM in this color with this storage
      const altRam = product.variants.find(
        (v) =>
          v.color?.trim().toLowerCase() === selectedColor.toLowerCase() &&
          v.storage === storageVal
      );
      if (altRam && altRam.ram) {
        setSelectedRam(altRam.ram);
      } else {
        // Switch to a color that has this storage
        const variantWithStorage = product.variants.find(
          (v) => v.storage === storageVal
        );
        if (variantWithStorage) {
          if (variantWithStorage.color) setSelectedColor(variantWithStorage.color);
          if (variantWithStorage.ram) setSelectedRam(variantWithStorage.ram);
          const imgIdx = product.images.findIndex(
            (img) =>
              img.color?.trim().toLowerCase() ===
              variantWithStorage.color?.trim().toLowerCase()
          );
          if (imgIdx !== -1) setActiveImageIndex(imgIdx);
        }
      }
    }
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Image
      setActiveImageIndex((prev) => (prev + 1) % product.images.length);
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev Image
      setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const { items: compareItems, addItem: addCompare, removeItem: removeCompare } =
    useCompareStore();
  const { isInWishlist, toggleItem: toggleWishlist } = useWishlistStore();

  const inCompare = compareItems.some((p) => p.id === product.id);
  const inWish = isInWishlist(product.id);

  const emiPerMonth =
    product.minEmiPerMonth || Math.round(activeVariant.mrp / 12);

  const currentUrl = `${siteConfig.url}/phones/${product.slug}`;
  const whatsappUrl = getProductWhatsAppUrl(product, activeVariant, currentUrl);
  const activeImage = product.images[activeImageIndex] || product.images[0];

  // Dynamic real-spec story cards tailored to this specific phone
  const dynamicStoryCards = [
    {
      title: "Processor & Speed",
      subtitle: product.specs.performance?.["Processor"] || product.specs.performance?.["Chipset"] || "Octa-Core 5G",
      desc: product.specs.performance?.["AI Capabilities"] || "Ultra-fast response with hardware-accelerated processing and smooth 120 FPS performance.",
      icon: Cpu,
      badge: "PERFORMANCE",
    },
    {
      title: "Pro-Grade Camera",
      subtitle: product.specs.camera?.["Primary Camera Setup"] || product.specs.camera?.["Main"] || "AI Ultra Camera",
      desc: product.specs.camera?.["Camera Features"] || "ProVisual processing with true-to-life color, nightography, and optical stabilization.",
      icon: Camera,
      badge: "STUDIO CAMERA",
    },
    {
      title: "AMOLED Display",
      subtitle: `${product.specs.display?.["Display Size"] || "6.2 inch"} • ${product.specs.display?.["Refresh Rate"] || "120Hz"}`,
      desc: `${product.specs.display?.["Resolution Type"] || "Dynamic AMOLED"} with ${product.specs.display?.["Peak Brightness"] || "outdoor brightness"} and Gorilla Glass protection.`,
      icon: Layers,
      badge: "DISPLAY",
    },
    {
      title: "Battery & Power",
      subtitle: `${product.specs.battery?.["Battery Capacity"] || "5000 mAh"} • ${product.specs.battery?.["Charging"] || "Fast Charging"}`,
      desc: product.specs.battery?.["Wireless Charging"] || "Long-lasting intelligent battery management to power through work, reels, and gaming all day.",
      icon: Battery,
      badge: "ALL-DAY BATTERY",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6 space-y-6 sm:space-y-10 w-full max-w-full overflow-hidden">
      {/* 1. Flipkart Style Breadcrumb Bar */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 overflow-x-auto no-scrollbar py-0.5 max-w-full">
        <Link href="/" className="hover:text-zinc-950 dark:hover:text-white shrink-0">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
        <Link href="/phones" className="hover:text-zinc-950 dark:hover:text-white shrink-0">
          Phones
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
        <Link href={`/phones/brand/${product.brand}`} className="hover:text-zinc-950 dark:hover:text-white shrink-0">
          {product.brand}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
        <span className="text-zinc-900 dark:text-zinc-200 font-bold truncate max-w-[150px] sm:max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main Top Grid: Gallery + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
        {/* Left Gallery Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-20 w-full">
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full items-start">
            {/* Main Image Stage with Swipe Gestures (order-1 on mobile = top, order-2 on desktop = right) */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="order-1 sm:order-2 relative w-full h-[320px] xs:h-[380px] sm:h-[420px] md:h-[460px] sm:flex-1 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-900/90 dark:via-[#141724] dark:to-black/90 border border-zinc-200 dark:border-white/10 p-3 sm:p-4 flex items-center justify-center overflow-hidden shadow-inner select-none touch-pan-y shrink-0"
            >
              {/* Wishlist & Compare Quick Floating Buttons */}
              <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs transition border bg-white/90 dark:bg-black/75 border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white shadow-xs"
                  title="Zoom In"
                  aria-label="Zoom Photo"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (inCompare) removeCompare(product.id);
                    else addCompare(product);
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs transition border ${
                    inCompare
                      ? "bg-[#ff5a1f] border-[#ff5a1f] text-white"
                      : "bg-white/90 dark:bg-black/75 border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-zinc-300 shadow-xs"
                  }`}
                  title="Compare"
                  aria-label="Compare"
                >
                  {inCompare ? <Check className="w-3.5 h-3.5" /> : <ArrowLeftRight className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs transition border ${
                    inWish
                      ? "bg-rose-500 border-rose-500 text-white"
                      : "bg-white/90 dark:bg-black/75 border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-zinc-300 hover:text-rose-500 shadow-xs"
                  }`}
                  title="Wishlist"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${inWish ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Status Badge */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                <span className="bg-[#ff5a1f] text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                  100% SEALED PACK
                </span>
                {activeImage.color && (
                  <span className="bg-black/60 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/15">
                    {activeImage.color}
                  </span>
                )}
              </div>

              {/* The Phone Image (Clickable for zoom) */}
              <div
                onClick={() => setLightboxOpen(true)}
                className="relative w-full h-full flex items-center justify-center cursor-zoom-in"
              >
                <SafeImage
                  src={activeImage.src}
                  alt={activeImage.alt || product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-contain p-2 drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
                  priority
                />
              </div>

              {/* Previous / Next Arrow Controls */}
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md border border-zinc-200 dark:border-white/20 text-zinc-900 dark:text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md border border-zinc-200 dark:border-white/20 text-zinc-900 dark:text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Photo Count Chip */}
              <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5">
                <span className="bg-black/75 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/20 shadow-xs">
                  {activeImageIndex + 1} / {product.images.length}
                </span>
              </div>

              {/* Free Gift Strip */}
              <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 text-[9px] sm:text-[10px] pointer-events-none">
                <span className="bg-white/95 dark:bg-black/90 backdrop-blur-md text-[#3f6212] dark:text-[#c5e84a] border border-[#c5e84a]/50 font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs truncate">
                  <Gift className="w-3 h-3 text-amber-500 shrink-0" />
                  <span className="truncate">Free Gift Box</span>
                </span>
              </div>
            </div>

            {/* Thumbnail Rail (order-2 on mobile = below image, order-1 on desktop = left rail) */}
            {product.images.length > 1 && (
              <div className="order-2 sm:order-1 flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[460px] no-scrollbar shrink-0 py-1 sm:py-0 w-full sm:w-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={`${img.src}-${idx}`}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition p-1 bg-white dark:bg-zinc-900 shrink-0 ${
                      activeImageIndex === idx
                        ? "border-[#ff5a1f] shadow-md ring-2 ring-[#ff5a1f]/20 scale-102"
                        : "border-zinc-200 dark:border-white/10 hover:border-zinc-400 opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`View photo ${idx + 1} (${img.color || product.name})`}
                  >
                    <SafeImage
                      src={img.src}
                      alt={img.alt || product.name}
                      fill
                      sizes="64px"
                      className="object-contain p-0.5"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Dot Navigation Indicator */}
          {product.images.length > 1 && (
            <div className="flex sm:hidden items-center justify-center gap-1.5 pt-0.5">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    activeImageIndex === idx
                      ? "w-6 bg-[#ff5a1f]"
                      : "w-1.5 bg-zinc-300 dark:bg-zinc-700"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Details Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          {/* Title & Brand */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black text-[#ff5a1f] uppercase tracking-wider">
                {product.brand} OFFICIAL
              </span>
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">{product.warranty}</span>
            </div>

            <h1 className="font-display font-black text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-zinc-950 dark:text-white leading-tight">
              {product.name} ({activeVariant.color}, {activeVariant.ram ? `${activeVariant.ram} GB RAM / ` : ""}{activeVariant.storage ? (activeVariant.storage >= 1000 ? `${activeVariant.storage / 1000} TB` : `${activeVariant.storage} GB`) : "Standard"})
            </h1>

            {product.subtitle && (
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                {product.subtitle}
              </p>
            )}

            {/* Rating & Verified Badge */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs">
              <div className="inline-flex items-center gap-1 bg-emerald-600 text-white font-black px-1.5 py-0.2 rounded text-[11px] shadow-xs">
                <span>4.8</span>
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">Customer Favorite</span>
              <span className="bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 font-black px-1.5 py-0.2 rounded-full text-[10px]">
                ✓ Kakod Verified
              </span>
            </div>
          </div>

          {/* Pricing & High-Converting WhatsApp Deal Card */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-[#161a26] border-2 border-zinc-200 dark:border-white/15 space-y-3 shadow-xs">
            <div>
              <p className="text-[10px] sm:text-[11px] font-black text-[#65a30d] dark:text-[#c5e84a] uppercase tracking-wider">
                🔥 SPECIAL OFFLINE STORE DEAL
              </p>
              <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Official MRP:</span>
                <span className="font-display font-black text-xl xs:text-2xl sm:text-3xl text-zinc-950 dark:text-zinc-100">
                  {formatPrice(activeVariant.mrp)}
                </span>
                <span className="text-[10px] xs:text-xs text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/15 px-1.5 py-0.5 rounded">
                  Counter Deal Beats Online
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#ff5a1f] to-rose-600 hover:opacity-95 text-white font-black text-xs sm:text-sm py-2.5 sm:py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition transform active:scale-98"
              >
                <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                <span>Unlock Today’s Deal on WhatsApp</span>
              </a>

              <a
                href={siteConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#c5e84a] hover:bg-lime-400 text-black font-black text-xs sm:text-sm py-2.5 sm:py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition transform active:scale-98"
              >
                <MapPin className="w-4 h-4 text-black shrink-0" />
                <span>Visit Kakod Showroom</span>
              </a>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 text-zinc-600 dark:text-zinc-300">
              <span className="text-[11px] sm:text-xs">
                💳 <strong>0% No Cost EMI:</strong> Instant 5-min approval on Aadhaar & PAN
              </span>
              <span className="text-[#3f6212] dark:text-[#c5e84a] font-black bg-[#c5e84a]/20 px-2 py-0.5 rounded text-[10px] border border-[#c5e84a]/30 self-start sm:self-auto">
                Starts ~{formatPrice(emiPerMonth)}/mo*
              </span>
            </div>
          </div>

          {/* Flipkart-Style Common Color, RAM, and Storage Variant Selector */}
          <div className="space-y-3 pt-0.5">
            {/* 1. Color Selector (Shows unique colors with active highlight) */}
            {uniqueColors.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide text-[11px]">
                    Color:
                  </span>
                  <span className="font-black text-zinc-900 dark:text-white text-xs">
                    {activeVariant.color}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {uniqueColors.map((c) => {
                    const isSelected =
                      activeVariant.color?.trim().toLowerCase() === c.color.toLowerCase();
                    return (
                      <button
                        key={c.color}
                        type="button"
                        onClick={() => handleColorSelect(c.color)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border active:scale-95 cursor-pointer ${
                          isSelected
                            ? "border-[#ff5a1f] bg-[#ff5a1f]/10 dark:bg-[#ff5a1f]/20 text-[#ff5a1f] dark:text-white font-black shadow-xs ring-2 ring-[#ff5a1f]/30"
                            : "border-zinc-200 dark:border-white/15 bg-white dark:bg-[#161a26] text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5"
                        }`}
                      >
                        {c.hex ? (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/20 shadow-inner shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                        ) : (
                          <span className="w-3 h-3 rounded-full bg-zinc-400 shrink-0" />
                        )}
                        <span>{c.color}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Common RAM Selector (Shown if multiple RAM options exist) */}
            {uniqueRams.length > 1 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide text-[11px]">
                    RAM:
                  </span>
                  <span className="font-black text-zinc-900 dark:text-white text-xs">
                    {activeVariant.ram ? `${activeVariant.ram} GB` : "Standard"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {uniqueRams.map((r) => {
                    const isSelected = activeVariant.ram === r;
                    const isAvailableInColor = product.variants.some(
                      (v) =>
                        v.color?.trim().toLowerCase() ===
                          activeVariant.color?.trim().toLowerCase() && v.ram === r
                    );

                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleRamSelect(r)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border active:scale-95 cursor-pointer ${
                          isSelected
                            ? "bg-zinc-950 text-white dark:bg-white dark:text-black border-zinc-950 dark:border-white shadow-xs font-black ring-2 ring-zinc-900/20 dark:ring-white/30"
                            : isAvailableInColor
                            ? "bg-white dark:bg-[#161a26] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/15 hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5"
                            : "bg-zinc-50 dark:bg-zinc-900/40 text-zinc-400 dark:text-zinc-500 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-400"
                        }`}
                      >
                        <span>{r} GB</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Common Storage Selector (Shown if multiple storage options exist) */}
            {uniqueStorages.length > 1 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide text-[11px]">
                    Storage:
                  </span>
                  <span className="font-black text-zinc-900 dark:text-white text-xs">
                    {activeVariant.storage
                      ? activeVariant.storage >= 1000
                        ? `${activeVariant.storage / 1000} TB`
                        : `${activeVariant.storage} GB`
                      : "Standard"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {uniqueStorages.map((s) => {
                    const isSelected = activeVariant.storage === s;
                    const isAvailableInColor = product.variants.some(
                      (v) =>
                        v.color?.trim().toLowerCase() ===
                          activeVariant.color?.trim().toLowerCase() && v.storage === s
                    );
                    const label = s >= 1000 ? `${s / 1000} TB` : `${s} GB`;

                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleStorageSelect(s)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border active:scale-95 cursor-pointer ${
                          isSelected
                            ? "bg-zinc-950 text-white dark:bg-white dark:text-black border-zinc-950 dark:border-white shadow-xs font-black ring-2 ring-zinc-900/20 dark:ring-white/30"
                            : isAvailableInColor
                            ? "bg-white dark:bg-[#161a26] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/15 hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5"
                            : "bg-zinc-50 dark:bg-zinc-900/40 text-zinc-400 dark:text-zinc-500 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-400"
                        }`}
                      >
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Single fixed configuration indicator if only 1 RAM & Storage exists */}
            {uniqueRams.length <= 1 && uniqueStorages.length <= 1 && (
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                  Configuration:
                </span>
                <span className="text-xs font-black bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-2 py-0.5 rounded-lg border border-zinc-200 dark:border-white/10">
                  {activeVariant.ram ? `${activeVariant.ram}GB RAM + ` : ""}
                  {activeVariant.storage
                    ? activeVariant.storage >= 1000
                      ? `${activeVariant.storage / 1000}TB Storage`
                      : `${activeVariant.storage}GB Storage`
                    : "Standard"}
                </span>
              </div>
            )}
          </div>

          {/* Key Highlights */}
          <div className="space-y-1.5 pt-0.5">
            <h4 className="text-xs font-black text-zinc-950 dark:text-white uppercase tracking-wider">
              ⚡ Key Highlights:
            </h4>
            <div className="bg-zinc-50 dark:bg-[#161a26] rounded-2xl p-3 border border-zinc-200 dark:border-white/15 space-y-1.5">
              {(product.highlights || []).map((h: any, i) => {
                const text = typeof h === "string" ? h : h?.highlight || "";
                if (!text) return null;
                return (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-200">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#c5e84a] shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </div>
                );
              })}
              <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-200">
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#c5e84a] shrink-0 mt-0.5" />
                <span>{product.warranty} with In-Store Claim Support at Kakod Showroom</span>
              </div>
            </div>
          </div>

          {/* In-Store Assurances Strip */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#ff5a1f] shrink-0" />
              <span className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">Free Gift Box</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600 dark:text-lime-400 shrink-0" />
              <span className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">₹0 Down EMI</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Real Feature Story Cards (Dynamic from real specs) */}
      <section className="space-y-3 pt-4 border-t border-zinc-200 dark:border-white/15">
        <div className="space-y-0.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#ff5a1f]">
            SPEC HIGHLIGHTS
          </span>
          <h2 className="font-display font-black text-lg sm:text-2xl text-zinc-950 dark:text-white">
            Performance & Features: {product.name}
          </h2>
        </div>

        {/* 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {dynamicStoryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bento-card p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/15 space-y-2 shadow-xs hover:border-[#ff5a1f]/50 transition flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/15 flex items-center justify-center text-[#ff5a1f] dark:text-[#c5e84a]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] xs:text-[9px] font-black uppercase text-[#ff5a1f] bg-orange-50 dark:bg-black/40 px-1.5 py-0.2 rounded border border-orange-200 dark:border-white/10 truncate max-w-[100px]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xs sm:text-sm text-zinc-950 dark:text-white line-clamp-1">
                    {card.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#ff5a1f] dark:text-[#c5e84a] font-bold line-clamp-1">
                    {card.subtitle}
                  </p>
                </div>

                <p className="text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal line-clamp-3">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Specifications Sheet (Mobile-First Key-Value Rows) */}
      <section className="bento-card p-3.5 sm:p-6 rounded-2xl bg-white dark:bg-[#161a26] border border-zinc-200 dark:border-white/15 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-zinc-200 dark:border-white/15">
          <div>
            <h3 className="font-display font-black text-base sm:text-xl text-zinc-950 dark:text-white">
              Full Technical Specifications
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
              Official manufacturer hardware specifications.
            </p>
          </div>
          <span className="text-[10px] sm:text-xs font-black text-emerald-800 dark:text-[#c5e84a] bg-emerald-50 dark:bg-black/50 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-white/10 w-fit">
            ✓ Genuine Sealed Stock
          </span>
        </div>

        {/* Grouped Spec Cards (Clean mobile-responsive key-values) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {Object.entries(product.specs).map(([sectionKey, sectionObj]) => {
            const sectionTitles: Record<string, string> = {
              display: "Display Features",
              performance: "OS & Processor Features",
              camera: "Camera Features",
              battery: "Battery & Power Features",
              connectivity: "Connectivity Features",
              design: "Dimensions & Build Details",
            };

            return (
              <div key={sectionKey} className="space-y-1.5">
                <h4 className="font-display font-black text-xs text-[#ff5a1f] uppercase tracking-wider">
                  {sectionTitles[sectionKey] || sectionKey}
                </h4>
                <div className="rounded-xl border border-zinc-200 dark:border-white/15 overflow-hidden bg-zinc-50 dark:bg-black/30 divide-y divide-zinc-200 dark:divide-white/10">
                  {Object.entries(sectionObj).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-4 hover:bg-zinc-100 dark:hover:bg-white/5 transition"
                    >
                      <span className="font-bold text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 shrink-0 sm:w-2/5">
                        {key}
                      </span>
                      <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 break-words sm:w-3/5 sm:text-right">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* In The Box & Warranty Summary */}
        <div className="space-y-1.5 pt-2">
          <h4 className="font-display font-black text-xs text-[#ff5a1f] uppercase tracking-wider">
            In The Box & Warranty Summary
          </h4>
          <div className="rounded-xl border border-zinc-200 dark:border-white/15 overflow-hidden bg-zinc-50 dark:bg-black/30 divide-y divide-zinc-200 dark:divide-white/10">
            <div className="p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-4">
              <span className="font-bold text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 sm:w-2/5">
                In The Box
              </span>
              <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 sm:w-3/5 sm:text-right">
                {(product.boxContents || [])
                  .map((b: any) => (typeof b === "string" ? b : b?.item || ""))
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
            <div className="p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-4">
              <span className="font-bold text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 sm:w-2/5">
                Warranty
              </span>
              <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 sm:w-3/5 sm:text-right">
                {product.warranty} Brand Warranty across Authorized Service Centers
              </span>
            </div>
            <div className="p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 sm:gap-4">
              <span className="font-bold text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 sm:w-2/5">
                Store Assistance
              </span>
              <span className="font-bold text-xs text-emerald-800 dark:text-[#c5e84a] sm:w-3/5 sm:text-right">
                The Mobile Lounge, Main Market, Kakod (by Vishal Distributors)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Inline EMI Calculator */}
      <section className="space-y-3">
        <EMICalculator
          initialPrice={activeVariant.mrp}
          productName={`${product.name} (${activeVariant.color})`}
        />
      </section>

      {/* 6. Similar Phones in Stock */}
      {similarProducts.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-display font-black text-base sm:text-xl text-zinc-950 dark:text-white">
            📱 Similar {product.brand} Smartphones in Kakod
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Mobile Sticky Floating Bottom CTA Bar (Only visible on mobile screens) */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-white/95 dark:bg-[#121624]/95 backdrop-blur-xl border-t border-zinc-200 dark:border-white/15 px-3 py-2 shadow-2xl flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase truncate">
            {product.name}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-black text-sm text-zinc-950 dark:text-white">
              {formatPrice(activeVariant.mrp)}
            </span>
            <span className="text-[9px] font-bold text-emerald-700 dark:text-lime-400">
              0% EMI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/15 text-zinc-800 dark:text-white"
            title="Call Store"
            aria-label="Call Store"
          >
            <Phone className="w-4 h-4 text-emerald-600 dark:text-lime-400" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs py-2 px-3 rounded-xl flex items-center gap-1 shadow-sm transition active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Unlock Deal</span>
          </a>
        </div>
      </div>

      {/* 8. Fullscreen High-Resolution Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-5 select-none animate-in fade-in duration-200"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/10 shrink-0">
            <div>
              <p className="font-black text-sm sm:text-base">{product.name}</p>
              <p className="text-[11px] text-zinc-400">
                Photo {activeImageIndex + 1} of {product.images.length} • {activeImage.color || "Official Gallery"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              aria-label="Close fullscreen photos"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Stage in Lightbox */}
          <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden my-3">
            <div className="relative w-full h-full max-w-2xl max-h-[75vh]">
              <SafeImage
                src={activeImage.src}
                alt={activeImage.alt || product.name}
                fill
                sizes="100vw"
                className="object-contain p-2"
                priority
              />
            </div>

            {/* Lightbox Chevron Navigation */}
            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Bar in Lightbox: Thumbnails & WhatsApp Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10 shrink-0 max-w-2xl mx-auto w-full">
            {/* Horizontal Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {product.images.map((img, idx) => (
                <button
                  key={`${img.src}-lb-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition p-0.5 bg-zinc-900 shrink-0 ${
                    activeImageIndex === idx ? "border-[#ff5a1f] scale-105" : "border-white/20 opacity-60"
                  }`}
                >
                  <SafeImage
                    src={img.src}
                    alt={img.alt || product.name}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Direct WhatsApp Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition shadow"
            >
              <MessageSquare className="w-4 h-4 fill-current shrink-0" />
              <span>Unlock Deal on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
