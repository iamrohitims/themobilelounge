'use client'

import React, { useEffect, useState } from 'react'

export const AdminLogo: React.FC = () => {
  const [logoSrc, setLogoSrc] = useState('/brand/logo.png')

  useEffect(() => {
    fetch('/api/site-settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.siteLogo) {
          setLogoSrc(data.siteLogo)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
      <img
        src={logoSrc}
        alt="The Mobile Lounge"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          objectFit: 'contain',
          backgroundColor: '#09090b',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = '/brand/logo.png'
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'inherit',
            lineHeight: 1.1,
          }}
        >
          THE MOBILE LOUNGE
        </span>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            color: '#ff5a1f',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Kakod Showroom Admin
        </span>
      </div>
    </div>
  )
}
