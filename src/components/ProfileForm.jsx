import { useRef, useState } from 'react'
import PhotoCropModal from './PhotoCropModal'
import './ProfileForm.css'

export default function ProfileForm({ profile, onChange }) {
  const fileInputRef = useRef(null)
  const originalPhotoRef = useRef(null)
  const [cropSrc, setCropSrc] = useState(null)

  const openCropper = (file) => {
    const url = URL.createObjectURL(file)
    originalPhotoRef.current = url
    setCropSrc(url)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    openCropper(file)
    e.target.value = ''
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file || !file.type.startsWith('image/')) return
    openCropper(file)
  }

  const handleReadjust = (e) => {
    e.stopPropagation()
    if (originalPhotoRef.current) setCropSrc(originalPhotoRef.current)
  }

  const handleCropConfirm = (croppedUrl) => {
    onChange('photoUrl', croppedUrl)
    setCropSrc(null)
  }

  const handleCropCancel = () => {
    setCropSrc(null)
  }

  const formatNumber = (val) => {
    const n = parseInt(val.toString().replace(/,/g, ''), 10)
    if (isNaN(n)) return val
    return n.toLocaleString()
  }

  return (
    <div className="form-card">
      <h2 className="form-title">Tu perfil</h2>

      {/* Photo Upload */}
      <div className="form-section">
        <label className="form-label">Foto de perfil</label>
        <div
          className="photo-upload"
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          {profile.photoUrl ? (
            <div className="photo-preview-wrap">
              <img src={profile.photoUrl} alt="Preview" className="photo-preview-img" />
              <div className="photo-overlay">
                <span>Cambiar foto</span>
              </div>
              <button className="photo-adjust-btn" onClick={handleReadjust} title="Ajustar zoom y encuadre">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </button>
            </div>
          ) : (
            <div className="photo-placeholder">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Arrastra o haz clic para subir</span>
              <small>JPG, PNG, WEBP</small>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Username */}
      <div className="form-section">
        <label className="form-label">Usuario</label>
        <div className="input-wrap">
          <span className="input-prefix">@</span>
          <input
            className="form-input with-prefix"
            type="text"
            value={profile.username}
            onChange={e => onChange('username', e.target.value)}
            placeholder="yourhandle"
            maxLength={30}
          />
        </div>
      </div>

      {/* Full Name */}
      <div className="form-section">
        <label className="form-label">Nombre completo</label>
        <input
          className="form-input"
          type="text"
          value={profile.fullName}
          onChange={e => onChange('fullName', e.target.value)}
          placeholder="Your Name"
          maxLength={30}
        />
      </div>

      {/* Bio */}
      <div className="form-section">
        <label className="form-label">Biografía</label>
        <textarea
          className="form-textarea"
          value={profile.bio}
          onChange={e => onChange('bio', e.target.value)}
          placeholder="Tu bio aquí..."
          rows={4}
          maxLength={150}
        />
        <small className="char-count">{profile.bio.length}/150</small>
      </div>

      {/* Stats */}
      <div className="form-section">
        <label className="form-label">Estadísticas</label>
        <div className="stats-grid">
          <div className="stat-field">
            <label>Publicaciones</label>
            <input
              className="form-input"
              type="text"
              value={profile.posts}
              onChange={e => onChange('posts', e.target.value)}
              onBlur={e => onChange('posts', formatNumber(e.target.value))}
              placeholder="47"
            />
          </div>
          <div className="stat-field">
            <label>Seguidores</label>
            <input
              className="form-input"
              type="text"
              value={profile.followers}
              onChange={e => onChange('followers', e.target.value)}
              onBlur={e => onChange('followers', formatNumber(e.target.value))}
              placeholder="1,248"
            />
          </div>
          <div className="stat-field">
            <label>Seguidos</label>
            <input
              className="form-input"
              type="text"
              value={profile.following}
              onChange={e => onChange('following', e.target.value)}
              onBlur={e => onChange('following', formatNumber(e.target.value))}
              placeholder="312"
            />
          </div>
        </div>
      </div>

      {/* Verified */}
      <div className="form-section">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={profile.verified}
            onChange={e => onChange('verified', e.target.checked)}
          />
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
          <span>Cuenta verificada</span>
        </label>
      </div>

      <div className="form-note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Tus datos no se envían a ningún servidor. Todo se procesa localmente en tu navegador.
      </div>

      {cropSrc && (
        <PhotoCropModal
          imageSrc={cropSrc}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  )
}
