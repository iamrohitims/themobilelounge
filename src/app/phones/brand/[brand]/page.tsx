import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dataRepo } from "@/lib/repo";
import { CatalogueView } from "@/components/product/CatalogueView";

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
  return {
    title: `${decodedBrand} Smartphones in Kakod | Best Price & 0% EMI`,
    description: `Buy genuine sealed-pack ${decodedBrand} smartphones at The Mobile Lounge Kakod. 100% brand warranty, instant ₹0 downpayment EMI, and free gifts with every phone.`,
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

  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400">Loading {brandObj.name} phones...</div>}>
      <CatalogueView
        initialProducts={brandPhones}
        brands={brands}
        lockedBrand={brandObj.name}
        pageTitle={`${brandObj.name} Smartphones in Kakod`}
        pageDescription={`Official ${brandObj.name} showroom stock at The Mobile Lounge (by Vishal Distributors). Get the latest sealed-pack models at special offline deal prices with ₹0 downpayment EMI.`}
      />
    </Suspense>
  );
}
