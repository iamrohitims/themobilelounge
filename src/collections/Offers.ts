import type { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
  slug: 'offers',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'badge', 'validUntil', 'featured'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'badge',
      type: 'text',
      defaultValue: 'FESTIVE SPECIAL',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'code',
      type: 'text',
    },
    {
      name: 'discountValue',
      type: 'text',
    },
    {
      name: 'validUntil',
      type: 'text',
      required: true,
    },
    {
      name: 'applicableCategory',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All Store Products', value: 'all' },
        { label: 'Smartphones Only', value: 'phones' },
        { label: 'Accessories Only', value: 'accessories' },
        { label: 'Old Phone Exchange', value: 'exchange' },
        { label: '0% EMI Purchases', value: 'emi' },
      ],
    },
    {
      name: 'applicableBrands',
      type: 'array',
      fields: [
        {
          name: 'brand',
          type: 'text',
        },
      ],
    },
    {
      name: 'terms',
      type: 'array',
      fields: [
        {
          name: 'term',
          type: 'text',
        },
      ],
    },
    {
      name: 'bannerColor',
      type: 'text',
      defaultValue: 'from-amber-500/20 to-orange-500/20',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      index: true,
    },
  ],
}
