import Avatar from '../Avatar'
import VerifiedBadge from '../VerifiedBadge'
import './MockupReel.css'

export default function MockupReel({ profile }) {
  return (
    <div className="mockup-card reel-mockup">
      <div className="reel-container">
        {/* Background */}
        <div className="reel-bg" />

        {/* Right actions */}
        <div className="reel-right-actions">
          <div className="reel-action">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>8,432</span>
          </div>
          <div className="reel-action">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>312</span>
          </div>
          <div className="reel-action">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            <span>Compartir</span>
          </div>
          <div className="reel-action">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
              <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
            </svg>
          </div>
          {/* Audio disc */}
          <div className="reel-audio-disc">
            <Avatar photoUrl={profile.photoUrl} username={profile.username} size={36} />
          </div>
        </div>

        {/* Bottom info */}
        <div className="reel-bottom">
          <div className="reel-user">
            <Avatar photoUrl={profile.photoUrl} username={profile.username} size={36} />
            <div className="reel-username">
              {profile.username}
              {profile.verified && <VerifiedBadge size={13} />}
            </div>
            <button className="reel-follow-btn">Seguir</button>
          </div>
          <div className="reel-description">
            Una descripción increíble del reel ✨ #reels #viral
          </div>
          <div className="reel-audio">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
            <span>{profile.username} • Sonido original</span>
          </div>
        </div>
      </div>
      <div className="mockup-label-inner" style={{paddingBottom: 10}}>Reel</div>
    </div>
  )
}
