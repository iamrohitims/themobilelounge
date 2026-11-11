import type { CollectionConfig } from 'payload'

export const Reels: CollectionConfig = {
  slug: 'reels',
  admin: {
    useAsTitle: 'instagramUrl',
    defaultColumns: ['instagramUrl', 'caption', 'sortOrder', 'active'],
  },
  fields: [
    {
      name: 'instagramUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'Paste direct Instagram Reel URL (e.g., https://www.instagram.com/reel/SHORTCODE/)',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional caption or phone highlighted in this reel',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      index: true,
      admin: {
        description: 'Display order in horizontal snap scroller (lower numbers show first)',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      index: true,
    },
  ],
}
