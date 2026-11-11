import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  cleanupProductImagesOnDelete,
  cleanupProductImagesOnChange,
} from '../collections/hooks/cleanupProductImages'

describe('Product Image Lifecycle Cleanup Hooks', () => {
  const testSlug = 'temp-test-product-phone'
  const targetDir = path.resolve(process.cwd(), 'public/uploads/products', testSlug)

  beforeEach(() => {
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true })
    }
    fs.mkdirSync(targetDir, { recursive: true })
  })

  afterEach(() => {
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true })
    }
  })

  it('deletes folder and images when product is deleted', async () => {
    const file1 = path.join(targetDir, 'img-1.webp')
    const file2 = path.join(targetDir, 'img-2.webp')
    fs.writeFileSync(file1, 'fake image 1')
    fs.writeFileSync(file2, 'fake image 2')

    expect(fs.existsSync(file1)).toBe(true)
    expect(fs.existsSync(file2)).toBe(true)

    await cleanupProductImagesOnDelete({
      doc: {
        id: '123',
        slug: testSlug,
        images: [
          { src: `/uploads/products/${testSlug}/img-1.webp` },
          { src: `/uploads/products/${testSlug}/img-2.webp` },
        ],
      },
    } as any)

    expect(fs.existsSync(targetDir)).toBe(false)
  })

  it('deletes only removed images when product is edited', async () => {
    const file1 = path.join(targetDir, 'img-1.webp')
    const file2 = path.join(targetDir, 'img-2.webp')
    fs.writeFileSync(file1, 'fake image 1')
    fs.writeFileSync(file2, 'fake image 2')

    // User edited the product: removed img-2 and kept only img-1
    await cleanupProductImagesOnChange({
      operation: 'update',
      previousDoc: {
        id: '123',
        slug: testSlug,
        images: [
          { src: `/uploads/products/${testSlug}/img-1.webp` },
          { src: `/uploads/products/${testSlug}/img-2.webp` },
        ],
      },
      doc: {
        id: '123',
        slug: testSlug,
        images: [{ src: `/uploads/products/${testSlug}/img-1.webp` }],
      },
    } as any)

    // img-1 should still exist, img-2 should be deleted
    expect(fs.existsSync(file1)).toBe(true)
    expect(fs.existsSync(file2)).toBe(false)
  })

  it('renames folder when product slug is changed on edit', async () => {
    const newSlug = 'temp-test-product-renamed'
    const newDir = path.resolve(process.cwd(), 'public/uploads/products', newSlug)
    if (fs.existsSync(newDir)) {
      fs.rmSync(newDir, { recursive: true, force: true })
    }

    const file1 = path.join(targetDir, 'img-1.webp')
    fs.writeFileSync(file1, 'fake image 1')

    await cleanupProductImagesOnChange({
      operation: 'update',
      previousDoc: {
        id: '123',
        slug: testSlug,
        images: [{ src: `/uploads/products/${testSlug}/img-1.webp` }],
      },
      doc: {
        id: '123',
        slug: newSlug,
        images: [{ src: `/uploads/products/${newSlug}/img-1.webp` }],
      },
    } as any)

    expect(fs.existsSync(targetDir)).toBe(false)
    expect(fs.existsSync(newDir)).toBe(true)
    expect(fs.existsSync(path.join(newDir, 'img-1.webp'))).toBe(true)

    // Clean up renamed folder
    fs.rmSync(newDir, { recursive: true, force: true })
  })
})
