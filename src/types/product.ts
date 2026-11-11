export type ProductCategory = "phone" | "accessory";

export type ProductTag =
  | "new"
  | "bestseller"
  | "most-demanded"
  | "5g"
  | "gaming"
  | "camera"
  | "budget"
  | "flagship";

export interface ProductVariant {
  id?: string;
  ram?: number; // In GB
  storage?: number; // In GB (or 1000 for 1TB)
  color: string;
  colorHex?: string;
  mrp: number;
  price: number; // The Mobile Lounge Deal Price
  inStock: boolean;
  sku?: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  color?: string;
}

export type SpecSection =
  | "display"
  | "performance"
  | "camera"
  | "battery"
  | "connectivity"
  | "design";

export type ProductSpecs = Record<SpecSection, Record<string, string>>;

export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  subtitle?: string;
  category: ProductCategory;
  subCategory?: string; // e.g. "Charger", "Earbuds", "Cover", "Glass"
  images: ProductImage[];
  variants: ProductVariant[];
  highlights: string[];
  specs: ProductSpecs;
  tags: ProductTag[];
  isHotDeal?: boolean;
  isMostDemanded?: boolean;
  emiAvailable: boolean;
  noCostEmi?: boolean;
  minEmiPerMonth?: number;
  releaseDate: string;
  warranty: string;
  boxContents: string[];
  freeGiftBundle?: string[];
  _meta?: {
    verified: boolean;
    lastUpdated: string;
    source: string;
  };
}

export interface ProductFilterState {
  brand?: string[];
  priceRange?: [number, number];
  ram?: number[];
  storage?: number[];
  fiveGOnly?: boolean;
  emiOnly?: boolean;
  inStockOnly?: boolean;
  searchQuery?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "newest" | "discount";
}
