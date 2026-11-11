import type { CollectionConfig } from 'payload'

export const Accessories: CollectionConfig = {
  slug: 'accessories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'subCategory', 'dealPrice', 'inStock'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'accessory',
    },
    {
      name: 'subCategory',
      type: 'text',
      admin: {
        description: 'e.g., Charger, Earbuds, Cover, Glass, Smartwatch',
      },
    },
    {
      name: 'mrp',
      type: 'number',
      required: true,
    },
    {
      name: 'dealPrice',
      type: 'number',
      required: true,
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'image',
      type: 'text',
    },
    {
      name: 'compatibility',
      type: 'text',
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
      ],
    },
  ],
}
