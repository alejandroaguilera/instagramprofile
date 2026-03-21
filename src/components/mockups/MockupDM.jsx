import Avatar from '../Avatar'
import VerifiedBadge from '../VerifiedBadge'
import './MockupDM.css'

const OTHER_USERS = [
  { name: 'ana.martinez', msg: 'Qué linda foto! 😍', time: '2h', unread: 2 },
  { name: 'carlos_r', msg: 'Exacto, y además...', time: '1d', unread: 0 },
]

export default function MockupDM({ profile }) {
  return (
    <div className="mockup-card dm-mockup">
      <div className="dm-topbar">
        <div className="dm-topbar-user">
          {profile.username}
          {profile.verified && <VerifiedBadge size={13} />}
        </div>
        <div className="dm-topbar-actions">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        </div>
      </div>

      <div className="dm-list">
        {/* Your own DM thread preview */}
        <div className="dm-row dm-row-active">
          <Avatar photoUrl={profile.photoUrl} username={profile.username} size={52} hasStory />
          <div className="dm-info">
            <div className="dm-name">
              {profile.username}
              {profile.verified && <VerifiedBadge size={12} />}
            </div>
            <div className="dm-preview">Hola! Gracias por seguirme 🙏</div>
          </div>
          <div className="dm-meta">
            <span className="dm-time">Ahora</span>
          </div>
        </div>

        {OTHER_USERS.map(u => (
          <div key={u.name} className="dm-row">
            <Avatar username={u.name} size={52} />
            <div className="dm-info">
              <div className="dm-name" style={{ fontWeight: u.unread ? 700 : 400 }}>{u.name}</div>
              <div className="dm-preview" style={{ fontWeight: u.unread ? 600 : 400, color: u.unread ? '#1a1a1a' : '#888' }}>
                {u.msg}
              </div>
            </div>
            <div className="dm-meta">
              <span className="dm-time">{u.time}</span>
              {u.unread > 0 && <span className="dm-badge">{u.unread}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Chat view */}
      <div className="dm-chat">
        <div className="dm-chat-header">
          <Avatar photoUrl={profile.photoUrl} username={profile.username} size={28} />
          <span>{profile.username}</span>
          {profile.verified && <VerifiedBadge size={12} />}
        </div>
        <div className="dm-messages">
          <div className="dm-msg dm-msg-incoming">Hola! Vi tu perfil 👀</div>
          <div className="dm-msg dm-msg-outgoing">¡Hola! Gracias 😊</div>
          <div className="dm-msg dm-msg-incoming">¿Cuándo publicas el próximo reel?</div>
        </div>
        <div className="dm-input-row">
          <div className="dm-input-box">Mensaje...</div>
        </div>
      </div>

      <div className="mockup-label-inner" style={{paddingBottom: 10}}>Mensajes directos</div>
    </div>
  )
}
