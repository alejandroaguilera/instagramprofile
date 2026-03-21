import Avatar from '../Avatar'
import './MockupStories.css'

const OTHER_USERS = [
  { name: 'ana.m', viewed: false },
  { name: 'carlos', viewed: false },
  { name: 'luisa_r', viewed: true },
  { name: 'pedro.g', viewed: false },
  { name: 'sofia', viewed: true },
]

export default function MockupStories({ profile }) {
  return (
    <div className="mockup-card stories-mockup">
      <div className="stories-label">Barra de historias</div>
      <div className="stories-bar">
        {/* Your story (first) */}
        <div className="story-item">
          <Avatar photoUrl={profile.photoUrl} username={profile.username} size={60} hasStory={false} />
          <span className="story-name">Tu historia</span>
        </div>
        {/* Other users */}
        {OTHER_USERS.map(u => (
          <div key={u.name} className="story-item">
            <Avatar username={u.name} size={60} hasStory storyViewed={u.viewed} />
            <span className="story-name">{u.name}</span>
          </div>
        ))}
      </div>

      {/* Active story viewer */}
      <div className="stories-label" style={{ borderTop: '1px solid #efefef', paddingTop: 16 }}>Tu historia activa (viewer)</div>
      <div className="story-viewer">
        <div className="story-viewer-bg" />
        <div className="story-viewer-ui">
          <div className="story-progress-bars">
            <div className="story-bar done" />
            <div className="story-bar active" />
            <div className="story-bar" />
          </div>
          <div className="story-viewer-header">
            <div className="story-viewer-user">
              <Avatar photoUrl={profile.photoUrl} username={profile.username} size={32} />
              <span className="story-viewer-name">{profile.username}</span>
              <span className="story-viewer-time">Ahora</span>
            </div>
            <div className="story-viewer-actions">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
