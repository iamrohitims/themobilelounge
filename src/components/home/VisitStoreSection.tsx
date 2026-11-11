import { getStoreSettings } from "@/lib/services/site-settings";
import { LiveStatusBadge } from "@/components/layout/LiveStatusBadge";
import { MessageSquare, Navigation, MapPin } from "lucide-react";

export async function VisitStoreSection() {
  const store = await getStoreSettings();

  return (
    <section className="bento-card p-4 sm:p-10 border-2 border-zinc-200 dark:border-white/15 bg-white dark:bg-[#161a26] text-zinc-900 dark:text-white rounded-3xl shadow-xl dark:shadow-2xl w-full max-w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Left Information */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#c5e84a] text-black font-black text-xs px-3.5 py-1 rounded-full shadow-sm">
              📍 VISIT KAKOD&apos;S #1 SHOWROOM
            </span>
            <LiveStatusBadge />
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl text-zinc-950 dark:text-white">
            The Mobile Lounge, Kakod
          </h2>
          <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
            Powered by <strong className="text-zinc-900 dark:text-white font-bold">{store.mapQuery || "Vishal Distributors"}</strong>. Visit our
            showroom in Main Market, Kakod for hands-on demos, instant 5-minute EMI checks, and guaranteed offline
            store gift hampers!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/15 p-4 rounded-2xl">
              <p className="text-[11px] font-black text-[#ff5a1f] uppercase tracking-wider">📍 Store Location</p>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mt-1">
                {store.storeAddress}
              </p>
            </div>
            <div className="bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-white/15 p-4 rounded-2xl">
              <p className="text-[11px] font-black text-[#65a30d] dark:text-[#c5e84a] uppercase tracking-wider">
                🕒 Hours & Phone Hotline
              </p>
              <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mt-1">
                {store.openingHours}
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5">{store.storePhone}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <a
              href={store.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 hover:bg-black text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black font-black text-xs sm:text-sm px-5 py-3.5 rounded-2xl flex items-center gap-2 transition shadow-lg transform active:scale-95"
            >
              <Navigation className="w-4 h-4 text-[#ff5a1f]" />
              <span>Open in Google Maps</span>
            </a>

            <a
              href={`https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(
                "Namaste The Mobile Lounge Kakod! Please send me your store location and today's special offers."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs sm:text-sm px-5 py-3.5 rounded-2xl flex items-center gap-2 transition shadow-lg transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Get Directions on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Embedded Interactive Map */}
        <div className="lg:col-span-5">
          <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-white/15 bg-zinc-100 dark:bg-black shadow-xl group">
            <iframe
              src={store.resolvedMapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Mobile Lounge Kakod Map"
              className="w-full h-full grayscale-[10%] contrast-110"
            />
            {/* Direct Google Business / Maps floating badge */}
            <a
              href={store.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md text-white p-2.5 rounded-xl border border-white/20 flex items-center justify-between text-xs hover:bg-black transition shadow-lg"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#ff5a1f] shrink-0" />
                <span className="font-bold truncate">{store.mapQuery || "Vishal Distributors, Kakod"}</span>
              </div>
              <span className="text-[10px] font-bold text-[#c5e84a] shrink-0 underline ml-2">Open Map ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
