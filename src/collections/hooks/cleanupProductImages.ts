import fs from 'fs'
import path from 'path'
import type { CollectionAfterDeleteHook, CollectionAfterChangeHook } from 'payload'

const ALLOWED_BASES = [
  path.resolve(process.cwd(), 'public/uploads/products'),
  path.resolve(process.cwd(), 'public/products'),
]

/**
 * Safely deletes a single local image file from disk.
 * Guards against directory traversal and only deletes files inside allowed product folders.
 */
function deleteLocalFileSafely(src: string) {
  if (!src || typeof src !== 'string') return
  if (!src.startsWith('/uploads/products/') && !src.startsWith('/products/')) return

  const cleanRelative = src.replace(/^\/+/, '')
  const fullPath = path.resolve(process.cwd(), 'public', cleanRelative)

  const isSafe = ALLOWED_BASES.some(
    (base) => fullPath.startsWith(base + path.sep) && fullPath !== base
  )

  if (isSafe && fs.existsSync(/*turbopackIgnore: true*/ fullPath)) {
    try {
      const stats = fs.statSync(fullPath)
      if (stats.isFile()) {
        fs.unlinkSync(fullPath)
        console.log(`[CLEANUP] Deleted orphaned product image: ${cleanRelative}`)
      }
    } catch (err: any) {
      console.warn(`[CLEANUP] Failed to delete file ${fullPath}:`, err.message)
    }
  }
}

/**
 * Safely deletes a product's dedicated image directory.
 */
function deleteFolderSafely(slug: string) {
  if (!slug || typeof slug !== 'string') return
  const safeSlug = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '').trim()
  if (!safeSlug) return

  for (const base of ALLOWED_BASES) {
    const targetDir = path.resolve(base, safeSlug)
    if (targetDir.startsWith(base + path.sep) && targetDir !== base && fs.existsSync(/*turbopackIgnore: true*/ targetDir)) {
      try {
        fs.rmSync(targetDir, { recursive: true, force: true })
        console.log(`[CLEANUP] Deleted product directory: ${targetDir}`)
      } catch (err: any) {
        console.warn(`[CLEANUP] Failed to delete directory ${targetDir}:`, err.message)
      }
    }
  }
}

/**
 * Hook triggered after a product document is deleted from Payload/MongoDB.
 * Deletes all physical image files and the product image directory from the server.
 */
export const cleanupProductImagesOnDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  if (!doc) return

  // 1. Delete specific images listed in doc
  if (Array.isArray(doc.images)) {
    for (const img of doc.images) {
      if (img?.src) {
        deleteLocalFileSafely(img.src)
      }
    }
  }

  // 2. Delete the product directory itself (e.g. /public/uploads/products/<slug>/)
  if (doc.slug) {
    deleteFolderSafely(doc.slug)
  }
}

/**
 * Hook triggered after a product document is updated in Payload/MongoDB.
 * If images were deleted or replaced during edit, removes the old orphaned files from disk.
 * If the product slug changed, renames the folder accordingly.
 */
export const cleanupProductImagesOnChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
}) => {
  if (operation !== 'update' || !previousDoc) return

  // 1. If slug was changed, rename the directory
  if (previousDoc.slug && doc.slug && previousDoc.slug !== doc.slug) {
    const oldSafe = previousDoc.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '').trim()
    const newSafe = doc.slug.toLowerCase().replace(/[^a-z0-9_-]/g, '').trim()

    for (const base of ALLOWED_BASES) {
      const oldDir = path.resolve(base, oldSafe)
      const newDir = path.resolve(base, newSafe)

      if (fs.existsSync(/*turbopackIgnore: true*/ oldDir) && !fs.existsSync(/*turbopackIgnore: true*/ newDir)) {
        try {
          fs.renameSync(oldDir, newDir)
          console.log(`[CLEANUP] Renamed image folder from ${oldSafe} to ${newSafe}`)
        } catch (err: any) {
          console.warn(`[CLEANUP] Failed to rename directory ${oldDir}:`, err.message)
        }
      }
    }
  }

  // 2. Clean up individual images that were removed during this edit
  if (Array.isArray(previousDoc.images)) {
    const currentSrcs = new Set(
      Array.isArray(doc.images)
        ? doc.images.map((img: any) => img?.src).filter(Boolean)
        : []
    )

    for (const oldImg of previousDoc.images) {
      if (oldImg?.src && !currentSrcs.has(oldImg.src)) {
        deleteLocalFileSafely(oldImg.src)
      }
    }
  }
}
