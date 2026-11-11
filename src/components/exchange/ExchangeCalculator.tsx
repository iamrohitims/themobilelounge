"use client";

import { useState, useMemo } from "react";
import { formatPrice } from "@/lib/format";
import { getExchangeWhatsAppUrl } from "@/lib/whatsapp";
import {
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  RefreshCw,
  Info,
  Gift,
  ArrowRight,
  ChevronDown,
  Check,
} from "lucide-react";

interface BrandData {
  name: string;
  models: { name: string; basePrice: number }[];
}

const BRANDS_DATA: BrandData[] = [
  {
    name: "Apple",
    models: [
      { name: "iPhone 15 Pro Max", basePrice: 62000 },
      { name: "iPhone 15 Pro", basePrice: 54000 },
      { name: "iPhone 15 Plus", basePrice: 44000 },
      { name: "iPhone 15", basePrice: 40000 },
      { name: "iPhone 14 Pro Max", basePrice: 48000 },
      { name: "iPhone 14 Pro", basePrice: 42000 },
      { name: "iPhone 14 Plus", basePrice: 34000 },
      { name: "iPhone 14", basePrice: 31000 },
      { name: "iPhone 13 Pro Max", basePrice: 36000 },
      { name: "iPhone 13 Pro", basePrice: 32000 },
      { name: "iPhone 13", basePrice: 26000 },
      { name: "iPhone 12 Pro / Max", basePrice: 23000 },
      { name: "iPhone 12", basePrice: 18000 },
      { name: "iPhone 11", basePrice: 13000 },
      { name: "Other iPhone Model", basePrice: 10000 },
    ],
  },
  {
    name: "Samsung",
    models: [
      { name: "Galaxy S24 Ultra", basePrice: 68000 },
      { name: "Galaxy S24 / S24+", basePrice: 45000 },
      { name: "Galaxy S23 Ultra", basePrice: 48000 },
      { name: "Galaxy S23 / S23 FE", basePrice: 32000 },
      { name: "Galaxy S22 Ultra", basePrice: 34000 },
      { name: "Galaxy S22 / S21 FE", basePrice: 20000 },
      { name: "Galaxy Z Fold / Flip Series", basePrice: 35000 },
      { name: "Galaxy A55 / A54 5G", basePrice: 16000 },
      { name: "Galaxy A35 / A34 5G", basePrice: 13000 },
      { name: "Galaxy M34 / M35 5G", basePrice: 9500 },
      { name: "Other Samsung Galaxy", basePrice: 7500 },
    ],
  },
  {
    name: "OnePlus",
    models: [
      { name: "OnePlus 12 / 12R", basePrice: 34000 },
      { name: "OnePlus 11 / 11R", basePrice: 25000 },
      { name: "OnePlus 10 Pro / 10T / 10R", basePrice: 18000 },
      { name: "OnePlus 9 / 9 Pro / 9RT", basePrice: 14000 },
      { name: "OnePlus Nord 4 / Nord 3", basePrice: 16000 },
      { name: "OnePlus Nord CE 3 / 4", basePrice: 11000 },
      { name: "Other OnePlus Phone", basePrice: 8500 },
    ],
  },
  {
    name: "Vivo",
    models: [
      { name: "Vivo X100 / X90 Pro", basePrice: 35000 },
      { name: "Vivo V40 / V40 Pro", basePrice: 24000 },
      { name: "Vivo V30 / V30 Pro", basePrice: 19000 },
      { name: "Vivo V29 / V27 Series", basePrice: 14000 },
      { name: "Vivo T3 / T2 Pro 5G", basePrice: 11000 },
      { name: "Vivo T3x / T2x 5G", basePrice: 7500 },
      { name: "Other Vivo Model", basePrice: 6500 },
    ],
  },
  {
    name: "iQOO",
    models: [
      { name: "iQOO 12 5G", basePrice: 32000 },
      { name: "iQOO Neo 9 Pro", basePrice: 22000 },
      { name: "iQOO Neo 7 / 7 Pro", basePrice: 15000 },
      { name: "iQOO Z9 / Z9s Pro 5G", basePrice: 13000 },
      { name: "Other iQOO Phone", basePrice: 8000 },
    ],
  },
  {
    name: "Realme",
    models: [
      { name: "Realme GT 6 / GT Neo", basePrice: 23000 },
      { name: "Realme 13 / 12 Pro+ 5G", basePrice: 15000 },
      { name: "Realme 11 / 10 Pro+ 5G", basePrice: 11000 },
      { name: "Realme Narzo 70 / 60 Pro", basePrice: 9500 },
      { name: "Other Realme Smartphone", basePrice: 6500 },
    ],
  },
  {
    name: "Oppo",
    models: [
      { name: "Oppo Find N3 / Flip", basePrice: 38000 },
      { name: "Oppo Reno 12 / 12 Pro", basePrice: 21000 },
      { name: "Oppo Reno 11 / 10 Pro", basePrice: 16000 },
      { name: "Oppo F27 / F25 Pro 5G", basePrice: 13000 },
      { name: "Other Oppo Smartphone", basePrice: 6500 },
    ],
  },
  {
    name: "Xiaomi / Redmi / Poco",
    models: [
      { name: "Xiaomi 14 / 13 Pro", basePrice: 34000 },
      { name: "Xiaomi 14 Civi", basePrice: 26000 },
      { name: "Redmi Note 13 Pro+ 5G", basePrice: 16000 },
      { name: "Redmi Note 13 / 12 Pro 5G", basePrice: 12000 },
      { name: "Redmi Note 11 / 10 Series", basePrice: 7500 },
      { name: "Poco X6 / F6 Pro 5G", basePrice: 16000 },
      { name: "Poco M6 Pro 5G", basePrice: 7500 },
      { name: "Other Xiaomi / Poco", basePrice: 6000 },
    ],
  },
  {
    name: "Google / Motorola / Other",
    models: [
      { name: "Google Pixel 8 / 8 Pro", basePrice: 34000 },
      { name: "Google Pixel 7 / 7a", basePrice: 22000 },
      { name: "Nothing Phone (2 / 2a)", basePrice: 18000 },
      { name: "Motorola Edge 50 Pro / Ultra", basePrice: 19000 },
      { name: "Motorola Moto G85 / G54 5G", basePrice: 9000 },
      { name: "Any Other 5G Smartphone", basePrice: 6500 },
      { name: "Any Other 4G Smartphone", basePrice: 3500 },
    ],
  },
];

