import { siteConfig } from "@/config/site";
import { Product } from "@/types/product";
import { FAQ, Review } from "@/types/offer";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MobilePhoneStore",
    "@id": `${siteConfig.url}/#store`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    priceRange: "₹₹₹",
    image: `${siteConfig.url}/og/og-image.png`,
    logo: `${siteConfig.url}/brand/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.location.addressLine1,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      postalCode: siteConfig.location.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.location.coordinates.lat,
      longitude: siteConfig.location.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: siteConfig.location.openingHours.opens,
        closes: siteConfig.location.openingHours.closes,
      },
    ],
    sameAs: [siteConfig.contact.instagramUrl],
  };
}

export function getProductSchema(product: Product, currentUrl: string) {
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const highestPrice = Math.max(...product.variants.map((v) => v.price));
  const defaultVariant = product.variants[0];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) =>
      img.src.startsWith("http") ? img.src : `${siteConfig.url}${img.src}`
    ),
    description: `${product.name} available at The Mobile Lounge Kakod with 0% EMI and free gifts.`,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    sku: product.id,
    offers: {
      "@type": "AggregateOffer",
      url: currentUrl,
      priceCurrency: "INR",
      lowPrice: lowestPrice,
      highPrice: highestPrice,
      offerCount: product.variants.length,
      availability: defaultVariant.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/LimitedAvailability",
      seller: {
        "@type": "MobilePhoneStore",
        name: siteConfig.name,
      },
    },
  };
}

export function getFaqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}
