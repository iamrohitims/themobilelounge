import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload'

/**
 * Accurately recalculates and updates the phoneCount field for a given brand
 * by counting all active phone products matching the brand in the products collection.
 * Passing `req` ensures queries participate in the current transaction.
 */
export async function recalculateBrandCount(
  req: PayloadRequest,
  brandName?: string | null,
  excludeId?: string | number
) {
  if (!brandName || typeof brandName !== 'string') return
  const cleanBrand = brandName.trim()
  if (!cleanBrand) return

  const payload = req.payload

  try {
    const cleanBrandSlug = cleanBrand
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')

    // 1. Locate the brand entry in the brands collection
    const brandRes = await payload.find({
      req,
      collection: 'brands',
      where: {
        or: [
          { name: { equals: cleanBrand } },
          { slug: { equals: cleanBrandSlug } },
        ],
      },
      limit: 1,
    })

    if (!brandRes.docs.length) return
    const brandDoc = brandRes.docs[0]

    // 2. Count active phones matching this brand
    const whereConditions: any[] = [
      {
        or: [
          { brand: { equals: cleanBrand } },
          { brand: { equals: brandDoc.name } },
          { brand: { equals: brandDoc.slug } },
        ],
      },
      {
        category: {
          equals: 'phone',
        },
      },
    ]

    if (excludeId) {
      whereConditions.push({
        id: {
          not_equals: excludeId,
        },
      })
    }

    const countRes = await payload.count({
      req,
      collection: 'products',
      where: {
        and: whereConditions,
      },
    })

    const exactCount = countRes.totalDocs

    // 3. Update the brand document if different
    if (brandDoc.phoneCount !== exactCount) {
      await payload.update({
        req,
        collection: 'brands',
        id: brandDoc.id,
        data: {
          phoneCount: exactCount,
        },
      })
      console.log(`[BRAND HOOK] Synced "${brandDoc.name}" phoneCount: ${brandDoc.phoneCount ?? 0} ➔ ${exactCount}`)
    }
  } catch (err) {
    console.error(`[BRAND HOOK ERROR] Failed to recalculate count for brand "${brandName}":`, err)
  }
}

/**
 * Triggered after a product is created or updated in Payload Admin or via API
 */
export const syncBrandOnAfterChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
}) => {
  const currentBrand = doc?.brand
  const prevBrand = previousDoc?.brand

  if (currentBrand) {
    await recalculateBrandCount(req, currentBrand)
  }
  if (prevBrand && prevBrand.trim().toLowerCase() !== currentBrand?.trim()?.toLowerCase()) {
    await recalculateBrandCount(req, prevBrand)
  }

  return doc
}

/**
 * Triggered after a product is deleted in Payload Admin or via API
 */
export const syncBrandOnAfterDelete: CollectionAfterDeleteHook = async ({
  doc,
  req,
}) => {
  const brandName = doc?.brand

  if (brandName) {
    // Explicitly exclude the deleted doc ID in case the transaction hasn't finalized the document removal
    await recalculateBrandCount(req, brandName, doc.id)
  }

  return doc
}
