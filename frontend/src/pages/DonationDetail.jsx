import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { MapPin, Clock, Package, Phone, Mail, ArrowLeft, CheckCircle, Leaf } from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'

const FOOD_EMOJI = { cooked: '🍱', raw: '🥩', packaged: '📦', bakery: '🥖', fruits_vegetables: '🥦', dairy: '🥛', beverages: '🧃', other: '🍽️' }

export default function DonationDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [donation, setDonation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)

  useEffect(() => {
    api.get(`/food-donations/${id}`)
      .then(r => setDonation(r.data.data))
      .catch(() => navigate('/donations'))
      .finally(() => setLoading(false))
  }, [id])

  const handleClaim = async () => {
    if (!user) { toast.error('Please log in to claim food.'); navigate('/login'); return }
    setClaiming(true)
    try {
      const { data } = await api.put(`/food-donations/${id}/claim`)
      setDonation(data.data)
      toast.success('🎉 Food claimed! Contact the donor to arrange pickup.')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to claim donation.')
    } finally {
      setClaiming(false)
    }
  }

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}><div className="skeleton" style={{ width: 800, height: 400, borderRadius: 20 }} /></div>
  if (!donation) return null

  const isMine = user && donation.donor?._id === user._id
  const isClaimed = donation.status !== 'available'
  const isExpiringSoon = new Date(donation.expiryDate) - new Date() < 24 * 60 * 60 * 1000

  return (
    <div style={s.page}>
      <div style={s.inner}>
        <Link to="/donations" style={s.back}><ArrowLeft size={18} /> Back to Donations</Link>

        <div style={s.layout}>
          {/* Main */}
          <div style={s.main}>
            <div style={s.emojiBox}>{FOOD_EMOJI[donation.foodType] || '🍽️'}</div>

            <div style={s.headerInfo}>
              {isExpiringSoon && <span style={s.urgentBadge}>⚡ Expiring Within 24 Hours</span>}
              <div style={s.typeLabel}>{donation.foodType.replace('_', ' ')}</div>
              <h1 style={s.title}>{donation.title}</h1>
              <div style={s.statusChip} data-status={donation.status}>{donation.status}</div>
            </div>

            <p style={s.description}>{donation.description}</p>

            <div style={s.infoGrid}>
              <InfoItem icon={Package} label="Quantity" value={`${donation.quantity.amount} ${donation.quantity.unit}`} />
              <InfoItem icon={Clock} label="Expiry" value={format(new Date(donation.expiryDate), 'dd MMM yyyy')} />
              <InfoItem icon={Leaf} label="Type" value={donation.isVegetarian ? '🟢 Vegetarian' : '🔴 Non-Vegetarian'} />
              <InfoItem icon={MapPin} label="Pickup City" value={donation.pickupAddress.city} />
            </div>

            {donation.pickupTimeSlot?.from && (
              <div style={s.timeSlot}>
                <Clock size={16} color="var(--forest)" />
                <span>Pickup: {donation.pickupTimeSlot.from} – {donation.pickupTimeSlot.to}</span>
              </div>
            )}

            <div style={s.addressBox}>
              <MapPin size={16} color="var(--forest)" />
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Pickup Address</div>
                <div style={{ color: 'var(--slate)', fontSize: '0.95rem' }}>
                  {donation.pickupAddress.street}, {donation.pickupAddress.city}, {donation.pickupAddress.state} — {donation.pickupAddress.pincode}
                </div>
              </div>
            </div>

            {donation.allergensInfo && (
              <div style={s.allergenBox}>
                <strong>⚠️ Allergen Info:</strong> {donation.allergensInfo}
              </div>
            )}

            <div style={s.metaRow}>
              <span>Posted {formatDistanceToNow(new Date(donation.createdAt), { addSuffix: true })}</span>
              <span>•</span>
              <span>{donation.views} views</span>
            </div>
          </div>

          {/* Sidebar */}
          <div style={s.sidebar}>
            {/* Claim card */}
            <div style={s.claimCard}>
              {isClaimed ? (
                <div style={s.claimedMsg}>
                  <CheckCircle size={32} color="var(--forest)" />
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: '0.5rem' }}>
                    {donation.status === 'completed' ? 'Donation Completed!' : 'Already Claimed'}
                  </div>
                  {donation.claimedBy && <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.25rem' }}>By: {donation.claimedBy.name || donation.claimedBy.organization}</div>}
                </div>
              ) : isMine ? (
                <div style={s.claimedMsg}>
                  <div style={{ fontWeight: 600 }}>This is your listing</div>
                  <Link to="/dashboard" style={s.dashLink}>Manage in Dashboard →</Link>
                </div>
              ) : (
                <>
                  <div style={s.claimTitle}>Claim This Donation</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '1rem' }}>Click below to claim this food. You'll receive donor contact details to arrange pickup.</p>
                  {user ? (
                    <button style={s.claimBtn} onClick={handleClaim} disabled={claiming}>
                      {claiming ? 'Claiming...' : '🤝 Claim Food Donation'}
                    </button>
                  ) : (
                    <Link to="/login" style={s.claimBtn}>Log in to Claim</Link>
                  )}
                </>
              )}
            </div>

            {/* Donor card */}
            <div style={s.donorCard}>
              <div style={s.donorCardTitle}>About the Donor</div>
              <div style={s.donorAvatar}>{donation.donor?.name?.[0]}</div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{donation.donor?.name}</div>
              {donation.donor?.organization && <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{donation.donor.organization}</div>}
              {(isClaimed && donation.claimedBy?._id === user?._id) && (
                <div style={s.contactInfo}>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.85rem' }}>Contact Details</div>
                  {donation.donor?.phone && <div style={s.contactRow}><Phone size={14} />{donation.donor.phone}</div>}
                  {donation.donor?.email && <div style={s.contactRow}><Mail size={14} />{donation.donor.email}</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontSize: '0.78rem', marginBottom: '0.4rem', textTransform: 'uppercase', fontWeight: 600 }}>
        <Icon size={14} />{label}
      </div>
      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{value}</div>
    </div>
  )
}

