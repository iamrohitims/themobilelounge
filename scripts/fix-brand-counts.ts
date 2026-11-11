import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

async function fixBrandCounts() {
  console.log('🔄 Connecting to MongoDB via Payload CMS...')
  const payload = await getPayload({ config })
  console.log('✅ Connected successfully!')

  // 1. Fetch all products from MongoDB
  const productsRes = await payload.find({
    collection: 'products',
    limit: 1000,
    pagination: false,
  })

  console.log(`📦 Found ${productsRes.docs.length} total products in database.`)

  // 2. Count active phones per brand (case-insensitive)
  const phoneCounts: Record<string, number> = {}
  for (const product of productsRes.docs) {
    // Only count phones
    if (product.category && product.category !== 'phone') continue
    const brandName = (product.brand || '').trim().toLowerCase()
    if (brandName) {
      phoneCounts[brandName] = (phoneCounts[brandName] || 0) + 1
    }
  }

  // 3. Fetch all brands
  const brandsRes = await payload.find({
    collection: 'brands',
    limit: 500,
    pagination: false,
  })

  console.log(`🏷️ Found ${brandsRes.docs.length} brands in database. Syncing counts...\n`)

  let updatedCount = 0
  const brandSyncReport: Array<{ brand: string; oldCount: number; newCount: number }> = []

  for (const brandDoc of brandsRes.docs) {
    const brandNameLower = (brandDoc.name || '').trim().toLowerCase()
    const brandSlugLower = (brandDoc.slug || '').trim().toLowerCase()
    const actualCount = phoneCounts[brandNameLower] ?? phoneCounts[brandSlugLower] ?? 0
    const oldCount = brandDoc.phoneCount ?? 0

    if (oldCount !== actualCount) {
      await payload.update({
        collection: 'brands',
        id: brandDoc.id,
        data: {
          phoneCount: actualCount,
        },
      })
      updatedCount++
      brandSyncReport.push({ brand: brandDoc.name, oldCount, newCount: actualCount })
      console.log(`  🔧 Fixed "${brandDoc.name}": ${oldCount} ➔ ${actualCount}`)
    } else {
      console.log(`  ✓ "${brandDoc.name}": already correct (${actualCount})`)
    }
  }

  // 4. Also update local src/data/brands.json if it exists
  const brandsJsonPath = path.resolve(process.cwd(), 'src/data/brands.json')
  if (fs.existsSync(brandsJsonPath)) {
    try {
      const localBrands = JSON.parse(fs.readFileSync(brandsJsonPath, 'utf-8'))
      const updatedLocalBrands = localBrands.map((b: any) => {
        const nameLower = (b.name || '').trim().toLowerCase()
        const slugLower = (b.slug || '').trim().toLowerCase()
        const actualCount = phoneCounts[nameLower] ?? phoneCounts[slugLower] ?? 0
        return {
          ...b,
          phoneCount: actualCount,
        }
      })
      fs.writeFileSync(brandsJsonPath, JSON.stringify(updatedLocalBrands, null, 2), 'utf-8')
      console.log(`\n💾 Synchronized src/data/brands.json with real phone counts.`)
    } catch (err) {
      console.warn('⚠️ Could not update src/data/brands.json:', err)
    }
  }

  console.log(`\n🎉 Done! Updated ${updatedCount} brands in MongoDB Atlas.`)
  process.exit(0)
}

fixBrandCounts().catch((err) => {
  console.error('❌ Error fixing brand counts:', err)
  process.exit(1)
})
