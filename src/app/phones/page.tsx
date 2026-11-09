import { Suspense } from "react";
import type { Metadata } from "next";
import { dataRepo } from "@/lib/repo";
import { CatalogueView } from "@/components/product/CatalogueView";

export const metadata: Metadata = {
  title: "All Smartphones in Kakod | iPhones, Samsung, 5G Mobiles",
  description:
    "Explore the complete smartphone catalogue at The Mobile Lounge Kakod. Genuine sealed pack iPhones, Samsung Galaxy, OnePlus, Vivo with 0% EMI and free gift hamper.",
};

export default async function PhonesPage() {
  const [products, brands] = await Promise.all([
    dataRepo.products.getAll("phone"),
    dataRepo.brands.getAll(),
  ]);

  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400">Loading catalogue...</div>}>
      <CatalogueView initialProducts={products} brands={brands} />
    </Suspense>
  );
}