const s = {
  page: { padding: '2rem 1.5rem', background: 'var(--cream)', minHeight: '100vh' },
  inner: { maxWidth: 1100, margin: '0 auto' },
  back: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--forest)', fontWeight: 600, textDecoration: 'none', marginBottom: '1.5rem', fontSize: '0.9rem' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' },
  main: { background: 'white', borderRadius: 20, padding: '2rem', border: '1px solid var(--border)' },
  emojiBox: { fontSize: '4rem', background: 'var(--cream)', borderRadius: 16, padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem' },
  headerInfo: { marginBottom: '1rem' },
  urgentBadge: { background: '#fff3cd', color: '#856404', fontSize: '0.78rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 4, display: 'inline-block', marginBottom: '0.5rem' },
  typeLabel: { fontSize: '0.75rem', color: 'var(--forest)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.4rem' },
  title: { fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.5rem' },
  statusChip: { display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700, background: 'var(--forest-pale)', color: 'var(--forest)', textTransform: 'capitalize' },
  description: { color: 'var(--slate)', lineHeight: 1.75, marginBottom: '1.5rem', fontSize: '1rem' },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.75rem', marginBottom: '1.25rem' },
  timeSlot: { display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--forest-pale)', color: 'var(--forest)', padding: '0.65rem 1rem', borderRadius: 10, fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem' },
  addressBox: { display: 'flex', gap: '0.75rem', background: 'var(--cream)', padding: '1rem', borderRadius: 12, marginBottom: '1rem', alignItems: 'flex-start' },
  allergenBox: { background: '#fff8e1', border: '1px solid #ffe082', padding: '0.75rem 1rem', borderRadius: 10, fontSize: '0.88rem', color: '#6d4c00', marginBottom: '1rem' },
  metaRow: { display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--muted)', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' },
  sidebar: { display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: 80 },
  claimCard: { background: 'white', border: '1.5px solid var(--border)', borderRadius: 20, padding: '1.5rem' },
  claimTitle: { fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '0.5rem' },
  claimBtn: { display: 'block', width: '100%', textAlign: 'center', background: 'var(--forest)', color: 'white', border: 'none', padding: '0.9rem', borderRadius: 12, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', textDecoration: 'none' },
  claimedMsg: { textAlign: 'center', padding: '0.5rem 0' },
  dashLink: { display: 'inline-block', marginTop: '0.5rem', color: 'var(--forest)', fontWeight: 600, fontSize: '0.9rem' },
  donorCard: { background: 'white', border: '1px solid var(--border)', borderRadius: 20, padding: '1.5rem', textAlign: 'center' },
  donorCardTitle: { fontWeight: 600, fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '1rem' },
  donorAvatar: { width: 56, height: 56, background: 'var(--earth)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 700, margin: '0 auto 0.75rem' },
  contactInfo: { background: 'var(--cream)', padding: '1rem', borderRadius: 10, marginTop: '1rem', textAlign: 'left' },
  contactRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', marginTop: '0.4rem' },
}
