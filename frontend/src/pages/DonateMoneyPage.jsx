import { useState, useEffect } from 'react'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { Heart, TrendingUp, Shield } from 'lucide-react'

const AMOUNTS = [100, 250, 500, 1000, 2500, 5000]
const PURPOSES = [
  { value: 'general', label: 'General Fund', emoji: '🌾', desc: 'Where it\'s needed most' },
  { value: 'food_distribution', label: 'Food Distribution', emoji: '🚐', desc: 'Logistics & transport' },
  { value: 'logistics', label: 'Logistics', emoji: '📦', desc: 'Packaging & storage' },
  { value: 'infrastructure', label: 'Infrastructure', emoji: '🏗️', desc: 'Build collection hubs' },
]

export default function DonateMoneyPage() {
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [purpose, setPurpose] = useState('general')
  const [message, setMessage] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [recentDonors, setRecentDonors] = useState([])
  const [totalRaised, setTotalRaised] = useState(0)

  useEffect(() => {
    api.get('/monetary-donations').then(r => {
      setRecentDonors(r.data.data)
      setTotalRaised(r.data.stats?.total || 0)
    }).catch(() => {})
  }, [])

  const finalAmount = customAmount || amount

  const handleDonate = async () => {
    if (!finalAmount || finalAmount < 1) return toast.error('Please enter a valid amount.')
    setLoading(true)
    try {
      const { data } = await api.post('/monetary-donations', {
        amount: Number(finalAmount), purpose, message, paymentMethod, isAnonymous
      })
      setSuccess(data)
      toast.success(`🎉 Thank you! ₹${finalAmount} donated successfully.`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Donation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={s.successPage}>
        <div style={s.successCard}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Thank You!</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Your donation of <strong>₹{finalAmount}</strong> has been received.</p>
          <div style={s.receiptBox}>
            <div style={s.receiptRow}><span>Transaction ID</span><strong>{success.transactionId}</strong></div>
            <div style={s.receiptRow}><span>Amount</span><strong>₹{finalAmount}</strong></div>
            <div style={s.receiptRow}><span>Purpose</span><strong>{purpose}</strong></div>
            <div style={s.receiptRow}><span>Status</span><span style={{ color: 'var(--forest)', fontWeight: 700 }}>✓ Completed</span></div>
          </div>
          <button style={s.resetBtn} onClick={() => { setSuccess(null); setAmount(''); setCustomAmount('') }}>
            Donate Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <div style={s.heroInner}>
          <h1 style={s.title}>Support With a Donation</h1>
          <p style={s.sub}>Your contribution helps us distribute food to thousands of families across India.</p>
          <div style={s.statRow}>
            <div style={s.stat}><div style={s.statNum}>₹{totalRaised.toLocaleString()}</div><div style={s.statLabel}>Total Raised</div></div>
            <div style={s.stat}><div style={s.statNum}>{recentDonors.length}+</div><div style={s.statLabel}>Donors</div></div>
            <div style={s.stat}><div style={s.statNum}>10K+</div><div style={s.statLabel}>Meals Funded</div></div>
          </div>
        </div>
      </div>

      <div style={s.body}>
        <div style={s.mainCol}>
          <div style={s.card}>
            {/* Amount selection */}
            <div style={s.section}>
              <h3 style={s.sectionTitle}>Choose Amount</h3>
              <div style={s.amountGrid}>
                {AMOUNTS.map(a => (
                  <button key={a} style={{ ...s.amountBtn, ...(amount === a && !customAmount ? s.amountBtnActive : {}) }}
                    onClick={() => { setAmount(a); setCustomAmount('') }}>
                    ₹{a.toLocaleString()}
                  </button>
                ))}
              </div>
              <div style={s.customRow}>
                <span style={s.rupeeSign}>₹</span>
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={e => { setCustomAmount(e.target.value); setAmount('') }}
                  style={{ paddingLeft: '2rem' }}
                  min={1}
                />
              </div>
            </div>

            {/* Purpose */}
            <div style={s.section}>
              <h3 style={s.sectionTitle}>Donate Towards</h3>
              <div style={s.purposeGrid}>
                {PURPOSES.map(p => (
                  <button key={p.value} style={{ ...s.purposeBtn, ...(purpose === p.value ? s.purposeBtnActive : {}) }}
                    onClick={() => setPurpose(p.value)}>
                    <span style={{ fontSize: '1.5rem' }}>{p.emoji}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{p.label}</span>
                    <span style={{ fontSize: '0.75rem', color: purpose === p.value ? 'rgba(255,255,255,0.7)' : 'var(--muted)' }}>{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment method */}
            <div style={s.section}>
              <h3 style={s.sectionTitle}>Payment Method</h3>
              <div style={s.payRow}>
                {['upi', 'card', 'netbanking', 'wallet'].map(m => (
                  <button key={m} style={{ ...s.payBtn, ...(paymentMethod === m ? s.payBtnActive : {}) }}
                    onClick={() => setPaymentMethod(m)}>
                    {m === 'upi' ? '📱 UPI' : m === 'card' ? '💳 Card' : m === 'netbanking' ? '🏦 Net Banking' : '👜 Wallet'}
                  </button>
                ))}
              </div>
              <div style={s.mockPayBox}>
                {paymentMethod === 'upi' && <input placeholder="yourname@upi" style={{ marginTop: '0.75rem' }} />}
                {paymentMethod === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
                    <input placeholder="Card number" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <input placeholder="MM/YY" />
                      <input placeholder="CVV" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div style={s.section}>
              <h3 style={s.sectionTitle}>Message (Optional)</h3>
              <textarea rows={3} placeholder="Leave a message of support..." value={message} onChange={e => setMessage(e.target.value)} style={{ resize: 'vertical' }} />
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                <input type="checkbox" checked={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)} style={{ width: 'auto' }} />
                Donate anonymously
              </label>
            </div>

            <button style={s.donateBtn} onClick={handleDonate} disabled={loading || !finalAmount}>
              <Heart size={20} fill="white" />
              {loading ? 'Processing...' : `Donate ₹${finalAmount || '...'}`}
            </button>
            <p style={s.secureNote}><Shield size={14} /> 100% secure. Powered by NourishNet Trust.</p>
          </div>
        </div>

        {/* Sidebar */}
        <div style={s.sidebar}>
          <div style={s.trustCard}>
            <h3 style={s.sectionTitle}>Why Donate?</h3>
            {[
              ['🍱', '₹100 feeds a family for a day'],
              ['🚐', '₹500 covers food transport costs'],
              ['🏠', '₹1000 stocks a shelter for a week'],
              ['🌍', '₹5000 supports a community kitchen'],
            ].map(([emoji, text]) => (
              <div key={text} style={s.impactItem}>
                <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
                <span style={{ fontSize: '0.88rem' }}>{text}</span>
              </div>
            ))}
          </div>

          {recentDonors.length > 0 && (
            <div style={s.recentCard}>
              <h3 style={s.sectionTitle}>Recent Donors</h3>
              {recentDonors.slice(0, 5).map((d, i) => (
                <div key={i} style={s.donorRow}>
                  <div style={s.dAvatar}>{d.isAnonymous ? '?' : d.donor?.name?.[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{d.isAnonymous ? 'Anonymous' : d.donor?.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>donated ₹{d.amount.toLocaleString()}</div>
                  </div>
                  {d.message && <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginLeft: 'auto', maxWidth: 80, textAlign: 'right', fontStyle: 'italic' }}>{d.message.slice(0, 30)}...</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { background: 'var(--cream)', minHeight: '100vh' },
  hero: { background: 'linear-gradient(135deg, #c0522a 0%, #8b3220 100%)', padding: '3rem 1.5rem' },
  heroInner: { maxWidth: 700, margin: '0 auto', textAlign: 'center', color: 'white' },
  title: { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.5rem)', marginBottom: '0.75rem' },
  sub: { color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1.05rem' },
  statRow: { display: 'flex', gap: '3rem', justifyContent: 'center' },
  stat: { textAlign: 'center' },
  statNum: { fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'white' },
  statLabel: { fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' },
  body: { maxWidth: 1100, margin: '2rem auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' },
  mainCol: {},
  card: { background: 'white', borderRadius: 20, padding: '2rem', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0' },
  section: { borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' },
  sectionTitle: { fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '1rem' },
  amountGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginBottom: '0.75rem' },
  amountBtn: { padding: '0.75rem', border: '2px solid var(--border)', borderRadius: 10, background: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s' },
  amountBtnActive: { background: 'var(--terracotta)', borderColor: 'var(--terracotta)', color: 'white' },
  customRow: { position: 'relative' },
  rupeeSign: { position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--muted)', zIndex: 1 },
  purposeGrid: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.75rem' },
  purposeBtn: { display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '1rem', border: '2px solid var(--border)', borderRadius: 12, background: 'white', cursor: 'pointer', textAlign: 'center', alignItems: 'center', transition: 'all 0.2s' },
  purposeBtnActive: { background: 'var(--terracotta)', borderColor: 'var(--terracotta)', color: 'white' },
  payRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem' },
  payBtn: { padding: '0.6rem 0.4rem', border: '1.5px solid var(--border)', borderRadius: 8, background: 'white', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, transition: 'all 0.2s' },
  payBtnActive: { background: 'var(--forest-pale)', borderColor: 'var(--forest)', color: 'var(--forest)' },
  mockPayBox: {},
  donateBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--terracotta)', color: 'white', border: 'none', padding: '1rem', borderRadius: 12, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.2s', marginTop: '1rem' },
  secureNote: { display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center', fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.75rem' },
  sidebar: { display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: 80 },
  trustCard: { background: 'white', borderRadius: 16, padding: '1.5rem', border: '1px solid var(--border)' },
  impactItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' },
  recentCard: { background: 'white', borderRadius: 16, padding: '1.5rem', border: '1px solid var(--border)' },
  donorRow: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid var(--border)' },
  dAvatar: { width: 32, height: 32, background: 'var(--terracotta)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 },
  successPage: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '2rem' },
  successCard: { background: 'white', borderRadius: 24, padding: '3rem', textAlign: 'center', maxWidth: 480, boxShadow: 'var(--shadow-lg)', width: '100%' },
  receiptBox: { background: 'var(--cream)', borderRadius: 12, padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem' },
  receiptRow: { display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' },
  resetBtn: { background: 'var(--forest)', color: 'white', border: 'none', padding: '0.85rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: '1rem' },
}
