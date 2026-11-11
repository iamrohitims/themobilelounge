import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'rating', 'phoneBought', 'verifiedPurchase'],
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'Kakod, Bulandshahr',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      required: true,
    },
    {
      name: 'date',
      type: 'text',
      required: true,
    },
    {
      name: 'phoneBought',
      type: 'text',
      required: true,
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
    },
    {
      name: 'verifiedPurchase',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'Google',
      options: [
        { label: 'Google Review', value: 'Google' },
        { label: 'Store Walk-in', value: 'Store Walk-in' },
        { label: 'Instagram', value: 'Instagram' },
      ],
    },
    {
      name: 'helpfulCount',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
