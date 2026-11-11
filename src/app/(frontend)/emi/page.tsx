import type { Metadata } from "next";
import { emiConfig } from "@/config/emi";
import { EMICalculator } from "@/components/emi/EMICalculator";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import {
  CreditCard,
  CheckCircle2,
  Building2,
  FileCheck2,
  Sparkles,
  PhoneCall,
  Clock,
  ShieldCheck,
} from "lucide-react";

const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

export const metadata: Metadata = {
  title: "0% Mobile EMI Calculator Kakod | ₹0 Downpayment Mobile Finance",
  description:
    "Calculate your monthly smartphone installment with The Mobile Lounge Kakod (by Vishal Distributors). Bajaj Finserv, IDFC First Bank, and TVS Credit instant approval with just Aadhaar & PAN card.",
  keywords: [
    "mobile EMI calculator Kakod",
    "0% downpayment phone Kakod",
    "Bajaj Finserv mobile shop Kakod",
    "iPhone on EMI in Kakod",
    "Samsung EMI without credit card Bulandshahr",
    "IDFC FIRST Bank mobile loan Kakod",
    "The Mobile Lounge EMI",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${baseUrl}/emi`,
    siteName: `${siteConfig.name} (by Vishal Distributors)`,
    title: "0% Mobile EMI Calculator Kakod | The Mobile Lounge",
    description:
      "Calculate smartphone EMIs in seconds. 5-minute approval with just Aadhaar & PAN card at our Kakod store.",
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Mobile Lounge Kakod 0% EMI Finance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "0% Mobile EMI Finance in Kakod | The Mobile Lounge",
    description: "₹0 Downpayment, paperless 5-minute approval on Aadhaar & PAN card.",
    images: [`${baseUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/emi`,
  },
};

export default function EMIPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "0% EMI Finance", url: "/emi" },
  ]);

  return (
    <>
      <script
        id="breadcrumb-emi-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-8 sm:space-y-12 w-full max-w-full overflow-hidden">
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a3e635]/15 border border-[#a3e635]/30 text-emerald-700 dark:text-[#a3e635] text-[11px] sm:text-xs font-extrabold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INSTANT 5-MINUTE PAPERLESS FINANCE • KAKOD</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl text-zinc-950 dark:text-white tracking-tight">
          ₹0 Downpayment & 0% EMI Calculator
        </h1>
        <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Upgrade to your dream Apple iPhone, Samsung Galaxy, or 5G smartphone without breaking your
          savings. Bring just your <strong className="text-zinc-950 dark:text-white">Aadhaar Card & PAN Card</strong> to
          our Kakod store!
        </p>
      </div>

      {/* Main Full-Featured EMI Calculator */}
      <EMICalculator />

      {/* Finance Partners Grid */}
      <section className="space-y-5">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="font-display font-extrabold text-xl sm:text-3xl text-zinc-950 dark:text-white">
            Official Financing & EMI Partners
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Available directly at The Mobile Lounge counter with paperless digital approval.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {emiConfig.partners.map((partner) => (
            <div
              key={partner.name}
              className="bento-card p-4 sm:p-5 space-y-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display font-extrabold text-base sm:text-lg text-zinc-950 dark:text-white">
                    {partner.name}
                  </span>
                  <span className="bg-[#ff1e42]/15 text-rose-600 dark:text-rose-300 border border-[#ff1e42]/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {partner.badge}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">{partner.tagline}</p>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Down Payment:</span>
                  <span className="text-emerald-700 dark:text-[#a3e635] font-bold">
                    {partner.minDownPaymentPercent === 0
                      ? "₹0 / Zero Downpayment"
                      : `From ${partner.minDownPaymentPercent}%`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Tenure Options:</span>
                  <span className="text-zinc-950 dark:text-white font-bold">
                    {partner.popularTenures.join(", ")} Months
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase">Documents Needed:</p>
                  <p className="text-[11px] text-zinc-700 dark:text-zinc-300">{partner.requirements.join(" • ")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step In-Store Walk-in Process */}
      <section className="bento-card p-4 sm:p-8 space-y-5 sm:space-y-6 bg-zinc-50 dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-black border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
        <h2 className="font-display font-extrabold text-2xl text-zinc-950 dark:text-white text-center">
          How to Get Your Smartphone on EMI at Kakod Store
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-950/80 p-4 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-2 shadow-xs">
            <span className="w-8 h-8 rounded-full bg-[#ff1e42] text-white flex items-center justify-center font-extrabold text-xs">
              1
            </span>
            <h4 className="font-extrabold text-sm text-zinc-950 dark:text-white">Choose Your Phone</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Pick your favourite iPhone or 5G Android model from our live display counters.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-950/80 p-4 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-2 shadow-xs">
            <span className="w-8 h-8 rounded-full bg-[#a3e635] text-black flex items-center justify-center font-extrabold text-xs">
              2
            </span>
            <h4 className="font-extrabold text-sm text-zinc-950 dark:text-white">Share Aadhaar & PAN</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Our finance executive runs a 5-minute instant digital approval check via OTP.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-950/80 p-4 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-2 shadow-xs">
            <span className="w-8 h-8 rounded-full bg-sky-400 text-black flex items-center justify-center font-extrabold text-xs">
              3
            </span>
            <h4 className="font-extrabold text-sm text-zinc-950 dark:text-white">Select Tenure & 0% Plan</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Select 6, 9, 12, or 18 months installment scheme that suits your monthly budget.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-950/80 p-4 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-2 shadow-xs">
            <span className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-extrabold text-xs">
              4
            </span>
            <h4 className="font-extrabold text-sm text-zinc-950 dark:text-white">Walk Out With Free Gifts!</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Take your sealed-pack smartphone with official GST bill, warranty, and mystery gift
              box.
            </p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
