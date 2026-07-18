const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
}

export function ProfileIcon({ active }) {
  return active ? (
    <svg {...base}>
      <circle cx="12" cy="7.5" r="4" fill="currentColor" />
      <path d="M4 20.5c0-3.6 3.6-6 8-6s8 2.4 8 6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" fill="currentColor" />
    </svg>
  ) : (
    <svg {...base}>
      <circle cx="12" cy="7.5" r="3.25" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.8 20.5c.4-3.2 3.5-5.2 7.2-5.2s6.8 2 7.2 5.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function StoriesIcon({ active }) {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={active ? 2.4 : 1.7} strokeLinecap="round" strokeDasharray="4.7 2.4" />
      <circle cx="12" cy="12" r="4.5" fill={active ? 'currentColor' : 'none'} stroke={active ? 'none' : 'currentColor'} strokeWidth="1.7" />
    </svg>
  )
}

export function FeedIcon({ active }) {
  return active ? (
    <svg {...base}>
      <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
      <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" />
      <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
    </svg>
  ) : (
    <svg {...base}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

export function ActivityIcon({ active }) {
  return (
    <svg {...base}>
      <path
        d="M12 20.5S3.5 15.6 3.5 9.6C3.5 6.8 5.7 4.5 8.4 4.5c1.5 0 2.9.7 3.6 1.9.7-1.2 2.1-1.9 3.6-1.9 2.7 0 4.9 2.3 4.9 5.1 0 6-8.5 10.9-8.5 10.9Z"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={active ? 0 : 1.7}
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function EditIcon() {
  return (
    <svg {...base}>
      <path
        d="M16.9 4.3a2.1 2.1 0 0 1 3 3L8.5 18.6l-4 1 1-4L16.9 4.3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}
