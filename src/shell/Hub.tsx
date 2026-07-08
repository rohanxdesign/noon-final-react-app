import './hub.css'

const apps = [
  { slug: 'supermall',     title: 'Supermall',      tagline: 'Storefront, PLP, PDP, cart, checkout' },
  { slug: 'share-address', title: 'Share Address',  tagline: 'Address bottom sheet flows' },
  { slug: 'one-flows',     title: 'noon One',       tagline: 'Membership, sharing, account flows' },
  { slug: 'wishlist',      title: 'Wishlist',       tagline: 'Collections drawer & multi-select' },
  { slug: 'family-sharing', title: 'Family Sharing', tagline: 'noon One family plans — 21 dev-ready flows' },
]

export default function Hub() {
  return (
    <div className="hub">
      <header className="hub__header">
        <h1>noon — merged</h1>
        <p>Pick a sub-app to open.</p>
      </header>
      <ul className="hub__grid">
        {apps.map((a) => (
          <li key={a.slug}>
            <button
              type="button"
              onClick={() => { window.location.assign(`/${a.slug}`) }}
              className="hub__card"
            >
              <h2>{a.title}</h2>
              <p>{a.tagline}</p>
              <span className="hub__cta">Open →</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
