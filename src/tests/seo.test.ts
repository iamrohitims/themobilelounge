import { describe, it, expect } from "vitest";
import {
  getLocalBusinessSchema,
  getWebSiteSchema,
  getOrganizationSchema,
  getProductSchema,
  getBreadcrumbSchema,
  getFaqSchema,
} from "@/lib/seo";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { siteConfig } from "@/config/site";

describe("SEO & Schema.org Structured Data", () => {
  it("generates valid LocalBusiness / MobilePhoneStore schema", () => {
    const schema = getLocalBusinessSchema();
    expect(schema["@type"]).toBe("MobilePhoneStore");
    expect(schema.name).toBe(siteConfig.name);
    expect(schema.telephone).toBe(siteConfig.contact.phone);
    expect(schema.address["@type"]).toBe("PostalAddress");
    expect(schema.address.addressLocality).toBe("Kakod");
    expect(schema.address.postalCode).toBe("203201");
    expect(schema.geo["@type"]).toBe("GeoCoordinates");
    expect(schema.geo.latitude).toBe(28.256);
    expect(schema.aggregateRating.ratingValue).toBe("4.9");
    expect(schema.areaServed).toBeInstanceOf(Array);
    expect(schema.areaServed.some((a: any) => a.name === "Kakod")).toBe(true);
    expect(schema.areaServed.some((a: any) => a.name === "Bulandshahr")).toBe(true);
  });

  it("generates valid WebSite schema with SearchAction", () => {
    const schema = getWebSiteSchema();
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.potentialAction["@type"]).toBe("SearchAction");
    expect(schema.potentialAction.target.urlTemplate).toContain("/phones?q={search_term_string}");
  });

  it("generates valid Organization schema", () => {
    const schema = getOrganizationSchema();
    expect(schema["@type"]).toBe("Organization");
    expect(schema.legalName).toContain("Vishal Distributors");
  });

  it("generates valid BreadcrumbList schema", () => {
    const crumbs = [
      { name: "Home", url: "/" },
      { name: "Phones", url: "/phones" },
      { name: "Apple", url: "/phones/brand/Apple" },
    ];
    const schema = getBreadcrumbSchema(crumbs);
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[2].name).toBe("Apple");
  });

  it("generates valid FAQPage schema", () => {
    const faqs = [
      { id: "1", category: "General", question: "Where is the shop?", answer: "In Kakod Mandi." },
    ];
    const schema = getFaqSchema(faqs as any);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity[0].name).toBe("Where is the shop?");
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe("In Kakod Mandi.");
  });

  it("generates valid Product schema with AggregateOffer and Merchant guidelines", () => {
    const dummyProduct: any = {
      id: "test-phone",
      name: "Apple iPhone 16",
      brand: "Apple",
      slug: "apple-iphone-16",
      images: [{ src: "/uploads/products/iphone16.webp" }],
      variants: [
        { ram: "8GB", storage: "128GB", color: "Black", price: 79900, mrp: 79900, inStock: true },
      ],
    };
    const schema = getProductSchema(dummyProduct, "https://themobilelounge.com/phones/apple-iphone-16");
    expect(schema["@type"]).toBe("Product");
    expect(schema.name).toBe("Apple iPhone 16");
    expect(schema.brand.name).toBe("Apple");
    expect(schema.offers["@type"]).toBe("AggregateOffer");
    expect(schema.offers.priceCurrency).toBe("INR");
    expect(schema.offers.lowPrice).toBe(79900);
    expect(schema.offers.availability).toBe("https://schema.org/InStock");
    expect(schema.offers.hasMerchantReturnPolicy).toBeDefined();
  });
});

describe("Robots & Sitemap Route Handlers", () => {
  it("robots() disallows /admin/ and /api/ and specifies sitemap.xml", () => {
    const r = robots();
    expect(r.sitemap).toContain("/sitemap.xml");
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    const wildcardRule = rules.find((rule: any) => rule.userAgent === "*");
    expect(wildcardRule?.disallow).toContain("/admin/");
    expect(wildcardRule?.disallow).toContain("/api/");
  });

  it("sitemap() successfully resolves all static and dynamic routes", async () => {
    const sm = await sitemap();
    expect(Array.isArray(sm)).toBe(true);
    expect(sm.length).toBeGreaterThan(10);
    const urls = sm.map((entry) => entry.url);

    // Core static pages
    expect(urls.some((u) => u.endsWith("/phones"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/emi"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/contact"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/offers"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/brands"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/reviews"))).toBe(true);

    // Priority checks
    const homeEntry = sm.find((entry) => entry.url === siteConfig.canonicalUrl || entry.url === siteConfig.url);
    expect(homeEntry?.priority).toBe(1.0);
  });
});
