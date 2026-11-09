import Link from "next/link";
import Image from "next/image";
import { Review } from "@/types/offer";
import { siteConfig } from "@/config/site";
import {
  Star,
  CheckCircle2,
  ArrowRight,
  Gift,
  ShieldCheck,
  Heart,
  MessageSquare,
  Users,
} from "lucide-react";

interface CustomerReviewsProps {
  reviews: Review[];
}

export function CustomerReviews({ reviews }: CustomerReviewsProps) {
  const customerStories = [
    {
      name: "Rahul Sharma",
      location: "Kakod Mandi",
      device: "iPhone 16 (128GB Teal)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: "Got my iPhone 16 at a lower price than Flipkart! Bajaj 0% EMI was approved in 7 minutes, and Vishal bhai gifted a smartwatch and glass fitting free.",
      badge: "Verified Buyer",
      rating: 5,
    },
    {
      name: "Amit & Family",
      location: "Jahangirpur Road, Kakod",
      device: "Samsung Galaxy S24 Ultra",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: "Exchanged old phone with ₹18,500 instant spot discount. All 40GB WhatsApp chats and photos transferred free with zero data loss. Best shop in Kakod!",
      badge: "VIP Exchange",
      rating: 5,
    },
    {
      name: "Pooja Verma",
      location: "Dankaur",
      device: "Vivo V40 Pro ZEISS",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      quote: "Saw reels on Instagram and visited store. ZEISS camera is mind-blowing! Got ₹0 downpayment on IDFC card and free ANC earbuds with box.",
      badge: "Reel Visitor",
      rating: 5,
    },
    {
      name: "Deepak Nagar",
      location: "Sikandrabad / Kakod",
      device: "OnePlus Nord 4 5G",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote: "Very polite, transparent, and honest staff. 100% genuine sealed pack with GST bill registered on brand portal. No credit card swipe charges.",
      badge: "Verified Buyer",
      rating: 5,
    },
  ];

  return (
    <section className="space-y-6">
      {/* Top Header & Google Trust Badge */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-[#22c55e] text-xs font-extrabold uppercase mb-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>5,000+ HAPPY KAKOD CUSTOMERS • 4.9 ★★★★★ ON GOOGLE</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-zinc-950 dark:text-white">
            Real Customers. Real Unboxings in Kakod.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1 max-w-2xl">
            See why families from Kakod, Jahangirpur, Dankaur, and Bulandshahr choose The Mobile Lounge for new smartphones and zero-downpayment EMI.
          </p>
        </div>

        <Link
          href="/reviews"
          className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-[#22c55e] hover:underline flex items-center gap-1 shrink-0 self-start sm:self-end"
        >
          <span>View All 420+ Reviews</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Customer Trust Highlight Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#162032] border border-zinc-200 dark:border-white/15 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold shrink-0">
            ★
          </div>
          <div>
            <p className="font-extrabold text-zinc-900 dark:text-white text-sm">4.9 / 5.0 Rating</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">420+ Google Reviews</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#162032] border border-zinc-200 dark:border-white/15 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-[#22c55e] font-bold shrink-0">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <p className="font-extrabold text-zinc-900 dark:text-white text-sm">Free Gift Hamper</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Watch or Buds Guaranteed</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#162032] border border-zinc-200 dark:border-white/15 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="font-extrabold text-zinc-900 dark:text-white text-sm">Open in Front of You</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">100% Sealed Pack Unboxing</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white dark:bg-[#162032] border border-zinc-200 dark:border-white/15 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500 dark:text-rose-400 font-bold shrink-0">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <div>
            <p className="font-extrabold text-zinc-900 dark:text-white text-sm">Free Data Transfer</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">All Chats & Photos Moved</p>
          </div>
        </div>
      </div>

      {/* Verified Customer Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {customerStories.map((story) => (
          <div
            key={story.name}
            className="bento-card p-5 space-y-3 bg-white dark:bg-[#162032] border-2 border-zinc-200 dark:border-white/15 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition"
          >
            <div className="space-y-3">
              {/* Header with Avatar & Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#22c55e]/60 shadow-md">
                    <Image
                      src={story.avatar}
                      alt={story.name}
                      fill
                      sizes="50px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-extrabold text-zinc-900 dark:text-white text-xs leading-tight">{story.name}</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{story.location}</p>
                  </div>
                </div>

                <span className="bg-emerald-500/15 text-emerald-700 dark:text-[#22c55e] border border-emerald-500/30 text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                  {story.badge}
                </span>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: story.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xs text-zinc-700 dark:text-zinc-200 leading-relaxed italic">
                &quot;{story.quote}&quot;
              </p>
            </div>

            {/* Bottom Device Pill */}
            <div className="pt-3 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">Purchased:</span>
              <span className="font-bold text-emerald-700 dark:text-[#22c55e] bg-emerald-50 dark:bg-black/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-white/10 truncate max-w-[170px]">
                {story.device}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Callout Box to Connect on WhatsApp */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#162032] via-[#1a2538] to-[#162032] border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-display font-extrabold text-base text-white">
            Want to see live unboxing photos or customer references in Kakod?
          </h4>
          <p className="text-xs text-zinc-300 mt-0.5">
            Chat with Vishal bhai directly on WhatsApp for real counter photos, price lock, and reserve your phone.
          </p>
        </div>

        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
            "Namaste The Mobile Lounge! I saw your customer unboxings on the website. I want to check today's stock and offers."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#22c55e] hover:bg-emerald-400 text-black font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow transition shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
