import productsData from "@/data/products.json";
import accessoriesData from "@/data/accessories.json";
import brandsData from "@/data/brands.json";
import offersData from "@/data/offers.json";
import reviewsData from "@/data/reviews.json";
import faqsData from "@/data/faqs.json";

import { Product, ProductFilterState } from "@/types/product";
import { Brand } from "@/types/brand";
import { Offer, Review, FAQ } from "@/types/offer";
import {
  IDataRepository,
  IProductRepository,
  IBrandRepository,
  IOfferRepository,
  IReviewRepository,
  IFAQRepository,
} from "./interface";

const allCatalogItems: Product[] = [
  ...(productsData as unknown as Product[]),
  ...(accessoriesData as unknown as Product[]),
];

class JsonProductRepository implements IProductRepository {
  async getAll(category?: "phone" | "accessory"): Promise<Product[]> {
    if (!category) return allCatalogItems;
    return allCatalogItems.filter((p) => p.category === category);
  }

  async getBySlug(slug: string): Promise<Product | null> {
    const item = allCatalogItems.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
    return item || null;
  }

  async getByBrand(brand: string): Promise<Product[]> {
    const brandLower = brand.toLowerCase();
    return allCatalogItems.filter((p) => p.brand.toLowerCase() === brandLower);
  }

  async getFeatured(): Promise<{
    newArrivals: Product[];
    bestSellers: Product[];
    flagships: Product[];
  }> {
    const phones = allCatalogItems.filter((p) => p.category === "phone");

    const newArrivals = phones.filter((p) => p.tags.includes("new")).slice(0, 8);
    const bestSellers = phones.filter((p) => p.tags.includes("bestseller")).slice(0, 8);
    const flagships = phones.filter((p) => p.tags.includes("flagship")).slice(0, 8);

    return {
      newArrivals: newArrivals.length ? newArrivals : phones.slice(0, 8),
      bestSellers: bestSellers.length ? bestSellers : phones.slice(0, 8),
      flagships: flagships.length ? flagships : phones.slice(0, 8),
    };
  }

  async getFiltered(
    filters: ProductFilterState
  ): Promise<{ products: Product[]; total: number }> {
    let list = allCatalogItems.filter((p) => p.category === "phone");

    if (filters.brand && filters.brand.length > 0) {
      const lowerBrands = filters.brand.map((b) => b.toLowerCase());
      list = list.filter((p) => lowerBrands.includes(p.brand.toLowerCase()));
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      list = list.filter((p) => {
        const lowestPrice = Math.min(...p.variants.map((v) => v.price));
        return lowestPrice >= min && lowestPrice <= max;
      });
    }

    if (filters.ram && filters.ram.length > 0) {
      list = list.filter((p) =>
        p.variants.some((v) => v.ram && filters.ram?.includes(v.ram))
      );
    }

    if (filters.storage && filters.storage.length > 0) {
      list = list.filter((p) =>
        p.variants.some((v) => v.storage && filters.storage?.includes(v.storage))
      );
    }

    if (filters.fiveGOnly) {
      list = list.filter((p) => p.tags.includes("5g") || p.name.includes("5G"));
    }

    if (filters.emiOnly) {
      list = list.filter((p) => p.emiAvailable);
    }

    if (filters.inStockOnly) {
      list = list.filter((p) => p.variants.some((v) => v.inStock));
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.highlights.some((h) => h.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (filters.sort) {
      case "price-asc":
        list.sort((a, b) => {
          const minA = Math.min(...a.variants.map((v) => v.price));
          const minB = Math.min(...b.variants.map((v) => v.price));
          return minA - minB;
        });
        break;
      case "price-desc":
        list.sort((a, b) => {
          const maxA = Math.max(...a.variants.map((v) => v.price));
          const maxB = Math.max(...b.variants.map((v) => v.price));
          return maxB - maxA;
        });
        break;
      case "newest":
        list.sort(
          (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
        break;
      case "discount":
        list.sort((a, b) => {
          const discA = Math.max(
            ...a.variants.map((v) => ((v.mrp - v.price) / (v.mrp || 1)) * 100)
          );
          const discB = Math.max(
            ...b.variants.map((v) => ((v.mrp - v.price) / (v.mrp || 1)) * 100)
          );
          return discB - discA;
        });
        break;
      case "featured":
      default:
        // Prioritize new, then bestsellers
        list.sort((a, b) => {
          const scoreA = (a.tags.includes("bestseller") ? 2 : 0) + (a.tags.includes("new") ? 3 : 0);
          const scoreB = (b.tags.includes("bestseller") ? 2 : 0) + (b.tags.includes("new") ? 3 : 0);
          return scoreB - scoreA;
        });
        break;
    }

    return {
      products: list,
      total: list.length,
    };
  }

  async getSimilar(productId: string, brand: string, limit = 4): Promise<Product[]> {
    return allCatalogItems
      .filter((p) => p.id !== productId && p.category === "phone" && p.brand.toLowerCase() === brand.toLowerCase())
      .slice(0, limit);
  }

  async search(query: string): Promise<Product[]> {
    if (!query || query.trim().length === 0) return [];
    const q = query.toLowerCase().trim();
    return allCatalogItems
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(q))
      )
      .slice(0, 10);
  }
}

class JsonBrandRepository implements IBrandRepository {
  async getAll(): Promise<Brand[]> {
    return brandsData as Brand[];
  }

  async getBySlug(slug: string): Promise<Brand | null> {
    const brand = (brandsData as Brand[]).find(
      (b) => b.slug.toLowerCase() === slug.toLowerCase() || b.name.toLowerCase() === slug.toLowerCase()
    );
    return brand || null;
  }
}

class JsonOfferRepository implements IOfferRepository {
  async getAll(): Promise<Offer[]> {
    return offersData as Offer[];
  }

  async getFeatured(): Promise<Offer[]> {
    return (offersData as Offer[]).filter((o) => o.featured);
  }
}

class JsonReviewRepository implements IReviewRepository {
  async getAll(): Promise<Review[]> {
    return reviewsData as Review[];
  }

  async getStats(): Promise<{ averageRating: number; totalReviews: number }> {
    const reviews = reviewsData as Review[];
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = total > 0 ? parseFloat((sum / total).toFixed(1)) : 5.0;
    return {
      averageRating: avg,
      totalReviews: total,
    };
  }
}

class JsonFAQRepository implements IFAQRepository {
  async getAll(): Promise<FAQ[]> {
    return faqsData as FAQ[];
  }
}

export const jsonRepo: IDataRepository = {
  products: new JsonProductRepository(),
  brands: new JsonBrandRepository(),
  offers: new JsonOfferRepository(),
  reviews: new JsonReviewRepository(),
  faqs: new JsonFAQRepository(),
};
