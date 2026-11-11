import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Products } from './collections/Products'
import { Brands } from './collections/Brands'
import { Accessories } from './collections/Accessories'
import { Offers } from './collections/Offers'
import { Reels } from './collections/Reels'
import { Reviews } from './collections/Reviews'
import { FAQs } from './collections/FAQs'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ['@/components/admin/DashboardStats#DashboardStats'],
      graphics: {
        Logo: '@/components/admin/AdminLogo#AdminLogo',
        Icon: '@/components/admin/AdminIcon#AdminIcon',
      },
      views: {
        importProduct: {
          Component: '@/components/admin/ImportProductView#ImportProductView',
          path: '/import-product',
        },
      },
    },
    meta: {
      titleSuffix: '• The Mobile Lounge Showroom Admin',
      icons: [{ rel: 'icon', url: '/brand/logo.png' }],
      openGraph: {
        images: ['/brand/logo.png'],
      },
    },
  },
  collections: [
    Products,
    Brands,
    Offers,
    Reels,
    Accessories,
    Reviews,
    FAQs,
    Leads,
    Users,
    Media,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'themobilelounge-kakod-local-secret-key-change-in-prod',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || process.env.MONGODB_URI || '',
    connectOptions: {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  }),
  sharp,
})
