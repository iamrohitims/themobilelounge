import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Product, ProductFilterState } from '@/types/product'
import { Brand } from '@/types/brand'
import { Offer, Review, FAQ } from '@/types/offer'
import { Reel } from '@/types/reel'
import {
  IDataRepository,
  IProductRepository,
  IBrandRepository,
  IOfferRepository,
  IReviewRepository,
  IFAQRepository,
} from './interface'
import { jsonRepo } from './json-repo'

// Helper to map Payload Accessory Doc to TypeScript Product Interface
function mapPayloadAccessory(doc: any): Product {
  const price = doc.dealPrice || doc.mrp || 999
  const mrp = doc.mrp || price || 1999
  return {
    id: String(doc.id || doc._id),
    slug: doc.slug,
    brand: doc.brand || 'Original Accessories',
    name: doc.name,
    subtitle: doc.subCategory || 'Genuine Mobile Accessory',
    category: 'accessory',
    subCategory: doc.subCategory || '',
    images: doc.image
      ? [{ src: doc.image, alt: doc.name, color: '' }]
      : [{ src: '/brand/logo.png', alt: doc.name, color: '' }],
    variants: [
      {
        ram: 0,
        storage: 0,
        color: 'Standard',
        colorHex: '#000000',
        mrp,
        price,
        inStock: doc.inStock ?? true,
        sku: doc.slug,
      },
    ],
    highlights: (doc.highlights || []).map((h: any) =>
      typeof h === 'string' ? h : h.text || h.highlight || ''
    ),
    specs: {
      display: {},
      performance: {
        Compatibility: doc.compatibility || 'Universal Type-C / Lightning',
        Category: doc.subCategory || 'Accessory',
      },
      camera: {},
      battery: {},
      connectivity: {
        Compatibility: doc.compatibility || 'Universal',
      },
      design: {
        Type: doc.subCategory || 'Mobile Accessory',
      },
    },
    tags: ['accessory', (doc.subCategory || '').toLowerCase()].filter(Boolean),
    emiAvailable: false,
    noCostEmi: false,
    releaseDate: doc.createdAt ? new Date(doc.createdAt).toISOString().split('T')[0] : '',
    warranty: '100% Genuine Brand Warranty with GST Bill',
    boxContents: ['1 Unit Sealed Pack Accessory', 'Brand Invoice & Documentation'],
    freeGiftBundle: [],
    isHotDeal: false,
    isMostDemanded: false,
  }
}

// Helper to map Payload Product Doc to TypeScript Product Interface
function mapPayloadProduct(doc: any): Product & { isHotDeal?: boolean; hotDealBadge?: string; freeGift?: string; emiMonthly?: number; specBadge?: string } {
  return {
    id: String(doc.id || doc._id),
    slug: doc.slug,
    brand: doc.brand,
    name: doc.name,
    subtitle: doc.subtitle || '',
    category: doc.category || 'phone',
    subCategory: doc.subCategory || '',
    images: (doc.images || []).map((img: any) => ({
      src: img.src,
      alt: img.alt || '',
      color: img.color || '',
    })),
    variants: (doc.variants || []).map((v: any) => ({
      ram: v.ram,
      storage: v.storage,
      color: v.color,
      colorHex: v.colorHex || '#000000',
      mrp: v.mrp,
      price: v.price,
      inStock: v.inStock ?? true,
      sku: v.sku || '',
    })),
    highlights: (doc.highlights || []).map((h: any) => (typeof h === 'string' ? h : h.highlight || '')),
    specs: doc.specs || {},
    tags: doc.tags || ['5g'],
    emiAvailable: doc.emiAvailable ?? true,
    noCostEmi: doc.noCostEmi ?? true,
    minEmiPerMonth: doc.minEmiPerMonth || doc.emiMonthly || undefined,
    releaseDate: doc.releaseDate || '',
    warranty: doc.warranty || '1 Year Brand Warranty with GST Bill',
    boxContents: (doc.boxContents || []).map((b: any) => (typeof b === 'string' ? b : b.item || '')),
    freeGiftBundle: (doc.freeGiftBundle || []).map((g: any) => (typeof g === 'string' ? g : g.gift || '')),
    isHotDeal: doc.isHotDeal ?? false,
    isMostDemanded: doc.isMostDemanded === true ? true : doc.isMostDemanded === false ? false : undefined,
    hotDealBadge: doc.hotDealBadge || '',
    freeGift: doc.freeGift || '',
    emiMonthly: doc.emiMonthly || undefined,
    specBadge: doc.specBadge || '',
  }
}

