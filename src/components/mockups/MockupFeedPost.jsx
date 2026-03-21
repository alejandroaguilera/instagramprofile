import Avatar from '../Avatar'
import VerifiedBadge from '../VerifiedBadge'
import './MockupFeedPost.css'

export default function MockupFeedPost({ profile }) {
  return (
    <div className="mockup-card feed-mockup">
      <div className="mockup-label-inner">Post en el Feed</div>
      {/* Post header */}
      <div className="feed-header">
        <Avatar photoUrl={profile.photoUrl} username={profile.username} size={36} hasStory />
        <div className="feed-user-info">
          <div className="feed-username">
            {profile.username}
            {profile.verified && <VerifiedBadge size={13} />}
          </div>
          <div className="feed-location">New York, NY</div>
        </div>
        <button className="feed-more">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
          </svg>
        </button>
      </div>

      {/* Post image */}
      <div className="feed-image">
        <div className="feed-image-placeholder" />
      </div>

      {/* Actions */}
      <div className="feed-actions">
        <div className="feed-actions-left">
          <button className="feed-action-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button className="feed-action-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button className="feed-action-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <button className="feed-action-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>

      <div className="feed-likes">Le gusta a <strong>1,204 personas</strong></div>
      <div className="feed-caption">
        <span className="feed-caption-user">{profile.username}</span>{' '}
        <span className="feed-caption-text">Una nueva publicación increíble ✨ #photography</span>
      </div>
      <div className="feed-comments-link">Ver los 48 comentarios</div>
      <div className="feed-time">Hace 2 horas</div>
    </div>
  )
}
