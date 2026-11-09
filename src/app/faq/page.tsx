import type { Metadata } from "next";
import { dataRepo } from "@/lib/repo";
import { getFaqSchema } from "@/lib/seo";
import { HelpCircle, ChevronDown, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | The Mobile Lounge Kakod",
  description:
    "Got questions about mobile EMI finance, documents needed, phone exchange, warranty, and store timings at The Mobile Lounge Kakod? Read our official answers.",
};

export default async function FAQPage() {
  const faqs = await dataRepo.faqs.getAll();
  const faqSchema = getFaqSchema(faqs);

  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <>
      <script
        id="faq-jsonld-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff1e42]/15 border border-[#ff1e42]/30 text-[#ff1e42] text-xs font-extrabold uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>HELP & ANSWERS • KAKOD STORE</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-zinc-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about purchasing a smartphone, ₹0 down payment EMI, and
            trade-ins at The Mobile Lounge.
          </p>
        </div>

        {/* Grouped FAQs */}
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category} className="space-y-3">
              <h3 className="font-display font-extrabold text-lg text-zinc-950 dark:text-white border-b border-zinc-200 dark:border-white/10 pb-2">
                {category}
              </h3>
              <div className="space-y-3">
                {faqs
                  .filter((f) => f.category === category)
                  .map((faq) => (
                    <details
                      key={faq.id}
                      className="bento-card p-4 sm:p-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none rounded-2xl group cursor-pointer"
                    >
                      <summary className="font-extrabold text-sm text-zinc-950 dark:text-white flex items-center justify-between list-none">
                        <span>{faq.question}</span>
                        <ChevronDown className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-open:rotate-180 transition shrink-0 ml-2" />
                      </summary>
                      <div className="pt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200 dark:border-white/10 mt-3">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions Box */}
        <div className="bento-card p-6 sm:p-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-sm dark:shadow-none text-center space-y-3">
          <h4 className="font-display font-extrabold text-xl text-zinc-950 dark:text-white">
            Still Have a Question?
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Our team is available 7 days a week on WhatsApp to answer any query about stock,
            discounts, and EMI eligibility.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                "Namaste The Mobile Lounge! I have a question about smartphone stock and offers."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#a3e635] hover:bg-lime-400 text-black font-extrabold text-xs px-6 py-3 rounded-2xl shadow-lg transition"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Ask on WhatsApp Directly</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