class PayloadProductRepository implements IProductRepository {
  async getAll(category?: 'phone' | 'accessory'): Promise<Product[]> {
    try {
      const payload = await getPayload({ config })

      // If accessories specifically requested, query live accessories collection from DB
      if (category === 'accessory') {
        const res = await payload.find({
          collection: 'accessories',
          sort: '-createdAt',
          limit: 200,
          pagination: false,
        })
        if (res.docs.length > 0) {
          return res.docs.map(mapPayloadAccessory)
        }
        return jsonRepo.products.getAll(category)
      }

      // If phones specifically requested, query live products collection from DB
      if (category === 'phone') {
        const res = await payload.find({
          collection: 'products',
          where: { category: { equals: 'phone' } },
          sort: '-createdAt',
          limit: 200,
          pagination: false,
        })
        if (res.docs.length > 0) {
          return res.docs.map(mapPayloadProduct)
        }
        return jsonRepo.products.getAll(category)
      }

      // If all catalog items requested, combine both live collections from DB
      const [prodRes, accRes] = await Promise.all([
        payload.find({
          collection: 'products',
          sort: '-createdAt',
          limit: 200,
          pagination: false,
        }),
        payload.find({
          collection: 'accessories',
          sort: '-createdAt',
          limit: 100,
          pagination: false,
        }),
      ])

      const prods = prodRes.docs.map(mapPayloadProduct)
      const accs = accRes.docs.map(mapPayloadAccessory)
      const combined = [...prods, ...accs]

      if (combined.length > 0) {
        return combined
      }
      return jsonRepo.products.getAll(category)
    } catch (err) {
      console.warn('PayloadProductRepository.getAll fallback to json:', err)
      return jsonRepo.products.getAll(category)
    }
  }

