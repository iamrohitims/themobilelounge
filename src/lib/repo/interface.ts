import { Product, ProductFilterState } from "@/types/product";
import { Brand } from "@/types/brand";
import { Offer, Review, FAQ } from "@/types/offer";

export interface IProductRepository {
  getAll(category?: "phone" | "accessory"): Promise<Product[]>;
  getBySlug(slug: string): Promise<Product | null>;
  getByBrand(brand: string): Promise<Product[]>;
  getFeatured(): Promise<{ newArrivals: Product[]; bestSellers: Product[]; flagships: Product[] }>;
  getFiltered(filters: ProductFilterState): Promise<{ products: Product[]; total: number }>;
  getSimilar(productId: string, brand: string, limit?: number): Promise<Product[]>;
  search(query: string): Promise<Product[]>;
}

export interface IBrandRepository {
  getAll(): Promise<Brand[]>;
  getBySlug(slug: string): Promise<Brand | null>;
}

export interface IOfferRepository {
  getAll(): Promise<Offer[]>;
  getFeatured(): Promise<Offer[]>;
}

export interface IReviewRepository {
  getAll(): Promise<Review[]>;
  getStats(): Promise<{ averageRating: number; totalReviews: number }>;
}

export interface IFAQRepository {
  getAll(): Promise<FAQ[]>;
}

export interface IDataRepository {
  products: IProductRepository;
  brands: IBrandRepository;
  offers: IOfferRepository;
  reviews: IReviewRepository;
  faqs: IFAQRepository;
}
