import { getPayload } from 'payload'
import config from '@/payload.config'
import { siteConfig } from '@/config/site'

export interface DynamicStoreSettings {
  siteLogo: string
  siteLogoAlt: string
  storePhone: string
  whatsappNumber: string
  storeAddress: string
  openingHours: string
  announcementBarText: string
  googleBusinessUrl: string
  googleMapsEmbedUrl?: string
  latitude: number
  longitude: number
  mapQuery: string
  resolvedMapEmbedUrl: string
}

export async function getStoreSettings(): Promise<DynamicStoreSettings> {
  const defaults: DynamicStoreSettings = {
    siteLogo: '/brand/logo.png',
    siteLogoAlt: 'The Mobile Lounge - Kakod Showroom',
    storePhone: siteConfig.contact.phone,
    whatsappNumber: siteConfig.contact.whatsapp,
    storeAddress: siteConfig.location.fullAddress,
    openingHours: siteConfig.location.openingHours.display,
    announcementBarText:
      '🔥 0% EMI Available on All 5G Smartphones • Free Gifts with Every iPhone & Galaxy!',
    googleBusinessUrl: 'https://share.google/8qhHVs7TmFxegJl1N',
    latitude: 28.256,
    longitude: 77.834,
    mapQuery: 'VISHAL DISTRIBUTORS KAKOD',
    resolvedMapEmbedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=77.826%2C28.251%2C77.842%2C28.261&layer=mapnik&marker=28.256%2C77.834',
  }

  try {
    const payload = await getPayload({ config })
    const data: any = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })

    if (!data) return defaults

    // Resolve dynamic site logo: preferred uploaded media file, then text path, then default
    let resolvedLogo = defaults.siteLogo
    if (data.siteLogoUpload && typeof data.siteLogoUpload === 'object' && data.siteLogoUpload.url) {
      resolvedLogo = data.siteLogoUpload.url
    } else if (typeof data.siteLogo === 'string' && data.siteLogo.trim()) {
      resolvedLogo = data.siteLogo.trim()
    }

    const lat = typeof data.latitude === 'number' ? data.latitude : defaults.latitude
    const lng = typeof data.longitude === 'number' ? data.longitude : defaults.longitude
    const rawEmbed = data.googleMapsEmbedUrl?.trim() || ''

    let resolvedEmbed = ''
    if (rawEmbed) {
      // If user pasted a full <iframe src="..." ...> snippet, extract src
      const iframeMatch = rawEmbed.match(/src=["'](.*?)["']/)
      resolvedEmbed = iframeMatch ? iframeMatch[1] : rawEmbed
    } else {
      // High-precision OpenStreetMap pin centered at store coordinates
      resolvedEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008}%2C${lat - 0.005}%2C${lng + 0.008}%2C${lat + 0.005}&layer=mapnik&marker=${lat}%2C${lng}`
    }

    return {
      siteLogo: resolvedLogo,
      siteLogoAlt: data.siteLogoAlt || defaults.siteLogoAlt,
      storePhone: data.storePhone || defaults.storePhone,
      whatsappNumber: data.whatsappNumber || defaults.whatsappNumber,
      storeAddress: data.storeAddress || defaults.storeAddress,
      openingHours: data.openingHours || defaults.openingHours,
      announcementBarText: data.announcementBarText || defaults.announcementBarText,
      googleBusinessUrl: data.googleBusinessUrl || defaults.googleBusinessUrl,
      googleMapsEmbedUrl: rawEmbed,
      latitude: lat,
      longitude: lng,
      mapQuery: data.mapQuery || defaults.mapQuery,
      resolvedMapEmbedUrl: resolvedEmbed,
    }
  } catch (err) {
    console.warn('Failed to load site-settings global, using defaults:', err)
    return defaults
  }
}
