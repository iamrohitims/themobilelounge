'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

export const ProductListBanner: React.FC = () => {
  const [targetNode, setTargetNode] = useState<Element | null>(null)

  useEffect(() => {
    // Function to locate Payload's "Create New" button in the DOM
    const locateButton = () => {
      // Check for Payload's List view title actions container
      const createDocBtn = document.querySelector(
        '.list-create-new-doc__create-new-button, a[href$="/collections/products/create"], .list-header__title-actions'
      )

      if (createDocBtn) {
        // Find the title-actions container
        const container =
          createDocBtn.closest('.list-header__title-actions') ||
          createDocBtn.parentElement ||
          createDocBtn

        if (container) {
          setTargetNode(container)
          return true
        }
      }
      return false
    }

    if (!locateButton()) {
      const interval = setInterval(() => {
        if (locateButton()) clearInterval(interval)
      }, 150)
      const timeout = setTimeout(() => clearInterval(interval), 4000)
      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [])

  // Sleek button matching Payload's UI design language
  const actionButton = (
    <Link
      href="/admin/import-product"
      id="tml-auto-import-btn"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 14px',
        borderRadius: '20px',
        backgroundColor: '#ff5a1f',
        color: '#ffffff',
        fontWeight: 700,
        fontSize: '13px',
        lineHeight: 1.4,
        textDecoration: 'none',
        boxShadow: '0 2px 6px rgba(255, 90, 31, 0.3)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        marginLeft: '8px',
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#ea580c'
        e.currentTarget.style.transform = 'translateY(-1px)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 90, 31, 0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ff5a1f'
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = '0 2px 6px rgba(255, 90, 31, 0.3)'
      }}
    >
      <span style={{ fontSize: '14px' }}>📥</span>
      <span>Auto-Import (Flipkart / Amazon)</span>
    </Link>
  )

  // If portal target exists, mount right beside "Create New"
  if (targetNode) {
    return createPortal(actionButton, targetNode)
  }

  // Graceful fallback: clean top-right button without the bulky banner
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '14px',
      }}
    >
      {actionButton}
    </div>
  )
}
