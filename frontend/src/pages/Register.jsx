import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Leaf } from 'lucide-react'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'donor', phone: '', organization: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true)
    setError('')
    try {
      await register(form)
      toast.success('Welcome to NourishNet! 🌱')
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.brand}><Leaf size={24} color="var(--forest)" /><span style={s.brandName}>NourishNet</span></div>
        <h1 style={s.title}>Join the movement</h1>
        <p style={s.sub}>Create your account and start making an impact</p>

        {/* Role toggle */}
        <div style={s.roleToggle}>
          {['donor', 'recipient'].map(r => (
            <button key={r} type="button"
              style={{ ...s.roleBtn, ...(form.role === r ? s.roleBtnActive : {}) }}
              onClick={() => setForm({ ...form, role: r })}
            >
              {r === 'donor' ? '🤲 I want to Donate' : '🏢 I\'m a Recipient Org'}
            </button>
          ))}
        </div>

        {error && <div style={s.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.row}>
            <div style={s.field}>
              <label style={s.label}>Full Name *</label>
              <input placeholder="Your name" value={form.name} onChange={set('name')} required />
            </div>
            <div style={s.field}>
              <label style={s.label}>Phone</label>
              <input placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
            </div>
          </div>
          <div style={s.field}>
            <label style={s.label}>Email Address *</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password *</label>
            <input type="password" placeholder="Minimum 6 characters" value={form.password} onChange={set('password')} required minLength={6} />
          </div>
          {form.role === 'recipient' && (
            <div style={s.field}>
              <label style={s.label}>Organization Name *</label>
              <input placeholder="NGO or organization name" value={form.organization} onChange={set('organization')} />
            </div>
          )}
          <button type="submit" style={s.submitBtn} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={s.terms}>By signing up, you agree to our <a href="#" style={{ color: 'var(--forest)' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--forest)' }}>Privacy Policy</a>.</p>
        <p style={s.switchText}>Already have an account? <Link to="/login" style={s.switchLink}>Sign in</Link></p>
      </div>

      <div style={s.visual}>
        <div style={s.visualInner}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🌱</div>
          <h2 style={s.visualTitle}>Every Action Counts</h2>
          <div style={s.features}>
            {['List surplus food in 2 minutes', 'Connect with verified NGOs', 'Track your donation impact', 'Find nearby collection clubs', 'Support monetary causes too'].map((f, i) => (
              <div key={i} style={s.featureItem}>
                <span style={s.featureCheck}>✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { display: 'flex', minHeight: '100vh' },
  card: { flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 4rem', background: 'white' },
  brand: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' },
  brandName: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem' },
  title: { fontFamily: 'var(--font-display)', fontSize: '1.9rem', marginBottom: '0.4rem' },
  sub: { color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.95rem' },
  roleToggle: { display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' },
  roleBtn: { flex: 1, padding: '0.7rem', border: '2px solid var(--border)', borderRadius: 10, background: 'var(--cream)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, transition: 'all 0.2s' },
  roleBtnActive: { border: '2px solid var(--forest)', background: 'var(--forest-pale)', color: 'var(--forest)', fontWeight: 700 },
  errorBox: { background: '#fef0eb', border: '1px solid #f5c6a0', color: 'var(--terracotta)', padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1rem', fontSize: '0.9rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.35rem' },
  label: { fontWeight: 600, fontSize: '0.85rem' },
  submitBtn: { background: 'var(--forest)', color: 'white', padding: '0.9rem', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem' },
  terms: { textAlign: 'center', fontSize: '0.78rem', color: 'var(--muted)', marginTop: '1rem', lineHeight: 1.6 },
  switchText: { textAlign: 'center', marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--muted)' },
  switchLink: { color: 'var(--forest)', fontWeight: 600 },
  visual: { flex: 1, background: 'linear-gradient(160deg, #2d5a27 0%, #c8a96e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' },
  visualInner: { maxWidth: 340 },
  visualTitle: { fontFamily: 'var(--font-display)', fontSize: '1.9rem', color: 'white', marginBottom: '1.5rem' },
  features: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  featureItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' },
  featureCheck: { width: 24, height: 24, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, flexShrink: 0, textAlign: 'center', lineHeight: '24px' },
}
