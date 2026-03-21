import Avatar from '../Avatar'
import VerifiedBadge from '../VerifiedBadge'
import './MockupProfile.css'

const PLACEHOLDER_POSTS = [
  { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { gradient: 'linear-gradient(135deg, #fda085 0%, #f6d365 100%)' },
  { gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' },
  { gradient: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)' },
]

export default function MockupProfile({ profile }) {
  const bioLines = profile.bio.split('\n')

  return (
    <div className="mockup-card profile-mockup">
      {/* Instagram top bar */}
      <div className="ig-topbar">
        <button className="ig-back">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="ig-topbar-user">
          <span className="ig-topbar-username">{profile.username}</span>
          {profile.verified && <VerifiedBadge size={13} />}
        </div>
        <button className="ig-topbar-more">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
          </svg>
        </button>
      </div>

      {/* Profile header */}
      <div className="profile-header">
        <div className="profile-avatar-area">
          <Avatar photoUrl={profile.photoUrl} username={profile.username} size={80} hasStory />
        </div>
        <div className="profile-stats">
          <div className="profile-stat">
            <strong>{profile.posts}</strong>
            <span>publicaciones</span>
          </div>
          <div className="profile-stat">
            <strong>{profile.followers}</strong>
            <span>seguidores</span>
          </div>
          <div className="profile-stat">
            <strong>{profile.following}</strong>
            <span>seguidos</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="profile-bio">
        <div className="profile-fullname">
          {profile.fullName}
          {profile.verified && <VerifiedBadge size={13} />}
        </div>
        {bioLines.map((line, i) => (
          <div key={i} className="profile-bio-line">{line || <br />}</div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="profile-actions">
        <button className="ig-btn-primary">Editar perfil</button>
        <button className="ig-btn-secondary">Compartir</button>
        <button className="ig-btn-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </button>
      </div>

      {/* Highlights */}
      <div className="profile-highlights">
        {['Viajes', 'Recetas', 'Trabajo', 'Familia'].map(name => (
          <div key={name} className="highlight-item">
            <div className="highlight-circle">
              <div className="highlight-inner" />
            </div>
            <span>{name}</span>
          </div>
        ))}
        <div className="highlight-item">
          <div className="highlight-circle highlight-add">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <span>Nuevo</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="profile-tabs">
        <div className="profile-tab active">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </div>
        <div className="profile-tab">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="3" width="20" height="14" rx="2"/><polygon points="10 8 16 11 10 14 10 8"/>
          </svg>
        </div>
        <div className="profile-tab">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
      </div>

      {/* Post grid */}
      <div className="profile-grid">
        {PLACEHOLDER_POSTS.map((post, i) => (
          <div key={i} className="profile-grid-item" style={{ background: post.gradient }} />
        ))}
      </div>
    </div>
  )
}
