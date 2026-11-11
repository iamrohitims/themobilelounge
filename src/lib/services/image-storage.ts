import fs from 'fs'
import path from 'path'

export interface LocalImageItem {
  src: string
  alt: string
  color?: string
}

export class ImageStorageService {
  private baseDir: string

  constructor(baseDir?: string) {
    this.baseDir = baseDir || path.resolve(process.cwd(), 'public/uploads/products')
  }

  /**
   * Ensures the destination directory exists for a product slug
   */
  private ensureDirectory(slug: string): string {
    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-')
    const targetDir = path.join(this.baseDir, safeSlug)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }
    return targetDir
  }

  /**
   * Determines file extension from Content-Type or URL
   */
  private getExtension(contentType: string | null, url: string): string {
    if (contentType?.includes('image/webp')) return '.webp'
    if (contentType?.includes('image/png')) return '.png'
    if (contentType?.includes('image/jpeg') || contentType?.includes('image/jpg')) return '.jpg'
    if (contentType?.includes('image/svg')) return '.svg'

    const extMatch = url.match(/\.(jpeg|jpg|png|webp|svg)/i)
    return extMatch ? `.${extMatch[1].toLowerCase()}` : '.jpg'
  }

  /**
   * Downloads a remote image and saves it to local disk.
   * Returns the public relative URL: `/uploads/products/<slug>/image-<index>.<ext>`
   */
  async downloadImage(slug: string, remoteUrl: string, index: number = 0): Promise<string> {
    // If the image is already a local path, don't re-download
    if (remoteUrl.startsWith('/uploads/') || remoteUrl.startsWith('/brand/')) {
      return remoteUrl
    }

    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-')
    const targetDir = this.ensureDirectory(safeSlug)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 12000)

      const response = await fetch(remoteUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        console.warn(`Failed to fetch image ${remoteUrl}: HTTP ${response.status}`)
        return remoteUrl // fallback to original if download fails
      }

      const contentType = response.headers.get('content-type')
      const ext = this.getExtension(contentType, remoteUrl)
      const filename = `img-${index + 1}${ext}`
      const filepath = path.join(targetDir, filename)

      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      fs.writeFileSync(filepath, buffer)

      const publicUrl = `/uploads/products/${safeSlug}/${filename}`
      return publicUrl
    } catch (err: any) {
      console.warn(`Image download failed for ${remoteUrl}:`, err.message)
      return remoteUrl
    }
  }

  /**
   * Downloads multiple images in parallel with controlled concurrency
   */
  async downloadMultipleImages(
    slug: string,
    images: { src: string; alt?: string; color?: string }[]
  ): Promise<LocalImageItem[]> {
    const results: LocalImageItem[] = []

    for (let i = 0; i < images.length; i++) {
      const item = images[i]
      if (!item.src) continue
      const localSrc = await this.downloadImage(slug, item.src, i)
      results.push({
        src: localSrc,
        alt: item.alt || `${slug} view ${i + 1}`,
        color: item.color || '',
      })
    }

    return results
  }

  /**
   * Saves a base64 or buffer uploaded directly from browser
   */
  async saveUploadedFile(slug: string, buffer: Buffer, filename: string): Promise<string> {
    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-')
    const targetDir = this.ensureDirectory(safeSlug)
    const ext = path.extname(filename) || '.jpg'
    const safeFilename = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 6)}${ext}`
    const filepath = path.join(targetDir, safeFilename)

    fs.writeFileSync(filepath, buffer)
    return `/uploads/products/${safeSlug}/${safeFilename}`
  }
}

export const imageStorage = new ImageStorageService()
