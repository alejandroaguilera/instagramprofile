import MockupProfile from './mockups/MockupProfile'
import MockupStories from './mockups/MockupStories'
import MockupFeedPost from './mockups/MockupFeedPost'
import MockupReel from './mockups/MockupReel'
import MockupNotification from './mockups/MockupNotification'
import MockupDM from './mockups/MockupDM'
import MockupSearch from './mockups/MockupSearch'
import MockupComment from './mockups/MockupComment'
import './MockupGrid.css'

export default function MockupGrid({ profile }) {
  return (
    <div className="mockup-grid-root">
      <div className="mockup-section-label">Vista de perfil</div>
      <div className="mockup-row single">
        <MockupProfile profile={profile} />
      </div>

      <div className="mockup-section-label">Historias</div>
      <div className="mockup-row">
        <MockupStories profile={profile} />
      </div>

      <div className="mockup-section-label">Feed • Reels • DMs</div>
      <div className="mockup-row three-col">
        <MockupFeedPost profile={profile} />
        <MockupReel profile={profile} />
        <MockupDM profile={profile} />
      </div>

      <div className="mockup-section-label">Notificaciones • Comentarios • Búsqueda</div>
      <div className="mockup-row three-col">
        <MockupNotification profile={profile} />
        <MockupComment profile={profile} />
        <MockupSearch profile={profile} />
      </div>
    </div>
  )
}
