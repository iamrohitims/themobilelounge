import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { imageStorage } from '@/lib/services/image-storage'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name,
      slug,
      brand,
      subtitle,
      mrp,
      dealPrice,
      images = [],
      variants = [],
      specs = {},
      highlights = [],
      isHotDeal = false,
      isMostDemanded = false,
      hotDealBadge = '',
      freeGift = '',
      emiMonthly,
    } = body

    if (!name || !brand) {
      return NextResponse.json({ error: 'Name and Brand are required' }, { status: 400 })
    }

    const cleanSlug = (slug || name)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')

    // 1. Download all remote images and save to local server
    console.log(`[IMPORT] Localizing ${images.length} images for ${cleanSlug}...`)
    const localizedImages = await imageStorage.downloadMultipleImages(cleanSlug, images)

    // 2. Connect to Payload
    const payload = await getPayload({ config })

    // 3. Ensure Brand exists in Brands collection (Auto-create if new)
    const cleanBrandSlug = brand
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')

    const existingBrand = await payload.find({
      collection: 'brands',
      where: {
        or: [
          { name: { equals: brand } },
          { slug: { equals: cleanBrandSlug } },
        ],
      },
      limit: 1,
    })

    if (existingBrand.docs.length === 0) {
      console.log(`[IMPORT] Brand "${brand}" does not exist. Auto-creating brand entry...`)
      await payload.create({
        collection: 'brands',
        data: {
          name: brand,
          slug: cleanBrandSlug,
          tagline: `Official ${brand} Smartphone Showroom in Kakod`,
          featured: true,
          phoneCount: 0,
          popularModels: [{ model: name }],
        },
      })
    }

    // 4. Check if product exists by slug
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: cleanSlug } },
      limit: 1,
    })

    const productData = {
      name,
      slug: cleanSlug,
      brand,
      subtitle: subtitle || `${brand} 5G Smartphone with Official Brand Warranty`,
      category: 'phone' as const,
      isHotDeal: Boolean(isHotDeal),
      isMostDemanded: Boolean(isMostDemanded),
      hotDealBadge: hotDealBadge || '',
      freeGift: freeGift || '',
      emiMonthly: emiMonthly ? Number(emiMonthly) : undefined,
      images: localizedImages,
      variants: variants.length
        ? variants.map((v: any) => ({
            ram: Number(v.ram) || 8,
            storage: Number(v.storage) || 128,
            color: v.color || 'Default Color',
            colorHex: v.colorHex || '#18181b',
            mrp: Number(v.mrp) || Number(mrp) || 29999,
            price: Number(v.price) || Number(dealPrice) || 24999,
            inStock: v.inStock !== false,
          }))
        : [
            {
              ram: 8,
              storage: 128,
              color: 'Default Color',
              colorHex: '#18181b',
              mrp: Number(mrp) || 29999,
              price: Number(dealPrice) || 24999,
              inStock: true,
            },
          ],
      highlights: highlights.map((h: string) => ({ highlight: h })),
      specs,
      tags: [
        '5g',
        'new',
        ...(isHotDeal ? ['bestseller' as const] : []),
        ...(isMostDemanded ? ['most-demanded' as const, 'bestseller' as const] : []),
      ] as any,
      releaseDate: new Date().toISOString().split('T')[0],
      emiAvailable: true,
      noCostEmi: true,
      warranty: '1 Year Brand Warranty with GST Bill',
    }

    let resultDoc: any
    if (existing.docs.length > 0) {
      resultDoc = await payload.update({
        collection: 'products',
        id: existing.docs[0].id,
        data: productData as any,
      })
    } else {
      resultDoc = await payload.create({
        collection: 'products',
        data: productData as any,
      })
    }

    return NextResponse.json({
      success: true,
      message: `Product "${name}" saved to MongoDB and images stored on server!`,
      slug: cleanSlug,
      localImagesCount: localizedImages.length,
      product: resultDoc,
    })
  } catch (err: any) {
    console.error('Save product API error:', err.message)
    return NextResponse.json(
      { error: err.message || 'Failed to save product to database' },
      { status: 500 }
    )
  }
}
