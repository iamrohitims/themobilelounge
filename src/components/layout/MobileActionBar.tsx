"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Phone, MessageSquare, Calculator, MapPin, Smartphone } from "lucide-react";

export function MobileActionBar() {
  const pathname = usePathname();

  // On individual product detail pages, ProductDetailClient renders a dedicated high-converting product CTA bar
  const isProductDetailPage =
    pathname.startsWith("/phones/") &&
    !pathname.startsWith("/phones/brand/") &&
    !pathname.startsWith("/phones/under/") &&
    pathname !== "/phones";

  if (isProductDetailPage) {
    return null;
  }

  return (
    <div className="fixed bottom-3 inset-x-0 z-50 max-w-md mx-auto px-3 sm:hidden">
      <div className="bg-white/95 dark:bg-[#121624]/95 backdrop-blur-2xl border border-zinc-200 dark:border-white/20 rounded-2xl p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-1 transition-colors duration-200">
        {/* Call Showroom */}
        <a
          href={`tel:${siteConfig.contact.phoneRaw}`}
          className="flex-1 flex flex-col items-center py-1.5 text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition rounded-xl"
        >
          <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[10px] font-black mt-1">Call</span>
        </a>

        {/* Browse Phones */}
        <Link
          href="/phones"
          className={`flex-1 flex flex-col items-center py-1.5 transition rounded-xl ${
            pathname.startsWith("/phones")
              ? "text-zinc-950 dark:text-white bg-zinc-100 dark:bg-white/10"
              : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
          }`}
        >
          <Smartphone className="w-4 h-4 text-[#ff5a1f]" />
          <span className="text-[10px] font-black mt-1">Phones</span>
        </Link>

        {/* EMI Calculator */}
        <Link
          href="/emi"
          className={`flex-1 flex flex-col items-center py-1.5 transition rounded-xl ${
            pathname === "/emi"
              ? "text-zinc-950 dark:text-white bg-zinc-100 dark:bg-white/10"
              : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
          }`}
        >
          <Calculator className="w-4 h-4 text-[#65a30d] dark:text-[#c5e84a]" />
          <span className="text-[10px] font-black mt-1">0% EMI</span>
        </Link>

        {/* Directions */}
        <a
          href={siteConfig.location.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center py-1.5 text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition rounded-xl"
        >
          <MapPin className="w-4 h-4 text-sky-500 dark:text-sky-400" />
          <span className="text-[10px] font-black mt-1">Map</span>
        </a>

        {/* WhatsApp Hot Deal */}
        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
            "Namaste The Mobile Lounge Kakod! I want to check today's best smartphone offers and lock in a deal with gifts!"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba59] text-white font-black px-3 py-2 rounded-xl flex items-center gap-1 text-[11px] shadow-lg shrink-0 transform active:scale-95"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span>Chat</span>
        </a>
      </div>
    </div>
  );
}
