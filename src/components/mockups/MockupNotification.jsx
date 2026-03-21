import Avatar from '../Avatar'
import VerifiedBadge from '../VerifiedBadge'
import './MockupNotification.css'

const PLACEHOLDER_THUMB = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
const PLACEHOLDER_THUMB2 = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
const PLACEHOLDER_THUMB3 = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'

export default function MockupNotification({ profile }) {
  const items = [
    { type: 'like', text: `le dio me gusta a tu publicación.`, time: '2h', thumb: PLACEHOLDER_THUMB },
    { type: 'comment', text: `comentó: "¡Qué foto tan increíble! 🔥"`, time: '4h', thumb: PLACEHOLDER_THUMB2 },
    { type: 'follow', text: `comenzó a seguirte.`, time: '1d', thumb: null },
    { type: 'like', text: `y otras 34 personas dieron me gusta.`, time: '2d', thumb: PLACEHOLDER_THUMB3 },
  ]

  return (
    <div className="mockup-card notif-mockup">
      <div className="mockup-label-inner">Notificaciones</div>
      <div className="notif-section-title">Recientes</div>
      {items.map((item, i) => (
        <div key={i} className="notif-row">
          <div className="notif-avatar-wrap">
            <Avatar photoUrl={profile.photoUrl} username={profile.username} size={42} />
            <div className={`notif-icon notif-icon-${item.type}`}>
              {item.type === 'like' && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              )}
              {item.type === 'comment' && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              )}
              {item.type === 'follow' && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              )}
            </div>
          </div>
          <div className="notif-content">
            <span className="notif-username">
              {profile.username}
              {profile.verified && <VerifiedBadge size={11} />}
            </span>{' '}
            <span className="notif-text">{item.text}</span>{' '}
            <span className="notif-time">{item.time}</span>
          </div>
          {item.thumb ? (
            <div className="notif-thumb" style={{ background: item.thumb }} />
          ) : (
            <button className="notif-follow-btn">Seguir</button>
          )}
        </div>
      ))}
    </div>
  )
}
