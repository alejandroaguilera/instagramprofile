import { useRef, useState } from 'react'
import PhotoCropModal from './PhotoCropModal'
import './ProfileForm.css'

export default function ProfileForm({ profile, onChange }) {
  const fileInputRef = useRef(null)
  const [cropSrc, setCropSrc] = useState(null)

  const openCropper = (file) => {
    const url = URL.createObjectURL(file)
    onChange('originalPhotoUrl', url)
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

  const handleReadjust = () => {
    if (profile.originalPhotoUrl) setCropSrc(profile.originalPhotoUrl)
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
          className={profile.photoUrl ? 'photo-upload has-photo' : 'photo-upload'}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          {profile.photoUrl ? (
            <>
              <button
                type="button"
                className="photo-preview-wrap"
                onClick={() => fileInputRef.current.click()}
                title="Cambiar foto"
              >
                <img src={profile.photoUrl} alt="Foto de perfil" className="photo-preview-img" />
                <span className="photo-overlay">Cambiar</span>
              </button>
              <div className="photo-actions">
                <button type="button" className="photo-action" onClick={handleReadjust}>
                  Reajustar encuadre
                </button>
                <span className="photo-hint">Haz clic en la foto para cambiarla</span>
              </div>
            </>
          ) : (
            <div className="photo-placeholder" onClick={() => fileInputRef.current.click()}>
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
