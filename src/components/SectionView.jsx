import MockupProfile from './mockups/MockupProfile'
import MockupStories from './mockups/MockupStories'
import MockupFeedPost from './mockups/MockupFeedPost'
import MockupReel from './mockups/MockupReel'
import MockupNotification from './mockups/MockupNotification'
import MockupDM from './mockups/MockupDM'
import MockupSearch from './mockups/MockupSearch'
import MockupComment from './mockups/MockupComment'
import './SectionView.css'

function renderSection(section, profile, onAvatarClick) {
  switch (section) {
    case 'perfil':
      return (
        <div className="section-grid single">
          <MockupProfile profile={profile} onAvatarClick={onAvatarClick} />
        </div>
      )
    case 'historias':
      return (
        <div className="section-grid single wide">
          <MockupStories profile={profile} />
        </div>
      )
    case 'feed':
      return (
        <div className="section-grid two-col">
          <MockupFeedPost profile={profile} />
          <MockupReel profile={profile} />
        </div>
      )
    case 'interacciones':
      return (
        <div className="section-grid two-col">
          <MockupDM profile={profile} />
          <MockupNotification profile={profile} />
          <MockupComment profile={profile} />
          <MockupSearch profile={profile} />
        </div>
      )
    default:
      return null
  }
}

export default function SectionView({ section, profile, direction, onAvatarClick }) {
  return (
    <div className={`section-panel from-${direction}`} key={section}>
      {renderSection(section, profile, onAvatarClick)}
    </div>
  )
}
