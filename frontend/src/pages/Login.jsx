import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Leaf, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.brand}>
          <Leaf size={28} color="var(--forest)" />
          <span style={s.brandName}>NourishNet</span>
        </div>
        <h1 style={s.title}>Welcome back</h1>
        <p style={s.sub}>Sign in to your account to continue</p>

        {error && <div style={s.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                style={{ paddingRight: '3rem' }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={s.eyeBtn}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" style={s.submitBtn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={s.divider}><span>or try with demo account</span></div>
        <button
          style={s.demoBtn}
          onClick={() => setForm({ email: 'demo@nourishnet.in', password: 'demo1234' })}
        >
          Fill Demo Credentials
        </button>

        <p style={s.switchText}>
          Don't have an account? <Link to="/register" style={s.switchLink}>Sign up free</Link>
        </p>
      </div>

      <div style={s.visual}>
        <div style={s.visualContent}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌾</div>
          <h2 style={s.visualTitle}>Fighting food waste, one meal at a time</h2>
          <p style={s.visualSub}>Join thousands of donors and recipients making a real difference in their communities.</p>
          <div style={s.visualStats}>
            <div style={s.vStat}><div style={s.vStatNum}>10K+</div><div style={s.vStatLabel}>Meals Served</div></div>
            <div style={s.vStat}><div style={s.vStatNum}>500+</div><div style={s.vStatLabel}>Active Donors</div></div>
            <div style={s.vStat}><div style={s.vStatNum}>50+</div><div style={s.vStatLabel}>NGO Partners</div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { display: 'flex', minHeight: '100vh' },
  card: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 4rem', maxWidth: 480, background: 'white' },
  brand: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' },
  brandName: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem' },
  title: { fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.5rem' },
  sub: { color: 'var(--muted)', marginBottom: '2rem' },
  errorBox: { background: '#fef0eb', border: '1px solid #f5c6a0', color: 'var(--terracotta)', padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1rem', fontSize: '0.9rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontWeight: 600, fontSize: '0.88rem', color: 'var(--charcoal)' },
  eyeBtn: { position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '0.25rem' },
  submitBtn: { background: 'var(--forest)', color: 'white', padding: '0.9rem', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', marginTop: '0.5rem' },
  divider: { textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem', margin: '1.5rem 0 0.75rem', position: 'relative' },
  demoBtn: { background: 'var(--cream)', border: '1.5px dashed var(--border)', padding: '0.7rem', borderRadius: 8, width: '100%', cursor: 'pointer', fontSize: '0.88rem', color: 'var(--slate)', transition: 'all 0.2s' },
  switchText: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--muted)' },
  switchLink: { color: 'var(--forest)', fontWeight: 600 },
  visual: { flex: 1, background: 'linear-gradient(135deg, var(--forest) 0%, #1a4a15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' },
  visualContent: { textAlign: 'center', maxWidth: 400 },
  visualTitle: { fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'white', marginBottom: '1rem' },
  visualSub: { color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2.5rem' },
  visualStats: { display: 'flex', gap: '2rem', justifyContent: 'center' },
  vStat: { textAlign: 'center' },
  vStatNum: { fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--earth)', fontWeight: 700 },
  vStatLabel: { fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' },
}
