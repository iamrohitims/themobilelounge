import type { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'featured', 'phoneCount'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload brand logo image (PNG/SVG/WebP). If empty, direct logo URL or default app logo will be used.',
      },
    },
    {
      name: 'logo',
      type: 'text',
      admin: {
        description: 'Direct logo URL or SVG path (e.g. /brand/logos/apple.svg). If empty, app logo is used.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
    },
    {
      name: 'phoneCount',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'popularModels',
      type: 'array',
      fields: [
        {
          name: 'model',
          type: 'text',
        },
      ],
    },
  ],
}
