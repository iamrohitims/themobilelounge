import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category'],
  },
  fields: [
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'EMI & Finance', value: 'EMI & Finance' },
        { label: 'Products & Warranty', value: 'Products & Warranty' },
        { label: 'Exchange & Trade-In', value: 'Exchange' },
        { label: 'Store & Visit', value: 'Store & Visit' },
      ],
    },
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      index: true,
    },
  ],
}
