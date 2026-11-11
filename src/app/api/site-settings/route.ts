import { NextResponse } from 'next/server'
import { getStoreSettings } from '@/lib/services/site-settings'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const settings = await getStoreSettings()
    return NextResponse.json(settings, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      {
        siteLogo: '/brand/logo.png',
        siteLogoAlt: 'The Mobile Lounge Kakod',
      },
      { status: 500 }
    )
  }
}
