import { useState, useEffect } from 'react'
import api from '../utils/api'
import { MapPin, Phone, Mail, Clock, Search } from 'lucide-react'

export default function Clubs() {
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    api.get('/clubs').then(r => setClubs(r.data.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const filtered = clubs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.address.city.toLowerCase().includes(search.toLowerCase()) ||
    c.address.state.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.headerInner}>
          <h1 style={s.title}>Find a Collection Club</h1>
          <p style={s.sub}>Locate the nearest NourishNet hub to drop off or receive food</p>
          <div style={s.searchBox}>
            <Search size={18} color="var(--muted)" />
            <input
              style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent' }}
              placeholder="Search by city or state..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div style={s.body}>
        {/* List */}
        <div style={s.list}>
          <div style={s.listHeader}>{filtered.length} clubs found</div>
          {loading ? (
            Array(4).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: 140, borderRadius: 16, marginBottom: '1rem' }} />)
          ) : filtered.length === 0 ? (
            <div style={s.empty}><div style={{ fontSize: '2.5rem' }}>📍</div><p>No clubs found for "{search}"</p></div>
          ) : (
            filtered.map(club => (
              <div key={club._id}
                style={{ ...s.clubCard, ...(selected?._id === club._id ? s.clubCardActive : {}) }}
                onClick={() => setSelected(club)}
              >
                <div style={s.clubTop}>
                  <div>
                    <div style={s.clubName}>{club.name}</div>
                    <div style={s.clubLocation}><MapPin size={13} />{club.address.city}, {club.address.state}</div>
                  </div>
                  <div style={s.activeBadge}>Active</div>
                </div>
                {club.description && <p style={s.clubDesc}>{club.description}</p>}
                <div style={s.clubTags}>
                  {(club.acceptedTypes || []).map(t => (
                    <span key={t} style={s.tag}>{t.replace('_', ' ')}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail panel */}
        <div style={s.detail}>
          {selected ? (
            <div style={s.detailCard}>
              <div style={s.detailEmoji}>🏪</div>
              <h2 style={s.detailTitle}>{selected.name}</h2>
              <p style={s.detailDesc}>{selected.description}</p>

              <div style={s.detailSection}>
                <div style={s.detailLabel}>📍 Address</div>
                <div style={s.detailValue}>
                  {selected.address.street && <div>{selected.address.street}</div>}
                  <div>{selected.address.city}, {selected.address.state} {selected.address.pincode}</div>
                </div>
              </div>

              {selected.operatingHours?.weekdays && (
                <div style={s.detailSection}>
                  <div style={s.detailLabel}><Clock size={14} /> Operating Hours</div>
                  <div style={s.detailValue}>
                    <div>Weekdays: {selected.operatingHours.weekdays}</div>
                    {selected.operatingHours.weekends && <div>Weekends: {selected.operatingHours.weekends}</div>}
                  </div>
                </div>
              )}

              {selected.contact && (
                <div style={s.detailSection}>
                  <div style={s.detailLabel}>📞 Contact</div>
                  <div style={s.detailValue}>
                    {selected.contact.phone && <div style={s.contactRow}><Phone size={14} />{selected.contact.phone}</div>}
                    {selected.contact.email && <div style={s.contactRow}><Mail size={14} />{selected.contact.email}</div>}
                  </div>
                </div>
              )}

              {selected.acceptedTypes?.length > 0 && (
                <div style={s.detailSection}>
                  <div style={s.detailLabel}>✅ Accepted Food Types</div>
                  <div style={s.tagWrap}>
                    {selected.acceptedTypes.map(t => <span key={t} style={s.detailTag}>{t.replace('_', ' ')}</span>)}
                  </div>
                </div>
              )}

              <a
                href={`https://maps.google.com/?q=${selected.address.city}+${selected.address.state}+${selected.address.pincode}`}
                target="_blank" rel="noreferrer"
                style={s.mapBtn}
              >
                📍 Open in Google Maps
              </a>
            </div>
          ) : (
            <div style={s.placeholder}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Select a Club</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Click on any club to see its details, hours, and contact info.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { background: 'var(--cream)', minHeight: '100vh' },
  header: { background: 'linear-gradient(135deg, #2d5a27, var(--earth-deep))', padding: '3rem 1.5rem 2rem' },
  headerInner: { maxWidth: 700, margin: '0 auto' },
  title: { fontFamily: 'var(--font-display)', color: 'white', fontSize: 'clamp(1.8rem,4vw,2.5rem)', marginBottom: '0.5rem' },
  sub: { color: 'rgba(255,255,255,0.75)', marginBottom: '1.5rem' },
  searchBox: { display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.75rem 1rem', borderRadius: 10, maxWidth: 500 },
  body: { maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem', display: 'grid', gridTemplateColumns: '420px 1fr', gap: '2rem', alignItems: 'start' },
  list: { display: 'flex', flexDirection: 'column' },
  listHeader: { fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem', fontWeight: 600 },
  clubCard: { background: 'white', border: '1.5px solid var(--border)', borderRadius: 16, padding: '1.25rem', marginBottom: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' },
  clubCardActive: { border: '1.5px solid var(--forest)', boxShadow: '0 0 0 3px rgba(45,90,39,0.1)' },
  clubTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' },
  clubName: { fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600 },
  clubLocation: { display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.2rem' },
  activeBadge: { background: 'var(--forest-pale)', color: 'var(--forest)', fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 10 },
  clubDesc: { color: 'var(--slate)', fontSize: '0.85rem', marginBottom: '0.75rem' },
  clubTags: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap' },
  tag: { background: 'var(--cream)', border: '1px solid var(--border)', fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: 6, color: 'var(--slate)', textTransform: 'capitalize' },
  empty: { textAlign: 'center', padding: '3rem 1rem', color: 'var(--muted)' },
  detail: { position: 'sticky', top: 80 },
  detailCard: { background: 'white', borderRadius: 20, padding: '2rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' },
  detailEmoji: { fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' },
  detailTitle: { fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' },
  detailDesc: { color: 'var(--muted)', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1.5rem' },
  detailSection: { paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)' },
  detailLabel: { display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' },
  detailValue: { fontSize: '0.9rem', color: 'var(--charcoal)', lineHeight: 1.7 },
  contactRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' },
  tagWrap: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.25rem' },
  detailTag: { background: 'var(--forest-pale)', color: 'var(--forest)', border: '1px solid var(--border)', fontSize: '0.78rem', padding: '0.2rem 0.6rem', borderRadius: 6, textTransform: 'capitalize' },
  mapBtn: { display: 'block', textAlign: 'center', background: 'var(--forest)', color: 'white', padding: '0.8rem', borderRadius: 10, fontWeight: 700, textDecoration: 'none', marginTop: '1rem', fontSize: '0.9rem' },
  placeholder: { background: 'white', borderRadius: 20, padding: '4rem 2rem', textAlign: 'center', border: '2px dashed var(--border)' },
}
