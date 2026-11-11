import { getPayload } from 'payload'
import config from '@/payload.config'
import { siteConfig } from '@/config/site'

export interface QuickFilterPill {
  id?: string
  label: string
  icon?: string
  filterType: 'phone' | 'brand' | 'budget' | 'custom'
  targetPhoneSlug?: string
  selectedBrands?: string[]
  budgetRange?: string
  customHref?: string
  isActive?: boolean
  resolvedHref?: string
}

export interface DynamicStoreSettings {
  siteLogo: string
  siteLogoAlt: string
  storePhone: string
  whatsappNumber: string
  storeAddress: string
  openingHours: string
  // Announcement Bar Ticker & Controls
  showAnnouncementBar: boolean
  announcementBadge: string
  announcementTickerItems: string[]
  announcementLocationText: string
  announcementLocationUrl: string
  announcementTimings: string
  // Hero Eyebrow Status Pill
  showHeroEyebrow: boolean
  heroEyebrowBadge: string
  heroEyebrowText: string
  // Hero Quick Filters
  heroQuickFilters: QuickFilterPill[]
  // Google Maps & Business Profile
  googleBusinessUrl: string
  googleMapsEmbedUrl?: string
  latitude: number
  longitude: number
  mapQuery: string
  resolvedMapEmbedUrl: string
}

/**
 * Resolves a QuickFilterPill into its destination link based on filterType
 */
export function resolveQuickFilterHref(pill: QuickFilterPill): string {
  switch (pill.filterType) {
    case 'phone':
      return pill.targetPhoneSlug ? `/phones/${pill.targetPhoneSlug}` : '/phones'
    case 'brand':
      if (!pill.selectedBrands || pill.selectedBrands.length === 0) return '/phones'
      return `/phones?brand=${pill.selectedBrands.map(encodeURIComponent).join(',')}`
    case 'budget':
      return pill.budgetRange ? `/phones/under/${pill.budgetRange}` : '/phones'
    case 'custom':
    default:
      return pill.customHref || '/phones'
  }
}

export async function getStoreSettings(): Promise<DynamicStoreSettings> {
  const defaultQuickFilters: QuickFilterPill[] = [
    { label: 'iPhone 16', icon: '🍎', filterType: 'phone', targetPhoneSlug: 'apple-iphone-16', isActive: true },
    { label: 'Galaxy S25', icon: '🌌', filterType: 'phone', targetPhoneSlug: 'samsung-galaxy-s25-5g', isActive: true },
    { label: 'OnePlus', icon: '⚡', filterType: 'brand', selectedBrands: ['OnePlus'], isActive: true },
    { label: 'Vivo', icon: '📸', filterType: 'brand', selectedBrands: ['Vivo'], isActive: true },
    { label: 'Under ₹15K', icon: '₹', filterType: 'budget', budgetRange: '10000-to-15000', isActive: true },
    { label: '0% EMI', icon: '💳', filterType: 'custom', customHref: '/emi', isActive: true },
  ]

  const defaults: DynamicStoreSettings = {
    siteLogo: '/brand/logo.png',
    siteLogoAlt: 'The Mobile Lounge - Kakod Showroom',
    storePhone: siteConfig.contact.phone,
    whatsappNumber: siteConfig.contact.whatsapp,
    storeAddress: siteConfig.location.fullAddress,
    openingHours: siteConfig.location.openingHours.display,
    showAnnouncementBar: true,
    announcementBadge: 'Kakod Hub',
    announcementTickerItems: [
      'iPhone 16 Series In-Stock • 0% Downpayment EMI • Free Smartwatch on Flagships',
      '100% Genuine Sealed Pack with GST Bill & Brand Warranty',
      'Instant 5-Minute Paperless EMI via Bajaj Finserv, TVS & IDFC',
      'Spot Old Phone Exchange with Instant Cash Discount in Kakod',
    ],
    announcementLocationText: 'Main Market, Kakod',
    announcementLocationUrl: 'https://share.google/8qhHVs7TmFxegJl1N',
    announcementTimings: 'Open 9:30 AM – 9:00 PM',
    showHeroEyebrow: true,
    heroEyebrowBadge: 'Showroom Open Now',
    heroEyebrowText: 'Main Market, Kakod • ★ 4.9 Verified Reviews',
    heroQuickFilters: defaultQuickFilters.map((p) => ({ ...p, resolvedHref: resolveQuickFilterHref(p) })),
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
      const iframeMatch = rawEmbed.match(/src=["'](.*?)["']/)
      resolvedEmbed = iframeMatch ? iframeMatch[1] : rawEmbed
    } else {
      resolvedEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008}%2C${lat - 0.005}%2C${lng + 0.008}%2C${lat + 0.005}&layer=mapnik&marker=${lat}%2C${lng}`
    }

    // Resolve announcement ticker items from data or defaults
    let tickerItems: string[] = defaults.announcementTickerItems
    if (Array.isArray(data.announcementTickerItems) && data.announcementTickerItems.length > 0) {
      tickerItems = data.announcementTickerItems
        .map((item: any) => (typeof item === 'string' ? item : item.text || ''))
        .filter(Boolean)
    } else if (data.announcementBarText) {
      tickerItems = [data.announcementBarText]
    }

    // Resolve hero quick filter pills
    let quickFilters: QuickFilterPill[] = defaultQuickFilters
    if (Array.isArray(data.heroQuickFilters) && data.heroQuickFilters.length > 0) {
      quickFilters = data.heroQuickFilters.map((p: any) => ({
        id: p.id,
        label: p.label,
        icon: p.icon || '',
        filterType: p.filterType || 'custom',
        targetPhoneSlug: p.targetPhoneSlug || '',
        selectedBrands: Array.isArray(p.selectedBrands) ? p.selectedBrands : [],
        budgetRange: p.budgetRange || '',
        customHref: p.customHref || '',
        isActive: p.isActive !== false,
      }))
    }

    // Attach resolvedHref to each pill for clean UI consumption
    const enrichedQuickFilters = quickFilters.map((p) => ({
      ...p,
      resolvedHref: resolveQuickFilterHref(p),
    }))

    return {
      siteLogo: resolvedLogo,
      siteLogoAlt: data.siteLogoAlt || defaults.siteLogoAlt,
      storePhone: data.storePhone || defaults.storePhone,
      whatsappNumber: data.whatsappNumber || defaults.whatsappNumber,
      storeAddress: data.storeAddress || defaults.storeAddress,
      openingHours: data.openingHours || defaults.openingHours,
      showAnnouncementBar: data.showAnnouncementBar !== false,
      announcementBadge: data.announcementBadge || defaults.announcementBadge,
      announcementTickerItems: tickerItems.length ? tickerItems : defaults.announcementTickerItems,
      announcementLocationText: data.announcementLocationText || defaults.announcementLocationText,
      announcementLocationUrl: data.announcementLocationUrl || defaults.announcementLocationUrl,
      announcementTimings: data.announcementTimings || defaults.announcementTimings,
      showHeroEyebrow: data.showHeroEyebrow !== false,
      heroEyebrowBadge: data.heroEyebrowBadge || defaults.heroEyebrowBadge,
      heroEyebrowText: data.heroEyebrowText || defaults.heroEyebrowText,
      heroQuickFilters: enrichedQuickFilters,
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