  async getBySlug(slug: string): Promise<Product | null> {
    try {
      const payload = await getPayload({ config })
      // 1. Check products collection
      const res = await payload.find({
        collection: 'products',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      if (res.docs.length) return mapPayloadProduct(res.docs[0])

      // 2. Check accessories collection
      const accRes = await payload.find({
        collection: 'accessories',
        where: { slug: { equals: slug } },
        limit: 1,
      })
      if (accRes.docs.length) return mapPayloadAccessory(accRes.docs[0])

      return jsonRepo.products.getBySlug(slug)
    } catch (err) {
      console.warn('PayloadProductRepository.getBySlug fallback to json:', err)
      return jsonRepo.products.getBySlug(slug)
    }
  }

  async getByBrand(brand: string): Promise<Product[]> {
    try {
      const payload = await getPayload({ config })
      const res = await payload.find({
        collection: 'products',
        where: { brand: { equals: brand } },
        limit: 50,
      })
      if (!res.docs.length) return jsonRepo.products.getByBrand(brand)
      return res.docs.map(mapPayloadProduct)
    } catch (err) {
      return jsonRepo.products.getByBrand(brand)
    }
  }

  async getFeatured(): Promise<{
    newArrivals: Product[]
    bestSellers: Product[]
    flagships: Product[]
  }> {
    try {
      const all = await this.getAll('phone')
      // Newly added phones come directly on top of "New Smartphone Arrivals"
      const newArrivals = all.slice(0, 8)
      // "Most Demanded Phones in Kakod" - Prioritizes products with isMostDemanded=true or tagged
      const bestSellers = all
        .filter((p) => {
          if (p.slug === 'samsung-galaxy-m15-5g') return false
          return (
            (p as any).isMostDemanded === true ||
            p.tags.includes('most-demanded') ||
            p.tags.includes('bestseller')
          )
        })
        .sort((a, b) => {
          const aDemanded = (a as any).isMostDemanded === true || a.tags.includes('most-demanded') ? 1 : 0
          const bDemanded = (b as any).isMostDemanded === true || b.tags.includes('most-demanded') ? 1 : 0
          return bDemanded - aDemanded
        })
      const flagships = all.filter(
        (p) =>
          p.tags.includes('flagship') ||
          (p.variants && p.variants.some((v) => (v.price || 0) >= 45000))
      )

      const fallbackCandidates = all.filter((p) => (p as any).isMostDemanded !== false)
      const finalBestSellers =
        bestSellers.length >= 4
          ? bestSellers.slice(0, 8)
          : bestSellers
              .concat(fallbackCandidates.filter((p) => !bestSellers.some((b) => b.id === p.id)))
              .slice(0, 8)

      return {
        newArrivals,
        bestSellers: finalBestSellers,
        flagships: flagships.length >= 4 ? flagships : all.slice(0, 8),
      }
    } catch {
      return jsonRepo.products.getFeatured()
    }
  }

  async getFiltered(
    filters: ProductFilterState
  ): Promise<{ products: Product[]; total: number }> {
    try {
      let list = await this.getAll('phone')

      if (filters.brand && filters.brand.length > 0) {
        const lowerBrands = filters.brand.map((b) => b.toLowerCase())
        list = list.filter((p) => lowerBrands.includes(p.brand.toLowerCase()))
      }

      if (filters.priceRange) {
        const [min, max] = filters.priceRange
        list = list.filter((p) => {
          const startingPrice = p.variants?.[0]?.mrp || p.variants?.[0]?.price || 0
          return startingPrice >= min && startingPrice <= max
        })
      }

      if (filters.ram && filters.ram.length > 0) {
        list = list.filter((p) => p.variants.some((v) => v.ram && filters.ram?.includes(v.ram)))
      }

      if (filters.storage && filters.storage.length > 0) {
        list = list.filter((p) => p.variants.some((v) => v.storage && filters.storage?.includes(v.storage)))
      }

      if (filters.fiveGOnly) {
        list = list.filter((p) => p.tags.includes('5g'))
      }

      if (filters.emiOnly) {
        list = list.filter((p) => p.emiAvailable)
      }

      if (filters.inStockOnly) {
        list = list.filter((p) => p.variants.some((v) => v.inStock))
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase().trim()
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query) ||
            p.subtitle?.toLowerCase().includes(query)
        )
      }

      if (filters.sort) {
        list = [...list].sort((a, b) => {
          const priceA = a.variants?.[0]?.mrp || a.variants?.[0]?.price || 0
          const priceB = b.variants?.[0]?.mrp || b.variants?.[0]?.price || 0
          switch (filters.sort) {
            case 'price-asc':
              return priceA - priceB
            case 'price-desc':
              return priceB - priceA
            case 'newest':
              return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
            case 'discount':
              const discA = a.variants?.[0] ? ((a.variants[0].mrp - a.variants[0].price) / a.variants[0].mrp) : 0
              const discB = b.variants?.[0] ? ((b.variants[0].mrp - b.variants[0].price) / b.variants[0].mrp) : 0
              return discB - discA
            default:
              return 0
          }
        })
      }

      return { products: list, total: list.length }
    } catch {
      return jsonRepo.products.getFiltered(filters)
    }
  }

  async getSimilar(productId: string, brand: string, limit: number = 4): Promise<Product[]> {
    try {
      const brandProducts = await this.getByBrand(brand)
      return brandProducts.filter((p) => p.id !== productId).slice(0, limit)
    } catch {
      return jsonRepo.products.getSimilar(productId, brand, limit)
    }
  }

  async search(query: string): Promise<Product[]> {
    try {
      const q = query.toLowerCase().trim()
      const all = await this.getAll('phone')
      return all.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q)
      )
    } catch {
      return jsonRepo.products.search(query)
    }
  }
}

