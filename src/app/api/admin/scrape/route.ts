import { NextRequest, NextResponse } from 'next/server'
import { productScraper } from '@/lib/services/product-scraper'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url, html } = body

    if (html && typeof html === 'string' && html.trim().length > 50) {
      const data = productScraper.parseFromHtml(html, url || '')
      return NextResponse.json({ success: true, data })
    }

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Valid URL or HTML content is required' }, { status: 400 })
    }

    const data = await productScraper.scrape(url)
    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('Scrape API error:', err.message)
    return NextResponse.json(
      { error: err.message || 'Failed to scrape product details' },
      { status: 500 }
    )
  }
}
