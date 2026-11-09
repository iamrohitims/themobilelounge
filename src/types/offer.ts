export interface Offer {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  code?: string;
  discountValue?: string;
  validUntil: string;
  applicableCategory: "all" | "phones" | "accessories" | "exchange" | "emi";
  applicableBrands?: string[];
  terms: string[];
  bannerColor: string;
  featured: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number; // 1 to 5
  date: string;
  phoneBought: string;
  comment: string;
  verifiedPurchase: boolean;
  source: "Google" | "Store Walk-in" | "Instagram";
  helpfulCount: number;
}

export interface FAQ {
  id: string;
  category: "EMI & Finance" | "Products & Warranty" | "Exchange" | "Store & Visit";
  question: string;
  answer: string;
}
