import { useState, useRef, useEffect, useCallback } from 'react'
import './PhotoCropModal.css'

const CONTAINER_SIZE = 280
const OUTPUT_SIZE = 600
const MIN_ZOOM = 1
const MAX_ZOOM = 4

export default function PhotoCropModal({ imageSrc, onConfirm, onCancel }) {
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [naturalSize, setNaturalSize] = useState(null)
  const imgRef = useRef(null)
  const dragRef = useRef(null)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight })
    img.src = imageSrc
  }, [imageSrc])

  const baseScale = naturalSize
    ? Math.max(CONTAINER_SIZE / naturalSize.w, CONTAINER_SIZE / naturalSize.h)
    : 1

  const clampOffset = useCallback((off, currentZoom) => {
    if (!naturalSize) return off
    const scale = baseScale * currentZoom
    const dispW = naturalSize.w * scale
    const dispH = naturalSize.h * scale
    const maxX = Math.max(0, (dispW - CONTAINER_SIZE) / 2)
    const maxY = Math.max(0, (dispH - CONTAINER_SIZE) / 2)
    return {
      x: Math.min(maxX, Math.max(-maxX, off.x)),
      y: Math.min(maxY, Math.max(-maxY, off.y)),
    }
  }, [naturalSize, baseScale])

  const handlePointerDown = (e) => {
    const point = 'touches' in e ? e.touches[0] : e
    dragRef.current = { startX: point.clientX, startY: point.clientY, startOffset: offset }
  }

  const handlePointerMove = (e) => {
    if (!dragRef.current) return
    const point = 'touches' in e ? e.touches[0] : e
    const dx = point.clientX - dragRef.current.startX
    const dy = point.clientY - dragRef.current.startY
    const next = {
      x: dragRef.current.startOffset.x + dx,
      y: dragRef.current.startOffset.y + dy,
    }
    setOffset(clampOffset(next, zoom))
  }

  const handlePointerUp = () => {
    dragRef.current = null
  }

  const handleZoomChange = (e) => {
    const z = parseFloat(e.target.value)
    setZoom(z)
    setOffset(prev => clampOffset(prev, z))
  }

  const handleConfirm = () => {
    if (!naturalSize || !imgRef.current) return
    const canvas = document.createElement('canvas')
    canvas.width = OUTPUT_SIZE
    canvas.height = OUTPUT_SIZE
    const ctx = canvas.getContext('2d')
    const ratio = OUTPUT_SIZE / CONTAINER_SIZE
    const scale = baseScale * zoom * ratio
    const dispW = naturalSize.w * scale
    const dispH = naturalSize.h * scale
    const cx = OUTPUT_SIZE / 2 + offset.x * ratio
    const cy = OUTPUT_SIZE / 2 + offset.y * ratio
    ctx.drawImage(imgRef.current, cx - dispW / 2, cy - dispH / 2, dispW, dispH)
    canvas.toBlob(blob => {
      onConfirm(URL.createObjectURL(blob))
    }, 'image/jpeg', 0.92)
  }

  return (
    <div className="crop-modal-overlay">
      <div className="crop-modal">
        <h3 className="crop-modal-title">Ajustar foto</h3>
        <p className="crop-modal-subtitle">Acerca, aleja o arrastra para encontrar el encuadre ideal</p>

        <div
          className="crop-viewport"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          {naturalSize && (
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Recortar"
              className="crop-image"
              style={{
                width: naturalSize.w * baseScale * zoom,
                height: naturalSize.h * baseScale * zoom,
                transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
              }}
              draggable={false}
            />
          )}
        </div>

        <div className="crop-zoom-row">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
          <input
            type="range"
            min={MIN_ZOOM}
            max={MAX_ZOOM}
            step="0.01"
            value={zoom}
            onChange={handleZoomChange}
            className="crop-zoom-slider"
          />
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </div>

        <div className="crop-modal-actions">
          <button className="crop-btn-cancel" onClick={onCancel}>Cancelar</button>
          <button className="crop-btn-confirm" onClick={handleConfirm}>Aplicar</button>
        </div>
      </div>
    </div>
  )
}
