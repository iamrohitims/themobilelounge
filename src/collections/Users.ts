import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'staff',
      required: true,
      options: [
        { label: 'Super Admin (Store Owner)', value: 'admin' },
        { label: 'Store Manager', value: 'manager' },
        { label: 'Sales Staff', value: 'staff' },
      ],
    },
  ],
}
