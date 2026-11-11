import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { dataRepo } from "@/lib/repo";
import { jsonRepo } from "@/lib/repo/json-repo";

export const revalidate = 3600; // Revalidate every hour for fresh Google crawling

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.canonicalUrl || siteConfig.url;

  // Static High-Impact SEO & Commercial Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/phones`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/emi`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/offers`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/exchange`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/accessories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/reels`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.65,
    },
  ];

  // Dynamic Product Pages (with resilient fallback to jsonRepo)
  let allCatalog: any[] = [];
  try {
    allCatalog = await dataRepo.products.getAll();
    if (!allCatalog || allCatalog.length === 0) {
      allCatalog = await jsonRepo.products.getAll();
    }
  } catch (err) {
    console.error("[SITEMAP] DB fetch failed, falling back to static catalog:", err);
    allCatalog = await jsonRepo.products.getAll();
  }

  const productRoutes: MetadataRoute.Sitemap = allCatalog.map((p) => ({
    url: `${baseUrl}/phones/${p.slug}`,
    lastModified: new Date(p._meta?.lastUpdated || Date.now()),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  // Dynamic Brand Landing Pages
  let brands: any[] = [];
  try {
    brands = await dataRepo.brands.getAll();
    if (!brands || brands.length === 0) {
      brands = await jsonRepo.brands.getAll();
    }
  } catch (err) {
    brands = await jsonRepo.brands.getAll();
  }

  const brandRoutes: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${baseUrl}/phones/brand/${encodeURIComponent(b.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic Budget Landing Pages
  const budgetRoutes: MetadataRoute.Sitemap = siteConfig.budgetRanges.map((b) => ({
    url: `${baseUrl}/phones/under/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes, ...brandRoutes, ...budgetRoutes];
}
