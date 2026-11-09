import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Mobile Lounge Kakod",
  description: "Terms and conditions, store warranty rules, and pricing disclaimer for The Mobile Lounge.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
      <h1 className="font-display font-extrabold text-3xl text-zinc-950 dark:text-white">Terms & Conditions</h1>
      <p className="text-zinc-500 dark:text-zinc-400">Last updated: November 2026</p>

      <section className="space-y-2">
        <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">1. Retail Pricing & Stock</h2>
        <p>
          Prices, offers, and free gift hampers displayed on this website are indicative and subject
          to physical stock availability at our Kakod store. While we strive to maintain accurate
          daily pricing, final sale prices are confirmed on invoice generation at the store counter.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">2. Financing & EMI Schemes</h2>
        <p>
          All 0% interest and low downpayment EMI schemes are provided by third-party financial
          partners (Bajaj Finserv, IDFC First Bank, Home Credit, etc.). Loan sanction, approved
          tenure, down payment requirement, and processing fees are solely at the discretion of the
          financier based on customer creditworthiness.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">3. Warranty & Return Policy</h2>
        <p>
          All smartphones sold are 100% brand new sealed pack and covered by official manufacturer
          brand warranty across authorized Indian service centers. Sealed pack electronics once opened
          are subject to official brand replacement policies. In-store customer support covers
          diagnostics, setup, and authorized service center escalation support.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">4. Old Phone Exchange</h2>
        <p>
          Online exchange valuations are estimated. Final trade-in value is determined following a
          physical inspection of screen responsiveness, camera, body condition, and battery health at
          the store counter. The customer must provide proof of ownership and a valid identity proof
          when handing over pre-owned devices.
        </p>
      </section>
    </div>
  );
}
