import { Suspense } from "react";
import type { Metadata } from "next";
import { dataRepo } from "@/lib/repo";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import { CatalogueView } from "@/components/product/CatalogueView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

export const metadata: Metadata = {
  title: "All Smartphones in Kakod | iPhones, Samsung, 5G Mobiles (0% EMI)",
  description:
    "Explore the complete smartphone catalogue at The Mobile Lounge Kakod (by Vishal Distributors). 100% genuine sealed-pack iPhones, Samsung Galaxy, OnePlus, Vivo with ₹0 downpayment 0% EMI and free gift hamper.",
  keywords: [
    "smartphones in Kakod",
    "mobile catalogue Kakod",
    "buy iPhone Kakod",
    "Samsung phone price Bulandshahr",
    "OnePlus phone showroom Kakod",
    "5G mobile on EMI Kakod",
    "The Mobile Lounge phones",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${baseUrl}/phones`,
    siteName: `${siteConfig.name} (by Vishal Distributors)`,
    title: "All Smartphones in Kakod | The Mobile Lounge",
    description:
      "Browse official Apple, Samsung, OnePlus, Vivo 5G smartphones in Kakod. ₹0 downpayment EMI & free gift hampers.",
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Mobile Lounge Kakod - Smartphone Catalogue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Smartphones in Kakod | The Mobile Lounge",
    description: "Browse official sealed-pack phones with 0% EMI and free gifts in Kakod.",
    images: [`${baseUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/phones`,
  },
};

export default async function PhonesPage() {
  const [products, brands] = await Promise.all([
    dataRepo.products.getAll("phone"),
    dataRepo.brands.getAll(),
  ]);

  const phoneCountByBrand = products.reduce<Record<string, number>>((acc, p) => {
    const brandName = p.brand?.trim()?.toLowerCase();
    if (brandName) acc[brandName] = (acc[brandName] || 0) + 1;
    return acc;
  }, {});

  const enrichedBrands = brands.map((b) => ({
    ...b,
    phoneCount:
      phoneCountByBrand[b.name.toLowerCase()] ??
      phoneCountByBrand[b.slug.toLowerCase()] ??
      0,
  }));

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Smartphones", url: "/phones" },
  ]);

  return (
    <>
      <script
        id="breadcrumb-phones-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={<div className="p-8 text-center text-zinc-400">Loading catalogue...</div>}>
        <CatalogueView initialProducts={products} brands={enrichedBrands} />
      </Suspense>
    </>
  );
}
