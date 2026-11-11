'use client'

import React, { useEffect, useState } from 'react'
import { Banner, Button, Card, Gutter, Pill } from '@payloadcms/ui'
import Link from 'next/link'

interface DashboardData {
  summary: {
    totalProducts: number
    totalBrands: number
    totalValuation: number
    hotDealsCount: number
    demandedCount: number
    emiCount: number
    zeroCostEmiCount: number
    totalOffers: number
    totalLeads: number
    newLeadsCount: number
  }
  brandDistribution: Array<{
    name: string
    count: number
    percentage: number
  }>
  priceBrackets: Array<{
    label: string
    range: string
    count: number
    percentage: number
    color: string
  }>
  recentProducts: Array<{
    id: string
    name: string
    slug: string
    brand: string
    price: number
    mrp: number
    image: string
    isHotDeal: boolean
  }>
  recentLeads: Array<{
    id: string
    phone: string
    customerName: string
    leadType: string
    phoneOfInterest: string
    status: string
    createdAt: string
  }>
}

export const DashboardStats: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) setData(json)
      })
      .catch((err) => console.error('Error fetching dashboard stats:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading && !data) {
    return (
      <Gutter>
        <div style={{ padding: '24px 0' }}>
          <Banner type="default">
            Loading Showroom Catalog Analytics &amp; Inventory Statistics...
          </Banner>
        </div>
      </Gutter>
    )
  }

  if (!data) return null

  const { summary, brandDistribution, priceBrackets, recentProducts, recentLeads } = data

  const formatRupees = (val: number) => '₹' + Number(val || 0).toLocaleString('en-IN')

  return (
    <div style={{ width: '100%', marginBottom: '28px' }}>
      <Gutter>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 1. Showroom Live Banner with Payload Buttons */}
          <Banner type="info">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                width: '100%',
              }}
            >
              <div>
                <strong>The Mobile Lounge • Kakod Showroom Command Center</strong>
                <div style={{ fontSize: '12px', marginTop: '2px', opacity: 0.9 }}>
                  {summary.totalProducts} active smartphone models • {summary.totalBrands} global brands • {summary.zeroCostEmiCount} 0% EMI plans
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <Button el="link" to="/admin/import-product" buttonStyle="primary" size="small">
                  ⚡ Auto-Import Phone
                </Button>
                <Button el="link" to="/admin/collections/products/create" buttonStyle="secondary" size="small">
                  ➕ Add New Phone
                </Button>
                <Button el="anchor" url="/" newTab buttonStyle="subtle" size="small">
                  🌐 View Live Website
                </Button>
              </div>
            </div>
          </Banner>

          {/* 2. Key Metrics Row using Payload Card-based Presentation */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
            }}
          >
            {/* Card 1: Total Live Phones */}
            <div
              style={{
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: 'var(--style-radius-m, 12px)',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--theme-text-muted)' }}>
                  ACTIVE MODELS
                </span>
                <Pill pillStyle="warning" size="small">
                  {summary.hotDealsCount} Hot Deals
                </Pill>
              </div>
              <div style={{ margin: '10px 0 4px 0' }}>
                <span style={{ fontSize: '32px', fontWeight: 900, color: 'var(--theme-text)' }}>
                  {summary.totalProducts}
                </span>
                <span style={{ fontSize: '13px', marginLeft: '6px', color: '#ff5a1f', fontWeight: 700 }}>
                  Live Phones
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)' }}>
                {summary.demandedCount} prioritized in Kakod Most Demanded
              </span>
            </div>

            {/* Card 2: Showroom Valuation */}
            <div
              style={{
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: 'var(--style-radius-m, 12px)',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--theme-text-muted)' }}>
                  CATALOG VALUATION
                </span>
                <Pill pillStyle="success" size="small">
                  Retail Value
                </Pill>
              </div>
              <div style={{ margin: '10px 0 4px 0' }}>
                <span style={{ fontSize: '26px', fontWeight: 900, color: '#10b981' }}>
                  {formatRupees(summary.totalValuation)}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)' }}>
                Sum of starting retail pricing across live models
              </span>
            </div>

            {/* Card 3: Authorized Brands */}
            <div
              style={{
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: 'var(--style-radius-m, 12px)',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--theme-text-muted)' }}>
                  SHOWROOM BRANDS
                </span>
                <Pill pillStyle="light-gray" size="small">
                  Official
                </Pill>
              </div>
              <div style={{ margin: '10px 0 4px 0' }}>
                <span style={{ fontSize: '32px', fontWeight: 900, color: 'var(--theme-text)' }}>
                  {summary.totalBrands}
                </span>
                <span style={{ fontSize: '13px', marginLeft: '6px', color: 'var(--theme-text-muted)', fontWeight: 700 }}>
                  Brands
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)' }}>
                Apple, Samsung, Vivo, OnePlus, Realme &amp; more
              </span>
            </div>

            {/* Card 4: 0% EMI Financing */}
            <div
              style={{
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: 'var(--style-radius-m, 12px)',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--theme-text-muted)' }}>
                  FINANCING &amp; 0% EMI
                </span>
                <Pill pillStyle="success" size="small">
                  Instant Approval
                </Pill>
              </div>
              <div style={{ margin: '10px 0 4px 0' }}>
                <span style={{ fontSize: '32px', fontWeight: 900, color: '#38bdf8' }}>
                  {summary.zeroCostEmiCount}
                </span>
                <span style={{ fontSize: '13px', marginLeft: '6px', color: 'var(--theme-text-muted)', fontWeight: 700 }}>
                  / {summary.totalProducts} Phones
                </span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)' }}>
                Bajaj Finserv, TVS &amp; Credit Card 0% EMI in Kakod
              </span>
            </div>
          </div>

          {/* 3. Visual Charts & Analytical Graphs (Two Columns) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Graph 1: Brand Distribution */}
            <div
              style={{
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: 'var(--style-radius-m, 12px)',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--theme-text)' }}>
                    Inventory Distribution by Brand
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)' }}>
                    Active showroom catalog models breakdown
                  </span>
                </div>
                <Button el="link" to="/admin/collections/brands" buttonStyle="subtle" size="small">
                  Brands List →
                </Button>
              </div>

              {/* Stacked Colored Bar */}
              <div
                style={{
                  height: '10px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  display: 'flex',
                  background: 'var(--theme-elevation-150)',
                  marginBottom: '16px',
                }}
              >
                {brandDistribution.map((b, idx) => {
                  const colors = ['#ff5a1f', '#38bdf8', '#c5e84a', '#a855f7', '#f59e0b', '#ec4899']
                  const color = colors[idx % colors.length]
                  return (
                    <div
                      key={b.name}
                      title={`${b.name}: ${b.count} models (${b.percentage}%)`}
                      style={{
                        width: `${b.percentage}%`,
                        backgroundColor: color,
                        minWidth: b.count > 0 ? '6px' : '0',
                      }}
                    />
                  )
                })}
              </div>

              {/* Breakdown List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {brandDistribution.map((b, idx) => {
                  const colors = ['#ff5a1f', '#38bdf8', '#c5e84a', '#a855f7', '#f59e0b', '#ec4899']
                  const color = colors[idx % colors.length]
                  return (
                    <div
                      key={b.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        background: 'var(--theme-elevation-100)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: color,
                          }}
                        />
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--theme-text)' }}>
                          {b.name}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--theme-text)' }}>
                          {b.count} {b.count === 1 ? 'model' : 'models'}
                        </span>
                        <Pill pillStyle="light-gray" size="small">
                          {b.percentage}%
                        </Pill>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Graph 2: Price Bracket Segmentation */}
            <div
              style={{
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: 'var(--style-radius-m, 12px)',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--theme-text)' }}>
                    Customer Price Bracket Spectrum
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)' }}>
                    Segmented by showroom retail price range
                  </span>
                </div>
                <Button el="link" to="/admin/collections/products" buttonStyle="subtle" size="small">
                  Products List →
                </Button>
              </div>

              {/* Progress Meter Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {priceBrackets.map((bracket) => (
                  <div key={bracket.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--theme-text)' }}>
                          {bracket.label}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)' }}>
                          ({bracket.range})
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: bracket.color }}>
                          {bracket.count} {bracket.count === 1 ? 'phone' : 'phones'}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)' }}>
                          ({bracket.percentage}%)
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        height: '6px',
                        borderRadius: '4px',
                        background: 'var(--theme-elevation-150)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${bracket.percentage}%`,
                          backgroundColor: bracket.color,
                          borderRadius: '4px',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px' }}>
                <Banner type="default">
                  💡 In Kakod, 5G phones in the ₹10k–₹20k range drive the highest daily retail turnover.
                </Banner>
              </div>
            </div>
          </div>

          {/* 4. Latest Added Showcase Phones & Customer Inquiries */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '16px',
            }}
          >
            {/* Latest Products */}
            <div
              style={{
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: 'var(--style-radius-m, 12px)',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--theme-text)' }}>
                  Recently Added Showcase Phones
                </h4>
                <Button el="link" to="/admin/collections/products" buttonStyle="subtle" size="small">
                  View All ({summary.totalProducts})
                </Button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recentProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'var(--theme-elevation-100)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          objectFit: 'contain',
                          backgroundColor: '#09090b',
                          flexShrink: 0,
                        }}
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = '/brand/logo.png'
                        }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--theme-text-muted)' }}>
                            {p.brand}
                          </span>
                          {p.isHotDeal && (
                            <Pill pillStyle="warning" size="small">
                              HOT DEAL
                            </Pill>
                          )}
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '12px',
                            fontWeight: 700,
                            color: 'var(--theme-text)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {p.name}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>
                        {formatRupees(p.price || p.mrp)}
                      </span>
                      <Button
                        el="link"
                        to={`/admin/collections/products/${p.id}`}
                        buttonStyle="subtle"
                        size="small"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Leads */}
            <div
              style={{
                background: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: 'var(--style-radius-m, 12px)',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--theme-text)' }}>
                    Customer Inquiries &amp; Leads
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)' }}>
                    Website WhatsApp &amp; EMI requests
                  </span>
                </div>
                <Button el="link" to="/admin/collections/leads" buttonStyle="subtle" size="small">
                  Leads ({summary.totalLeads})
                </Button>
              </div>

              {recentLeads.length === 0 ? (
                <Banner type="default">
                  💬 Direct WhatsApp channel active. Customers clicking &quot;Check Deal Price&quot; or &quot;Calculate EMI&quot; start chats directly with Vishal bhai (+91 70172 89590).
                </Banner>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {recentLeads.map((lead) => (
                    <div
                      key={lead.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'var(--theme-elevation-100)',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--theme-text)' }}>
                            {lead.customerName || lead.phone}
                          </span>
                          <Pill pillStyle={lead.status === 'new' ? 'success' : 'light-gray'} size="small">
                            {lead.status}
                          </Pill>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--theme-text-muted)' }}>
                          Interested in: <strong>{lead.phoneOfInterest}</strong>
                        </span>
                      </div>

                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: '#25D366',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '5px 10px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                        }}
                      >
                        WhatsApp
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Gutter>
    </div>
  )
}
