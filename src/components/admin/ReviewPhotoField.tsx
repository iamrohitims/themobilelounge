'use client'

import React, { useRef, useState } from 'react'
import { useField } from '@payloadcms/ui'

interface ReviewPhotoFieldProps {
  path: string
  label?: string
  description?: string
  required?: boolean
  readOnly?: boolean
}

export const ReviewPhotoField: React.FC<ReviewPhotoFieldProps> = ({
  path,
  label = 'Customer / Unboxing Photo',
  description = 'Real customer delivery/unboxing photo. You can view the live preview or upload a new photo directly from your device.',
  readOnly = false,
}) => {
  const { value = '', setValue } = useField<string>({ path })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/admin/reviews/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Upload failed')
      }

      setValue(data.url)
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload photo. Please try again.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleRemove = () => {
    setValue('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div
      style={{
        marginBottom: '24px',
        padding: '16px',
        borderRadius: '12px',
        backgroundColor: 'var(--theme-elevation-50, #18181b)',
        border: '1px solid var(--theme-elevation-150, #27272a)',
      }}
    >
      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
        disabled={readOnly || isUploading}
      />

      {/* Field Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <div>
          <label
            style={{
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--theme-text, #fff)',
              display: 'block',
              marginBottom: '2px',
            }}
          >
            {label}
          </label>
          {description && (
            <p style={{ margin: 0, fontSize: '11px', color: 'var(--theme-elevation-500, #a1a1aa)' }}>
              {description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--theme-elevation-400, #71717a)',
            fontSize: '11px',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {showUrlInput ? 'Hide URL field' : 'Edit raw URL'}
        </button>
      </div>

      {uploadError && (
        <div
          style={{
            padding: '8px 12px',
            marginBottom: '12px',
            borderRadius: '6px',
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {uploadError}
        </div>
      )}

      {/* Main Preview & Action Area */}
      {value ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            alignItems: 'flex-start',
            padding: '12px',
            backgroundColor: 'var(--theme-elevation-100, #09090b)',
            borderRadius: '10px',
            border: '1px solid var(--theme-elevation-200, #3f3f46)',
          }}
        >
          {/* Real Photo Thumbnail Preview */}
          <div
            style={{
              position: 'relative',
              width: '140px',
              height: '140px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#000',
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Review preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                // Fallback indicator if image URL broken
                (e.target as HTMLElement).style.display = 'none'
              }}
            />
          </div>

          {/* Action Details */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 800,
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  color: '#34d399',
                  marginBottom: '4px',
                }}
              >
                ✓ PHOTO ATTACHED
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: '12px',
                  color: 'var(--theme-text, #fff)',
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={value}
              >
                {value}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={readOnly || isUploading}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#ff5a1f',
                  color: '#fff',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: isUploading ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {isUploading ? 'Uploading...' : '📁 Replace Photo'}
              </button>

              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--theme-elevation-200, #27272a)',
                  color: 'var(--theme-text, #fff)',
                  border: '1px solid var(--theme-elevation-300, #52525b)',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                ↗ View Full Size
              </a>

              {!readOnly && (
                <button
                  type="button"
                  onClick={handleRemove}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    color: '#f87171',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  ✕ Remove
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Empty Upload State */
        <div
          onClick={() => !readOnly && !isUploading && fileInputRef.current?.click()}
          style={{
            padding: '24px',
            textAlign: 'center',
            borderRadius: '10px',
            border: '2px dashed var(--theme-elevation-300, #3f3f46)',
            backgroundColor: 'var(--theme-elevation-100, #09090b)',
            cursor: readOnly ? 'default' : 'pointer',
            transition: 'border-color 0.2s ease',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 8px auto',
              borderRadius: '50%',
              backgroundColor: 'var(--theme-elevation-200, #27272a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            📸
          </div>
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: '13px',
              color: 'var(--theme-text, #fff)',
            }}
          >
            {isUploading ? 'Uploading and saving photo...' : 'Click to Upload Customer / Unboxing Photo'}
          </p>
          <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: 'var(--theme-elevation-500, #a1a1aa)' }}>
            Directly select a JPG, PNG, or WebP photo from your computer or phone
          </p>
        </div>
      )}

      {/* Expandable Manual URL Editor */}
      {showUrlInput && (
        <div style={{ marginTop: '12px' }}>
          <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--theme-elevation-500, #a1a1aa)' }}>
            Direct Image URL or Local Path:
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. /uploads/reviews/photo.jpg or https://images.unsplash.com/..."
            disabled={readOnly}
            style={{
              width: '100%',
              padding: '8px 12px',
              marginTop: '4px',
              borderRadius: '6px',
              border: '1px solid var(--theme-elevation-300, #3f3f46)',
              backgroundColor: 'var(--theme-elevation-100, #09090b)',
              color: 'var(--theme-text, #fff)',
              fontSize: '12px',
              fontFamily: 'monospace',
            }}
          />
        </div>
      )}
    </div>
  )
}
