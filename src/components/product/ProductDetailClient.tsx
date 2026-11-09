"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductVariant, SpecSection } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import { useCompareStore } from "@/store/compare";
import { useWishlistStore } from "@/store/wishlist";
import { EMICalculator } from "@/components/emi/EMICalculator";
import { ProductCard } from "@/components/product/ProductCard";
import { siteConfig } from "@/config/site";
import {
  MessageSquare,
  Phone,
  ArrowLeftRight,
  Heart,
  Share2,
  ShieldCheck,
  Gift,
  Check,
  Star,
  Tag,
  CreditCard,
  Truck,
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight,
  MapPin,
  Flame,
  Cpu,
  Camera,
  Battery,
  Layers,
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
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const activeVariant: ProductVariant =
    product.variants[selectedVariantIndex] || product.variants[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const { items: compareItems, addItem: addCompare, removeItem: removeCompare } =
    useCompareStore();
  const { isInWishlist, toggleItem: toggleWishlist } = useWishlistStore();

  const inCompare = compareItems.some((p) => p.id === product.id);
  const inWish = isInWishlist(product.id);

  const emiPerMonth =
    product.minEmiPerMonth || Math.round(activeVariant.mrp / 12);

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({
        title: `${product.name} at The Mobile Lounge Kakod`,
        text: `Check out ${product.name} (MRP ${formatPrice(
          activeVariant.mrp
        )}) with ₹0 downpayment EMI and free gifts!`,
        url: window.location.href,
      });
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const currentUrl = `${siteConfig.url}/phones/${product.slug}`;
  const whatsappUrl = getProductWhatsAppUrl(product, activeVariant, currentUrl);
  const activeImage = product.images[activeImageIndex] || product.images[0];

  // Flipkart style visual story description cards
  const productStoryCards = [
    {
      title: "Next-Gen 3nm Flagship Architecture",
      subtitle: "Unstoppable Speed & Galaxy AI",
      desc: `Engineered with bleeding-edge silicon and hardware-accelerated ray tracing, ${product.name} delivers ultra-smooth 120 FPS gaming and generative AI intelligence without breaking a sweat.`,
      icon: Cpu,
      badge: "ULTRA PERFORMANCE",
    },
    {
      title: "Pro-Visual Studio Camera Engine",
      subtitle: "50MP Detail & Nightography Video",
      desc: "Capture studio-grade portraits with optical depth mapping, 3x telephoto zoom, and AI noise reduction that illuminates your night shots with true-to-life colors.",
      icon: Camera,
      badge: "STUDIO CAMERA",
    },
    {
      title: "Dynamic AMOLED 2X 120Hz Display",
      subtitle: "Vision Booster & 2600 Nits Brightness",
      desc: "Enjoy fluid 1-120Hz adaptive refresh rate and crystal-clear visibility even under bright Kakod summer sunlight, shielded by ultra-durable Corning Gorilla Glass Victus 2.",
      icon: Layers,
      badge: "CINEMATIC SCREEN",
    },
    {
      title: "All-Day Intelligent Power & Fast Charge",
      subtitle: "Smart Battery Optimization",
      desc: "Power through your entire day with intelligent background battery management, 25W super-fast wired charging, and wireless reverse charging for your smartwatch or earbuds.",
      icon: Battery,
      badge: "LONG BATTERY",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* 1. Flipkart Style Breadcrumb Bar */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 overflow-x-auto no-scrollbar py-1">
        <Link href="/" className="hover:text-zinc-950 dark:hover:text-white shrink-0">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
        <Link href="/phones" className="hover:text-zinc-950 dark:hover:text-white shrink-0">
          Mobiles
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
        <Link href={`/phones/brand/${product.brand}`} className="hover:text-zinc-950 dark:hover:text-white shrink-0">
          {product.brand} Mobiles
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 dark:text-zinc-600" />
        <span className="text-zinc-900 dark:text-zinc-200 font-bold truncate">{product.name}</span>
      </nav>

      {/* 2. Main Top Grid: Flipkart Left Gallery (Vertical Rail) + Right Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Gallery Column (5 Cols) with Flipkart Vertical Thumbnails Rail */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="flex flex-col-reverse sm:flex-row gap-3">
            {/* Vertical Thumbnail Rail (Flipkart Style) */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto max-h-[460px] no-scrollbar shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={`${img.src}-${idx}`}
                    onClick={() => setActiveImageIndex(idx)}
                    onMouseEnter={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-16 sm:h-20 rounded-xl bg-white dark:bg-[#161a26] border-2 overflow-hidden shrink-0 transition duration-200 ${
                      activeImageIndex === idx
                        ? "border-[#ff5a1f] shadow-[0_0_12px_rgba(255,90,31,0.5)]"
                        : "border-zinc-200 dark:border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt || `Angle ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Big Main Stage Preview (Flipkart Style) */}
            <div className="relative flex-1 h-[380px] sm:h-[460px] rounded-3xl bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-[#161a26] dark:via-black dark:to-[#0d0f17] border-2 border-zinc-200 dark:border-white/15 p-6 flex items-center justify-center overflow-hidden shadow-lg dark:shadow-2xl">
              {/* Top Tags */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                <span className="bg-[#ff5a1f] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                  👑 100% BRAND GENUINE
                </span>
                <span className="bg-[#c5e84a] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                  ⚡ READY IN KAKOD
                </span>
              </div>

              {/* Action Floating Buttons */}
              <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
                <button
                  onClick={() => {
                    if (inCompare) removeCompare(product.id);
                    else addCompare(product);
                  }}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition border ${
                    inCompare
                      ? "bg-[#ff5a1f] border-[#ff5a1f] text-white"
                      : "bg-white/90 dark:bg-black/75 border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white shadow-sm"
                  }`}
                  title="Compare"
                >
                  {inCompare ? <Check className="w-4 h-4" /> : <ArrowLeftRight className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition border ${
                    inWish
                      ? "bg-rose-500 border-rose-500 text-white"
                      : "bg-white/90 dark:bg-black/75 border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-zinc-300 hover:text-rose-500 shadow-sm"
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWish ? "fill-current" : ""}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="w-8 h-8 rounded-xl bg-white/90 dark:bg-black/75 border border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center justify-center transition shadow-sm"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Main Image with Zoom Lift */}
              <div className="relative w-full h-full transform hover:scale-105 transition duration-500">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt || product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
                  priority
                />
              </div>

              {/* Bottom In-Store Tag */}
              <div className="absolute bottom-3 inset-x-3 bg-white/90 dark:bg-black/85 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-2xl p-2.5 flex items-center justify-between text-xs shadow-sm">
                <span className="text-[#3f6212] dark:text-[#c5e84a] font-black flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#c5e84a] animate-ping" />
                  <span>Sealed Pack Unboxing Counter</span>
                </span>
                <span className="text-zinc-600 dark:text-zinc-400 font-semibold">Official GST Bill</span>
              </div>
            </div>
          </div>

          {/* Flipkart Style Dual Bottom Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#ff5a1f] to-orange-600 hover:opacity-95 text-white font-black text-xs sm:text-sm py-3.5 px-3 rounded-2xl flex items-center justify-center gap-1.5 shadow-xl transition transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>UNLOCK DEAL PRICE</span>
            </a>

            <a
              href={siteConfig.location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c5e84a] hover:bg-lime-400 text-black font-black text-xs sm:text-sm py-3.5 px-3 rounded-2xl flex items-center justify-center gap-1.5 shadow-xl transition transform active:scale-95"
            >
              <MapPin className="w-4 h-4 text-black" />
              <span>VISIT SHOWROOM</span>
            </a>
          </div>
        </div>

        {/* Right Details Column (7 Cols) - Flipkart Product Description Flow */}
        <div className="lg:col-span-7 space-y-6">
          {/* Title & Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#ff5a1f] uppercase tracking-wider">
                {product.brand} OFFICIAL
              </span>
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{product.warranty}</span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-zinc-950 dark:text-white leading-tight">
              {product.name} ({activeVariant.color}, {activeVariant.storage ? `${activeVariant.storage} GB` : "Standard"})
            </h1>

            {product.subtitle && (
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                {product.subtitle}
              </p>
            )}

            {/* Flipkart Rating Pill */}
            <div className="flex items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-1 bg-emerald-600 text-white font-black text-xs px-2.5 py-0.5 rounded-md shadow">
                <span>4.6</span>
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                21,523 Ratings & 2,077 Reviews
              </span>
              <span className="text-xs bg-sky-50 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 font-black px-2 py-0.5 rounded-full">
                ✓ The Mobile Lounge Assured
              </span>
            </div>
          </div>

          {/* Flipkart Price Block & Special Price */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#161a26] border-2 border-zinc-200 dark:border-white/15 space-y-3.5 shadow-lg dark:shadow-xl">
            <div>
              <p className="text-[11px] font-black text-[#65a30d] dark:text-[#c5e84a] uppercase tracking-wider">
                🔥 SPECIAL OFFLINE STORE DEAL
              </p>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Official Brand MRP:</span>
                <span className="font-display font-black text-2xl sm:text-3xl text-zinc-950 dark:text-zinc-100 line-through">
                  {formatPrice(activeVariant.mrp)}
                </span>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/15 px-2 py-0.5 rounded">
                  Guaranteed Store Discount on Counter
                </span>
              </div>
            </div>

            {/* High-Converting CTA to unlock price */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-[#ff5a1f] via-rose-600 to-[#cc0074] hover:opacity-95 text-white font-black text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition transform active:scale-98"
            >
              <span>🔥 Unlock Today’s Deal Price & Gift Hamper</span>
              <span className="text-xs bg-black/30 px-2 py-0.5 rounded font-mono">WhatsApp ↗</span>
            </a>

            <div className="pt-2 border-t border-zinc-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 text-zinc-600 dark:text-zinc-300">
              <span>
                💳 <strong>0% No Cost EMI:</strong> Instant approval on Aadhaar & PAN card
              </span>
              <span className="text-[#3f6212] dark:text-[#c5e84a] font-black bg-[#c5e84a]/20 px-2.5 py-1 rounded-xl border border-[#c5e84a]/30 self-start sm:self-auto">
                Starts from ~{formatPrice(emiPerMonth)}/month*
              </span>
            </div>
          </div>

          {/* Flipkart Style "Available Offers" Section */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-zinc-950 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#ff5a1f]" />
              <span>Available Bank & In-Store Offers:</span>
            </h4>

            <div className="space-y-2 text-xs text-zinc-800 dark:text-zinc-200">
              <div className="flex items-start gap-2 bg-zinc-50 dark:bg-white/5 p-2.5 rounded-xl border border-zinc-200 dark:border-white/10">
                <span className="text-[#3f6212] dark:text-[#c5e84a] font-black">🏷️ Bank Offer:</span>
                <span>Instant discount & up to 5% Cashback on SBI, HDFC, ICICI, and Axis Bank cards.</span>
              </div>
              <div className="flex items-start gap-2 bg-zinc-50 dark:bg-white/5 p-2.5 rounded-xl border border-zinc-200 dark:border-white/10">
                <span className="text-[#ff5a1f] font-black">🎁 Free Gift Offer:</span>
                <span>Assured Smartwatch or ANC Earbuds + 9H Gorilla Tempered Glass fitted on spot.</span>
              </div>
              <div className="flex items-start gap-2 bg-zinc-50 dark:bg-white/5 p-2.5 rounded-xl border border-zinc-200 dark:border-white/10">
                <span className="text-sky-600 dark:text-sky-400 font-black">💳 No Cost EMI:</span>
                <span>₹0 Downpayment with Bajaj Finserv, IDFC First Bank, and TVS Credit.</span>
              </div>
              <div className="flex items-start gap-2 bg-zinc-50 dark:bg-white/5 p-2.5 rounded-xl border border-zinc-200 dark:border-white/10">
                <span className="text-amber-600 dark:text-amber-300 font-black">🔄 Exchange Bonus:</span>
                <span>Top spot value for your old smartphone deducted directly from bill.</span>
              </div>
            </div>
          </div>

          {/* Flipkart Style Color & Storage Selectors */}
          <div className="space-y-4 pt-2">
            {/* Color Swatches */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Color:</span>
                <span className="font-black text-zinc-900 dark:text-white">{activeVariant.color}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={`${v.color}-${idx}`}
                    onClick={() => {
                      setSelectedVariantIndex(idx);
                      const matchingImgIdx = product.images.findIndex(
                        (img) => img.color === v.color
                      );
                      if (matchingImgIdx !== -1) setActiveImageIndex(matchingImgIdx);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                      selectedVariantIndex === idx
                        ? "border-[#ff5a1f] bg-[#ff5a1f]/10 dark:bg-[#ff5a1f]/20 text-[#ff5a1f] dark:text-white font-black shadow-sm"
                        : "border-zinc-200 dark:border-white/15 bg-zinc-100 dark:bg-[#161a26] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/30"
                    }`}
                  >
                    {v.colorHex && (
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/20 shadow-inner"
                        style={{ backgroundColor: v.colorHex }}
                      />
                    )}
                    <span>{v.color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Options */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                Storage:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={`${v.storage}-${idx}`}
                    onClick={() => {
                      setSelectedVariantIndex(idx);
                      const matchingImgIdx = product.images.findIndex(
                        (img) => img.color === v.color
                      );
                      if (matchingImgIdx !== -1) setActiveImageIndex(matchingImgIdx);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                      selectedVariantIndex === idx
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-black border-zinc-950 dark:border-white shadow-md font-black"
                        : "bg-zinc-100 dark:bg-[#161a26] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/15 hover:border-zinc-300 dark:hover:border-white/30"
                    }`}
                  >
                    {v.storage
                      ? v.storage >= 1000
                        ? `${v.storage / 1000} TB`
                        : `${v.storage} GB`
                      : "Standard"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Flipkart Iconic "Highlights" Section */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-black text-zinc-950 dark:text-white uppercase tracking-wider">
              ⚡ Key Highlights:
            </h4>
            <div className="bg-zinc-50 dark:bg-[#161a26] rounded-2xl p-4 border border-zinc-200 dark:border-white/15 space-y-2">
              {product.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-200">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-[#c5e84a] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
              <div className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-200">
                <Check className="w-4 h-4 text-emerald-600 dark:text-[#c5e84a] shrink-0 mt-0.5" />
                <span>{product.warranty}</span>
              </div>
            </div>
          </div>

          {/* Easy Payment Options */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-between text-xs">
            <span className="text-zinc-700 dark:text-zinc-300 font-bold flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#ff5a1f] dark:text-[#c5e84a]" />
              <span>Easy Payment Options: 0% EMI, UPI, Cash on Delivery/Counter</span>
            </span>
            <Link href="/emi" className="text-[#ff5a1f] dark:text-[#c5e84a] font-black hover:underline shrink-0">
              Calculate EMI →
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Flipkart "Product Description" Visual Story Cards */}
      <section className="space-y-6 pt-6 border-t border-zinc-200 dark:border-white/15">
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-[#ff5a1f]">
            OFFICIAL FEATURE INFOGRAPHICS
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-zinc-950 dark:text-white">
            Product Description: {product.name}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
            Explore deep performance benchmarks, camera innovations, and display technology as presented on Flipkart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productStoryCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bento-card p-6 rounded-3xl bg-white dark:bg-[#161a26] border-2 border-zinc-200 dark:border-white/15 space-y-3 shadow-lg dark:shadow-xl hover:border-[#ff5a1f]/50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/15 flex items-center justify-center text-[#ff5a1f] dark:text-[#c5e84a]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase text-[#ff5a1f] bg-orange-50 dark:bg-black/40 px-3 py-1 rounded-full border border-orange-200 dark:border-white/10">
                    {card.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-black text-lg text-zinc-950 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#ff5a1f] dark:text-[#c5e84a] font-bold">
                    {card.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Flipkart Grouped Full "Specifications" Sheet */}
      <section className="bento-card p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#161a26] border-2 border-zinc-200 dark:border-white/15 space-y-6 shadow-xl dark:shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-white/15">
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-zinc-950 dark:text-white">
              Specifications
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Detailed technical hardware specifications per official manufacturer documentation.
            </p>
          </div>
          <span className="text-xs font-black text-emerald-800 dark:text-[#c5e84a] bg-emerald-50 dark:bg-black/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-white/10 w-fit">
            ✓ Flipkart Verified Specs
          </span>
        </div>

        {/* Grouped Spec Tables */}
        <div className="space-y-6">
          {Object.entries(product.specs).map(([sectionKey, sectionObj]) => {
            const sectionTitles: Record<string, string> = {
              display: "Display Features",
              performance: "Os & Processor Features",
              camera: "Camera Features",
              battery: "Battery & Power Features",
              connectivity: "Connectivity Features",
              design: "Dimensions & Build Details",
            };

            return (
              <div key={sectionKey} className="space-y-2">
                <h4 className="font-display font-black text-sm text-[#ff5a1f] uppercase tracking-wider">
                  {sectionTitles[sectionKey] || sectionKey}
                </h4>
                <div className="rounded-2xl border border-zinc-200 dark:border-white/15 overflow-hidden bg-zinc-50 dark:bg-black/40">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
                      {Object.entries(sectionObj).map(([key, val]) => (
                        <tr key={key} className="hover:bg-zinc-100 dark:hover:bg-white/5 transition">
                          <td className="p-3.5 w-1/3 font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-white/2">
                            {key}
                          </td>
                          <td className="p-3.5 text-zinc-900 dark:text-zinc-100 font-semibold">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          {/* In The Box & Warranty Summary */}
          <div className="space-y-2">
            <h4 className="font-display font-black text-sm text-[#ff5a1f] uppercase tracking-wider">
              In The Box & Warranty Summary
            </h4>
            <div className="rounded-2xl border border-zinc-200 dark:border-white/15 overflow-hidden bg-zinc-50 dark:bg-black/40">
              <table className="w-full text-xs text-left">
                <tbody className="divide-y divide-zinc-200 dark:divide-white/10">
                  <tr>
                    <td className="p-3.5 w-1/3 font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-white/2">In The Box</td>
                    <td className="p-3.5 text-zinc-900 dark:text-zinc-100 font-semibold">
                      {product.boxContents.join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 w-1/3 font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-white/2">
                      Warranty Summary
                    </td>
                    <td className="p-3.5 text-zinc-900 dark:text-zinc-100 font-semibold">{product.warranty}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 w-1/3 font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-white/2">
                      Domestic Warranty
                    </td>
                    <td className="p-3.5 text-zinc-900 dark:text-zinc-100 font-semibold">
                      1 Year Manufacturer Warranty across all Authorized Brand Service Centers
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 w-1/3 font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100/60 dark:bg-white/2">
                      Store Assistance
                    </td>
                    <td className="p-3.5 text-emerald-800 dark:text-[#c5e84a] font-bold">
                      The Mobile Lounge, Main Market, Kakod (by Vishal Distributors)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Inline EMI Calculator Pre-filled with Phone Price */}
      <section className="space-y-4">
        <EMICalculator
          initialPrice={activeVariant.mrp}
          productName={`${product.name} (${activeVariant.color})`}
        />
      </section>

      {/* 6. Recommended Accessories For This Phone */}
      {accessories.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-xl sm:text-2xl text-zinc-950 dark:text-white">
              🎧 Recommended Accessories For {product.name}
            </h3>
            <Link
              href="/accessories"
              className="text-xs font-bold text-[#ff5a1f] dark:text-[#c5e84a] hover:underline"
            >
              View All Accessories →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {accessories.slice(0, 4).map((acc) => (
              <ProductCard key={acc.id} product={acc} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Similar Phones in Stock */}
      {similarProducts.length > 0 && (
        <section className="space-y-4">
          <h3 className="font-display font-black text-xl sm:text-2xl text-zinc-950 dark:text-white">
            📱 Similar {product.brand} Smartphones in Kakod
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
