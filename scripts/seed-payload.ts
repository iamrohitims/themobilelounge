import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

// Hot Deals metadata map to enhance products with Hero carousel features
const HOT_DEALS_MAP: Record<string, { badge: string; gift: string; emi: number; specBadge: string }> = {
  'apple-iphone-16-pro-max': {
    badge: 'HOT SELLER',
    gift: 'Smartwatch + 20W Fast Charger Free',
    emi: 5999,
    specBadge: 'Desert Titanium • A18 Pro • 48MP Fusion',
  },
  'samsung-galaxy-s25-5g': {
    badge: 'NEW LAUNCH',
    gift: 'Free ANC Earbuds + 45W Adapter',
    emi: 3999,
    specBadge: 'Snapdragon 8 Elite • Navy • 120Hz Dynamic AMOLED',
  },
  'oneplus-12-5g': {
    badge: 'VIP CHOICE',
    gift: 'OnePlus Buds + Fast Car Charger',
    emi: 2999,
    specBadge: 'Snapdragon 8 Gen 3 • Hasselblad 50MP • 5400mAh',
  },
  'vivo-v40-pro-5g': {
    badge: 'ZEISS PORTRAIT',
    gift: 'Smart Fitness Band + Premium Case',
    emi: 2499,
    specBadge: '50MP ZEISS Multifocal • 5500mAh • Ganges Blue',
  },
  'samsung-galaxy-s24-ultra': {
    badge: 'MEGA DISCOUNT',
    gift: 'Galaxy Buds FE + Fast Wireless Pad',
    emi: 5499,
    specBadge: 'Titanium Gray • Built-in S-Pen • Galaxy AI',
  },
  'oneplus-nord-4-5g': {
    badge: 'BEST VALUE 5G',
    gift: 'Free 100W SuperVOOC Charger + Case',
    emi: 1499,
    specBadge: 'Snapdragon 7+ Gen 3 • 100W SuperVOOC • 5500mAh',
  },
}

