import './Avatar.css'

export default function Avatar({ photoUrl, username, size = 44, hasStory = false, storyViewed = false, className = '', plain = false, onClick, ariaLabel }) {
  const initials = username ? username[0].toUpperCase() : '?'
  const sizeStyle = { '--size': `${size}px` }

  const content = photoUrl ? (
    <img src={photoUrl} alt={username} className="avatar-img" />
  ) : (
    <div className="avatar-fallback">
      <span>{initials}</span>
    </div>
  )

  // Sin ring ni padding: solo el círculo de la imagen (ej. disco de audio del reel)
  if (plain) {
    return (
      <div className={`avatar-plain ${className}`} style={sizeStyle}>
        {content}
      </div>
    )
  }

  const wrapClass = `avatar-wrap ${hasStory ? (storyViewed ? 'story-viewed' : 'story-active') : ''} ${onClick ? 'avatar-clickable' : ''} ${className}`

  if (onClick) {
    return (
      <button type="button" className={wrapClass} style={sizeStyle} onClick={onClick} aria-label={ariaLabel}>
        <div className="avatar-inner">{content}</div>
      </button>
    )
  }

  return (
    <div className={wrapClass} style={sizeStyle}>
      <div className="avatar-inner">{content}</div>
    </div>
  )
}
