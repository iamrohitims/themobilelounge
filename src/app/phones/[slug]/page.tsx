import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dataRepo } from "@/lib/repo";
import { siteConfig } from "@/config/site";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await dataRepo.products.getAll();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await dataRepo.products.getBySlug(slug);

  if (!product) {
    return {
      title: "Smartphone Not Found",
    };
  }

  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const defaultImage = product.images[0]?.src || siteConfig.ogImage;

  return {
    title: `${product.name} in Kakod | Official MRP ${lowestPrice.toLocaleString("en-IN")} & 0% EMI`,
    description: `Buy ${product.name} at The Mobile Lounge Kakod. 100% genuine sealed pack, ₹0 downpayment EMI, free smartwatch / earbuds gift hamper, and official brand warranty.`,
    openGraph: {
      title: `${product.name} in Kakod - The Mobile Lounge`,
      description: `Official ${product.brand} sealed pack phone with 0% EMI in Kakod.`,
      images: [
        {
          url: defaultImage.startsWith("http") ? defaultImage : `${siteConfig.url}${defaultImage}`,
          width: 600,
          height: 800,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `${siteConfig.url}/phones/${product.slug}`,
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
