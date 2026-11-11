const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
const canonicalBaseUrl =
  rawUrl && !rawUrl.includes("localhost") && !rawUrl.includes("127.0.0.1")
    ? rawUrl.replace(/\/$/, "")
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://themobilelounge.com";

export const siteConfig = {
  name: "The Mobile Lounge",
  tagline: "Kakod's #1 iPhone, 5G Smartphone & Gadget Hub",
  subtitle: "by Vishal Distributors",
  description:
    "Explore the latest Apple iPhones, Samsung Galaxy, OnePlus, Vivo and 5G smartphones in Kakod. ₹0 downpayment EMI, instant finance, assured free gifts & 100% genuine brand warranty with GST bill.",
  url: canonicalBaseUrl,
  canonicalUrl: canonicalBaseUrl,
  ogImage: "/og/og-image.png",
  logo: "/brand/logo.png",

  // Business & Contact Details (Single Source of Truth)
  contact: {
    phone: "+91 70172 89590",
    phoneRaw: "+917017289590",
    whatsapp: "917017289590",
    whatsappDisplay: "+91 70172 89590",
    email: "contact@themobilelounge.com",
    instagramHandle: "themobilelounge_kakod",
    instagramUrl: "https://www.instagram.com/themobilelounge_kakod/",
  },

  // Physical Location & Opening Hours
  location: {
    addressLine1: "Main Market, Near Vishal Distributors",
    city: "Kakod",
    district: "Bulandshahr",
    state: "Uttar Pradesh",
    pincode: "203201",
    fullAddress:
      "Main Market, Near Vishal Distributors, Kakod, District Bulandshahr, Uttar Pradesh - 203201",
    googleMapsUrl:
      "https://share.google/8qhHVs7TmFxegJl1N",
    googleMapsEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=77.826%2C28.251%2C77.842%2C28.261&layer=mapnik&marker=28.256%2C77.834",
    coordinates: {
      lat: 28.256,
      lng: 77.834,
    },
    openingHours: {
      days: "Monday – Sunday (Open All 7 Days)",
      opens: "09:30",
      closes: "21:00",
      display: "9:30 AM – 9:00 PM",
    },
  },

  // Stocked Brands
  brands: [
    "Apple",
    "Samsung",
    "OnePlus",
    "Vivo",
    "Oppo",
    "Realme",
    "Xiaomi",
    "Motorola",
    "iQOO",
    "Poco",
    "Google",
    "Nothing",
    "Tecno",
    "Infinix",
    "Honor",
    "Nokia",
    "Lava",
    "Asus",
    "Sony",
  ],

  // In-Store Guarantees & Perks
  perks: [
    {
      icon: "ShieldCheck",
      title: "100% Genuine Sealed Pack",
      desc: "Every device comes with official brand GST invoice & valid Indian warranty.",
      hindi: "100% असली पक्का बिल और ब्रांड वारंटी",
    },
    {
      icon: "CreditCard",
      title: "₹0 Downpayment Easy EMI",
      desc: "5-minute approval with just Aadhaar & PAN card. Bajaj, IDFC, TVS & cards.",
      hindi: "सिर्फ आधार व पैन कार्ड पर 5 मिनट में आसान किश्तें",
    },
    {
      icon: "Gift",
      title: "Free 5-in-1 Mystery Gift Box",
      desc: "Assured Smartwatch / ANC Earbuds + 9H Glass + Cover with every smartphone.",
      hindi: "हर स्मार्टफोन के साथ पक्का मुफ़्त गिफ़्ट और सुरक्षा किट",
    },
    {
      icon: "RefreshCw",
      title: "Top Old Phone Exchange Value",
      desc: "Instant spot evaluation for any 4G/5G mobile. Amount deducted on the spot.",
      hindi: "पुराने फोन का तुरंत सबसे बेहतरीन एक्सचेंज दाम",
    },
    {
      icon: "Headphones",
      title: "Free Data & WhatsApp Transfer",
      desc: "Switching from Android to iPhone? Our staff transfers all your chats & photos free.",
      hindi: "मुफ़्त डेटा व व्हाट्सएप ट्रांसफर सपोर्ट",
    },
    {
      icon: "Sparkles",
      title: "Authorized Brand Warranty",
      desc: "100% genuine brand warranty support directly handled at authorized service centers.",
      hindi: "100% अधिकृत ब्रांड वारंटी और काउंटर सहायता",
    },
  ],

  // Social Proof Stats
  stats: [
    { value: "1,150+", label: "Instagram Followers", sublabel: "@themobilelounge_kakod" },
    { value: "5,000+", label: "Happy Customers", sublabel: "Across Kakod & NCR" },
    { value: "10+", label: "Top Smartphone Brands", sublabel: "Official Retail Stock" },
    { value: "5 Mins", label: "Instant EMI Approval", sublabel: "Paperless Finance" },
  ],

  // Budget Filter Bands
  budgetRanges: [
    { label: "Under ₹10,000", max: 10000, slug: "under-10000" },
    { label: "₹10,000 – ₹15,000", min: 10000, max: 15000, slug: "10000-to-15000" },
    { label: "₹15,000 – ₹20,000", min: 15000, max: 20000, slug: "15000-to-20000" },
    { label: "₹20,000 – ₹30,000", min: 20000, max: 30000, slug: "20000-to-30000" },
    { label: "₹30,000 – ₹50,000", min: 30000, max: 50000, slug: "30000-to-50000" },
    { label: "₹50,000+", min: 50000, max: 200000, slug: "above-50000" },
  ],
};

export type SiteConfig = typeof siteConfig;
