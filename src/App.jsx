import { useState, useCallback, useEffect, useRef } from 'react'
import ProfileForm from './components/ProfileForm'
import PhotoCropModal from './components/PhotoCropModal'
import SectionView from './components/SectionView'
import SideNav from './components/SideNav'
import TabBar from './components/TabBar'
import useMediaQuery from './useMediaQuery'
import './App.css'

const DEFAULT_PROFILE = {
  username: 'yourhandle',
  fullName: 'Your Name',
  bio: '✨ Photographer & Creator\n📍 New York\n🔗 link.bio/yourhandle',
  followers: '1,248',
  following: '312',
  posts: '47',
  photoUrl: null,
  originalPhotoUrl: null,
  verified: false,
}

// Orden visual de los tabs (el del TabBar móvil) para decidir la dirección del slide
const NAV_ORDER = ['perfil', 'historias', 'editar', 'feed', 'interacciones']

// El script inline de index.html ya resolvió el tema antes del primer paint:
// el estado inicial se lee del atributo, no se recalcula
const getInitialTheme = () =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

export default function App() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [theme, setTheme] = useState(getInitialTheme)
  const [activeSection, setActiveSection] = useState('perfil')
  const [direction, setDirection] = useState('fwd')
  const [cropSrc, setCropSrc] = useState(null)
  const fileInputRef = useRef(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const handleChange = useCallback((key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }))
  }, [])

  const selectSection = (id) => {
    if (id === activeSection) return
    setDirection(NAV_ORDER.indexOf(id) >= NAV_ORDER.indexOf(activeSection) ? 'fwd' : 'back')
    setActiveSection(id)
  }

  // En desktop el formulario siempre está visible: el tab "editar" solo existe en móvil
  useEffect(() => {
    if (isDesktop && activeSection === 'editar') setActiveSection('perfil')
  }, [isDesktop, activeSection])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  // Solo se persiste al togglear: mientras no haya elección explícita, se sigue al sistema
  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem('theme', next) } catch { /* modo privado */ }
      return next
    })
  }

  // Flujo de subida/crop compartido: formulario (ambas instancias) y avatar del mockup de perfil
  const openFilePicker = () => fileInputRef.current?.click()

  const openCropper = (file) => {
    const url = URL.createObjectURL(file)
    handleChange('originalPhotoUrl', url)
    setCropSrc(url)
  }

  const handleFileSelected = (e) => {
    const file = e.target.files[0]
    if (file) openCropper(file)
    e.target.value = ''
  }

  const handleReadjust = () => {
    if (profile.originalPhotoUrl) setCropSrc(profile.originalPhotoUrl)
  }

  const handleCropConfirm = (croppedUrl) => {
    handleChange('photoUrl', croppedUrl)
    setCropSrc(null)
  }

  const handleCropCancel = () => setCropSrc(null)

  const formProps = {
    profile,
    onChange: handleChange,
    onPickFile: openFilePicker,
    onDropFile: openCropper,
    onReadjust: handleReadjust,
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
            </svg>
            <span>Instagram Photo Preview</span>
          </div>
          <p className="header-subtitle">Previsualiza cómo se ve tu foto de perfil en cada contexto de Instagram</p>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            title={theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="layout">
          <SideNav activeSection={activeSection} onSelect={selectSection} />
          <aside className="sidebar">
            <ProfileForm {...formProps} />
          </aside>
          <div className="content">
            {activeSection === 'editar' ? (
              <div className={`section-panel from-${direction} mobile-form`} key="editar">
                <ProfileForm {...formProps} />
              </div>
            ) : (
              <SectionView
                section={activeSection}
                profile={profile}
                direction={direction}
                onAvatarClick={openFilePicker}
              />
            )}
          </div>
        </div>
      </main>

      <TabBar activeSection={activeSection} onSelect={selectSection} />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelected}
        style={{ display: 'none' }}
      />

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
