import { SECTIONS, EDIT_TAB } from '../sections'
import './TabBar.css'

export default function TabBar({ activeSection, onSelect }) {
  const [perfil, historias, feed, actividad] = SECTIONS
  const tabs = [perfil, historias, EDIT_TAB, feed, actividad]

  return (
    <nav className="tab-bar" aria-label="Secciones">
      {tabs.map(({ id, label, Icon }) => {
        const active = activeSection === id
        const isEdit = id === EDIT_TAB.id
        return (
          <button
            key={id}
            type="button"
            className={`tab-item${active ? ' active' : ''}${isEdit ? ' tab-edit' : ''}`}
            onClick={() => onSelect(id)}
            aria-current={active ? 'page' : undefined}
          >
            <span className="tab-icon">
              <Icon active={active} />
            </span>
            <span className="tab-label">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
