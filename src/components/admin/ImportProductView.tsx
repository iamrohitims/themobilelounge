'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export const ImportProductView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scrape' | 'manual'>('scrape')

  // Scraper State
  const [scrapeMode, setScrapeMode] = useState<'url' | 'html'>('url')
  const [url, setUrl] = useState('')
  const [pastedHtml, setPastedHtml] = useState('')
  const [isScraping, setIsScraping] = useState(false)
  const [scrapeError, setScrapeError] = useState('')
  const [scrapedData, setScrapedData] = useState<any>(null)
  const [activeImagePreview, setActiveImagePreview] = useState<string | null>(null)

  // Saving State
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState('')
  const [saveError, setSaveError] = useState('')

  // Manual Form State
  const [manualForm, setManualForm] = useState({
    name: '',
    brand: 'Apple',
    subtitle: '',
    mrp: 79999,
    dealPrice: 74999,
    ram: 8,
    storage: 128,
    color: 'Titanium Black',
    colorHex: '#18181b',
    isHotDeal: false,
    isMostDemanded: false,
    hotDealBadge: 'HOT SELLER',
    freeGift: 'Free Smartwatch + 20W Fast Charger',
    emiMonthly: 3999,
    imagesText: '',
    processor: 'Octa-Core 5G Processor',
    camera: '50MP AI Main Camera',
    battery: '5000 mAh Fast Charging',
  })

  const BRANDS = [
    'Apple',
    'Samsung',
    'OnePlus',
    'Vivo',
    'Oppo',
    'Realme',
    'Xiaomi',
    'Motorola',
    'iQOO',
    'Poco',
    'Google',
    'Nothing',
    'Honor',
  ]

  async function handleScrape() {
    if (scrapeMode === 'url' && !url.trim()) return
    if (scrapeMode === 'html' && !pastedHtml.trim()) return

    setIsScraping(true)
    setScrapeError('')
    setSaveSuccess('')
    setSaveError('')

    try {
      const res = await fetch('/api/admin/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          scrapeMode === 'html'
            ? { html: pastedHtml.trim(), url: url.trim() }
            : { url: url.trim() }
        ),
      })

      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to fetch details')
      }

      setScrapedData(json.data)
      if (json.data.images?.[0]?.src) {
        setActiveImagePreview(json.data.images[0].src)
      }
    } catch (err: any) {
      setScrapeError(err.message || 'Could not scrape product. Try entering details manually.')
    } finally {
      setIsScraping(false)
    }
  }

  async function handleSave(dataToSave: any) {
    setIsSaving(true)
    setSaveSuccess('')
    setSaveError('')

    try {
      const res = await fetch('/api/admin/save-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      })

      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to save product')
      }

      setSaveSuccess(
        `✅ Success! "${dataToSave.name}" was saved to MongoDB Atlas, and all ${json.localImagesCount} photos were downloaded directly to local server storage (/uploads/products/${json.slug}/)!`
      )
      if (activeTab === 'scrape') {
        setScrapedData(null)
        setUrl('')
        setActiveImagePreview(null)
      }
    } catch (err: any) {
      setSaveError(err.message || 'Failed to save product.')
    } finally {
      setIsSaving(false)
    }
  }

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault()
    const images = manualForm.imagesText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((src, i) => ({
        src,
        alt: `${manualForm.name} view ${i + 1}`,
        color: manualForm.color,
      }))

    const payload = {
      name: manualForm.name,
      brand: manualForm.brand,
      subtitle: manualForm.subtitle || `${manualForm.brand} 5G Smartphone with Official Brand Warranty`,
      mrp: Number(manualForm.mrp),
      dealPrice: Number(manualForm.dealPrice),
      isHotDeal: manualForm.isHotDeal,
      isMostDemanded: manualForm.isMostDemanded,
      hotDealBadge: manualForm.hotDealBadge,
      freeGift: manualForm.freeGift,
      emiMonthly: Number(manualForm.emiMonthly),
      images: images.length ? images : [{ src: '/brand/logo.png', alt: manualForm.name }],
      variants: [
        {
          ram: Number(manualForm.ram),
          storage: Number(manualForm.storage),
          color: manualForm.color,
          colorHex: manualForm.colorHex,
          mrp: Number(manualForm.mrp),
          price: Number(manualForm.dealPrice),
          inStock: true,
        },
      ],
      specs: {
        performance: {
          RAM: `${manualForm.ram} GB`,
          Storage: `${manualForm.storage} GB`,
          Processor: manualForm.processor,
        },
        camera: { 'Main Camera': manualForm.camera },
        battery: { Battery: manualForm.battery },
      },
    }

    handleSave(payload)
  }

  return (
    <>
      {/* Responsive Styles Injection */}
      <style>{`
        .tml-import-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 16px 60px;
          font-family: inherit;
        }
        .tml-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--theme-elevation-200);
          margin-bottom: 24px;
        }
        @media (min-width: 640px) {
          .tml-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        .tml-tabs {
          display: flex;
          gap: 8px;
          padding: 4px;
          border-radius: 10px;
          background-color: var(--theme-elevation-100);
          border: 1px solid var(--theme-elevation-200);
          margin-bottom: 24px;
          width: 100%;
        }
        @media (min-width: 640px) {
          .tml-tabs {
            width: fit-content;
          }
        }
        .tml-tab-btn {
          flex: 1;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        @media (min-width: 640px) {
          .tml-tab-btn {
            flex: initial;
          }
        }
        .tml-url-bar {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        @media (min-width: 640px) {
          .tml-url-bar {
            flex-direction: row;
          }
        }
        .tml-dashboard-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        @media (min-width: 1024px) {
          .tml-dashboard-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 340px;
            align-items: start;
          }
        }
        .tml-specs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .tml-specs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .tml-variants-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        @media (min-width: 480px) {
          .tml-variants-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          }
        }
      `}</style>

      <div className="tml-import-container">
        {/* Navigation & Header */}
        <div className="tml-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#ff5a1f',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                The Mobile Lounge • Kakod Showroom
              </span>
              <span style={{ fontSize: '12px', color: 'var(--theme-elevation-400)' }}>•</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--theme-elevation-500)' }}>
                Product Ingestion
              </span>
            </div>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 800,
                margin: 0,
                color: 'var(--theme-elevation-900)',
                letterSpacing: '-0.02em',
              }}
            >
              Import Smartphone
            </h1>
          </div>

          <Link
            href="/admin/collections/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              backgroundColor: 'var(--theme-elevation-100)',
              color: 'var(--theme-elevation-800)',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              border: '1px solid var(--theme-elevation-250)',
              alignSelf: 'flex-start',
              transition: 'background 0.15s ease',
            }}
          >
            ← Back to Products
          </Link>
        </div>

        {/* Segmented Mode Switcher */}
        <div className="tml-tabs">
          <button
            type="button"
            className="tml-tab-btn"
            onClick={() => setActiveTab('scrape')}
            style={{
              backgroundColor: activeTab === 'scrape' ? '#ff5a1f' : 'transparent',
              color: activeTab === 'scrape' ? '#ffffff' : 'var(--theme-elevation-600)',
              boxShadow: activeTab === 'scrape' ? '0 2px 8px rgba(255, 90, 31, 0.3)' : 'none',
            }}
          >
            <span>🌐</span>
            <span>Auto-Scrape (Flipkart / Amazon)</span>
          </button>

          <button
            type="button"
            className="tml-tab-btn"
            onClick={() => setActiveTab('manual')}
            style={{
              backgroundColor: activeTab === 'manual' ? '#ff5a1f' : 'transparent',
              color: activeTab === 'manual' ? '#ffffff' : 'var(--theme-elevation-600)',
              boxShadow: activeTab === 'manual' ? '0 2px 8px rgba(255, 90, 31, 0.3)' : 'none',
            }}
          >
            <span>➕</span>
            <span>Manual Showroom Entry</span>
          </button>
        </div>

        {/* Global Notifications */}
        {saveSuccess && (
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: 'rgba(5, 150, 105, 0.1)',
              color: '#10b981',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '24px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div>{saveSuccess}</div>
            <Link
              href="/admin/collections/products"
              style={{
                color: '#ff5a1f',
                fontWeight: 700,
                textDecoration: 'underline',
                fontSize: '13px',
                width: 'fit-content',
              }}
            >
              View in Products Catalog →
            </Link>
          </div>
        )}

        {saveError && (
          <div
            style={{
              padding: '14px 18px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '24px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            ⚠️ {saveError}
          </div>
        )}

        {/* ================= TAB 1: AUTO SCRAPE ================= */}
        {activeTab === 'scrape' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Input Card */}
            <div
              style={{
                padding: '24px',
                borderRadius: '12px',
                backgroundColor: 'var(--theme-elevation-50)',
                border: '1px solid var(--theme-elevation-200)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
              }}
            >
              {/* Method Selector */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setScrapeMode('url')
                      setScrapeError('')
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor:
                        scrapeMode === 'url' ? 'var(--theme-elevation-200)' : 'transparent',
                      color:
                        scrapeMode === 'url'
                          ? 'var(--theme-elevation-900)'
                          : 'var(--theme-elevation-500)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    🔗 By Product URL
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setScrapeMode('html')
                      setScrapeError('')
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor:
                        scrapeMode === 'html' ? '#ff5a1f' : 'transparent',
                      color: scrapeMode === 'html' ? '#ffffff' : 'var(--theme-elevation-500)',
                      boxShadow:
                        scrapeMode === 'html'
                          ? '0 2px 8px rgba(255, 90, 31, 0.25)'
                          : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    📄 Paste Page HTML (100% Reliable for Flipkart)
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--theme-elevation-150)',
                      color: 'var(--theme-elevation-600)',
                    }}
                  >
                    Flipkart
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--theme-elevation-150)',
                      color: 'var(--theme-elevation-600)',
                    }}
                  >
                    Amazon
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--theme-elevation-150)',
                      color: 'var(--theme-elevation-600)',
                    }}
                  >
                    GSMArena
                  </span>
                </div>
              </div>

              {scrapeMode === 'url' ? (
                <>
                  <div className="tml-url-bar">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          handleScrape()
                        }
                      }}
                      placeholder="https://www.flipkart.com/... or https://www.amazon.in/dp/..."
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid var(--theme-elevation-300)',
                        backgroundColor: 'var(--theme-elevation-100)',
                        color: 'var(--theme-elevation-900)',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />

                    <button
                      type="button"
                      onClick={handleScrape}
                      disabled={isScraping || !url.trim()}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#ff5a1f',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '14px',
                        cursor: isScraping || !url.trim() ? 'not-allowed' : 'pointer',
                        opacity: isScraping || !url.trim() ? 0.6 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 2px 8px rgba(255, 90, 31, 0.3)',
                        transition: 'all 0.15s ease',
                        minHeight: '44px',
                      }}
                    >
                      {isScraping ? (
                        <>
                          <span
                            style={{
                              display: 'inline-block',
                              width: '14px',
                              height: '14px',
                              border: '2px solid #ffffff',
                              borderTopColor: 'transparent',
                              borderRadius: '50%',
                              animation: 'spin 0.8s linear infinite',
                            }}
                          />
                          <span>Scraping Details...</span>
                        </>
                      ) : (
                        <>
                          <span>⚡</span>
                          <span>Fetch & Preview</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 90, 31, 0.08)',
                      border: '1px solid rgba(255, 90, 31, 0.2)',
                      fontSize: '12.5px',
                      color: 'var(--theme-elevation-800)',
                      lineHeight: '1.6',
                    }}
                  >
                    <strong>💡 Why use Page HTML?</strong> Flipkart blocks cloud servers (Vercel/AWS) with anti-bot waiting rooms. Pasting the page source directly bypasses all firewalls and extracts 100% of HD photos, color variants, RAM/ROM options, and full specs!
                    <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--theme-elevation-600)' }}>
                      <b>Quick 3-step guide:</b> Open phone on Flipkart in your browser → Press <code>Ctrl+U</code> (or <code>Cmd+Option+U</code> on Mac / Right Click → <i>View Page Source</i>) → Press <code>Ctrl+A</code> (Select All) + <code>Ctrl+C</code> (Copy) → Paste below.
                    </div>
                  </div>

                  <textarea
                    value={pastedHtml}
                    onChange={(e) => setPastedHtml(e.target.value)}
                    placeholder="Paste Flipkart or Amazon Page Source (HTML) here..."
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--theme-elevation-300)',
                      backgroundColor: 'var(--theme-elevation-100)',
                      color: 'var(--theme-elevation-900)',
                      fontSize: '12.5px',
                      fontFamily: 'monospace',
                      boxSizing: 'border-box',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Optional: Paste original Flipkart product URL (helps set clean links)"
                      style={{
                        flex: 1,
                        minWidth: '240px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid var(--theme-elevation-300)',
                        backgroundColor: 'var(--theme-elevation-100)',
                        color: 'var(--theme-elevation-900)',
                        fontSize: '13px',
                        outline: 'none',
                      }}
                    />

                    <button
                      type="button"
                      onClick={handleScrape}
                      disabled={isScraping || !pastedHtml.trim()}
                      style={{
                        padding: '10px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#ff5a1f',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '14px',
                        cursor: isScraping || !pastedHtml.trim() ? 'not-allowed' : 'pointer',
                        opacity: isScraping || !pastedHtml.trim() ? 0.6 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 2px 8px rgba(255, 90, 31, 0.3)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {isScraping ? (
                        <>
                          <span
                            style={{
                              display: 'inline-block',
                              width: '14px',
                              height: '14px',
                              border: '2px solid #ffffff',
                              borderTopColor: 'transparent',
                              borderRadius: '50%',
                              animation: 'spin 0.8s linear infinite',
                            }}
                          />
                          <span>Extracting Data...</span>
                        </>
                      ) : (
                        <>
                          <span>⚡</span>
                          <span>Extract All Phone Details & Photos</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {scrapeError && (
                <div
                  style={{
                    marginTop: '14px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <span style={{ fontSize: '12.5px', color: '#ef4444', fontWeight: 600 }}>
                    ⚠️ {scrapeError}
                  </span>

                  {scrapeMode === 'url' && (
                    <button
                      type="button"
                      onClick={() => {
                        setScrapeMode('html')
                        setScrapeError('')
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: '#ff5a1f',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Switch to Paste HTML Mode 👉
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Scraped Result Master Workspace */}
            {scrapedData && (
              <div className="tml-dashboard-grid">
                {/* LEFT COLUMN: Main Editing & Preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* 1. Identity & Pricing Card */}
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--theme-elevation-50)',
                      border: '1px solid var(--theme-elevation-200)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          backgroundColor: '#ff5a1f',
                          color: '#ffffff',
                          textTransform: 'uppercase',
                        }}
                      >
                        Source: {scrapedData.sourcePlatform}
                      </span>

                      <span style={{ fontSize: '12px', color: 'var(--theme-elevation-500)' }}>
                        URL Slug: <code>/phones/{scrapedData.slug}</code>
                      </span>
                    </div>

                    {/* Editable Title */}
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          marginBottom: '6px',
                        }}
                      >
                        <label
                          style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: 'var(--theme-elevation-900)',
                          }}
                        >
                          ✏️ Product Model Name:
                        </label>
                        <span style={{ fontSize: '11px', color: '#ff5a1f', fontWeight: 600 }}>
                          Auto-cleaned (Colors & storage are stored in variants below)
                        </span>
                      </div>
                      <input
                        type="text"
                        value={scrapedData.name}
                        onChange={(e) => {
                          const newName = e.target.value
                          const newSlug = newName
                            .toLowerCase()
                            .replace(/[^a-z0-9\s-]/g, '')
                            .trim()
                            .replace(/\s+/g, '-')
                            .slice(0, 70)
                          setScrapedData({ ...scrapedData, name: newName, slug: newSlug })
                        }}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          fontSize: '16px',
                          fontWeight: 700,
                          borderRadius: '8px',
                          border: '2px solid #ff5a1f',
                          backgroundColor: 'var(--theme-elevation-100)',
                          color: 'var(--theme-elevation-900)',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    {/* Brand & Price Inputs */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                        gap: '12px',
                      }}
                    >
                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            display: 'block',
                            marginBottom: '4px',
                            color: 'var(--theme-elevation-700)',
                          }}
                        >
                          Brand:
                        </label>
                        <select
                          value={scrapedData.brand}
                          onChange={(e) => setScrapedData({ ...scrapedData, brand: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '6px',
                            border: '1px solid var(--theme-elevation-300)',
                            backgroundColor: 'var(--theme-elevation-100)',
                            color: 'var(--theme-elevation-900)',
                            fontSize: '13px',
                            fontWeight: 600,
                            boxSizing: 'border-box',
                          }}
                        >
                          {BRANDS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            display: 'block',
                            marginBottom: '4px',
                            color: 'var(--theme-elevation-700)',
                          }}
                        >
                          Base Deal Price (₹):
                        </label>
                        <input
                          type="number"
                          value={scrapedData.dealPrice}
                          onChange={(e) =>
                            setScrapedData({ ...scrapedData, dealPrice: Number(e.target.value) })
                          }
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '6px',
                            border: '1px solid var(--theme-elevation-300)',
                            backgroundColor: 'var(--theme-elevation-100)',
                            color: '#ff5a1f',
                            fontSize: '15px',
                            fontWeight: 800,
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>

                      <div>
                        <label
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            display: 'block',
                            marginBottom: '4px',
                            color: 'var(--theme-elevation-700)',
                          }}
                        >
                          Base MRP (₹):
                        </label>
                        <input
                          type="number"
                          value={scrapedData.mrp}
                          onChange={(e) => setScrapedData({ ...scrapedData, mrp: Number(e.target.value) })}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: '6px',
                            border: '1px solid var(--theme-elevation-300)',
                            backgroundColor: 'var(--theme-elevation-100)',
                            color: 'var(--theme-elevation-700)',
                            fontSize: '15px',
                            fontWeight: 600,
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Photo Gallery Preview */}
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--theme-elevation-50)',
                      border: '1px solid var(--theme-elevation-200)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--theme-elevation-900)',
                        }}
                      >
                        📸 Photo Gallery ({scrapedData.images?.length || 0} images):
                      </div>
                      <span
                        style={{
                          fontSize: '11px',
                          color: '#10b981',
                          fontWeight: 600,
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        ✓ Will be downloaded to /uploads/products/
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
                      {scrapedData.images?.map((img: any, i: number) => {
                        const isSelected = activeImagePreview === img.src
                        return (
                          <div
                            key={i}
                            onClick={() => setActiveImagePreview(img.src)}
                            style={{
                              width: '74px',
                              height: '74px',
                              borderRadius: '8px',
                              border: isSelected
                                ? '2px solid #ff5a1f'
                                : '1px solid var(--theme-elevation-300)',
                              backgroundColor: '#ffffff',
                              padding: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative',
                              cursor: 'pointer',
                              flexShrink: 0,
                              boxShadow: isSelected ? '0 0 0 2px rgba(255, 90, 31, 0.2)' : 'none',
                            }}
                          >
                            <img
                              src={img.src}
                              alt={img.alt}
                              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                            {img.color && (
                              <span
                                style={{
                                  position: 'absolute',
                                  bottom: '2px',
                                  left: '2px',
                                  right: '2px',
                                  backgroundColor: 'rgba(0,0,0,0.75)',
                                  color: '#ffffff',
                                  fontSize: '9px',
                                  fontWeight: 700,
                                  textAlign: 'center',
                                  borderRadius: '3px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  padding: '1px 2px',
                                }}
                              >
                                {img.color}
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 3. Variants Matrix */}
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--theme-elevation-50)',
                      border: '1px solid var(--theme-elevation-200)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--theme-elevation-900)',
                        }}
                      >
                        🏷️ All Generated Variants ({scrapedData.variants?.length || 1} variants bundled):
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--theme-elevation-500)' }}>
                        All colors & storage tiers from single link
                      </span>
                    </div>

                    <div className="tml-variants-grid">
                      {scrapedData.variants?.map((v: any, idx: number) => (
                        <div
                          key={idx}
                          style={{
                            padding: '12px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--theme-elevation-100)',
                            border: '1px solid var(--theme-elevation-250)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                backgroundColor: v.colorHex || '#18181b',
                                border: '1px solid rgba(0,0,0,0.15)',
                                flexShrink: 0,
                              }}
                            />
                            <div>
                              <div
                                style={{
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  color: 'var(--theme-elevation-900)',
                                }}
                              >
                                {v.color}
                              </div>
                              <div style={{ fontSize: '11px', color: 'var(--theme-elevation-500)' }}>
                                {v.ram}GB RAM • {v.storage}GB ROM
                              </div>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#ff5a1f' }}>
                              ₹{Number(v.price).toLocaleString('en-IN')}
                            </div>
                            {v.mrp > v.price && (
                              <div
                                style={{
                                  fontSize: '10px',
                                  color: 'var(--theme-elevation-400)',
                                  textDecoration: 'line-through',
                                }}
                              >
                                ₹{Number(v.mrp).toLocaleString('en-IN')}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. Specifications Overview */}
                  {scrapedData.specs && (
                    <div
                      style={{
                        padding: '20px',
                        borderRadius: '12px',
                        backgroundColor: 'var(--theme-elevation-50)',
                        border: '1px solid var(--theme-elevation-200)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--theme-elevation-900)',
                          marginBottom: '12px',
                        }}
                      >
                        ⚙️ Dynamic Specifications (Scraped from Product Page):
                      </div>

                      <div className="tml-specs-grid">
                        {scrapedData.specs.performance?.Processor && (
                          <div
                            style={{
                              padding: '10px 12px',
                              borderRadius: '6px',
                              backgroundColor: 'var(--theme-elevation-100)',
                              border: '1px solid var(--theme-elevation-200)',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                color: 'var(--theme-elevation-500)',
                                textTransform: 'uppercase',
                              }}
                            >
                              Processor
                            </span>
                            <div
                              style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: 'var(--theme-elevation-900)',
                                marginTop: '2px',
                              }}
                            >
                              {scrapedData.specs.performance.Processor}
                            </div>
                          </div>
                        )}

                        {scrapedData.specs.camera?.['Rear Camera'] && (
                          <div
                            style={{
                              padding: '10px 12px',
                              borderRadius: '6px',
                              backgroundColor: 'var(--theme-elevation-100)',
                              border: '1px solid var(--theme-elevation-200)',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                color: 'var(--theme-elevation-500)',
                                textTransform: 'uppercase',
                              }}
                            >
                              Rear Camera
                            </span>
                            <div
                              style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: 'var(--theme-elevation-900)',
                                marginTop: '2px',
                              }}
                            >
                              {scrapedData.specs.camera['Rear Camera']}
                            </div>
                          </div>
                        )}

                        {scrapedData.specs.display?.['Display Size'] && (
                          <div
                            style={{
                              padding: '10px 12px',
                              borderRadius: '6px',
                              backgroundColor: 'var(--theme-elevation-100)',
                              border: '1px solid var(--theme-elevation-200)',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                color: 'var(--theme-elevation-500)',
                                textTransform: 'uppercase',
                              }}
                            >
                              Display
                            </span>
                            <div
                              style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: 'var(--theme-elevation-900)',
                                marginTop: '2px',
                              }}
                            >
                              {scrapedData.specs.display['Display Size']} (
                              {scrapedData.specs.display['Resolution']})
                            </div>
                          </div>
                        )}

                        {scrapedData.specs.battery?.['Battery Capacity'] && (
                          <div
                            style={{
                              padding: '10px 12px',
                              borderRadius: '6px',
                              backgroundColor: 'var(--theme-elevation-100)',
                              border: '1px solid var(--theme-elevation-200)',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                color: 'var(--theme-elevation-500)',
                                textTransform: 'uppercase',
                              }}
                            >
                              Battery
                            </span>
                            <div
                              style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: 'var(--theme-elevation-900)',
                                marginTop: '2px',
                              }}
                            >
                              {scrapedData.specs.battery['Battery Capacity']}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN: Merchandising & Actions (Sticky Rail) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--theme-elevation-50)',
                      border: '1px solid var(--theme-elevation-200)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--theme-elevation-900)',
                      }}
                    >
                      🎪 Showroom Promotion
                    </div>

                    {/* Hot Deal Toggle */}
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--theme-elevation-900)',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={scrapedData.isHotDeal || false}
                        onChange={(e) =>
                          setScrapedData({ ...scrapedData, isHotDeal: e.target.checked })
                        }
                        style={{ width: '16px', height: '16px', accentColor: '#ff5a1f' }}
                      />
                      <span>⚡ Pin to Homepage Hot Deals</span>
                    </label>

                    {/* Most Demanded in Kakod Toggle */}
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--theme-elevation-900)',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={scrapedData.isMostDemanded || false}
                        onChange={(e) =>
                          setScrapedData({ ...scrapedData, isMostDemanded: e.target.checked })
                        }
                        style={{ width: '16px', height: '16px', accentColor: '#ff5a1f' }}
                      />
                      <span>🔥 Pin to "Most Demanded in Kakod"</span>
                    </label>

                    {/* Free Gift */}
                    <div>
                      <label
                        style={{
                          fontSize: '11px',
                          display: 'block',
                          fontWeight: 700,
                          marginBottom: '4px',
                          color: 'var(--theme-elevation-700)',
                        }}
                      >
                        Free Gift Bundle:
                      </label>
                      <input
                        type="text"
                        value={scrapedData.freeGift || 'Free Smartwatch + 20W Fast Adapter'}
                        onChange={(e) =>
                          setScrapedData({ ...scrapedData, freeGift: e.target.value })
                        }
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid var(--theme-elevation-300)',
                          backgroundColor: 'var(--theme-elevation-100)',
                          color: 'var(--theme-elevation-900)',
                          fontSize: '12px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    {/* Monthly 0% EMI */}
                    <div>
                      <label
                        style={{
                          fontSize: '11px',
                          display: 'block',
                          fontWeight: 700,
                          marginBottom: '4px',
                          color: 'var(--theme-elevation-700)',
                        }}
                      >
                        Monthly 0% EMI (₹):
                      </label>
                      <input
                        type="number"
                        value={scrapedData.emiMonthly || Math.round(scrapedData.dealPrice / 12)}
                        onChange={(e) =>
                          setScrapedData({ ...scrapedData, emiMonthly: Number(e.target.value) })
                        }
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid var(--theme-elevation-300)',
                          backgroundColor: 'var(--theme-elevation-100)',
                          color: 'var(--theme-elevation-900)',
                          fontSize: '12px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    {/* Big Action CTA */}
                    <button
                      type="button"
                      onClick={() => handleSave(scrapedData)}
                      disabled={isSaving}
                      style={{
                        padding: '14px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#059669',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '14px',
                        cursor: isSaving ? 'not-allowed' : 'pointer',
                        opacity: isSaving ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                        transition: 'all 0.15s ease',
                        width: '100%',
                        minHeight: '48px',
                      }}
                    >
                      {isSaving ? (
                        <>
                          <span
                            style={{
                              display: 'inline-block',
                              width: '14px',
                              height: '14px',
                              border: '2px solid #ffffff',
                              borderTopColor: 'transparent',
                              borderRadius: '50%',
                              animation: 'spin 0.8s linear infinite',
                            }}
                          />
                          <span>Downloading Photos & Saving...</span>
                        </>
                      ) : (
                        <>
                          <span>💾</span>
                          <span>Download Photos & Save</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: MANUAL ENTRY ================= */}
        {activeTab === 'manual' && (
          <form
            onSubmit={handleManualSubmit}
            style={{
              padding: '24px',
              borderRadius: '12px',
              backgroundColor: 'var(--theme-elevation-50)',
              border: '1px solid var(--theme-elevation-200)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '6px',
                    color: 'var(--theme-elevation-900)',
                  }}
                >
                  Phone Model Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apple iPhone 16 Pro Max"
                  value={manualForm.name}
                  onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--theme-elevation-300)',
                    backgroundColor: 'var(--theme-elevation-100)',
                    color: 'var(--theme-elevation-900)',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '6px',
                    color: 'var(--theme-elevation-900)',
                  }}
                >
                  Brand *
                </label>
                <select
                  value={manualForm.brand}
                  onChange={(e) => setManualForm({ ...manualForm, brand: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--theme-elevation-300)',
                    backgroundColor: 'var(--theme-elevation-100)',
                    color: 'var(--theme-elevation-900)',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                >
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '16px',
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '6px',
                    color: 'var(--theme-elevation-900)',
                  }}
                >
                  Deal Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={manualForm.dealPrice}
                  onChange={(e) => setManualForm({ ...manualForm, dealPrice: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--theme-elevation-300)',
                    backgroundColor: 'var(--theme-elevation-100)',
                    color: '#ff5a1f',
                    fontSize: '15px',
                    fontWeight: 800,
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '6px',
                    color: 'var(--theme-elevation-900)',
                  }}
                >
                  MRP (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={manualForm.mrp}
                  onChange={(e) => setManualForm({ ...manualForm, mrp: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--theme-elevation-300)',
                    backgroundColor: 'var(--theme-elevation-100)',
                    color: 'var(--theme-elevation-900)',
                    fontSize: '15px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '6px',
                    color: 'var(--theme-elevation-900)',
                  }}
                >
                  RAM (GB)
                </label>
                <input
                  type="number"
                  value={manualForm.ram}
                  onChange={(e) => setManualForm({ ...manualForm, ram: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--theme-elevation-300)',
                    backgroundColor: 'var(--theme-elevation-100)',
                    color: 'var(--theme-elevation-900)',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '6px',
                    color: 'var(--theme-elevation-900)',
                  }}
                >
                  Storage (GB)
                </label>
                <input
                  type="number"
                  value={manualForm.storage}
                  onChange={(e) => setManualForm({ ...manualForm, storage: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--theme-elevation-300)',
                    backgroundColor: 'var(--theme-elevation-100)',
                    color: 'var(--theme-elevation-900)',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '6px',
                  color: 'var(--theme-elevation-900)',
                }}
              >
                Image URLs (One per line — all photos will be downloaded locally to server storage):
              </label>
              <textarea
                rows={4}
                placeholder="https://example.com/phone-front.jpg&#10;https://example.com/phone-back.jpg"
                value={manualForm.imagesText}
                onChange={(e) => setManualForm({ ...manualForm, imagesText: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: '1px solid var(--theme-elevation-300)',
                  backgroundColor: 'var(--theme-elevation-100)',
                  color: 'var(--theme-elevation-900)',
                  fontSize: '13px',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--theme-elevation-900)',
                }}
              >
                <input
                  type="checkbox"
                  checked={manualForm.isHotDeal}
                  onChange={(e) => setManualForm({ ...manualForm, isHotDeal: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#ff5a1f' }}
                />
                <span>⚡ Pin to Homepage Hot Deals</span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--theme-elevation-900)',
                }}
              >
                <input
                  type="checkbox"
                  checked={manualForm.isMostDemanded}
                  onChange={(e) => setManualForm({ ...manualForm, isMostDemanded: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#ff5a1f' }}
                />
                <span>🔥 Pin to "Most Demanded in Kakod"</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              style={{
                padding: '14px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#059669',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '14px',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                opacity: isSaving ? 0.7 : 1,
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                minHeight: '44px',
              }}
            >
              {isSaving ? 'Downloading & Saving...' : '💾 Save Showroom Product'}
            </button>
          </form>
        )}
      </div>
    </>
  )
}
