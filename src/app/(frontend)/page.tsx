import { dataRepo, getDynamicReels, getHotDeals } from "@/lib/repo";
import { Hero } from "@/components/home/Hero";

export const dynamic = "force-dynamic";
export const revalidate = 0;
import { BudgetChips } from "@/components/home/BudgetChips";
import { BrandGrid } from "@/components/home/BrandGrid";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { DealsBanner } from "@/components/home/DealsBanner";
import { InstagramSection } from "@/components/home/InstagramSection";
import { WhyBuyFromUs } from "@/components/home/WhyBuyFromUs";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { VisitStoreSection } from "@/components/home/VisitStoreSection";
import { LocalSeoSection } from "@/components/home/LocalSeoSection";
import { FaqSection } from "@/components/home/FaqSection";
import { getFaqSchema } from "@/lib/seo";

export default async function HomePage() {
  const [phones, brands, featured, offers, reviews, faqs, dynamicReels, hotDeals] = await Promise.all([
    dataRepo.products.getAll("phone"),
    dataRepo.brands.getAll(),
    dataRepo.products.getFeatured(),
    dataRepo.offers.getAll(),
    dataRepo.reviews.getAll(),
    dataRepo.faqs.getAll(),
    getDynamicReels(),
    getHotDeals(),
  ]);

  const primaryOffer = offers[0];
  const faqSchema = getFaqSchema(faqs.slice(0, 6));

  // Compute live phone count per brand
  const phoneCountByBrand = phones.reduce<Record<string, number>>((acc, p) => {
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

  return (
    <>
      <script
        id="faq-jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 pb-12 space-y-10 sm:space-y-16 w-full max-w-full overflow-hidden">
        {/* 1. Hero Section */}
        <Hero hotDeals={hotDeals} phones={phones} />

        {/* 2. Shop By Budget Recommender & Interactive Slider */}
        <BudgetChips phones={phones} />

        {/* 3. Shop by Brand Logo Grid (Ordered High to Low by phone count) */}
        <BrandGrid brands={enrichedBrands} />

        {/* 4. New Arrivals Carousel */}
        <ProductCarousel
          title="New Smartphone Arrivals"
          subtitle="Latest 2026 flagships and 5G releases with brand warranty in Kakod."
          badge="⚡ FRESH RELEASES"
          products={featured.newArrivals}
          viewAllHref="/phones?sort=newest"
        />

        {/* 5. Today's Deals & Combo Offers Autoscroller (Live DB Offers) */}
        {offers && offers.length > 0 && <DealsBanner offers={offers} />}

        {/* 6. Best Sellers Carousel */}
        <ProductCarousel
          title="Most Demanded Phones in Kakod"
          subtitle="Top customer choices this week with ₹0 downpayment EMI eligibility."
          badge="🔥 BESTSELLERS"
          products={featured.bestSellers}
          viewAllHref="/phones"
        />

        {/* 7. Why Buy From Us (VIP Perks) */}
        <WhyBuyFromUs />

        {/* 8. Curated Instagram Feed & Store Deliveries */}
        <InstagramSection reels={dynamicReels} />

        {/* 9. Customer Love & Reviews */}
        <CustomerReviews reviews={reviews} />

        {/* 10. Regional Local Coverage (Local SEO & Surrounding Towns) */}
        <LocalSeoSection />

        {/* 11. Visit Store (Map + Live Timings Badge) */}
        <VisitStoreSection />

        {/* 12. Frequently Asked Questions */}
        <FaqSection faqs={faqs} />
      </div>
    </>
  );
}
