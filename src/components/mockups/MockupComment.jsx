import Avatar from '../Avatar'
import VerifiedBadge from '../VerifiedBadge'
import './MockupComment.css'

export default function MockupComment({ profile }) {
  return (
    <div className="mockup-card comment-mockup">
      <div className="mockup-label-inner">Comentarios</div>

      {/* Post mini preview */}
      <div className="comment-post-preview">
        <div className="comment-post-thumb" />
        <div className="comment-post-info">
          <div className="comment-post-user">
            <Avatar photoUrl={profile.photoUrl} username={profile.username} size={28} />
            <span className="comment-post-username">{profile.username}</span>
            {profile.verified && <VerifiedBadge size={11} />}
          </div>
          <div className="comment-post-caption">Una nueva publicación increíble ✨</div>
        </div>
      </div>

      <div className="comment-divider" />

      {/* Comments */}
      <div className="comment-list">
        <div className="comment-row">
          <Avatar photoUrl={profile.photoUrl} username={profile.username} size={32} />
          <div className="comment-body">
            <div>
              <span className="comment-username">
                {profile.username}
                {profile.verified && <VerifiedBadge size={11} />}
              </span>{' '}
              <span className="comment-text">¡Qué foto tan increíble! Definitivamente me encanta 😍</span>
            </div>
            <div className="comment-meta">
              <span>2h</span>
              <span>24 me gusta</span>
              <span>Responder</span>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>

        <div className="comment-row">
          <Avatar username="ana.m" size={32} />
          <div className="comment-body">
            <div>
              <span className="comment-username">ana.m</span>{' '}
              <span className="comment-text">Me encanta esto! 🙌 sigue así</span>
            </div>
            <div className="comment-meta">
              <span>5h</span>
              <span>8 me gusta</span>
              <span>Responder</span>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>

        {/* Reply */}
        <div className="comment-row comment-row-reply">
          <Avatar photoUrl={profile.photoUrl} username={profile.username} size={24} />
          <div className="comment-body">
            <div>
              <span className="comment-username">
                {profile.username}
                {profile.verified && <VerifiedBadge size={10} />}
              </span>{' '}
              <span className="comment-text">@ana.m ¡Gracias! 💙</span>
            </div>
            <div className="comment-meta">
              <span>3h</span>
              <span>Responder</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="comment-input-row">
        <Avatar photoUrl={profile.photoUrl} username={profile.username} size={30} />
        <div className="comment-input-box">Añade un comentario...</div>
      </div>
    </div>
  )
}
