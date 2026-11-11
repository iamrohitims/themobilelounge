"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/nav";
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

interface FooterProps {
  siteLogo?: string;
}

export function Footer({ siteLogo = "/brand/logo.png" }: FooterProps = {}) {
  const [broadcastPhone, setBroadcastPhone] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastPhone.trim()) return;
    setSubscribed(true);
    // WhatsApp broadcast registration trigger
    const msg = `Namaste The Mobile Lounge! Please add my number (${broadcastPhone.trim()}) to your Kakod VIP Offers & Price Drop Broadcast list.`;
    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <footer className="bg-zinc-100 dark:bg-[#07070a] border-t border-zinc-200 dark:border-white/10 pt-12 sm:pt-16 pb-24 sm:pb-12 text-zinc-600 dark:text-zinc-400 text-xs transition-colors duration-200 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 space-y-8 sm:space-y-12">
        {/* Top Guarantee Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-3xl bg-white dark:bg-zinc-950/80 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-[#ff1e42] shrink-0 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-zinc-900 dark:text-white text-xs">100% Genuine Sealed Pack</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Official Brand Bill & Warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-[#65a30d] dark:text-[#a3e635] shrink-0 font-bold">
              ₹0
            </div>
            <div>
              <p className="font-extrabold text-zinc-900 dark:text-white text-xs">₹0 Downpayment EMI</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">5-Min Approval on Aadhaar & PAN</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0 font-bold">
              🎁
            </div>
            <div>
              <p className="font-extrabold text-zinc-900 dark:text-white text-xs">Free 5-in-1 Gift Box</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Smartwatch / ANC Earbuds Included</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 font-bold">
              🛡️
            </div>
            <div>
              <p className="font-extrabold text-zinc-900 dark:text-white text-xs">Official Brand Warranty</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">100% Genuine GST Invoice</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info & Location (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-md shrink-0 border border-zinc-200 dark:border-white/10 bg-zinc-950">
                <Image
                  src={siteLogo}
                  alt={siteConfig.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-zinc-900 dark:text-white text-base tracking-tight">
                  {siteConfig.name}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">by Vishal Distributors</p>
              </div>
            </div>

            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-xs">
              Kakod’s premier destination for genuine Apple iPhones, Samsung Galaxy, OnePlus, Vivo,
              and 5G smartphones. Instant 0% EMI financing and verified trade-in values.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ff1e42] shrink-0 mt-0.5" />
                <span className="text-zinc-800 dark:text-zinc-200">{siteConfig.location.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#65a30d] dark:text-[#a3e635] shrink-0" />
                <span className="text-zinc-800 dark:text-zinc-200">
                  {siteConfig.location.openingHours.days} ({siteConfig.location.openingHours.display})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phoneRaw}`}
                  className="text-zinc-900 dark:text-white font-bold hover:underline"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-pink-500 transition shadow-sm"
                title="Follow on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-[#65a30d] dark:text-[#a3e635] transition shadow-sm"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-rose-500 dark:text-rose-400 transition shadow-sm"
                title="Google Maps Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Columns (5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <p className="font-extrabold text-zinc-900 dark:text-white text-xs uppercase tracking-wider mb-3">
                Shop Mobiles
              </p>
              <ul className="space-y-2">
                {footerNav.shop.map((item) => (
                  <li key={`${item.href}-${item.title}`}>
                    <Link
                      href={item.href}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-extrabold text-zinc-900 dark:text-white text-xs uppercase tracking-wider mb-3">
                Services & EMI
              </p>
              <ul className="space-y-2">
                {footerNav.services.map((item) => (
                  <li key={`${item.href}-${item.title}`}>
                    <Link
                      href={item.href}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-extrabold text-zinc-900 dark:text-white text-xs uppercase tracking-wider mb-3">
                Store & Legal
              </p>
              <ul className="space-y-2">
                {footerNav.company.map((item) => (
                  <li key={`${item.href}-${item.title}`}>
                    <Link
                      href={item.href}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* VIP WhatsApp Broadcast Sign-up (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 space-y-3 shadow-sm dark:shadow-none">
              <span className="bg-[#c5e84a]/20 text-[#3f6212] dark:text-[#c5e84a] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                🔥 KAKOD VIP BROADCAST
              </span>
              <p className="font-extrabold text-zinc-900 dark:text-white text-xs leading-snug">
                Get Flash Deals & Price Drops on WhatsApp
              </p>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                Never miss an iPhone price cut or festive mystery gift drop in Kakod.
              </p>

              {subscribed ? (
                <div className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 p-2.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Request sent! You will receive VIP deals on WhatsApp.</span>
                </div>
              ) : (
                <form onSubmit={handleBroadcastSubmit} className="space-y-2">
                  <input
                    type="tel"
                    required
                    placeholder="Enter your WhatsApp No."
                    value={broadcastPhone}
                    onChange={(e) => setBroadcastPhone(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/15 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#ff5a1f]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#c5e84a] hover:bg-lime-400 text-black font-extrabold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition shadow"
                  >
                    <span>Join Free VIP Broadcast</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 dark:text-zinc-400">
          <p>
            © 2026 {siteConfig.name} (by Vishal Distributors), Kakod. All rights reserved.
          </p>
          <p className="max-w-xl text-center md:text-right">
            *Terms and conditions apply. EMI and interest rates shown are indicative and subject to
            financing partner approval at store counter.
          </p>
        </div>
      </div>
    </footer>
  );
}
