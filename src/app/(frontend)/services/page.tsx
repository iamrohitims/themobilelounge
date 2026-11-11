import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import {
  Smartphone,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  Headphones,
  Sparkles,
  MessageSquare,
  Wrench,
  CheckCircle2,
} from "lucide-react";

const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

export const metadata: Metadata = {
  title: "Services & Support in Kakod | The Mobile Lounge (by Vishal Distributors)",
  description:
    "Complete mobile retail, 0% EMI finance, WhatsApp chat transfer, screen guard fitting, and official brand warranty support at The Mobile Lounge Kakod (by Vishal Distributors) in Bulandshahr.",
  keywords: [
    "mobile services Kakod",
    "mobile data transfer Kakod",
    "screen guard tempered glass fitting Kakod",
    "0% EMI finance assistance Kakod",
    "phone warranty service Kakod Mandi",
    "The Mobile Lounge services",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${baseUrl}/services`,
    siteName: `${siteConfig.name} (by Vishal Distributors)`,
    title: "Services & Support in Kakod | The Mobile Lounge",
    description:
      "Full smartphone retail services: 0% EMI finance, old phone exchange, free data transfer & warranty support.",
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Mobile Lounge Kakod In-Store Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "In-Store Services | The Mobile Lounge Kakod",
    description: "0% EMI, Free Data Transfer & Genuine Brand Warranty in Kakod.",
    images: [`${baseUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/services`,
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "In-Store Services", url: "/services" },
  ]);
  const services = [
    {
      icon: Smartphone,
      title: "New Smartphones & Flagships",
      desc: "100% genuine sealed pack iPhones, Samsung Galaxy, OnePlus, Vivo & 5G devices with official brand GST invoice.",
      hindi: "100% असली पक्का बिल वाले नए मोबाइल",
      badge: "SEALED PACK",
      badgeColor: "bg-[#ff1e42] text-white",
    },
    {
      icon: CreditCard,
      title: "0% Paperless EMI Finance",
      desc: "Instant approval in 5 minutes with Bajaj Finserv, IDFC First Bank, TVS Credit, and Home Credit with just Aadhaar & PAN.",
      hindi: "सिर्फ आधार कार्ड व पैन कार्ड पर 5 मिनट में आसान किश्तें",
      badge: "5-MIN APPROVAL",
      badgeColor: "bg-[#a3e635] text-black",
    },
    {
      icon: RefreshCw,
      title: "Instant Old Phone Trade-In",
      desc: "Bring your old 4G/5G smartphone in any working condition. We evaluate in 3 minutes and deduct the highest value directly from your bill.",
      hindi: "पुराने फोन का तुरंत सबसे बेहतरीन एक्सचेंज दाम",
      badge: "SPOT DISCOUNT",
      badgeColor: "bg-amber-400 text-black",
    },
    {
      icon: Sparkles,
      title: "Precision Screen Guard & Case Fitting",
      desc: "Free machine-assisted 9H Gorilla glass and privacy tempered glass installation on your phone with zero bubbles guaranteed.",
      hindi: "फ्री टेम्पर्ड ग्लास व बैक कवर मशीन फिटिंग",
      badge: "FREE IN-STORE",
      badgeColor: "bg-purple-500 text-white",
    },
    {
      icon: Headphones,
      title: "Free WhatsApp & Contact Transfer",
      desc: "Switching from Android to iPhone? Our staff transfers all your chats, photos, videos, and contacts completely free while you relax.",
      hindi: "व्हाट्सएप चैट व फोटो का मुफ़्त ट्रांसफर",
      badge: "NO DATA LOSS",
      badgeColor: "bg-sky-400 text-black",
    },
    {
      icon: ShieldCheck,
      title: "100% Genuine Brand Warranty",
      desc: "Authorized brand warranty coverage with valid Indian GST invoice and store claim assistance for every smartphone and accessory.",
      hindi: "100% असली ब्रांड वारंटी और सर्विस सेंटर सहायता",
      badge: "PEACE OF MIND",
      badgeColor: "bg-emerald-500 text-black",
    },
  ];

  return (
    <>
      <script
        id="breadcrumb-services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-6 sm:space-y-10 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff1e42]/15 border border-[#ff1e42]/30 text-[#ff1e42] text-[11px] sm:text-xs font-extrabold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VIP IN-STORE SERVICES • KAKOD</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl text-zinc-950 dark:text-white tracking-tight">
          Services We Offer Every Customer
        </h1>
        <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          At The Mobile Lounge (by Vishal Distributors), we don’t just hand over a box—we deliver a
          complete end-to-end smartphone experience.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((svc) => (
          <div
            key={svc.title}
            className="bento-card p-4 sm:p-7 space-y-3.5 sm:space-y-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-[#ff1e42]">
                  <svc.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${svc.badgeColor}`}>
                  {svc.badge}
                </span>
              </div>

              <h3 className="font-display font-extrabold text-lg sm:text-xl text-zinc-950 dark:text-white">
                {svc.title}
              </h3>
              <p className="text-xs text-emerald-700 dark:text-[#a3e635] font-bold">{svc.hindi}</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{svc.desc}</p>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-white/10">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  `Namaste The Mobile Lounge! I would like to know more about your service: *${svc.title}*.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-zinc-100 hover:bg-[#a3e635] dark:bg-zinc-900 dark:hover:bg-[#a3e635] text-zinc-900 hover:text-black dark:text-white dark:hover:text-black text-xs font-extrabold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
