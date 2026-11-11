import type { Metadata } from "next";
import Link from "next/link";
import { ExchangeCalculator } from "@/components/exchange/ExchangeCalculator";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import {
  RefreshCw,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  Store,
  Sparkles,
  PhoneCall,
  Clock,
  Layers,
  FileCheck,
  BatteryCharging,
} from "lucide-react";

const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

export const metadata: Metadata = {
  title: "Old Smartphone Exchange & Trade-In | The Mobile Lounge Kakod",
  description:
    "Exchange your old Android phone or iPhone at The Mobile Lounge Kakod (by Vishal Distributors). Instant spot valuation, 3-minute testing, spot bill deduction, and free WhatsApp data transfer in Bulandshahr.",
  keywords: [
    "mobile exchange Kakod",
    "old phone exchange offer Bulandshahr",
    "sell old mobile phone Kakod",
    "exchange old Android for iPhone",
    "trade in smartphone Kakod",
    "The Mobile Lounge exchange",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${baseUrl}/exchange`,
    siteName: `${siteConfig.name} (by Vishal Distributors)`,
    title: "Old Smartphone Exchange & Trade-In | The Mobile Lounge Kakod",
    description:
      "Get maximum exchange value for your old smartphone with instant spot discount & 100% free data transfer in Kakod.",
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Mobile Lounge Kakod Phone Exchange",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Old Phone Exchange in Kakod | The Mobile Lounge",
    description: "Instant spot exchange value + free data migration at our Kakod store.",
    images: [`${baseUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/exchange`,
  },
};

const INSPECTION_STEPS = [
  {
    step: "01",
    title: "Display & Touch",
    desc: "Testing OEM glass, touch responsiveness, dead pixels, and screen burn-in.",
    icon: Layers,
  },
  {
    step: "02",
    title: "Cameras & Biometrics",
    desc: "Front, rear lenses, autofocus, FaceID, and optical fingerprint verification.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Battery & Thermals",
    desc: "Battery health status, thermal throttling check, and charging port speed.",
    icon: BatteryCharging,
  },
  {
    step: "04",
    title: "Spot Bill Credit",
    desc: "Agreed value deducted straight from your new invoice. Free chats and photos migration.",
    icon: FileCheck,
  },
];

const UPGRADE_EXAMPLES = [
  {
    oldDevice: "iPhone 13 (128 GB)",
    tradeValue: "₹26,000",
    newDevice: "Apple iPhone 16 (128 GB)",
    newPrice: "₹79,900",
    effectivePay: "₹53,900",
    badge: "Popular iPhone Upgrade",
  },
  {
    oldDevice: "Samsung Galaxy S22 5G",
    tradeValue: "₹28,000",
    newDevice: "Galaxy S24 Ultra (256 GB)",
    newPrice: "₹1,29,999",
    effectivePay: "₹1,01,999",
    badge: "Flagship Upgrade",
  },
  {
    oldDevice: "Redmi Note 11 Pro 5G",
    tradeValue: "₹8,500",
    newDevice: "Redmi Note 13 Pro+ 5G",
    newPrice: "₹28,999",
    effectivePay: "₹20,499",
    badge: "Budget 5G Leap",
  },
];

const FAQS = [
  {
    q: "Can I exchange a phone with a cracked screen or dead battery?",
    a: "Yes. Devices with cracked outer glass or aged batteries still retain trade-in credit as long as the motherboard functions. Select 'Cracked Glass' in the calculator for an estimate.",
  },
  {
    q: "Do I need the original box and bill?",
    a: "Having the original GST bill and manufacturer box grants an extra +₹750 bonus. However, if you don't have them, you can still exchange your phone with any government photo ID.",
  },
  {
    q: "How does data security and data transfer work?",
    a: "We perform a factory data wipe right in front of you at our Kakod store. Before wiping, our technician transfers all your WhatsApp chats, photos, and contacts to your new phone for free.",
  },
  {
    q: "Can I combine phone exchange with 0% EMI?",
    a: "Yes. Your old phone's trade-in value serves as an upfront counter down payment, lowering your remaining monthly installments to as low as ₹999/month on Bajaj Finserv or HDFC.",
  },
];

export default function ExchangePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Phone Exchange", url: "/exchange" },
  ]);

  return (
    <>
      <script
        id="breadcrumb-exchange-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-12 sm:space-y-14 w-full">
      {/* 1. Hero Header */}
      <section className="space-y-4">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 text-[#ff5a1f] text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Official Trade-In Program • Kakod Showroom</span>
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-zinc-900 dark:text-white tracking-tight leading-tight">
            Turn Your Old Phone Into an Instant Cash Discount.
          </h1>

          <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            Bring any working iPhone, Samsung, OnePlus, Vivo, or Xiaomi smartphone to our Main Market, Kakod showroom. Fast 3-minute physical inspection, zero paperwork hassle, and spot deduction on your new 5G invoice.
          </p>
        </div>

        {/* 2. Interactive Calculator with Clean Dropdowns */}
        <ExchangeCalculator />
      </section>

      {/* 3. 4-Step Transparent Inspection Protocol */}
      <section className="space-y-5 pt-4 border-t border-zinc-200 dark:border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ff5a1f]">
              Transparent Evaluation
            </span>
            <h2 className="font-display font-semibold text-xl sm:text-2xl text-zinc-900 dark:text-white mt-0.5">
              How We Test Your Phone in 3 Minutes
            </h2>
          </div>
          <span className="text-xs text-zinc-500 font-normal">
            Tested live at counter before your eyes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {INSPECTION_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121624] border border-zinc-200/90 dark:border-white/10 space-y-2.5 shadow-xs hover:border-[#ff5a1f]/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold text-xl text-zinc-400 dark:text-zinc-600">
                    {step.step}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-[#ff5a1f]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-sm text-zinc-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Upgrade Savings Matrix */}
      <section className="space-y-5 pt-4 border-t border-zinc-200 dark:border-white/10">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#65a30d] dark:text-[#c5e84a]">
            Upgrade Scenarios
          </span>
          <h2 className="font-display font-semibold text-xl sm:text-2xl text-zinc-900 dark:text-white mt-0.5">
            Sample Trade-In Upgrades at The Mobile Lounge
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {UPGRADE_EXAMPLES.map((item) => (
            <div
              key={item.badge}
              className="p-5 rounded-2xl bg-white dark:bg-[#121624] border border-zinc-200/90 dark:border-white/10 space-y-3.5 shadow-xs"
            >
              <span className="inline-block text-[10px] bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-full font-medium">
                {item.badge}
              </span>

              <div className="space-y-1 pb-2.5 border-b border-zinc-100 dark:border-white/10">
                <span className="text-[11px] text-zinc-400 block font-normal">
                  Trade-In Device:
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    {item.oldDevice}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    -{item.tradeValue}
                  </span>
                </div>
              </div>

              <div className="space-y-1 pb-2.5 border-b border-zinc-100 dark:border-white/10">
                <span className="text-[11px] text-zinc-400 block font-normal">
                  New Smartphone:
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    {item.newDevice}
                  </span>
                  <span className="text-xs text-zinc-400 line-through font-normal">
                    {item.newPrice}
                  </span>
                </div>
              </div>

              <div className="pt-0.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-medium text-zinc-400 block">
                    You Pay Only
                  </span>
                  <span className="font-display font-bold text-lg sm:text-xl text-zinc-900 dark:text-white">
                    {item.effectivePay}
                  </span>
                </div>
                <Link
                  href="/phones"
                  className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/10 dark:hover:bg-white/15 text-zinc-800 dark:text-white transition"
                  title="View phone"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Trust & Data Security Guarantee */}
      <section className="rounded-2xl p-6 sm:p-8 bg-zinc-900 text-white dark:bg-[#121624] border border-zinc-800 dark:border-white/10 shadow-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#c5e84a]">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="font-display font-semibold text-sm text-white">
              100% In-Front Data Wipe
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              We factory reset your phone right in front of you. No personal photos, emails, or OTPs ever leave your sight.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#ff5a1f]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="font-display font-semibold text-sm text-white">
              Zero Transfer Fee
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Complete migration of your WhatsApp chats, contact list, gallery, and bank apps to your new smartphone at zero cost.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-sky-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-display font-semibold text-sm text-white">
              Official GST Tax Invoice
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Every purchase receives an official GST invoice from Vishal Distributors with all-India authorized brand warranty.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-white/10">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ff5a1f]">
            Frequent Questions
          </span>
          <h2 className="font-display font-semibold text-xl sm:text-2xl text-zinc-900 dark:text-white mt-0.5">
            Phone Exchange & Valuation FAQs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {FAQS.map((faq) => (
            <div
              key={faq.q}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#121624] border border-zinc-200/90 dark:border-white/10 space-y-1.5 shadow-xs"
            >
              <h3 className="font-display font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white">
                {faq.q}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Bottom Showroom Callout */}
      <section className="rounded-2xl p-5 sm:p-7 bg-zinc-900 border border-zinc-800 text-white flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-semibold text-[#c5e84a] uppercase tracking-wider">
            Ready To Trade In?
          </span>
          <h2 className="font-display font-semibold text-xl sm:text-2xl text-white">
            Visit Our Main Market Kakod Counter Today
          </h2>
          <p className="text-xs text-zinc-400 font-normal max-w-lg">
            Open Monday – Sunday • 9:30 AM to 9:00 PM • Bring your device and government ID for immediate spot exchange credit.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full md:w-auto">
          <a
            href={siteConfig.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white text-black hover:bg-zinc-100 font-semibold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition active:scale-95 shadow-sm"
          >
            <Store className="w-4 h-4 text-[#ff5a1f]" />
            <span>Store Directions</span>
          </a>

          <a
            href={`tel:${siteConfig.contact.phoneRaw}`}
            className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition active:scale-95 border border-white/10"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Call Hotline</span>
          </a>
        </div>
      </section>
    </div>
    </>
  );
}
