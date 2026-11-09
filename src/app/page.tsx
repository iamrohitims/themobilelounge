import { dataRepo } from "@/lib/repo";
import { Hero } from "@/components/home/Hero";
import { BudgetChips } from "@/components/home/BudgetChips";
import { BrandGrid } from "@/components/home/BrandGrid";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { DealsBanner } from "@/components/home/DealsBanner";
import { InstagramSection } from "@/components/home/InstagramSection";
import { WhyBuyFromUs } from "@/components/home/WhyBuyFromUs";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { VisitStoreSection } from "@/components/home/VisitStoreSection";
import { FaqSection } from "@/components/home/FaqSection";
import { getFaqSchema } from "@/lib/seo";

export default async function HomePage() {
  const [phones, brands, featured, offers, reviews, faqs] = await Promise.all([
    dataRepo.products.getAll("phone"),
    dataRepo.brands.getAll(),
    dataRepo.products.getFeatured(),
    dataRepo.offers.getAll(),
    dataRepo.reviews.getAll(),
    dataRepo.faqs.getAll(),
  ]);

  const primaryOffer = offers[0];
  const faqSchema = getFaqSchema(faqs.slice(0, 6));

  return (
    <>
      <script
        id="faq-jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-12 space-y-12 sm:space-y-16">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Shop By Budget Recommender & Interactive Slider */}
        <BudgetChips phones={phones} />

        {/* 3. Shop by Brand Logo Grid */}
        <BrandGrid brands={brands} />

        {/* 4. New Arrivals Carousel */}
        <ProductCarousel
          title="New Smartphone Arrivals"
          subtitle="Latest 2026 flagships and 5G releases with brand warranty in Kakod."
          badge="⚡ FRESH RELEASES"
          products={featured.newArrivals}
          viewAllHref="/phones?sort=newest"
        />

        {/* 5. Today's Deals Banner With Live Countdown */}
        {primaryOffer && <DealsBanner offer={primaryOffer} />}

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
        <InstagramSection />

        {/* 9. Customer Love & Reviews */}
        <CustomerReviews reviews={reviews} />

        {/* 10. Visit Store (Map + Live Timings Badge) */}
        <VisitStoreSection />

        {/* 11. Frequently Asked Questions */}
        <FaqSection faqs={faqs} />
      </div>
    </>
  );
}