const CONDITIONS = [
  {
    id: "flawless",
    label: "Flawless",
    desc: "Like new, zero scratches, 100% original",
    multiplier: 1.12,
  },
  {
    id: "good",
    label: "Good",
    desc: "Normal light pocket wear, fully functional",
    multiplier: 1.0,
  },
  {
    id: "average",
    label: "Average",
    desc: "Visible scuffs or minor body dents",
    multiplier: 0.78,
  },
  {
    id: "damaged",
    label: "Cracked Glass",
    desc: "Cracked screen glass, touch works",
    multiplier: 0.48,
  },
];

const AGE_OPTIONS = [
  { id: "under-1y", label: "< 1 Year (In Brand Warranty)", bonus: 1200 },
  { id: "1-2y", label: "1 – 2 Years Old", bonus: 0 },
  { id: "2-3y", label: "2 – 3 Years Old", bonus: -600 },
  { id: "3y+", label: "3+ Years Old", bonus: -1400 },
];

const STORAGE_OPTIONS = ["128 GB", "256 GB", "512 GB", "1 TB / Higher", "64 GB"];

const UPGRADE_TARGETS = [
  "Apple iPhone 16 Series",
  "Samsung Galaxy S24 Ultra",
  "OnePlus 12 / 12R",
  "Vivo V40 Pro 5G",
  "Redmi Note 13 Pro+ 5G",
  "iQOO 12 5G",
  "Any New 5G Smartphone",
];

