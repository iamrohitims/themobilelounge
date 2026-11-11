import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const [productsRes, brandsRes, leadsRes, offersRes] = await Promise.all([
      payload.find({
        collection: 'products',
        limit: 200,
        pagination: false,
        sort: '-createdAt',
      }),
      payload.find({
        collection: 'brands',
        limit: 100,
        pagination: false,
      }),
      payload.find({
        collection: 'leads',
        limit: 10,
        sort: '-createdAt',
      }),
      payload.find({
        collection: 'offers',
        limit: 20,
        pagination: false,
      }),
    ])

    const products = productsRes.docs || []
    const brands = brandsRes.docs || []
    const leads = leadsRes.docs || []
    const offers = offersRes.docs || []

    const totalProducts = products.length
    let totalValuation = 0
    let hotDealsCount = 0
    let demandedCount = 0
    let emiCount = 0
    let zeroCostEmiCount = 0

    const brandCounts: Record<string, number> = {}
    const priceBuckets = {
      under10k: 0,
      tenToTwenty: 0,
      twentyToForty: 0,
      aboveForty: 0,
    }

    products.forEach((p: any) => {
      const brandName = p.brand || 'Other'
      brandCounts[brandName] = (brandCounts[brandName] || 0) + 1

      if (p.isHotDeal) hotDealsCount++
      if (p.isMostDemanded) demandedCount++
      if (p.emiAvailable) emiCount++
      if (p.noCostEmi) zeroCostEmiCount++

      const firstVariant = p.variants?.[0] || {}
      const price = Number(firstVariant.price) || Number(firstVariant.mrp) || 0
      totalValuation += price

      if (price < 10000) priceBuckets.under10k++
      else if (price <= 20000) priceBuckets.tenToTwenty++
      else if (price <= 40000) priceBuckets.twentyToForty++
      else priceBuckets.aboveForty++
    })

    const brandDistribution = Object.entries(brandCounts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)

    const priceBrackets = [
      {
        label: 'Budget Entry',
        range: 'Under ₹10,000',
        count: priceBuckets.under10k,
        percentage: totalProducts > 0 ? Math.round((priceBuckets.under10k / totalProducts) * 100) : 0,
        color: '#10b981', // emerald
      },
      {
        label: 'Mid-Range 5G',
        range: '₹10k - ₹20k',
        count: priceBuckets.tenToTwenty,
        percentage: totalProducts > 0 ? Math.round((priceBuckets.tenToTwenty / totalProducts) * 100) : 0,
        color: '#06b6d4', // cyan
      },
      {
        label: 'Premium 5G',
        range: '₹20k - ₹40k',
        count: priceBuckets.twentyToForty,
        percentage: totalProducts > 0 ? Math.round((priceBuckets.twentyToForty / totalProducts) * 100) : 0,
        color: '#f59e0b', // amber
      },
      {
        label: 'Flagship VIP',
        range: '₹40,000+',
        count: priceBuckets.aboveForty,
        percentage: totalProducts > 0 ? Math.round((priceBuckets.aboveForty / totalProducts) * 100) : 0,
        color: '#ff5a1f', // orange/brand
      },
    ]

    const recentProducts = products.slice(0, 5).map((p: any) => ({
      id: String(p.id),
      name: p.name,
      slug: p.slug,
      brand: p.brand,
      mrp: p.variants?.[0]?.mrp || 0,
      price: p.variants?.[0]?.price || 0,
      image: p.images?.[0]?.src || '/brand/logo.png',
      isHotDeal: Boolean(p.isHotDeal),
      createdAt: p.createdAt,
    }))

    const recentLeads = leads.slice(0, 5).map((l: any) => ({
      id: String(l.id),
      phone: l.phone,
      customerName: l.customerName || 'Customer',
      leadType: l.leadType || 'Inquiry',
      phoneOfInterest: l.phoneOfInterest || 'Smartphone Inquiry',
      status: l.status || 'new',
      createdAt: l.createdAt,
    }))

    return NextResponse.json({
      summary: {
        totalProducts,
        totalBrands: brands.length,
        totalValuation,
        hotDealsCount,
        demandedCount,
        emiCount,
        zeroCostEmiCount,
        totalOffers: offers.length,
        totalLeads: leads.length,
        newLeadsCount: leads.filter((l: any) => l.status === 'new').length,
      },
      brandDistribution,
      priceBrackets,
      recentProducts,
      recentLeads,
    })
  } catch (err: any) {
    console.error('Error in /api/admin/stats:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