async function seed() {
  console.log('🚀 Initializing Payload CMS connection to MongoDB Atlas...')
  const payload = await getPayload({ config })
  console.log('✅ Connected to MongoDB Atlas!')

  const dataDir = path.resolve(process.cwd(), 'src/data')

  // 1. Seed Brands
  const brandsFile = path.join(dataDir, 'brands.json')
  if (fs.existsSync(brandsFile)) {
    const rawBrands = JSON.parse(fs.readFileSync(brandsFile, 'utf-8'))
    console.log(`📦 Seeding ${rawBrands.length} brands...`)
    for (const b of rawBrands) {
      const existing = await payload.find({
        collection: 'brands',
        where: { slug: { equals: b.slug } },
        limit: 1,
      })
      const brandData = {
        name: b.name,
        slug: b.slug,
        logo: b.logo || '',
        tagline: b.tagline || '',
        featured: b.featured ?? true,
        phoneCount: b.phoneCount || 0,
        popularModels: (b.popularModels || []).map((m: string) => ({ model: m })),
      }
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'brands',
          data: brandData,
        })
      } else {
        await payload.update({
          collection: 'brands',
          id: existing.docs[0].id,
          data: brandData,
        })
      }
    }
    console.log('✅ Brands seeded!')
  }

  // 2. Seed Products
  const productsFile = path.join(dataDir, 'products.json')
  if (fs.existsSync(productsFile)) {
    const rawProducts = JSON.parse(fs.readFileSync(productsFile, 'utf-8'))
    console.log(`📱 Seeding ${rawProducts.length} smartphones...`)
    for (const p of rawProducts) {
      const existing = await payload.find({
        collection: 'products',
        where: { slug: { equals: p.slug } },
        limit: 1,
      })

      const hotDealInfo = HOT_DEALS_MAP[p.slug]

      const productData = {
        name: p.name,
        slug: p.slug,
        brand: p.brand,
        subtitle: p.subtitle || '',
        category: (p.category === 'accessory' ? 'accessory' : 'phone') as 'accessory' | 'phone',
        subCategory: p.subCategory || '',
        isHotDeal: !!hotDealInfo,
        hotDealBadge: hotDealInfo ? hotDealInfo.badge : '',
        freeGift: hotDealInfo ? hotDealInfo.gift : (p.freeGiftBundle?.[0] || ''),
        emiMonthly: hotDealInfo ? hotDealInfo.emi : (p.minEmiPerMonth || undefined),
        specBadge: hotDealInfo ? hotDealInfo.specBadge : '',
        images: (p.images || []).map((img: { src: string; alt?: string; color?: string }) => ({
          src: img.src,
          alt: img.alt || '',
          color: img.color || '',
        })),
        variants: (p.variants || []).map((v: { ram?: number; storage?: number; color: string; colorHex?: string; mrp: number; price: number; inStock?: boolean; sku?: string }) => ({
          ram: v.ram,
          storage: v.storage,
          color: v.color,
          colorHex: v.colorHex || '#000000',
          mrp: v.mrp,
          price: v.price,
          inStock: v.inStock ?? true,
          sku: v.sku || '',
        })),
        highlights: (p.highlights || []).map((h: string) => ({ highlight: h })),
        specs: p.specs || {},
        tags: p.tags || ['5g'],
        emiAvailable: p.emiAvailable ?? true,
        noCostEmi: p.noCostEmi ?? true,
        minEmiPerMonth: p.minEmiPerMonth || undefined,
        warranty: p.warranty || '1 Year Brand Warranty with GST Bill',
        boxContents: (p.boxContents || []).map((b: string) => ({ item: b })),
        freeGiftBundle: (p.freeGiftBundle || []).map((g: string) => ({ gift: g })),
        releaseDate: p.releaseDate || '',
      }

      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'products',
          data: productData,
        })
      } else {
        await payload.update({
          collection: 'products',
          id: existing.docs[0].id,
          data: productData,
        })
      }
    }
    console.log('✅ Products seeded successfully!')
  }

  // 3. Seed Instagram Reels
  const reelsUrls = [
    'https://www.instagram.com/reel/DfRnkQZpVvK/',
    'https://www.instagram.com/reel/DfhAZ5rvnq_/',
    'https://www.instagram.com/reel/DfcXieovfWc/',
    'https://www.instagram.com/reel/DfbTu_iPAB_/',
    'https://www.instagram.com/reel/DfaO8FzP8hM/',
    'https://www.instagram.com/reel/DfY-uZqPZe6/',
  ]
  console.log(`🎬 Seeding ${reelsUrls.length} Instagram Reels...`)
  let order = 0
  for (const url of reelsUrls) {
    const existing = await payload.find({
      collection: 'reels',
      where: { instagramUrl: { equals: url } },
      limit: 1,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'reels',
        data: {
          instagramUrl: url,
          caption: 'Live Showcase @ The Mobile Lounge Kakod',
          sortOrder: order++,
          active: true,
        },
      })
    }
  }
  console.log('✅ Instagram Reels seeded!')

  // 4. Seed Accessories
  const accFile = path.join(dataDir, 'accessories.json')
  if (fs.existsSync(accFile)) {
    const rawAcc = JSON.parse(fs.readFileSync(accFile, 'utf-8'))
    console.log(`🎧 Seeding ${rawAcc.length} accessories...`)
    for (const a of rawAcc) {
      const existing = await payload.find({
        collection: 'accessories',
        where: { slug: { equals: a.slug } },
        limit: 1,
      })
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'accessories',
          data: {
            name: a.name,
            slug: a.slug,
            category: a.category || 'accessory',
            subCategory: a.subCategory || '',
            mrp: a.mrp || 1999,
            dealPrice: a.dealPrice || a.price || 999,
            inStock: a.inStock ?? true,
            image: a.image || a.images?.[0]?.src || '',
            compatibility: a.compatibility || 'Universal Type-C / Lightning',
            highlights: (a.highlights || []).map((h: string) => ({ text: h })),
          },
        })
      }
    }
    console.log('✅ Accessories seeded!')
  }

  // 5. Seed Offers
  const offersFile = path.join(dataDir, 'offers.json')
  if (fs.existsSync(offersFile)) {
    const rawOffers = JSON.parse(fs.readFileSync(offersFile, 'utf-8'))
    console.log(`🎁 Seeding ${rawOffers.length} festive offers...`)
    for (const o of rawOffers) {
      const existing = await payload.find({
        collection: 'offers',
        where: { title: { equals: o.title } },
        limit: 1,
      })
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'offers',
          data: {
            title: o.title,
            tagline: o.tagline || '',
            badge: o.badge || 'FESTIVE OFFER',
            description: o.description || '',
            code: o.code || '',
            discountValue: o.discountValue || '',
            validUntil: o.validUntil || '31 March 2026',
            applicableCategory: o.applicableCategory || 'all',
            applicableBrands: (o.applicableBrands || []).map((b: string) => ({ brand: b })),
            terms: (o.terms || []).map((t: string) => ({ term: t })),
            bannerColor: o.bannerColor || 'from-amber-500/20 to-orange-500/20',
            featured: o.featured ?? true,
          },
        })
      }
    }
    console.log('✅ Offers seeded!')
  }

  // 6. Seed Reviews
  const reviewsFile = path.join(dataDir, 'reviews.json')
  if (fs.existsSync(reviewsFile)) {
    const rawReviews = JSON.parse(fs.readFileSync(reviewsFile, 'utf-8'))
    console.log(`⭐ Seeding ${rawReviews.length} reviews...`)
    for (const r of rawReviews) {
      const existing = await payload.find({
        collection: 'reviews',
        where: { author: { equals: r.author } },
        limit: 1,
      })
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'reviews',
          data: {
            author: r.author,
            location: r.location || 'Kakod',
            rating: r.rating || 5,
            date: r.date || 'Recent',
            phoneBought: r.phoneBought || 'iPhone 16',
            comment: r.comment || '',
            verifiedPurchase: r.verifiedPurchase ?? true,
            source: r.source || 'Google',
            helpfulCount: r.helpfulCount || 0,
          },
        })
      }
    }
    console.log('✅ Reviews seeded!')
  }

  // 7. Seed FAQs
  const faqsFile = path.join(dataDir, 'faqs.json')
  if (fs.existsSync(faqsFile)) {
    const rawFaqs = JSON.parse(fs.readFileSync(faqsFile, 'utf-8'))
    console.log(`❓ Seeding ${rawFaqs.length} FAQs...`)
    for (const f of rawFaqs) {
      const existing = await payload.find({
        collection: 'faqs',
        where: { question: { equals: f.question } },
        limit: 1,
      })
      if (existing.docs.length === 0) {
        await payload.create({
          collection: 'faqs',
          data: {
            category: f.category || 'General',
            question: f.question,
            answer: f.answer,
            sortOrder: 0,
          },
        })
      }
    }
    console.log('✅ FAQs seeded!')
  }

  // 8. Seed SiteSettings Global
  console.log('⚙️ Initializing SiteSettings Global...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      storePhone: '+91 70172 89590',
      whatsappNumber: '917017289590',
      storeAddress: 'Main Market, Near Vishal Distributors, Kakod, Bulandshahr, Uttar Pradesh - 203201',
      openingHours: 'Monday – Sunday • 9:30 AM – 9:00 PM (Open All 7 Days)',
      announcementBarText: '🔥 Kakod Showroom Deals: 0% Downpayment EMI • Free Smartwatch on iPhone & Galaxy • Genuine GST Bill',
      trustHighlights: [
        {
          title: 'Free Smartwatch & Accessories',
          subtitle: 'Assured gifts with every 5G phone purchase',
          icon: 'Gift',
        },
        {
          title: '₹0 Downpayment EMI',
          subtitle: 'Bajaj, HDFC, TVS & IDFC instant approval',
          icon: 'CreditCard',
        },
        {
          title: '100% Genuine GST Bill',
          subtitle: 'Official brand warranty covered across India',
          icon: 'ShieldCheck',
        },
        {
          title: '10-Minute Express Setup',
          subtitle: 'Free data transfer & tempered glass application',
          icon: 'CheckCircle2',
        },
      ],
    },
  })
  console.log('✅ SiteSettings Global initialized!')

  console.log('\n🎉 ALL STORE DATA SUCCESSFULLY MIGRATED TO MONGODB ATLAS!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seeding Error:', err)
  process.exit(1)
})
