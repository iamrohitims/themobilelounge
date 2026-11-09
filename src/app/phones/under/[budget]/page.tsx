import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { dataRepo } from "@/lib/repo";
import { CatalogueView } from "@/components/product/CatalogueView";

interface BudgetPageProps {
  params: Promise<{ budget: string }>;
}

export async function generateStaticParams() {
  return siteConfig.budgetRanges.map((b) => ({ budget: b.slug }));
}

export async function generateMetadata({ params }: BudgetPageProps): Promise<Metadata> {
  const { budget } = await params;
  const match = siteConfig.budgetRanges.find((r) => r.slug === budget);
  const title = match ? `Best Smartphones ${match.label} in Kakod` : "Best Budget Smartphones in Kakod";
  return {
    title: `${title} | 0% EMI & Free Gifts`,
    description: `Discover top-rated 5G smartphones ${match?.label || "under budget"} available at The Mobile Lounge Kakod. 5-minute EMI approval, free smartwatch hamper, and official brand warranty.`,
  };
}

export default async function BudgetPage({ params }: BudgetPageProps) {
  const { budget } = await params;
  const match = siteConfig.budgetRanges.find((r) => r.slug === budget);

  if (!match) {
    notFound();
  }

  const [allPhones, brands] = await Promise.all([
    dataRepo.products.getAll("phone"),
    dataRepo.brands.getAll(),
  ]);

  const filteredPhones = allPhones.filter((p) => {
    const minPrice = Math.min(...p.variants.map((v) => v.price));
    const passesMin = match.min !== undefined ? minPrice >= match.min : true;
    const passesMax = match.max !== undefined ? minPrice <= match.max : true;
    return passesMin && passesMax;
  });

  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400">Loading smartphones...</div>}>
      <CatalogueView
        initialProducts={filteredPhones}
        brands={brands}
        lockedMaxPrice={match.max}
        pageTitle={`Best Smartphones ${match.label} in Kakod`}
        pageDescription={`Handpicked top-value 5G smartphones priced ${match.label}. Every phone includes guaranteed free gifts, 100% genuine sealed pack warranty, and ₹0 downpayment financing.`}
      />
    </Suspense>
  );
}
