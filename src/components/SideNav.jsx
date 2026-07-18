import { SECTIONS } from '../sections'
import './SideNav.css'

export default function SideNav({ activeSection, onSelect }) {
  return (
    <nav className="side-nav" aria-label="Secciones">
      {SECTIONS.map(({ id, label, Icon }) => {
        const active = activeSection === id
        return (
          <button
            key={id}
            type="button"
            className={`side-nav-item${active ? ' active' : ''}`}
            onClick={() => onSelect(id)}
            aria-current={active ? 'page' : undefined}
            aria-label={label}
            title={label}
          >
            <span className="side-nav-icon">
              <Icon active={active} />
            </span>
            <span className="side-nav-label">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
