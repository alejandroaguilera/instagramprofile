import Avatar from '../Avatar'
import VerifiedBadge from '../VerifiedBadge'
import './MockupSearch.css'

const SUGGESTED = [
  { name: 'ana.martinez', full: 'Ana Martínez', followers: '12.4K' },
  { name: 'carlos_r', full: 'Carlos Rodríguez', followers: '3.1K' },
  { name: 'luisa_fotos', full: 'Luisa Fotografía', followers: '28.7K' },
]

export default function MockupSearch({ profile }) {
  return (
    <div className="mockup-card search-mockup">
      <div className="mockup-label-inner">Búsqueda / Explorar</div>

      <div className="search-bar-row">
        <div className="search-bar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span className="search-input-text">{profile.username}</span>
        </div>
      </div>

      {/* User result - your profile */}
      <div className="search-section-title">Perfiles</div>

      <div className="search-result-row search-result-main">
        <Avatar photoUrl={profile.photoUrl} username={profile.username} size={48} />
        <div className="search-result-info">
          <div className="search-result-username">
            {profile.username}
            {profile.verified && <VerifiedBadge size={13} />}
          </div>
          <div className="search-result-fullname">{profile.fullName}</div>
          <div className="search-result-meta">{profile.followers} seguidores</div>
        </div>
      </div>

      <div className="search-section-title" style={{ borderTop: '1px solid #efefef', paddingTop: 12, marginTop: 4 }}>
        Sugerencias
      </div>

      {SUGGESTED.map(u => (
        <div key={u.name} className="search-result-row">
          <Avatar username={u.name} size={44} />
          <div className="search-result-info">
            <div className="search-result-username">{u.name}</div>
            <div className="search-result-fullname">{u.full}</div>
            <div className="search-result-meta">{u.followers} seguidores</div>
          </div>
        </div>
      ))}

      {/* Explore mini grid */}
      <div className="search-section-title" style={{ borderTop: '1px solid #efefef', paddingTop: 12, marginTop: 4 }}>
        Explorar
      </div>
      <div className="search-explore-grid">
        {[
          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        ].map((g, i) => (
          <div key={i} className="search-grid-item" style={{ background: g }} />
        ))}
      </div>
    </div>
  )
}
