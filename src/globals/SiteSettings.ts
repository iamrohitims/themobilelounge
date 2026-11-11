import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  fields: [
    // Store Logo & Branding
    {
      type: 'row',
      fields: [
        {
          name: 'siteLogoUpload',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Upload new store logo (PNG / WebP / SVG). If uploaded, it automatically updates the logo across the entire website and dashboard.',
          },
        },
        {
          name: 'siteLogo',
          type: 'text',
          defaultValue: '/brand/logo.png',
          admin: {
            description:
              'Direct logo image path or URL (e.g. /brand/logo.png). Used as fallback if no image is uploaded above.',
          },
        },
      ],
    },
    {
      name: 'siteLogoAlt',
      type: 'text',
      defaultValue: 'The Mobile Lounge - Kakod Showroom',
      admin: {
        description: 'Image alt text for accessibility and SEO',
      },
    },
    {
      name: 'storePhone',
      type: 'text',
      defaultValue: '+91 70172 89590',
      required: true,
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      defaultValue: '917017289590',
      required: true,
    },
    {
      name: 'storeAddress',
      type: 'text',
      defaultValue: 'Main Market, Near Vishal Distributors, Kakod, Bulandshahr, UP - 203201',
      required: true,
    },
    {
      name: 'openingHours',
      type: 'text',
      defaultValue: 'Open 7 Days • 9:30 AM – 9:00 PM',
    },
    {
      name: 'announcementBarText',
      type: 'text',
      defaultValue: '🔥 0% EMI Available on All 5G Smartphones • Free Gifts with Every iPhone & Galaxy!',
    },
    // Google Maps & Business Profile Integration
    {
      name: 'googleBusinessUrl',
      type: 'text',
      defaultValue: 'https://share.google/8qhHVs7TmFxegJl1N',
      admin: {
        description:
          'Google Business Profile / Maps share link (e.g. https://share.google/8qhHVs7TmFxegJl1N or https://maps.app.goo.gl/...). Used by all "Open in Google Maps" & "Get Directions" buttons.',
      },
    },
    {
      name: 'googleMapsEmbedUrl',
      type: 'textarea',
      admin: {
        description:
          'Custom Google Maps Embed link OR full <iframe> code (from Google Maps -> Share -> "Embed a map"). If provided, this map embed is rendered on the website.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          defaultValue: 28.256,
          admin: {
            description: 'Store Latitude for interactive map pin (Kakod: 28.2560)',
          },
        },
        {
          name: 'longitude',
          type: 'number',
          defaultValue: 77.834,
          admin: {
            description: 'Store Longitude for interactive map pin (Kakod: 77.8340)',
          },
        },
      ],
    },
    {
      name: 'mapQuery',
      type: 'text',
      defaultValue: 'VISHAL DISTRIBUTORS KAKOD',
      admin: {
        description:
          'Store Search Query / Business Name (e.g. VISHAL DISTRIBUTORS KAKOD)',
      },
    },
    {
      name: 'trustHighlights',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          admin: { description: 'Lucide icon name e.g. Gift, CreditCard, ShieldCheck' },
        },
      ],
    },
  ],
}