class PayloadBrandRepository implements IBrandRepository {
  async getAll(): Promise<Brand[]> {
    try {
      const payload = await getPayload({ config })
      const res = await payload.find({
        collection: 'brands',
        limit: 50,
        pagination: false,
        depth: 1,
      })
      if (!res.docs.length) return jsonRepo.brands.getAll()
      return res.docs.map((b: any) => {
        let logoUrl = ''
        if (typeof b.logoImage === 'object' && b.logoImage?.url) {
          logoUrl = b.logoImage.url
        } else if (typeof b.logo === 'string' && b.logo.trim()) {
          logoUrl = b.logo.trim()
        } else {
          const candidate = `/brand/logos/${b.slug?.toLowerCase()}.svg`
          try {
            if (fs.existsSync(path.join(process.cwd(), 'public', candidate))) {
              logoUrl = candidate
            } else {
              logoUrl = '/brand/logo.png'
            }
          } catch {
            logoUrl = '/brand/logo.png'
          }
        }

        return {
          id: String(b.id || b._id),
          name: b.name,
          slug: b.slug,
          logo: logoUrl || '/brand/logo.png',
          tagline: b.tagline || '',
          featured: b.featured ?? true,
          phoneCount: b.phoneCount || 0,
          popularModels: (b.popularModels || []).map((m: any) => (typeof m === 'string' ? m : m.model || '')),
        }
      })
    } catch {
      return jsonRepo.brands.getAll()
    }
  }

  async getBySlug(slug: string): Promise<Brand | null> {
    try {
      const all = await this.getAll()
      return all.find((b) => b.slug.toLowerCase() === slug.toLowerCase()) || null
    } catch {
      return jsonRepo.brands.getBySlug(slug)
    }
  }
}

class PayloadOfferRepository implements IOfferRepository {
  async getAll(): Promise<Offer[]> {
    try {
      const payload = await getPayload({ config })
      const res = await payload.find({
        collection: 'offers',
        limit: 50,
      })
      if (!res.docs.length) return jsonRepo.offers.getAll()
      return res.docs.map((o: any) => ({
        id: String(o.id || o._id),
        title: o.title,
        tagline: o.tagline || '',
        badge: o.badge || 'FESTIVE SPECIAL',
        description: o.description || '',
        code: o.code || '',
        discountValue: o.discountValue || '',
        validUntil: o.validUntil || '',
        applicableCategory: o.applicableCategory || 'all',
        applicableBrands: (o.applicableBrands || []).map((b: any) => (typeof b === 'string' ? b : b.brand || '')),
        terms: (o.terms || []).map((t: any) => (typeof t === 'string' ? t : t.term || '')),
        bannerColor: o.bannerColor || 'from-amber-500/20 to-orange-500/20',
        featured: o.featured ?? true,
      }))
    } catch {
      return jsonRepo.offers.getAll()
    }
  }

  async getFeatured(): Promise<Offer[]> {
    const all = await this.getAll()
    return all.filter((o) => o.featured)
  }
}

class PayloadReviewRepository implements IReviewRepository {
  async getAll(): Promise<Review[]> {
    try {
      const payload = await getPayload({ config })
      const res = await payload.find({
        collection: 'reviews',
        limit: 50,
        sort: '-createdAt',
      })
      if (!res.docs.length) return jsonRepo.reviews.getAll()
      return res.docs
        .filter((r: any) => r.status !== 'pending' && r.status !== 'rejected')
        .map((r: any) => ({
          id: String(r.id || r._id),
          author: r.author,
          location: r.location || 'Kakod',
          rating: r.rating || 5,
          date: r.date || '',
          phoneBought: r.phoneBought || '',
          comment: r.comment || '',
          verifiedPurchase: r.verifiedPurchase ?? true,
          source: r.source || 'Google',
          helpfulCount: r.helpfulCount || 0,
          photoUrl: r.photoUrl || '',
          invoiceNumber: r.invoiceNumber || '',
          status: r.status || 'published',
        }))
    } catch {
      return jsonRepo.reviews.getAll()
    }
  }

  async getStats(): Promise<{ averageRating: number; totalReviews: number }> {
    const reviews = await this.getAll()
    const totalReviews = reviews.length
    const averageRating = totalReviews > 0
      ? Number((reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1))
      : 4.9
    return { averageRating, totalReviews }
  }
}

