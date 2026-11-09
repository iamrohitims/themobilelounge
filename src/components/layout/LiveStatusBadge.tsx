"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function LiveStatusBadge() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkOpen = () => {
      // IST is UTC+5:30
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utcTime + 3600000 * 5.5);
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const currentTime = hours * 60 + minutes;

      const openMinutes = 9 * 60 + 30; // 9:30 AM
      const closeMinutes = 21 * 60; // 9:00 PM

      setIsOpen(currentTime >= openMinutes && currentTime < closeMinutes);
    };

    checkOpen();
    const interval = setInterval(checkOpen, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-zinc-900 border border-white/10">
      <span
        className={`w-2 h-2 rounded-full ${
          isOpen ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
        }`}
      />
      <span className={isOpen ? "text-emerald-400" : "text-amber-400"}>
        {isOpen ? "Open Now" : "Closed"} • {siteConfig.location.openingHours.display}
      </span>
    </div>
  );
}
