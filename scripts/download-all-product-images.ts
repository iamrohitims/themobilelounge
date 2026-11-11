import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'
import { imageStorage } from '../src/lib/services/image-storage'

async function migrateImages() {
  console.log('🚀 Connecting to Payload CMS and MongoDB Atlas...')
  const payload = await getPayload({ config })
  console.log('✅ Connected to MongoDB Atlas!')

  const res = await payload.find({
    collection: 'products',
    limit: 100,
    pagination: false,
  })

  console.log(`📱 Found ${res.docs.length} products to process for image localization...\n`)

  let totalDownloaded = 0

  for (let i = 0; i < res.docs.length; i++) {
    const product = res.docs[i] as any
    const slug = product.slug
    const images = product.images || []

    const needsDownload = images.some((img: any) => img.src && (img.src.startsWith('http://') || img.src.startsWith('https://')))

    if (!needsDownload) {
      console.log(`⏩ [${i + 1}/${res.docs.length}] ${product.name} images already localized. Skipping.`)
      continue
    }

    console.log(`📥 [${i + 1}/${res.docs.length}] Localizing images for: ${product.name} (${images.length} images)...`)

    const localizedImages = await imageStorage.downloadMultipleImages(slug, images)
    totalDownloaded += localizedImages.length

    // Update in MongoDB
    await payload.update({
      collection: 'products',
      id: product.id,
      data: {
        images: localizedImages,
      },
    })

    console.log(`  ✅ Updated ${product.name} with ${localizedImages.length} local images!`)
  }

  // Also update src/data/products.json so the backup JSON file has local paths
  const jsonPath = path.resolve(process.cwd(), 'src/data/products.json')
  if (fs.existsSync(jsonPath)) {
    const localUpdated = await payload.find({
      collection: 'products',
      limit: 100,
      pagination: false,
    })
    console.log(`\n💾 Updating src/data/products.json with localized image paths...`)
    fs.writeFileSync(jsonPath, JSON.stringify(localUpdated.docs, null, 2))
    console.log(`✅ src/data/products.json updated!`)
  }

  console.log(`\n🎉 SUCCESS! Localized all product images! Total images saved to server: ${totalDownloaded}`)
  process.exit(0)
}

migrateImages().catch((err) => {
  console.error('❌ Migration Error:', err)
  process.exit(1)
})
