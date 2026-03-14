import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import { Search, Filter, MapPin, Clock, Package, Loader } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const FOOD_TYPES = ['all', 'cooked', 'raw', 'packaged', 'bakery', 'fruits_vegetables', 'dairy', 'beverages', 'other']
const FOOD_EMOJI = { cooked: '🍱', raw: '🥩', packaged: '📦', bakery: '🥖', fruits_vegetables: '🥦', dairy: '🥛', beverages: '🧃', other: '🍽️' }

export default function FoodDonations() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [cityFilter, setCityFilter] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const fetchDonations = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: 12, status: 'available' })
      if (typeFilter !== 'all') params.append('foodType', typeFilter)
      if (cityFilter) params.append('city', cityFilter)
      const { data } = await api.get(`/food-donations?${params}`)
      setDonations(data.data)
      setTotalPages(data.pages)
      setTotal(data.total)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDonations() }, [typeFilter, cityFilter, page])

  const filtered = search
    ? donations.filter(d =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.pickupAddress.city.toLowerCase().includes(search.toLowerCase())
      )
    : donations

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <h1 style={s.title}>Available Food Donations</h1>
          <p style={s.sub}>{total} listings available across India</p>
          <div style={s.searchRow}>
            <div style={s.searchBox}>
              <Search size={18} color="var(--muted)" />
              <input
                style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent', fontSize: '0.95rem' }}
                placeholder="Search food or city..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div style={s.searchBox}>
              <MapPin size={18} color="var(--muted)" />
              <input
                style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent', fontSize: '0.95rem' }}
                placeholder="Filter by city..."
                value={cityFilter}
                onChange={e => { setCityFilter(e.target.value); setPage(1) }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={s.body}>
        {/* Filters */}
        <div style={s.filterRow}>
          {FOOD_TYPES.map(t => (
            <button key={t} style={{ ...s.filterChip, ...(typeFilter === t ? s.filterChipActive : {}) }}
              onClick={() => { setTypeFilter(t); setPage(1) }}>
              {t !== 'all' && FOOD_EMOJI[t]} {t === 'all' ? 'All Types' : t.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={s.loadingGrid}>
            {Array(8).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: 280, borderRadius: 16 }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={s.empty}>
            <div style={{ fontSize: '3rem' }}>🍽️</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginTop: '1rem' }}>No donations found</h3>
            <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>Try adjusting your filters or <Link to="/donate-food" style={{ color: 'var(--forest)' }}>be the first to donate!</Link></p>
          </div>
        ) : (
          <div style={s.grid}>
            {filtered.map(d => <DonationCard key={d._id} d={d} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={s.pagination}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} style={{ ...s.pageBtn, ...(page === p ? s.pageBtnActive : {}) }} onClick={() => setPage(p)}>{p}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function DonationCard({ d }) {
  const isExpiringSoon = new Date(d.expiryDate) - new Date() < 24 * 60 * 60 * 1000
  return (
    <Link to={`/donations/${d._id}`} style={s.card}>
      <div style={s.cardEmoji}>{FOOD_EMOJI[d.foodType] || '🍽️'}</div>
      <div style={s.cardBody}>
        {isExpiringSoon && <span style={s.urgentBadge}>⚡ Expiring Soon</span>}
        <div style={s.cardType}>{d.foodType.replace('_', ' ')}</div>
        <h3 style={s.cardTitle}>{d.title}</h3>
        <p style={s.cardDesc}>{d.description.slice(0, 80)}{d.description.length > 80 ? '...' : ''}</p>
        <div style={s.cardMeta}>
          <span style={s.metaItem}><Package size={14} /> {d.quantity.amount} {d.quantity.unit}</span>
          <span style={s.metaItem}><MapPin size={14} /> {d.pickupAddress.city}</span>
          <span style={s.metaItem}><Clock size={14} /> {formatDistanceToNow(new Date(d.createdAt), { addSuffix: true })}</span>
        </div>
        <div style={s.cardFooter}>
          <div style={s.donorInfo}>
            <div style={s.donorAvatar}>{d.donor?.name?.[0]}</div>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{d.donor?.organization || d.donor?.name}</span>
          </div>
          <div style={s.vegBadge}>{d.isVegetarian ? '🟢 Veg' : '🔴 Non-Veg'}</div>
        </div>
      </div>
    </Link>
  )
}

const s = {
  page: { minHeight: '100vh' },
  header: { background: 'linear-gradient(135deg, var(--forest) 0%, #2d5a27 100%)', padding: '3rem 1.5rem 2rem' },
  headerInner: { maxWidth: 1200, margin: '0 auto' },
  title: { fontFamily: 'var(--font-display)', color: 'white', fontSize: 'clamp(1.8rem,4vw,2.5rem)', marginBottom: '0.5rem' },
  sub: { color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' },
  searchRow: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  searchBox: { display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.7rem 1rem', borderRadius: 10, flex: 1, minWidth: 200 },
  body: { maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' },
  filterRow: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' },
  filterChip: { padding: '0.4rem 0.9rem', border: '1.5px solid var(--border)', borderRadius: 20, background: 'white', cursor: 'pointer', fontSize: '0.85rem', textTransform: 'capitalize', transition: 'all 0.2s' },
  filterChipActive: { background: 'var(--forest)', color: 'white', borderColor: 'var(--forest)' },
  loadingGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' },
  empty: { textAlign: 'center', padding: '4rem 1rem' },
  card: { background: 'white', border: '1.5px solid var(--border)', borderRadius: 20, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s,box-shadow 0.2s', ':hover': { transform: 'translateY(-4px)' } },
  cardEmoji: { background: 'var(--cream)', fontSize: '3rem', padding: '1.5rem', textAlign: 'center' },
  cardBody: { padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 },
  urgentBadge: { background: '#fff3cd', color: '#856404', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: 4, display: 'inline-block', marginBottom: '0.25rem' },
  cardType: { fontSize: '0.75rem', color: 'var(--forest)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' },
  cardTitle: { fontFamily: 'var(--font-display)', fontSize: '1.1rem', lineHeight: 1.3 },
  cardDesc: { color: 'var(--slate)', fontSize: '0.875rem', lineHeight: 1.6 },
  cardMeta: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' },
  metaItem: { display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--muted)' },
  cardFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' },
  donorInfo: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  donorAvatar: { width: 24, height: 24, background: 'var(--earth)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 },
  vegBadge: { fontSize: '0.75rem', fontWeight: 600 },
  pagination: { display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '3rem' },
  pageBtn: { width: 40, height: 40, border: '1.5px solid var(--border)', borderRadius: 8, background: 'white', cursor: 'pointer', fontWeight: 600 },
  pageBtnActive: { background: 'var(--forest)', color: 'white', borderColor: 'var(--forest)' },
}
