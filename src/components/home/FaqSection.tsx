import Link from "next/link";
import { FAQ } from "@/types/offer";
import { ChevronDown, ArrowRight } from "lucide-react";

interface FaqSectionProps {
  faqs: FAQ[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200 dark:border-white/10 pb-3">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#ff5a1f]">
            QUICK ANSWERS
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-950 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>
        <Link
          href="/faq"
          className="text-xs font-bold text-[#ff5a1f] dark:text-[#c5e84a] hover:underline flex items-center gap-1"
        >
          <span>View All FAQs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.slice(0, 6).map((faq) => (
          <details
            key={faq.id}
            className="bento-card p-4 sm:p-5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl group cursor-pointer shadow-sm hover:shadow-md transition"
          >
            <summary className="font-extrabold text-xs sm:text-sm text-zinc-900 dark:text-white flex items-center justify-between list-none">
              <span>{faq.question}</span>
              <ChevronDown className="w-4 h-4 text-zinc-400 group-open:rotate-180 transition shrink-0 ml-2" />
            </summary>
            <div className="pt-3 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-white/10 mt-3">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
