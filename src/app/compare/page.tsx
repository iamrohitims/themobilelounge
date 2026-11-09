import type { Metadata } from "next";
import { dataRepo } from "@/lib/repo";
import { CompareView } from "@/components/product/CompareView";

export const metadata: Metadata = {
  title: "Compare Mobile Phones Side-by-Side in Kakod",
  description:
    "Compare specs, prices, camera features, battery life and 0% EMI options for up to 3 smartphones at The Mobile Lounge Kakod.",
};

export default async function ComparePage() {
  const phones = await dataRepo.products.getAll("phone");

  return <CompareView allPhones={phones} />;
}
