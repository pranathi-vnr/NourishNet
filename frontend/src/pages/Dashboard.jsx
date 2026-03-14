import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Package, Heart, Clock, CheckCircle, Trash2, MapPin, TrendingUp, User } from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'

const TABS = ['Overview', 'My Donations', 'My Claims', 'Money Donated', 'Profile']

export default function Dashboard() {
  const { user, refreshUser } = useAuth()
  const [tab, setTab] = useState('Overview')
  const [myDonations, setMyDonations] = useState([])
  const [myClaims, setMyClaims] = useState([])
  const [myMoney, setMyMoney] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [dRes, cRes, mRes] = await Promise.all([
        api.get('/food-donations/user/my-donations'),
        api.get('/food-donations/user/my-claims'),
        api.get('/monetary-donations/my'),
      ])
      setMyDonations(dRes.data.data)
      setMyClaims(cRes.data.data)
      setMyMoney(mRes.data.data)
    } catch {}
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this donation?')) return
    try {
      await api.delete(`/food-donations/${id}`)
      setMyDonations(prev => prev.filter(d => d._id !== id))
      toast.success('Donation deleted.')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete.')
    }
  }

  const handleComplete = async (id) => {
    try {
      await api.put(`/food-donations/${id}/complete`)
      setMyDonations(prev => prev.map(d => d._id === id ? { ...d, status: 'completed' } : d))
      toast.success('Marked as completed!')
    } catch {}
  }

  const totalMoney = myMoney.reduce((s, d) => s + d.amount, 0)
  const completed = myDonations.filter(d => d.status === 'completed').length
  const active = myDonations.filter(d => d.status === 'available').length

  return (
    <div style={s.page}>
      <div style={s.sidebar}>
        <div style={s.userInfo}>
          <div style={s.bigAvatar}>{user?.name?.[0]?.toUpperCase()}</div>
          <div style={s.userName}>{user?.name}</div>
          <div style={s.userRole}>{user?.role}</div>
          {user?.organization && <div style={s.userOrg}>{user.organization}</div>}
        </div>
        <nav style={s.nav}>
          {TABS.map(t => (
            <button key={t} style={{ ...s.navBtn, ...(tab === t ? s.navBtnActive : {}) }} onClick={() => setTab(t)}>
              {t === 'Overview' && <TrendingUp size={16} />}
              {t === 'My Donations' && <Package size={16} />}
              {t === 'My Claims' && <Heart size={16} />}
              {t === 'Money Donated' && <CheckCircle size={16} />}
              {t === 'Profile' && <User size={16} />}
              {t}
            </button>
          ))}
        </nav>
      </div>

      <div style={s.main}>
        {tab === 'Overview' && (
          <div>
            <h2 style={s.tabTitle}>Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
            <div style={s.statsGrid}>
              <StatCard label="Active Listings" value={active} icon="🌾" color="var(--forest-pale)" />
              <StatCard label="Completed Donations" value={completed} icon="✅" color="#e8f5e4" />
              <StatCard label="Food Claimed" value={myClaims.length} icon="🤝" color="var(--terracotta-pale)" />
              <StatCard label="Money Donated" value={`₹${totalMoney.toLocaleString()}`} icon="💚" color="#fff3cd" />
            </div>
            <div style={s.recentSection}>
              <h3 style={s.subTitle}>Recent Activity</h3>
              {myDonations.slice(0, 3).map(d => (
                <div key={d._id} style={s.actItem}>
                  <div style={s.actDot} data-status={d.status} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{d.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{d.status} • {formatDistanceToNow(new Date(d.createdAt), { addSuffix: true })}</div>
                  </div>
                  <Link to={`/donations/${d._id}`} style={s.viewLink}>View →</Link>
                </div>
              ))}
              {myDonations.length === 0 && <div style={s.emptyMsg}>No donations yet. <Link to="/donate-food" style={{ color: 'var(--forest)' }}>List your first donation!</Link></div>}
            </div>
          </div>
        )}

        {tab === 'My Donations' && (
          <div>
            <div style={s.tabHeader}>
              <h2 style={s.tabTitle}>My Food Donations</h2>
              <Link to="/donate-food" style={s.addBtn}>+ Add New</Link>
            </div>
            {loading ? <div style={s.loading}>Loading...</div> :
              myDonations.length === 0 ? <EmptyState msg="No donations yet." cta={{ to: '/donate-food', label: 'List Food' }} /> :
              myDonations.map(d => (
                <div key={d._id} style={s.donationRow}>
                  <div style={s.rowEmoji}>🍱</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{d.title}</div>
                    <div style={s.rowMeta}>
                      <span style={{ ...s.statusBadge, background: d.status === 'available' ? 'var(--forest-pale)' : d.status === 'claimed' ? '#fff3cd' : '#e8f5e4', color: d.status === 'available' ? 'var(--forest)' : d.status === 'claimed' ? '#856404' : '#1a5c15' }}>{d.status}</span>
                      <span><MapPin size={12} /> {d.pickupAddress.city}</span>
                      <span><Clock size={12} /> {formatDistanceToNow(new Date(d.createdAt), { addSuffix: true })}</span>
                    </div>
                    {d.claimedBy && <div style={s.claimedInfo}>Claimed by: <strong>{d.claimedBy.name || d.claimedBy.organization}</strong> — {d.claimedBy.phone}</div>}
                  </div>
                  <div style={s.rowActions}>
                    <Link to={`/donations/${d._id}`} style={s.actionLink}>View</Link>
                    {d.status === 'claimed' && <button style={s.completeBtn} onClick={() => handleComplete(d._id)}>Mark Done</button>}
                    {d.status === 'available' && <button style={s.deleteBtn} onClick={() => handleDelete(d._id)}><Trash2 size={15} /></button>}
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {tab === 'My Claims' && (
          <div>
            <h2 style={s.tabTitle}>Food I've Claimed</h2>
            {myClaims.length === 0 ? <EmptyState msg="No claims yet." cta={{ to: '/donations', label: 'Browse Food' }} /> :
              myClaims.map(d => (
                <div key={d._id} style={s.donationRow}>
                  <div style={s.rowEmoji}>🤝</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{d.title}</div>
                    <div style={s.rowMeta}>
                      <span><MapPin size={12} /> {d.pickupAddress.city}</span>
                      <span>Donor: {d.donor?.name} {d.donor?.phone && `• ${d.donor.phone}`}</span>
                    </div>
                    {d.claimedAt && <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Claimed {formatDistanceToNow(new Date(d.claimedAt), { addSuffix: true })}</div>}
                  </div>
                  <Link to={`/donations/${d._id}`} style={s.actionLink}>Details</Link>
                </div>
              ))
            }
          </div>
        )}

        {tab === 'Money Donated' && (
          <div>
            <h2 style={s.tabTitle}>Monetary Donations</h2>
            <div style={s.totalBox}>Total Donated: <strong style={{ fontSize: '1.4rem', color: 'var(--terracotta)' }}>₹{totalMoney.toLocaleString()}</strong></div>
            {myMoney.length === 0 ? <EmptyState msg="No monetary donations yet." cta={{ to: '/donate-money', label: 'Donate Now' }} /> :
              myMoney.map(d => (
                <div key={d._id} style={s.donationRow}>
                  <div style={s.rowEmoji}>💚</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>₹{d.amount.toLocaleString()}</div>
                    <div style={s.rowMeta}>
                      <span>{d.purpose}</span>
                      <span>{d.paymentMethod}</span>
                      <span>{format(new Date(d.createdAt), 'dd MMM yyyy')}</span>
                    </div>
                    {d.message && <div style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>"{d.message}"</div>}
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>TXN: {d.transactionId}</div>
                  </div>
                  <span style={{ ...s.statusBadge, background: '#e8f5e4', color: '#1a5c15' }}>{d.status}</span>
                </div>
              ))
            }
          </div>
        )}

        {tab === 'Profile' && <ProfileTab user={user} refreshUser={refreshUser} />}
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, color }) {
  return (
    <div style={{ ...s.statCard, background: color }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: '0.82rem', color: 'var(--slate)', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

function EmptyState({ msg, cta }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🌱</div>
      <p>{msg}</p>
      {cta && <Link to={cta.to} style={{ display: 'inline-block', marginTop: '1rem', background: 'var(--forest)', color: 'white', padding: '0.6rem 1.5rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>{cta.label}</Link>}
    </div>
  )
}

function ProfileTab({ user, refreshUser }) {
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', organization: user?.organization || '' })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put('/auth/profile', form)
      await refreshUser()
      toast.success('Profile updated!')
    } catch { toast.error('Failed to update profile.') }
    setSaving(false)
  }

  return (
    <div>
      <h2 style={s.tabTitle}>Profile Settings</h2>
      <div style={s.profileCard}>
        <div style={s.profileField}><label style={s.label}>Full Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
        <div style={s.profileField}><label style={s.label}>Email</label><input value={user?.email} disabled style={{ background: 'var(--cream)', color: 'var(--muted)' }} /></div>
        <div style={s.profileField}><label style={s.label}>Phone</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 ..." /></div>
        <div style={s.profileField}><label style={s.label}>Organization</label><input value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} placeholder="NGO or company" /></div>
        <button style={s.saveBtn} onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
      </div>
    </div>
  )
}

const s = {
  page: { display: 'flex', minHeight: '100vh', background: 'var(--cream)' },
  sidebar: { width: 240, background: 'white', borderRight: '1px solid var(--border)', padding: '2rem 0', flexShrink: 0, position: 'sticky', top: 64, height: 'calc(100vh - 64px)', overflow: 'auto' },
  userInfo: { textAlign: 'center', padding: '0 1.5rem 2rem', borderBottom: '1px solid var(--border)' },
  bigAvatar: { width: 64, height: 64, background: 'var(--forest)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 700, margin: '0 auto 0.75rem' },
  userName: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' },
  userRole: { fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', marginTop: '0.25rem' },
  userOrg: { fontSize: '0.82rem', color: 'var(--forest)', marginTop: '0.25rem', fontWeight: 500 },
  nav: { padding: '1rem 0', display: 'flex', flexDirection: 'column' },
  navBtn: { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1.5rem', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem', color: 'var(--slate)', transition: 'all 0.15s', fontFamily: 'var(--font-body)' },
  navBtnActive: { background: 'var(--forest-pale)', color: 'var(--forest)', fontWeight: 700, borderRight: '3px solid var(--forest)' },
  main: { flex: 1, padding: '2.5rem', maxWidth: 900 },
  tabTitle: { fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '1.5rem' },
  tabHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '1rem', marginBottom: '2rem' },
  statCard: { padding: '1.25rem', borderRadius: 16, textAlign: 'center' },
  addBtn: { background: 'var(--forest)', color: 'white', padding: '0.6rem 1.25rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' },
  recentSection: { background: 'white', borderRadius: 16, padding: '1.5rem', border: '1px solid var(--border)' },
  subTitle: { fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '1rem' },
  actItem: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' },
  actDot: { width: 10, height: 10, borderRadius: '50%', background: 'var(--forest)', flexShrink: 0 },
  viewLink: { color: 'var(--forest)', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' },
  emptyMsg: { color: 'var(--muted)', textAlign: 'center', padding: '1.5rem' },
  loading: { textAlign: 'center', padding: '3rem', color: 'var(--muted)' },
  donationRow: { display: 'flex', alignItems: 'flex-start', gap: '1rem', background: 'white', padding: '1.25rem', borderRadius: 14, border: '1px solid var(--border)', marginBottom: '0.75rem' },
  rowEmoji: { fontSize: '1.75rem', flexShrink: 0 },
  rowMeta: { display: 'flex', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--muted)', flexWrap: 'wrap', marginTop: '0.3rem', alignItems: 'center' },
  statusBadge: { padding: '0.15rem 0.6rem', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700, textTransform: 'capitalize' },
  claimedInfo: { fontSize: '0.82rem', color: 'var(--forest)', marginTop: '0.4rem', background: 'var(--forest-pale)', padding: '0.35rem 0.6rem', borderRadius: 6 },
  rowActions: { display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 },
  actionLink: { color: 'var(--forest)', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', padding: '0.4rem 0.8rem', border: '1.5px solid var(--forest)', borderRadius: 6 },
  completeBtn: { background: 'var(--forest)', color: 'white', border: 'none', padding: '0.4rem 0.7rem', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' },
  deleteBtn: { background: '#fff0ee', color: 'var(--terracotta)', border: 'none', padding: '0.4rem', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center' },
  totalBox: { background: 'white', padding: '1.25rem', borderRadius: 14, border: '1px solid var(--border)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' },
  profileCard: { background: 'white', padding: '2rem', borderRadius: 16, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 480 },
  profileField: { display: 'flex', flexDirection: 'column', gap: '0.35rem' },
  label: { fontWeight: 600, fontSize: '0.85rem' },
  saveBtn: { background: 'var(--forest)', color: 'white', border: 'none', padding: '0.8rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' },
}
