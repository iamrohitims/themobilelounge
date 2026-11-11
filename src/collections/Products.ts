import type { CollectionConfig } from 'payload'
import {
  syncBrandOnAfterChange,
  syncBrandOnAfterDelete,
} from './hooks/syncBrandPhoneCount'
import {
  cleanupProductImagesOnChange,
  cleanupProductImagesOnDelete,
} from './hooks/cleanupProductImages'
import { syncDemandedTagsBeforeChange } from './hooks/syncDemandedTags'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'brand', 'category', 'isHotDeal', 'isMostDemanded', 'emiAvailable'],
    components: {
      beforeList: ['@/components/admin/ProductListBanner#ProductListBanner'],
    },
  },
  hooks: {
    beforeChange: [syncDemandedTagsBeforeChange],
    afterChange: [syncBrandOnAfterChange, cleanupProductImagesOnChange],
    afterDelete: [syncBrandOnAfterDelete, cleanupProductImagesOnDelete],
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
      name: 'brand',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'phone',
      required: true,
      index: true,
      options: [
        { label: 'Smartphone', value: 'phone' },
        { label: 'Accessory', value: 'accessory' },
      ],
    },
    {
      name: 'subCategory',
      type: 'text',
    },
    // Hot Deal & Showcase Fields
    {
      type: 'row',
      fields: [
        {
          name: 'isHotDeal',
          type: 'checkbox',
          defaultValue: false,
          index: true,
          admin: {
            description: '⚡ Show in Hero Hot Deals Carousel on Homepage',
          },
        },
        {
          name: 'isMostDemanded',
          type: 'checkbox',
          defaultValue: false,
          index: true,
          admin: {
            description: '🔥 Show in "Most Demanded Phones in Kakod" on Homepage',
          },
        },
        {
          name: 'hotDealBadge',
          type: 'text',
          admin: {
            description: 'e.g., "HOT SELLER", "NEW LAUNCH", "VIP CHOICE"',
          },
        },
      ],
    },
    {
      name: 'freeGift',
      type: 'text',
      admin: {
        description: 'e.g., "Smartwatch + 20W Fast Charger Free"',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'emiMonthly',
          type: 'number',
          admin: {
            description: 'Starting monthly EMI in ₹ (e.g., 5999)',
          },
        },
        {
          name: 'specBadge',
          type: 'text',
          admin: {
            description: 'Short specs for card (e.g. "Desert Titanium • A18 Pro • 48MP")',
          },
        },
      ],
    },
    // Product Images
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'src',
          type: 'text',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          defaultValue: '',
        },
        {
          name: 'color',
          type: 'text',
        },
      ],
    },
    // Storage, RAM & Color Variants
    {
      name: 'variants',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'ram',
              type: 'number',
              admin: { description: 'RAM in GB' },
            },
            {
              name: 'storage',
              type: 'number',
              admin: { description: 'Storage in GB (1000 for 1TB)' },
            },
            {
              name: 'color',
              type: 'text',
              required: true,
            },
            {
              name: 'colorHex',
              type: 'text',
              admin: { description: 'Hex code e.g. #000000' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'mrp',
              type: 'number',
              required: true,
            },
            {
              name: 'price',
              type: 'number',
              required: true,
              admin: { description: 'The Mobile Lounge Deal Price' },
            },
            {
              name: 'inStock',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'sku',
              type: 'text',
            },
          ],
        },
      ],
    },
    // Highlights
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'highlight',
          type: 'text',
        },
      ],
    },
    // Technical Specifications
    {
      name: 'specs',
      type: 'json',
      admin: {
        description: 'Structured specs { display: {...}, performance: {...}, camera: {...}, battery: {...} }',
      },
    },
    // Tags & Badges
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      index: true,
      options: [
        { label: 'Most Demanded in Kakod', value: 'most-demanded' },
        { label: 'New Launch', value: 'new' },
        { label: 'Best Seller', value: 'bestseller' },
        { label: '5G Smartphone', value: '5g' },
        { label: 'Gaming Beast', value: 'gaming' },
        { label: 'Pro Camera', value: 'camera' },
        { label: 'Budget Hero', value: 'budget' },
        { label: 'Flagship VIP', value: 'flagship' },
      ],
    },
    // Financing & EMI
    {
      type: 'row',
      fields: [
        {
          name: 'emiAvailable',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'noCostEmi',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'minEmiPerMonth',
          type: 'number',
        },
      ],
    },
    {
      name: 'warranty',
      type: 'text',
      defaultValue: '1 Year Brand Warranty with GST Bill',
    },
    {
      name: 'boxContents',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
        },
      ],
    },
    {
      name: 'freeGiftBundle',
      type: 'array',
      fields: [
        {
          name: 'gift',
          type: 'text',
        },
      ],
    },
    {
      name: 'releaseDate',
      type: 'text',
    },
  ],
}
