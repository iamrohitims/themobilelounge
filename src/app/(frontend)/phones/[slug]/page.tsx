import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dataRepo } from "@/lib/repo";
import { siteConfig } from "@/config/site";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await dataRepo.products.getAll();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  let product = null;
  try {
    product = await dataRepo.products.getBySlug(slug);
  } catch {
    // fallback if DB times out
  }

  if (!product) {
    return {
      title: "Smartphone Not Found",
    };
  }

  const baseUrl = siteConfig.canonicalUrl || siteConfig.url;
  const lowestPrice = Math.min(...product.variants.map((v) => v.mrp || v.price));
  const defaultImage = product.images[0]?.src || siteConfig.ogImage;
  const imageUrl = defaultImage.startsWith("http") ? defaultImage : `${baseUrl}${defaultImage}`;

  return {
    title: `${product.name} in Kakod | Official Price ₹${lowestPrice.toLocaleString("en-IN")} & 0% EMI`,
    description: `Buy genuine sealed-pack ${product.name} at The Mobile Lounge Kakod (by Vishal Distributors). ₹0 downpayment EMI with Bajaj/IDFC/TVS, 1-year brand warranty with GST bill & assured free gift hampers.`,
    keywords: [
      product.name,
      `${product.name} in Kakod`,
      `${product.name} price in Kakod`,
      `${product.name} EMI Kakod`,
      `${product.name} Bulandshahr`,
      `${product.brand} store Kakod`,
      "The Mobile Lounge Kakod",
      "Vishal Distributors mobile",
    ],
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `${baseUrl}/phones/${product.slug}`,
      siteName: `${siteConfig.name} (by Vishal Distributors)`,
      title: `${product.name} in Kakod | 0% EMI & Free Gifts - The Mobile Lounge`,
      description: `Buy 100% sealed-pack ${product.name} with official GST warranty, ₹0 downpayment EMI & free gift hamper in Kakod.`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: `${product.name} - The Mobile Lounge Kakod`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} in Kakod - The Mobile Lounge`,
      description: `Buy ${product.name} in Kakod with ₹0 downpayment 0% EMI and assured free gifts.`,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/phones/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await dataRepo.products.getBySlug(slug);

  if (!product) {
    notFound();
  }

  const [similarProducts, accessories] = await Promise.all([
    dataRepo.products.getSimilar(product.id, product.brand, 4),
    dataRepo.products.getAll("accessory"),
  ]);

  const currentUrl = `${siteConfig.url}/phones/${product.slug}`;
  const productSchema = getProductSchema(product, currentUrl);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Phones", url: "/phones" },
    { name: product.brand, url: `/phones/brand/${product.brand}` },
    { name: product.name, url: `/phones/${product.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProductDetailClient
        product={product}
        similarProducts={similarProducts}
        accessories={accessories}
      />
    </>
  );
}
