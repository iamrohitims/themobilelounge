import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { dataRepo } from "@/lib/repo";
import { getBreadcrumbSchema } from "@/lib/seo";
import { CatalogueView } from "@/components/product/CatalogueView";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

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
  const baseUrl = siteConfig.canonicalUrl || siteConfig.url;
  const canonicalUrl = `${baseUrl}/phones/under/${budget}`;

  return {
    title: `${title} | 0% EMI & Free Gifts`,
    description: `Discover top-rated 5G smartphones ${match?.label || "under budget"} available at The Mobile Lounge Kakod (by Vishal Distributors). 5-minute EMI approval, free smartwatch hamper, and official brand warranty.`,
    keywords: [
      `smartphones ${match?.label || "budget"} Kakod`,
      `best phone ${match?.label || "budget"} Bulandshahr`,
      `5G mobile ${match?.label || "budget"} EMI`,
      "The Mobile Lounge",
      "Vishal Distributors",
    ],
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonicalUrl,
      siteName: `${siteConfig.name} (by Vishal Distributors)`,
      title: `${title} | The Mobile Lounge Kakod`,
      description: `Shop the best 5G phones ${match?.label || "in budget"} with ₹0 downpayment EMI & free gift box in Kakod.`,
      images: [
        {
          url: `${baseUrl}/og/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${title} - The Mobile Lounge Kakod`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | The Mobile Lounge`,
      description: `Best phones ${match?.label || "in budget"} with 0% EMI and free gifts in Kakod.`,
      images: [`${baseUrl}/og/og-image.png`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
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
    if (!p.variants || p.variants.length === 0) return false;
    const minMrp = Math.min(
      ...p.variants.map((v) => Number(v.mrp) || 999999)
    );
    const passesMin = match.min !== undefined ? minMrp >= match.min : true;
    const passesMax = match.max !== undefined ? minMrp <= match.max : true;
    return passesMin && passesMax;
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Phones", url: "/phones" },
    { name: match.label, url: `/phones/under/${match.slug}` },
  ]);

  return (
    <>
      <script
        id="breadcrumb-budget-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={<div className="p-8 text-center text-zinc-400">Loading smartphones...</div>}>
        <CatalogueView
          initialProducts={filteredPhones}
          brands={brands}
          lockedMaxPrice={match.max}
          pageTitle={`Best Smartphones ${match.label} in Kakod`}
          pageDescription={`Handpicked top-value 5G smartphones priced ${match.label}. Every phone includes guaranteed free gifts, 100% genuine sealed pack warranty, and ₹0 downpayment financing.`}
        />
      </Suspense>
    </>
  );
}
