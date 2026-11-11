import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // Tab 1: Branding & Contact Info
        {
          label: 'Branding & Contact',
          fields: [
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
              type: 'row',
              fields: [
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
              ],
            },
            {
              type: 'row',
              fields: [
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
              ],
            },
          ],
        },

        // Tab 2: Announcement Bar (Marquee Ticker)
        {
          label: 'Announcement Bar',
          fields: [
            {
              name: 'showAnnouncementBar',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Toggle on/off to show or completely hide the top announcement bar',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'announcementBadge',
                  type: 'text',
                  defaultValue: 'Kakod Hub',
                  admin: {
                    description: 'Pill badge prefix (e.g. Kakod Hub, Special Offer, Festive Deal)',
                  },
                },
                {
                  name: 'announcementLocationText',
                  type: 'text',
                  defaultValue: 'Main Market, Kakod',
                },
                {
                  name: 'announcementTimings',
                  type: 'text',
                  defaultValue: 'Open 9:30 AM – 9:00 PM',
                },
              ],
            },
            {
              name: 'announcementLocationUrl',
              type: 'text',
              defaultValue: 'https://share.google/8qhHVs7TmFxegJl1N',
              admin: {
                description: 'Google Maps destination link when location is clicked',
              },
            },
            {
              name: 'announcementTickerItems',
              type: 'array',
              admin: {
                description: 'Ticker items that smoothly scroll in the marquee scroller',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
              defaultValue: [
                { text: 'iPhone 16 Series In-Stock • 0% Downpayment EMI • Free Smartwatch on Flagships' },
                { text: '100% Genuine Sealed Pack with GST Bill & Brand Warranty' },
                { text: 'Instant 5-Minute Paperless EMI via Bajaj Finserv, TVS & IDFC' },
                { text: 'Spot Old Phone Exchange with Instant Cash Discount' },
              ],
            },
            {
              name: 'announcementBarText',
              type: 'text',
              defaultValue: '🔥 0% EMI Available on All 5G Smartphones • Free Gifts with Every iPhone & Galaxy!',
              admin: {
                description: 'Single-line announcement text fallback',
              },
            },
          ],
        },

        // Tab 3: Hero Eyebrow Status Pill
        {
          label: 'Hero Status Pill',
          fields: [
            {
              name: 'showHeroEyebrow',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                description: 'Toggle on/off to show or hide the status pill in the Hero banner',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'heroEyebrowBadge',
                  type: 'text',
                  defaultValue: 'Showroom Open Now',
                  admin: {
                    description: 'Badge highlighted with pulsing live emerald radar dot',
                  },
                },
                {
                  name: 'heroEyebrowText',
                  type: 'text',
                  defaultValue: 'Main Market, Kakod • ★ 4.9 Verified Reviews',
                  admin: {
                    description: 'Secondary status text or location descriptor',
                  },
                },
              ],
            },
          ],
        },

        // Tab 4: Hero Quick Filters
        {
          label: 'Hero Quick Filters',
          fields: [
            {
              name: 'heroQuickFilters',
              type: 'array',
              admin: {
                description: 'Manage quick pills shown below hero search bar (reorder, add single phone links, multi-brand filters, or budget ranges)',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      admin: { description: 'Pill text (e.g. iPhone 16, Apple + Samsung, Under ₹15K)' },
                    },
                    {
                      name: 'icon',
                      type: 'text',
                      admin: { description: 'Emoji prefix (e.g. 🍎, 🌌, ⚡, 📸, 💳, 🔥)' },
                    },
                    {
                      name: 'filterType',
                      type: 'select',
                      defaultValue: 'custom',
                      options: [
                        { label: 'Single Phone (Direct Link)', value: 'phone' },
                        { label: 'Brand Filter (Single or Multi-Brand)', value: 'brand' },
                        { label: 'Budget Range Filter', value: 'budget' },
                        { label: 'Custom URL / Path', value: 'custom' },
                      ],
                    },
                    {
                      name: 'isActive',
                      type: 'checkbox',
                      defaultValue: true,
                    },
                  ],
                },
                {
                  name: 'targetPhoneSlug',
                  type: 'text',
                  admin: {
                    description: 'Phone slug (e.g. apple-iphone-16, samsung-galaxy-s25-5g)',
                    condition: (_data, siblingData) => siblingData?.filterType === 'phone',
                  },
                },
                {
                  name: 'selectedBrands',
                  type: 'select',
                  hasMany: true,
                  options: [
                    { label: 'Apple', value: 'Apple' },
                    { label: 'Samsung', value: 'Samsung' },
                    { label: 'OnePlus', value: 'OnePlus' },
                    { label: 'Vivo', value: 'Vivo' },
                    { label: 'Realme', value: 'Realme' },
                    { label: 'Xiaomi / Redmi', value: 'Xiaomi' },
                    { label: 'Google Pixel', value: 'Google' },
                    { label: 'Motorola', value: 'Motorola' },
                    { label: 'OPPO', value: 'OPPO' },
                    { label: 'Nothing / CMF', value: 'Nothing' },
                  ],
                  admin: {
                    description: 'Select one or multiple brands to pre-filter simultaneously',
                    condition: (_data, siblingData) => siblingData?.filterType === 'brand',
                  },
                },
                {
                  name: 'budgetRange',
                  type: 'select',
                  options: [
                    { label: 'Under ₹10,000', value: 'under-10000' },
                    { label: '₹10,000 – ₹15,000', value: '10000-to-15000' },
                    { label: '₹15,000 – ₹25,000', value: '15000-to-25000' },
                    { label: '₹25,000 – ₹40,000', value: '25000-to-40000' },
                    { label: 'Above ₹40,000 (Flagships)', value: 'above-40000' },
                  ],
                  admin: {
                    condition: (_data, siblingData) => siblingData?.filterType === 'budget',
                  },
                },
                {
                  name: 'customHref',
                  type: 'text',
                  admin: {
                    description: 'Target route (e.g. /emi, /offers, /phones?sort=discount)',
                    condition: (_data, siblingData) => siblingData?.filterType === 'custom',
                  },
                },
              ],
              defaultValue: [
                { label: 'iPhone 16', icon: '🍎', filterType: 'phone', targetPhoneSlug: 'apple-iphone-16', isActive: true },
                { label: 'Galaxy S25', icon: '🌌', filterType: 'phone', targetPhoneSlug: 'samsung-galaxy-s25-5g', isActive: true },
                { label: 'OnePlus', icon: '⚡', filterType: 'brand', selectedBrands: ['OnePlus'], isActive: true },
                { label: 'Vivo', icon: '📸', filterType: 'brand', selectedBrands: ['Vivo'], isActive: true },
                { label: 'Under ₹15K', icon: '₹', filterType: 'budget', budgetRange: '10000-to-15000', isActive: true },
                { label: '0% EMI', icon: '💳', filterType: 'custom', customHref: '/emi', isActive: true },
              ],
            },
          ],
        },

        // Tab 5: Location & Maps
        {
          label: 'Location & Maps',
          fields: [
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
          ],
        },

        // Tab 6: Trust Highlights
        {
          label: 'Trust Highlights',
          fields: [
            {
              name: 'trustHighlights',
              type: 'array',
              admin: {
                description: 'Trust highlight cards shown across the store',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'title',
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
                {
                  name: 'subtitle',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
