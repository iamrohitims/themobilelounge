import { siteConfig } from "@/config/site";
import { Product } from "@/types/product";
import { FAQ } from "@/types/offer";

/**
 * High-Authority LocalBusiness (MobilePhoneStore) Schema
 * Optimizes local pack ranking for "mobile shop in Kakod", "iPhone store near me", etc.
 */
export function getLocalBusinessSchema() {
  const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

  return {
    "@context": "https://schema.org",
    "@type": "MobilePhoneStore",
    "@id": `${baseUrl}/#store`,
    name: siteConfig.name,
    legalName: "The Mobile Lounge (by Vishal Distributors)",
    alternateName: [
      "The Mobile Lounge Kakod",
      "Vishal Distributors Mobile Lounge",
      "Mobile Lounge Kakod Mandi",
      "Mobile Shop in Kakod",
      "iPhone Store Kakod",
    ],
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: baseUrl,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted:
      "Cash, Credit Card, Debit Card, UPI, Google Pay, PhonePe, Paytm, Bajaj Finserv EMI, TVS Credit, IDFC FIRST Bank Consumer Loan",
    image: [
      `${baseUrl}/og/og-image.png`,
      `${baseUrl}/brand/logo.png`,
      `${baseUrl}/brand/logo-512.png`,
    ],
    logo: `${baseUrl}/brand/logo.png`,
    hasMap: siteConfig.location.googleMapsUrl,
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
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Kakod",
      },
      {
        "@type": "AdministrativeArea",
        name: "Bulandshahr",
      },
      {
        "@type": "AdministrativeArea",
        name: "Jahangirpur",
      },
      {
        "@type": "AdministrativeArea",
        name: "Dankaur",
      },
      {
        "@type": "AdministrativeArea",
        name: "Sikandrabad",
      },
      {
        "@type": "AdministrativeArea",
        name: "Jewar",
      },
      {
        "@type": "AdministrativeArea",
        name: "Rabupura",
      },
      {
        "@type": "AdministrativeArea",
        name: "Greater Noida",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "420",
      reviewCount: "420",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Vishal Distributors",
      url: baseUrl,
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Zero Downpayment 0% EMI Approval Desk",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Free WhatsApp & Contact Data Transfer",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Instant Old Mobile Exchange Spot Cash",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Assured Free 5-in-1 Gift Box Hamper",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Air Conditioned Experience Showroom",
        value: true,
      },
    ],
    sameAs: [
      siteConfig.contact.instagramUrl,
      siteConfig.location.googleMapsUrl,
    ],
  };
}

/**
 * WebSite Schema with Sitelinks Searchbox
 */
export function getWebSiteSchema() {
  const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: siteConfig.name,
    alternateName: [
      "The Mobile Lounge",
      "The Mobile Lounge Kakod",
      "The Mobile Lounge by Vishal Distributors",
    ],
    url: baseUrl,
    inLanguage: ["en-IN", "hi-IN"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/phones?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Organization Schema for Brand Authority & Knowledge Graph
 */
export function getOrganizationSchema() {
  const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: siteConfig.name,
    legalName: "The Mobile Lounge (by Vishal Distributors)",
    url: baseUrl,
    logo: `${baseUrl}/brand/logo.png`,
    image: `${baseUrl}/og/og-image.png`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["Hindi", "English"],
      },
    ],
    sameAs: [
      siteConfig.contact.instagramUrl,
      siteConfig.location.googleMapsUrl,
    ],
  };
}

/**
 * Google Merchant & Rich Snippet Compliant Product Schema
 */
export function getProductSchema(product: Product, currentUrl: string) {
  const baseUrl = siteConfig.canonicalUrl || siteConfig.url;
  const lowestPrice = Math.min(
    ...product.variants.map((v) => v.mrp || v.price)
  );
  const highestPrice = Math.max(
    ...product.variants.map((v) => v.mrp || v.price)
  );
  const defaultVariant = product.variants[0];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) =>
      img.src.startsWith("http") ? img.src : `${baseUrl}${img.src}`
    ),
    description: `Buy ${product.name} at The Mobile Lounge Kakod. 100% genuine sealed pack, ₹0 downpayment EMI with Bajaj/IDFC/TVS, official brand GST warranty, and free gift hampers.`,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    sku: product.id,
    itemCondition: "https://schema.org/NewCondition",
    offers: {
      "@type": "AggregateOffer",
      url: currentUrl,
      priceCurrency: "INR",
      lowPrice: lowestPrice,
      highPrice: highestPrice,
      priceValidUntil: "2027-12-31",
      offerCount: product.variants.length,
      availability: defaultVariant.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/LimitedAvailability",
      seller: {
        "@type": "MobilePhoneStore",
        name: siteConfig.name,
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnInStore",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
          addressRegion: "Uttar Pradesh",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
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
          },
          cutoffTime: "18:00",
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "d",
          },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "420",
    },
  };
}

/**
 * FAQPage Schema
 */
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

/**
 * BreadcrumbList Schema for Enhanced SERP Navigation Snippets
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  const baseUrl = siteConfig.canonicalUrl || siteConfig.url;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}
