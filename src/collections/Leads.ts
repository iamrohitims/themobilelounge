import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'phone',
    defaultColumns: ['phone', 'customerName', 'leadType', 'phoneOfInterest', 'status'],
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'customerName',
      type: 'text',
    },
    {
      name: 'leadType',
      type: 'select',
      defaultValue: 'whatsapp_query',
      options: [
        { label: 'WhatsApp Inquiry', value: 'whatsapp_query' },
        { label: 'Old Phone Exchange Valuation', value: 'exchange' },
        { label: '0% EMI Calculation Lead', value: 'emi' },
        { label: 'Price Drop / Stock Alert', value: 'stock_alert' },
      ],
    },
    {
      name: 'phoneOfInterest',
      type: 'text',
    },
    {
      name: 'details',
      type: 'textarea',
      admin: {
        description: 'Trade-in valuation, budget, or customer message notes',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: '🟡 New Inquiry', value: 'new' },
        { label: '🔵 Contacted on WhatsApp', value: 'contacted' },
        { label: '🟢 Deal Closed / Visited Store', value: 'converted' },
        { label: '⚪ Not Interested / Lost', value: 'lost' },
      ],
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        description: 'Staff internal notes',
      },
    },
  ],
}
