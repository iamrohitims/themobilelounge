import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
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

export const metadata: Metadata = {
  title: "Contact & Store Location in Kakod | The Mobile Lounge",
  description:
    "Visit The Mobile Lounge in Main Market, Kakod (Bulandshahr). Open all 7 days 9:30 AM – 9:00 PM. Call +91 70172 89590 or navigate via Google Maps.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a3e635]/15 border border-[#a3e635]/30 text-emerald-700 dark:text-[#a3e635] text-xs font-extrabold uppercase">
          <MapPin className="w-3.5 h-3.5" />
          <span>VISIT OUR EXPERIENCE SHOWROOM • KAKOD</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-zinc-950 dark:text-white tracking-tight">
          Find Us in Kakod Main Market
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Powered by <strong className="text-zinc-950 dark:text-white">Vishal Distributors</strong>. Walk in today for
          live phone demos, instant 5-minute EMI check, and exclusive offline store gifts!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Contact & Hours Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bento-card p-6 space-y-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/10">
              <span className="font-extrabold text-zinc-950 dark:text-white text-base">Store Details</span>
              <LiveStatusBadge />
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ff1e42] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-950 dark:text-white uppercase text-[11px]">Showroom Address:</p>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-0.5 leading-relaxed">
                    {siteConfig.location.fullAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-[#a3e635] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-950 dark:text-white uppercase text-[11px]">Store Timings:</p>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-0.5">
                    {siteConfig.location.openingHours.days}
                  </p>
                  <p className="text-emerald-700 dark:text-[#a3e635] font-extrabold mt-0.5">
                    {siteConfig.location.openingHours.display}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-950 dark:text-white uppercase text-[11px]">Direct Hotline:</p>
                  <a
                    href={`tel:${siteConfig.contact.phoneRaw}`}
                    className="text-zinc-950 dark:text-white font-extrabold text-sm hover:underline mt-0.5 block"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-950 dark:text-white uppercase text-[11px]">WhatsApp Concierge:</p>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 dark:text-emerald-400 font-extrabold hover:underline mt-0.5 block"
                  >
                    +91 70172 89590 (24x7 Chat)
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
                href={siteConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <Navigation className="w-3.5 h-3.5 text-[#ff1e42]" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                  "Namaste The Mobile Lounge! Please share your live GPS location pin and route directions."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#a3e635] hover:bg-lime-400 text-black font-extrabold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>Location Pin</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Embedded Google Map & Highlights (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bento-card p-3 rounded-3xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <div className="w-full h-[420px] rounded-2xl overflow-hidden relative bg-zinc-100 dark:bg-zinc-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14041.503387870198!2d77.8252259!3d28.2560249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc52f677d2fa9%3A0x6bfa332617f6942!2sKakore%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale-[20%] contrast-[110%]"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Mobile Lounge Kakod Location"
              />
            </div>
            <div className="p-3 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
              <span>📍 Main Market, Kakod, District Bulandshahr (UP) - 203201</span>
              <span className="text-emerald-700 dark:text-[#a3e635] font-extrabold">Open All 7 Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
