import { useState, useCallback, useEffect } from 'react'
import ProfileForm from './components/ProfileForm'
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

export default function App() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [activeSection, setActiveSection] = useState('perfil')
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const handleChange = useCallback((key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }))
  }, [])

  // En desktop el formulario siempre está visible: el tab "editar" solo existe en móvil
  useEffect(() => {
    if (isDesktop && activeSection === 'editar') setActiveSection('perfil')
  }, [isDesktop, activeSection])

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
        </div>
      </header>

      <main className="app-main">
        <div className="layout">
          <SideNav activeSection={activeSection} onSelect={setActiveSection} />
          <aside className="sidebar">
            <ProfileForm profile={profile} onChange={handleChange} />
          </aside>
          <div className="content">
            {activeSection === 'editar' ? (
              <div className="section-panel mobile-form" key="editar">
                <ProfileForm profile={profile} onChange={handleChange} />
              </div>
            ) : (
              <SectionView section={activeSection} profile={profile} />
            )}
          </div>
        </div>
      </main>

      <TabBar activeSection={activeSection} onSelect={setActiveSection} />
    </div>
  )
}
