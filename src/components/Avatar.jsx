import './Avatar.css'

const INITIALS_COLORS = [
  ['#f58529', '#dd2a7b', '#8134af', '#515bd4'],
  ['#f58529', '#feda77', '#dd2a7b'],
]

export default function Avatar({ photoUrl, username, size = 44, hasStory = false, storyViewed = false, className = '' }) {
  const initials = username ? username[0].toUpperCase() : '?'

  return (
    <div
      className={`avatar-wrap ${hasStory ? (storyViewed ? 'story-viewed' : 'story-active') : ''} ${className}`}
      style={{ '--size': `${size}px` }}
    >
      <div className="avatar-inner">
        {photoUrl ? (
          <img src={photoUrl} alt={username} className="avatar-img" />
        ) : (
          <div className="avatar-fallback">
            <span>{initials}</span>
          </div>
        )}
      </div>
    </div>
  )
}
