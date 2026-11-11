import { Metadata } from "next";
import { dataRepo } from "@/lib/repo";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import { BrandDirectoryView } from "@/components/brand/BrandDirectoryView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

export const metadata: Metadata = {
  title: "All Smartphone Brands in Kakod | Official Showroom Directory",
  description:
    "Explore all official smartphone brands at The Mobile Lounge Kakod (by Vishal Distributors). Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Oppo, Realme, Xiaomi, Motorola, iQOO, Google Pixel, Nothing & more with 0% downpayment EMI and 100% brand warranty.",
  keywords: [
    "mobile brands kakod",
    "smartphone brands kakod",
    "iphone showroom kakod",
    "samsung store kakod",
    "oneplus store kakod",
    "vivo oppo kakod",
    "the mobile lounge brands",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "All Smartphone Brands in Kakod | The Mobile Lounge",
    description:
      "Explore official smartphone brands at The Mobile Lounge Kakod. 100% sealed pack genuine phones with 0% EMI and free gifts.",
    url: `${baseUrl}/brands`,
    siteName: `${siteConfig.name} (by Vishal Distributors)`,
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Mobile Lounge Kakod Brands Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smartphone Brands in Kakod | The Mobile Lounge",
    description: "Apple, Samsung, OnePlus, Vivo, Xiaomi & 15+ brands on 0% EMI.",
    images: [`${baseUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/brands`,
  },
};

export default async function BrandsPage() {
  const [brands, phones] = await Promise.all([
    dataRepo.brands.getAll(),
    dataRepo.products.getAll("phone"),
  ]);

  // Compute live phone count per brand
  const phoneCountByBrand = phones.reduce<Record<string, number>>((acc, p) => {
    const brandName = p.brand?.trim()?.toLowerCase();
    if (brandName) acc[brandName] = (acc[brandName] || 0) + 1;
    return acc;
  }, {});

  // Strictly sort by phone count high to low
  const sortedBrands = [...brands]
    .map((b) => ({
      ...b,
      phoneCount:
        phoneCountByBrand[b.name.toLowerCase()] ??
        phoneCountByBrand[b.slug.toLowerCase()] ??
        0,
    }))
    .sort((a, b) => {
      if ((b.phoneCount || 0) !== (a.phoneCount || 0)) {
        return (b.phoneCount || 0) - (a.phoneCount || 0);
      }
      return a.name.localeCompare(b.name);
    });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Brand Directory", url: "/brands" },
  ]);

  return (
    <>
      <script
        id="breadcrumb-brands-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BrandDirectoryView brands={sortedBrands} />
    </>
  );
}
