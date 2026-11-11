import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dataRepo } from "@/lib/repo";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import { CatalogueView } from "@/components/product/CatalogueView";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export async function generateStaticParams() {
  const brands = await dataRepo.brands.getAll();
  return brands.map((b) => ({ brand: b.name }));
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { brand } = await params;
  const decodedBrand = decodeURIComponent(brand);
  const baseUrl = siteConfig.canonicalUrl || siteConfig.url;
  const canonicalUrl = `${baseUrl}/phones/brand/${encodeURIComponent(decodedBrand)}`;

  return {
    title: `${decodedBrand} Smartphones in Kakod | Best Price & 0% EMI`,
    description: `Buy genuine sealed-pack ${decodedBrand} smartphones at The Mobile Lounge Kakod (by Vishal Distributors). 100% brand warranty, instant ₹0 downpayment EMI, and free gifts with every phone.`,
    keywords: [
      `${decodedBrand} phone in Kakod`,
      `${decodedBrand} mobile shop Kakod`,
      `${decodedBrand} showroom Bulandshahr`,
      `${decodedBrand} 0% EMI`,
      `${decodedBrand} latest price Kakod`,
      "The Mobile Lounge",
      "Vishal Distributors",
    ],
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonicalUrl,
      siteName: `${siteConfig.name} (by Vishal Distributors)`,
      title: `${decodedBrand} Smartphones in Kakod | The Mobile Lounge`,
      description: `Official ${decodedBrand} smartphones in Kakod with ₹0 downpayment 0% EMI & free gift hampers.`,
      images: [
        {
          url: `${baseUrl}/og/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${decodedBrand} Mobile Store Kakod`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${decodedBrand} Smartphones in Kakod | The Mobile Lounge`,
      description: `Official ${decodedBrand} phones with 0% EMI and free gifts in Kakod.`,
      images: [`${baseUrl}/og/og-image.png`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand } = await params;
  const decodedBrand = decodeURIComponent(brand);

  const [allPhones, brands] = await Promise.all([
    dataRepo.products.getAll("phone"),
    dataRepo.brands.getAll(),
  ]);

  const brandObj = brands.find(
    (b) => b.name.toLowerCase() === decodedBrand.toLowerCase() || b.slug.toLowerCase() === decodedBrand.toLowerCase()
  );

  if (!brandObj) {
    notFound();
  }

  const brandPhones = allPhones.filter(
    (p) => p.brand.toLowerCase() === brandObj.name.toLowerCase()
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Brands", url: "/brands" },
    { name: brandObj.name, url: `/phones/brand/${encodeURIComponent(brandObj.name)}` },
  ]);

  return (
    <>
      <script
        id="breadcrumb-brand-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={<div className="p-8 text-center text-zinc-400">Loading {brandObj.name} phones...</div>}>
        <CatalogueView
          initialProducts={brandPhones}
          brands={brands}
          lockedBrand={brandObj.name}
          pageTitle={`${brandObj.name} Smartphones in Kakod`}
          pageDescription={`Official ${brandObj.name} showroom stock at The Mobile Lounge (by Vishal Distributors). Get the latest sealed-pack models at special offline deal prices with ₹0 downpayment EMI.`}
        />
      </Suspense>
    </>
  );
}
