'use client'

import React, { useEffect, useState } from 'react'

export const AdminIcon: React.FC = () => {
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
    <img
      src={logoSrc}
      alt="The Mobile Lounge"
      style={{
        width: '28px',
        height: '28px',
        borderRadius: '8px',
        objectFit: 'contain',
        backgroundColor: '#09090b',
        border: '1px solid rgba(255,255,255,0.15)',
      }}
      onError={(e) => {
        e.currentTarget.onerror = null
        e.currentTarget.src = '/brand/logo.png'
      }}
    />
  )
}
