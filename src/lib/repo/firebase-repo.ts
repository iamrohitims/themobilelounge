/**
 * Phase 2 (Optional): Firebase Adapter Stub
 * 
 * To activate Firebase Firestore in Phase 2:
 * 1. Install firebase: `pnpm add firebase`
 * 2. Configure .env.local with NEXT_PUBLIC_FIREBASE_API_KEY, etc.
 * 3. Initialize Firebase App and initialize Firestore collections:
 *    - 'products'
 *    - 'brands'
 *    - 'offers'
 *    - 'reviews'
 *    - 'faqs'
 * 4. Switch the export in src/lib/repo/index.ts from jsonRepo to firebaseRepo.
 */

import {
  IDataRepository,
  IProductRepository,
  IBrandRepository,
  IOfferRepository,
  IReviewRepository,
  IFAQRepository,
} from "./interface";
import { Product, ProductFilterState } from "@/types/product";
import { Brand } from "@/types/brand";
import { Offer, Review, FAQ } from "@/types/offer";
import { jsonRepo } from "./json-repo";

class FirebaseProductRepository implements IProductRepository {
  async getAll(category?: "phone" | "accessory"): Promise<Product[]> {
    // Phase 2 implementation:
    // const q = category ? query(collection(db, 'products'), where('category', '==', category)) : collection(db, 'products');
    // const snapshot = await getDocs(q);
    // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    return jsonRepo.products.getAll(category);
  }

  async getBySlug(slug: string): Promise<Product | null> {
    // const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
    return jsonRepo.products.getBySlug(slug);
  }

  async getByBrand(brand: string): Promise<Product[]> {
    return jsonRepo.products.getByBrand(brand);
  }

  async getFeatured() {
    return jsonRepo.products.getFeatured();
  }

  async getFiltered(filters: ProductFilterState) {
    return jsonRepo.products.getFiltered(filters);
  }

  async getSimilar(productId: string, brand: string, limit = 4) {
    return jsonRepo.products.getSimilar(productId, brand, limit);
  }

  async search(query: string) {
    return jsonRepo.products.search(query);
  }
}

class FirebaseBrandRepository implements IBrandRepository {
  async getAll(): Promise<Brand[]> {
    return jsonRepo.brands.getAll();
  }
  async getBySlug(slug: string): Promise<Brand | null> {
    return jsonRepo.brands.getBySlug(slug);
  }
}

class FirebaseOfferRepository implements IOfferRepository {
  async getAll(): Promise<Offer[]> {
    return jsonRepo.offers.getAll();
  }
  async getFeatured(): Promise<Offer[]> {
    return jsonRepo.offers.getFeatured();
  }
}

class FirebaseReviewRepository implements IReviewRepository {
  async getAll(): Promise<Review[]> {
    return jsonRepo.reviews.getAll();
  }
  async getStats() {
    return jsonRepo.reviews.getStats();
  }
}

class FirebaseFAQRepository implements IFAQRepository {
  async getAll(): Promise<FAQ[]> {
    return jsonRepo.faqs.getAll();
  }
}

export const firebaseRepo: IDataRepository = {
  products: new FirebaseProductRepository(),
  brands: new FirebaseBrandRepository(),
  offers: new FirebaseOfferRepository(),
  reviews: new FirebaseReviewRepository(),
  faqs: new FirebaseFAQRepository(),
};