class PayloadFAQRepository implements IFAQRepository {
  async getAll(): Promise<FAQ[]> {
    try {
      const payload = await getPayload({ config })
      const res = await payload.find({
        collection: 'faqs',
        limit: 50,
        sort: 'sortOrder',
      })
      if (!res.docs.length) return jsonRepo.faqs.getAll()
      return res.docs.map((f: any) => ({
        id: String(f.id || f._id),
        category: f.category || 'General',
        question: f.question,
        answer: f.answer,
      }))
    } catch {
      return jsonRepo.faqs.getAll()
    }
  }
}

// Extra helper methods for dynamic Reels & Hot Deals
export async function getDynamicReels(): Promise<string[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'reels',
      where: { active: { equals: true } },
      sort: 'sortOrder',
      limit: 20,
    })
    if (!res.docs.length) {
      return [
        'https://www.instagram.com/reel/DfRnkQZpVvK/',
        'https://www.instagram.com/reel/DfhAZ5rvnq_/',
        'https://www.instagram.com/reel/DfcXieovfWc/',
        'https://www.instagram.com/reel/DfbTu_iPAB_/',
        'https://www.instagram.com/reel/DfaO8FzP8hM/',
        'https://www.instagram.com/reel/DfY-uZqPZe6/',
      ]
    }
    return res.docs.map((r: any) => r.instagramUrl)
  } catch {
    return [
      'https://www.instagram.com/reel/DfRnkQZpVvK/',
      'https://www.instagram.com/reel/DfhAZ5rvnq_/',
      'https://www.instagram.com/reel/DfcXieovfWc/',
      'https://www.instagram.com/reel/DfbTu_iPAB_/',
      'https://www.instagram.com/reel/DfaO8FzP8hM/',
      'https://www.instagram.com/reel/DfY-uZqPZe6/',
    ]
  }
}

export async function getDetailedReels(): Promise<Reel[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'reels',
      where: { active: { equals: true } },
      sort: 'sortOrder',
      limit: 30,
    })
    if (res.docs.length > 0) {
      return res.docs.map((r: any) => {
        const shortcodeMatch = r.instagramUrl?.match(/reel\/([^/]+)/)
        const shortcode = shortcodeMatch ? shortcodeMatch[1] : String(r.id || r._id)
        const cleanUrl = r.instagramUrl?.replace(/\/$/, '') || `https://www.instagram.com/reel/${shortcode}`
        return {
          id: String(r.id || r._id),
          shortcode,
          instagramUrl: `${cleanUrl}/`,
          embedUrl: `https://www.instagram.com/p/${shortcode}/embed/captioned/`,
          thumbnailUrl: r.thumbnailUrl || '/brand/logo.png',
          caption: r.caption || 'Live Customer Delivery @ The Mobile Lounge Kakod',
          author: 'themobilelounge_kakod',
          likes: 180 + (Math.abs(shortcode.charCodeAt(0)) % 150),
          views: 850 + (Math.abs(shortcode.charCodeAt(1)) % 500),
          isStoreDemo: true,
        }
      })
    }
  } catch (err) {
    console.warn('Failed to query reels collection from DB, fallback:', err)
  }
  return []
}

export async function getHotDeals() {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'products',
      where: { isHotDeal: { equals: true } },
      limit: 10,
    })
    if (!res.docs.length) return null
    return res.docs.map((p: any) => ({
      slug: p.slug,
      name: p.name,
      brandTag: `${p.brand} Flagship`,
      specBadge: p.specBadge || p.subtitle || '',
      storage: `${p.variants?.[0]?.storage || 256}GB`,
      mrp: p.variants?.[0]?.mrp || 99999,
      price: p.variants?.[0]?.price || 89999,
      emiMonthly: p.emiMonthly || p.minEmiPerMonth || 3999,
      image: p.images?.[0]?.src || '',
      badge: p.hotDealBadge || 'HOT SELLER',
      gift: p.freeGift || 'Assured Free Gift',
    }))
  } catch {
    return null
  }
}

export const payloadRepo: IDataRepository = {
  products: new PayloadProductRepository(),
  brands: new PayloadBrandRepository(),
  offers: new PayloadOfferRepository(),
  reviews: new PayloadReviewRepository(),
  faqs: new PayloadFAQRepository(),
}
