import type { Metadata } from "next";
import { dataRepo } from "@/lib/repo";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema } from "@/lib/seo";
import { CompareView } from "@/components/product/CompareView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

export const metadata: Metadata = {
  title: "Compare Mobile Phones Side-by-Side in Kakod | The Mobile Lounge",
  description:
    "Compare specs, prices, camera features, battery life and 0% EMI options for up to 3 smartphones at The Mobile Lounge Kakod (by Vishal Distributors).",
  keywords: [
    "compare smartphones Kakod",
    "mobile comparison Bulandshahr",
    "iPhone vs Samsung comparison",
    "phone specs comparison",
    "The Mobile Lounge compare",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${baseUrl}/compare`,
    siteName: `${siteConfig.name} (by Vishal Distributors)`,
    title: "Compare Mobile Phones Side-by-Side | The Mobile Lounge Kakod",
    description: "Compare smartphone specs, battery, camera and EMI side-by-side.",
    images: [
      {
        url: `${baseUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Compare Smartphones at The Mobile Lounge Kakod",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Smartphones | The Mobile Lounge Kakod",
    description: "Compare phones side-by-side with 0% EMI calculation.",
    images: [`${baseUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: `${baseUrl}/compare`,
  },
};

export default async function ComparePage() {
  const phones = await dataRepo.products.getAll("phone");
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Compare Phones", url: "/compare" },
  ]);

  return (
    <>
      <script
        id="breadcrumb-compare-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CompareView allPhones={phones} />
    </>
  );
}