export function ExchangeCalculator() {
  const [selectedBrand, setSelectedBrand] = useState("Apple");
  const [selectedModel, setSelectedModel] = useState("iPhone 13");
  const [customModel, setCustomModel] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("128 GB");
  const [selectedCondition, setSelectedCondition] = useState("good");
  const [selectedAge, setSelectedAge] = useState("1-2y");
  const [hasBoxAndBill, setHasBoxAndBill] = useState(true);
  const [hasCharger, setHasCharger] = useState(true);
  const [targetPhone, setTargetPhone] = useState("Apple iPhone 16 Series");

  // Get current brand model list
  const currentBrandModels = useMemo(() => {
    const brand = BRANDS_DATA.find((b) => b.name === selectedBrand);
    return brand ? brand.models : BRANDS_DATA[0].models;
  }, [selectedBrand]);

  // Handle brand switch
  const handleBrandChange = (brandName: string) => {
    setSelectedBrand(brandName);
    const brand = BRANDS_DATA.find((b) => b.name === brandName);
    if (brand && brand.models.length > 0) {
      setSelectedModel(brand.models[0].name);
    }
    setCustomModel("");
  };

  // Dynamic Valuation Heuristic
  const quote = useMemo(() => {
    const activeModel =
      currentBrandModels.find((m) => m.name === selectedModel) ||
      currentBrandModels[0];

    let base = activeModel ? activeModel.basePrice : 15000;

    // Storage modifier
    if (selectedStorage === "256 GB") base += 1200;
    else if (selectedStorage === "512 GB") base += 2500;
    else if (selectedStorage.includes("1 TB")) base += 4000;
    else if (selectedStorage === "64 GB") base -= 800;

    // Condition multiplier
    const cond = CONDITIONS.find((c) => c.id === selectedCondition);
    if (cond) base *= cond.multiplier;

    // Age modifier
    const age = AGE_OPTIONS.find((a) => a.id === selectedAge);
    if (age) base += age.bonus;

    // Accessories bonus
    const billBonus = hasBoxAndBill ? 750 : 0;
    const chargerBonus = hasCharger ? 450 : 0;
    const festiveBonus = 1500; // Kakod showroom bonus

    const calculatedDeviceVal = Math.max(1200, Math.round(base / 250) * 250);
    const totalQuote = calculatedDeviceVal + billBonus + chargerBonus + festiveBonus;

    return {
      deviceValue: calculatedDeviceVal,
      billBonus,
      chargerBonus,
      festiveBonus,
      total: totalQuote,
    };
  }, [
    currentBrandModels,
    selectedModel,
    selectedStorage,
    selectedCondition,
    selectedAge,
    hasBoxAndBill,
    hasCharger,
  ]);

  const handleWhatsAppQuote = () => {
    const modelToReport = customModel.trim() || selectedModel;
    const condLabel = CONDITIONS.find((c) => c.id === selectedCondition)?.label || "Good";

    const waUrl = getExchangeWhatsAppUrl({
      currentBrand: selectedBrand,
      currentModel: `${modelToReport} (${selectedStorage})`,
      condition: condLabel,
      targetPhone: targetPhone || "New Smartphone",
      estimatedValue: quote.total,
    });

    window.open(waUrl, "_blank");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: Clean Step-by-Step Dropdown Form (7 Cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-[#121624] border border-zinc-200/90 dark:border-white/10 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
        
        {/* Step 1: Device Selection */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-white/10">
            <span className="w-5 h-5 rounded-full bg-[#ff5a1f] text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
              1
            </span>
            <h3 className="font-display font-semibold text-sm sm:text-base text-zinc-900 dark:text-white">
              Old Device Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Brand Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Phone Brand
              </label>
              <div className="relative">
                <select
                  value={selectedBrand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-zinc-900 dark:text-white font-medium focus:outline-hidden focus:border-[#ff5a1f] appearance-none pr-8 cursor-pointer"
                >
                  {BRANDS_DATA.map((b) => (
                    <option key={b.name} value={b.name} className="dark:bg-zinc-900">
                      {b.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Model Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Phone Model
              </label>
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => {
                    setSelectedModel(e.target.value);
                    setCustomModel("");
                  }}
                  className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-zinc-900 dark:text-white font-medium focus:outline-hidden focus:border-[#ff5a1f] appearance-none pr-8 cursor-pointer"
                >
                  {currentBrandModels.map((m) => (
                    <option key={m.name} value={m.name} className="dark:bg-zinc-900">
                      {m.name}
                    </option>
                  ))}
                  <option value="Custom" className="dark:bg-zinc-900">
                    Other / Enter Manually...
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Optional Custom Model Input if user selects custom or wants specific variant */}
          {selectedModel === "Custom" && (
            <div className="pt-1">
              <input
                type="text"
                placeholder="Type your exact model name (e.g., iPhone 12 Mini / Vivo V25 Pro)..."
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-[#ff5a1f]"
              />
            </div>
          )}

          {/* Storage Capacity Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Storage Capacity
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {STORAGE_OPTIONS.map((cap) => {
                const isSelected = selectedStorage === cap;
                return (
                  <button
                    key={cap}
                    type="button"
                    onClick={() => setSelectedStorage(cap)}
                    className={`py-1.5 px-1 rounded-xl text-xs font-medium text-center border transition-all active:scale-95 ${
                      isSelected
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900 dark:border-white font-semibold"
                        : "bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300"
                    }`}
                  >
                    {cap}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step 2: Condition & Age Dropdowns */}
        <div className="space-y-3.5 pt-2">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-white/10">
            <span className="w-5 h-5 rounded-full bg-[#ff5a1f] text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
              2
            </span>
            <h3 className="font-display font-semibold text-sm sm:text-base text-zinc-900 dark:text-white">
              Device Condition & Age
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Condition Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Physical Screen & Body Condition
              </label>
              <div className="relative">
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-zinc-900 dark:text-white font-medium focus:outline-hidden focus:border-[#ff5a1f] appearance-none pr-8 cursor-pointer"
                >
                  {CONDITIONS.map((c) => (
                    <option key={c.id} value={c.id} className="dark:bg-zinc-900">
                      {c.label} — {c.desc}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Device Age Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Phone Age
              </label>
              <div className="relative">
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-zinc-900 dark:text-white font-medium focus:outline-hidden focus:border-[#ff5a1f] appearance-none pr-8 cursor-pointer"
                >
                  {AGE_OPTIONS.map((a) => (
                    <option key={a.id} value={a.id} className="dark:bg-zinc-900">
                      {a.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Available In-Store Bonus Accessories */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block">
              Accessories Available (+Cash Bonus)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 cursor-pointer text-xs transition hover:border-zinc-300">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  Original GST Bill & Box
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    +₹750
                  </span>
                  <input
                    type="checkbox"
                    checked={hasBoxAndBill}
                    onChange={(e) => setHasBoxAndBill(e.target.checked)}
                    className="w-4 h-4 accent-[#ff5a1f] rounded"
                  />
                </div>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 cursor-pointer text-xs transition hover:border-zinc-300">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  Original Working Fast Charger
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    +₹450
                  </span>
                  <input
                    type="checkbox"
                    checked={hasCharger}
                    onChange={(e) => setHasCharger(e.target.checked)}
                    className="w-4 h-4 accent-[#ff5a1f] rounded"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Step 3: Desired Upgrade Phone */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-white/10">
            <span className="w-5 h-5 rounded-full bg-[#ff5a1f] text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
              3
            </span>
            <h3 className="font-display font-semibold text-sm sm:text-base text-zinc-900 dark:text-white">
              Upgrade Destination
            </h3>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Which phone do you wish to upgrade to?
            </label>
            <div className="relative">
              <select
                value={targetPhone}
                onChange={(e) => setTargetPhone(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-zinc-900 dark:text-white font-medium focus:outline-hidden focus:border-[#ff5a1f] appearance-none pr-8 cursor-pointer"
              >
                {UPGRADE_TARGETS.map((t) => (
                  <option key={t} value={t} className="dark:bg-zinc-900">
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Live Valuation Summary Card (5 Cols) */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
        <div className="bg-zinc-950 text-white dark:bg-[#0c101b] border border-zinc-800 dark:border-white/15 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
          {/* Subtle accent blur */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ff5a1f]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[#c5e84a] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#c5e84a]" />
                LIVE TRADE-IN QUOTE
              </span>
              <span className="text-[11px] text-zinc-400 truncate font-medium">
                {selectedBrand} {customModel.trim() || selectedModel}
              </span>
            </div>

            {/* Price display */}
            <div>
              <span className="text-[11px] text-zinc-400 font-medium block">
                Estimated Counter Deduction
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                  {formatPrice(quote.total)}*
                </span>
                <span className="text-xs text-emerald-400 font-medium">
                  (Spot Discount)
                </span>
              </div>
            </div>

            {/* Valuation Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center justify-between text-zinc-400 font-medium">
                <span>Base Device Value</span>
                <span className="text-white font-semibold">{formatPrice(quote.deviceValue)}</span>
              </div>

              <div className="flex items-center justify-between text-zinc-400 font-medium">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Gift className="w-3 h-3" />
                  Kakod Festive Exchange Bonus
                </span>
                <span className="text-emerald-400 font-semibold">+₹1,500</span>
              </div>

              {quote.billBonus > 0 && (
                <div className="flex items-center justify-between text-zinc-400 font-medium">
                  <span>Box & Original Bill Bonus</span>
                  <span className="text-emerald-400 font-semibold">+₹750</span>
                </div>
              )}

              {quote.chargerBonus > 0 && (
                <div className="flex items-center justify-between text-zinc-400 font-medium">
                  <span>Fast Charger Bonus</span>
                  <span className="text-emerald-400 font-semibold">+₹450</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleWhatsAppQuote}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-98"
              >
                <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                <span>Lock Quote & Get Voucher on WhatsApp</span>
              </button>

              <p className="text-[10px] text-zinc-400 text-center leading-relaxed">
                Applies directly to your new {targetPhone} at our Kakod store.
              </p>
            </div>
          </div>
        </div>

        {/* Reassurance Micro-Card */}
        <div className="bg-white dark:bg-[#121624] border border-zinc-200/90 dark:border-white/10 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-xs">
            <ShieldCheck className="w-4 h-4 text-[#ff5a1f]" />
            <span>Store Walk-in Guarantee</span>
          </div>
          <ul className="space-y-1 text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>3-minute live inspection before your eyes.</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Free WhatsApp & photos data migration.</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Zero-risk: decline with zero charges if unsatisfied.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
