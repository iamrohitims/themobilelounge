import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getStoreSettings } from "@/lib/services/site-settings";
import { getBreadcrumbSchema } from "@/lib/seo";
import { LiveStatusBadge } from "@/components/layout/LiveStatusBadge";
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Mail,
  Navigation,
  CheckCircle2,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

export const metadata: Metadata = {
  title: "Contact & Store Location in Kakod | The Mobile Lounge (by Vishal Distributors)",
  description:
    "Visit The Mobile Lounge in Main Market, Kakod (Bulandshahr). Open all 7 days 9:30 AM – 9:00 PM. Call +91 70172 89590 or navigate via Google Maps. Near SBI Bank.",
  keywords: [
    "mobile shop in Kakod contact",
    "Vishal Distributors Kakod address",
    "The Mobile Lounge phone number",
    "mobile shop location Kakod Mandi",
    "directions to The Mobile Lounge",
    "smartphone store Bulandshahr contact",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${baseUrl}/contact`,
    siteName: `${siteConfig.name} (by Vishal Distributors)`,
    title: "Contact & Store Location in Kakod | The Mobile Lounge",
    description:
      "Visit our showroom in Kakod Main Market. 100% genuine smartphones, 0% EMI finance, and free gifts. Open 7 days a week.",
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Mobile Lounge Kakod Location & Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Store Location & Contact | The Mobile Lounge Kakod",
    description: "Main Market, Kakod Mandi (Bulandshahr). Open daily 9:30 AM – 9:00 PM.",
    images: [`${baseUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
};

export default async function ContactPage() {
  const store = await getStoreSettings();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact & Store Location", url: "/contact" },
  ]);

  return (
    <>
      <script
        id="breadcrumb-contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-6 sm:space-y-10 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a3e635]/15 border border-[#a3e635]/30 text-emerald-700 dark:text-[#a3e635] text-[11px] sm:text-xs font-extrabold uppercase">
          <MapPin className="w-3.5 h-3.5" />
          <span>VISIT OUR EXPERIENCE SHOWROOM • KAKOD</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl text-zinc-950 dark:text-white tracking-tight">
          Find Us in Kakod Main Market
        </h1>
        <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Powered by <strong className="text-zinc-950 dark:text-white">Vishal Distributors</strong>. Walk in today for
          live phone demos, instant 5-minute EMI check, and exclusive offline store gifts!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Left Contact & Hours Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bento-card p-4 sm:p-6 space-y-4 sm:space-y-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/10">
              <span className="font-extrabold text-zinc-950 dark:text-white text-sm sm:text-base">Store Details</span>
              <LiveStatusBadge />
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ff1e42] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-950 dark:text-white uppercase text-[11px]">Showroom Address:</p>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-0.5 leading-relaxed">
                    {store.storeAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-[#a3e635] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-950 dark:text-white uppercase text-[11px]">Store Timings:</p>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-0.5">
                    {store.openingHours}
                  </p>
                  <p className="text-emerald-700 dark:text-[#a3e635] font-extrabold mt-0.5">
                    Open 7 Days • 9:30 AM – 9:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-950 dark:text-white uppercase text-[11px]">Direct Hotline:</p>
                  <a
                    href={`tel:${store.storePhone.replace(/[^0-9+]/g, '')}`}
                    className="text-zinc-950 dark:text-white font-extrabold text-sm hover:underline mt-0.5 block"
                  >
                    {store.storePhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-950 dark:text-white uppercase text-[11px]">WhatsApp Concierge:</p>
                  <a
                    href={`https://wa.me/${store.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 dark:text-emerald-400 font-extrabold hover:underline mt-0.5 block"
                  >
                    +{store.whatsappNumber} (24x7 Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <InstagramIcon className="w-5 h-5 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-950 dark:text-white uppercase text-[11px]">Official Instagram:</p>
                  <a
                    href={siteConfig.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 dark:text-pink-400 font-extrabold hover:underline mt-0.5 block"
                  >
                    @{siteConfig.contact.instagramHandle} (1.1K+ Followers)
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-3 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row gap-2">
              <a
                href={store.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition text-center shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5 text-[#ff1e42]" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(
                  "Namaste The Mobile Lounge! Please share your live GPS location pin and route directions."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#a3e635] hover:bg-lime-400 text-black font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition text-center shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>Location Pin</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Embedded Dynamic Map (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bento-card p-2 sm:p-3 rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <div className="w-full h-[280px] xs:h-[320px] sm:h-[420px] rounded-xl sm:rounded-2xl overflow-hidden relative bg-zinc-100 dark:bg-zinc-900 group">
              <iframe
                src={store.resolvedMapEmbedUrl}
                className="w-full h-full border-0 grayscale-[10%] contrast-[110%]"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Mobile Lounge Kakod Location"
              />
              {/* Direct Google Business / Maps floating badge */}
              <a
                href={store.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md text-white p-3 rounded-xl border border-white/20 flex items-center justify-between text-xs hover:bg-black transition shadow-lg"
              >
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 text-[#ff5a1f] shrink-0" />
                  <span className="font-bold truncate">{store.mapQuery || "The Mobile Lounge / Vishal Distributors"}</span>
                </div>
                <span className="text-xs font-bold text-[#c5e84a] shrink-0 underline ml-2">Open Google Business ↗</span>
              </a>
            </div>
            <div className="p-2.5 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400">
              <span>📍 {store.storeAddress}</span>
              <span className="text-emerald-700 dark:text-[#a3e635] font-extrabold">Open All 7 Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
