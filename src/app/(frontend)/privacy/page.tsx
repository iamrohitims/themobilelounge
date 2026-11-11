import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | The Mobile Lounge Kakod",
  description: "Privacy policy and data protection terms for The Mobile Lounge (by Vishal Distributors), Kakod.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
      <h1 className="font-display font-extrabold text-3xl text-zinc-950 dark:text-white">Privacy Policy</h1>
      <p className="text-zinc-500 dark:text-zinc-400">Last updated: November 2026</p>

      <section className="space-y-2">
        <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">1. Introduction</h2>
        <p>
          The Mobile Lounge (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;), operated by Vishal Distributors at Main
          Market, Kakod, Uttar Pradesh - 203201, values your privacy. This policy explains what
          information we collect when you visit our website, submit lead forms, or interact with us
          via WhatsApp.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">2. Information We Collect</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Phone numbers submitted for VIP WhatsApp broadcast lists or price drop alerts.</li>
          <li>Old device details provided in our online phone exchange estimator.</li>
          <li>Indicative EMI calculation inputs chosen during finance simulation.</li>
          <li>Anonymous analytics regarding page visits and search filters to optimize local user experience.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">3. How We Use Your Data</h2>
        <p>
          We use your information exclusively to provide product quotes, verify stock availability at
          our Kakod showroom, provide financing assistance, and transmit WhatsApp broadcast updates
          that you opted into. We never sell, rent, or trade your personal data to third-party marketing
          firms.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">4. Financing & KYC Partner Data</h2>
        <p>
          When you apply for in-store consumer loans (Bajaj Finserv, IDFC FIRST Bank, Home Credit),
          official KYC documentation (Aadhaar, PAN) is processed directly through secure, authorized
          financier terminals. The Mobile Lounge does not store confidential biometric or banking
          credentials.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-extrabold text-zinc-950 dark:text-white">5. Contact Us</h2>
        <p>
          If you have questions about your data or wish to unsubscribe from WhatsApp broadcast alerts,
          contact us at {siteConfig.contact.phone} or via email at {siteConfig.contact.email}.
        </p>
      </section>
    </div>
  );
}
