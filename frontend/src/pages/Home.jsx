import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf, Heart, MapPin, Users, Package, TrendingUp, Star } from 'lucide-react'
import api from '../utils/api'

export default function Home() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/stats').then(r => setStats(r.data.data)).catch(() => {})
  }, [])

  return (
    <div>
      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroNoise} />
        <div style={s.heroContent}>
          <div style={s.heroBadge}><Leaf size={14} />Zero Hunger Initiative</div>
          <h1 style={s.heroH1}>
            Nourish Communities,<br />
            <em style={{ color: 'var(--earth)', fontStyle: 'italic' }}>Reduce Waste</em>
          </h1>
          <p style={s.heroSub}>
            NourishNet connects food donors with NGOs and communities in need — making it simple to share surplus food and fight hunger across India.
          </p>
          <div style={s.heroCta}>
            <Link to="/donate-food" style={s.btnPrimary}>
              Donate Food <ArrowRight size={18} />
            </Link>
            <Link to="/donations" style={s.btnSecondary}>
              Browse Available Food
            </Link>
          </div>
        </div>
        <div style={s.heroVisual}>
          <LiveStatsPanel />
        </div>
      </section>

      {/* Stats bar */}
      <section style={s.statsBar}>
        <div style={s.statsInner}>
          {[
            { label: 'Food Donations', value: stats ? stats.totalFoodDonations : '...', icon: Package },
            { label: 'Meals Served', value: stats ? stats.mealsServed?.toLocaleString() : '...', icon: Heart },
            { label: 'Registered Users', value: stats ? stats.totalUsers : '...', icon: Users },
            { label: 'Collection Clubs', value: stats ? stats.totalClubs : '...', icon: MapPin },
            { label: 'Funds Raised (₹)', value: stats ? `₹${(stats.totalMonetaryAmount || 0).toLocaleString()}` : '...', icon: TrendingUp },
          ].map((stat, i) => (
            <div key={i} style={s.statItem}>
              <stat.icon size={20} color="var(--earth)" />
              <div style={s.statValue}>{stat.value}</div>
              <div style={s.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={s.section}>
        <div className="container">
          <div style={s.sectionHead}>
            <h2 style={s.sectionTitle}>How NourishNet Works</h2>
            <p style={s.sectionSub}>Three simple steps to make a difference</p>
          </div>
          <div style={s.stepsGrid}>
            {[
              { num: '01', title: 'Register & List', desc: 'Create an account and list your surplus food with pickup details, quantity, and expiry info.', emoji: '📋' },
              { num: '02', title: 'NGOs Claim', desc: 'Verified recipient organizations browse available donations and claim what they need.', emoji: '🤝' },
              { num: '03', title: 'Food Reaches People', desc: 'Food is collected and distributed to families and communities in need. Zero waste!', emoji: '🌍' },
            ].map((step, i) => (
              <div key={i} style={s.stepCard}>
                <div style={s.stepNum}>{step.num}</div>
                <div style={{ fontSize: '2.5rem', margin: '1rem 0' }}>{step.emoji}</div>
                <h3 style={s.stepTitle}>{step.title}</h3>
                <p style={s.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ ...s.section, background: 'var(--warm-white)' }}>
        <div className="container">
          <div style={s.sectionHead}>
            <h2 style={s.sectionTitle}>Everything You Need</h2>
            <p style={s.sectionSub}>A complete platform for food redistribution</p>
          </div>
          <div style={s.featGrid}>
            {features.map((f, i) => (
              <div key={i} style={s.featCard}>
                <div style={{ ...s.featIcon, background: f.bg }}>{f.icon}</div>
                <h3 style={s.featTitle}>{f.title}</h3>
                <p style={s.featDesc}>{f.desc}</p>
                <Link to={f.link} style={s.featLink}>Learn more <ArrowRight size={14} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section style={s.ctaBanner}>
        <div style={s.ctaContent}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: 'white', marginBottom: '1rem' }}>
            Ready to Make a Difference?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Join thousands of donors and recipients fighting food waste and hunger together.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{ ...s.btnPrimary, background: 'white', color: 'var(--forest)' }}>
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link to="/clubs" style={{ ...s.btnSecondary, borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
              Find a Club Near You
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  { icon: '🥗', title: 'Food Donations', desc: 'List surplus food for pickup — cooked meals, raw ingredients, packaged food, and more.', link: '/donate-food', bg: 'var(--forest-pale)' },
  { icon: '💳', title: 'Monetary Donations', desc: 'Support food logistics and infrastructure with direct monetary contributions.', link: '/donate-money', bg: 'var(--terracotta-pale)' },
  { icon: '📍', title: 'Club Locator', desc: 'Find your nearest NourishNet collection club to drop off or receive food.', link: '/clubs', bg: '#fef9e7' },
  { icon: '📊', title: 'Donor Dashboard', desc: 'Track your impact, manage your listings, and see who benefited from your donations.', link: '/dashboard', bg: '#e8f4fd' },
]

const s = {
  hero: { background: 'linear-gradient(135deg, #1a2e1a 0%, #2d5a27 50%, #3d7a35 100%)', minHeight: '88vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '4rem 1.5rem' },
  heroNoise: { position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")', opacity: 0.4 },
  heroContent: { flex: 1, maxWidth: 560, position: 'relative', zIndex: 1 },
  heroBadge: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(200,169,110,0.2)', border: '1px solid rgba(200,169,110,0.4)', color: 'var(--earth)', padding: '0.35rem 0.9rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
  heroH1: { fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', color: 'white', lineHeight: 1.15, marginBottom: '1.25rem' },
  heroSub: { color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: 460 },
  heroCta: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  btnPrimary: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--earth)', color: 'white', padding: '0.85rem 1.75rem', borderRadius: 12, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(200,169,110,0.3)' },
  btnSecondary: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'white', padding: '0.85rem 1.75rem', borderRadius: 12, fontWeight: 600, fontSize: '1rem', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.3)', transition: 'all 0.2s' },
  heroVisual: { flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end', position: 'relative', zIndex: 1, paddingLeft: '2rem' },
  heroCard: { background: 'white', padding: '1.5rem', borderRadius: 20, width: 220, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', animation: 'fadeUp 0.6s ease' },
  heroCardRight: { marginRight: '-1rem', marginTop: '-0.5rem' },
  heroCardBadge: { marginTop: '0.75rem', display: 'inline-block', padding: '0.25rem 0.75rem', background: 'var(--forest-pale)', color: 'var(--forest)', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600 },
  statsBar: { background: 'var(--charcoal)', padding: '1.75rem 1.5rem' },
  statsInner: { maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-around', gap: '1rem', flexWrap: 'wrap' },
  statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 1rem' },
  statValue: { fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'white' },
  statLabel: { fontSize: '0.78rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' },
  section: { padding: '5rem 1.5rem' },
  sectionHead: { textAlign: 'center', marginBottom: '3rem' },
  sectionTitle: { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', marginBottom: '0.5rem' },
  sectionSub: { color: 'var(--muted)', fontSize: '1.05rem' },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' },
  stepCard: { background: 'white', padding: '2rem', borderRadius: 20, border: '1px solid var(--border)', textAlign: 'center', transition: 'transform 0.2s,box-shadow 0.2s' },
  stepNum: { fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, color: 'var(--border)', lineHeight: 1 },
  stepTitle: { fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '0.75rem' },
  stepDesc: { color: 'var(--slate)', lineHeight: 1.7, fontSize: '0.95rem' },
  featGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.5rem' },
  featCard: { background: 'white', padding: '2rem', borderRadius: 20, border: '1px solid var(--border)', transition: 'transform 0.2s,box-shadow 0.2s' },
  featIcon: { width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', marginBottom: '1rem' },
  featTitle: { fontFamily: 'var(--font-display)', fontSize: '1.15rem', marginBottom: '0.5rem' },
  featDesc: { color: 'var(--slate)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' },
  featLink: { display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--forest)', fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none' },
  ctaBanner: { background: 'linear-gradient(135deg, var(--forest) 0%, #1a4a15 100%)', padding: '5rem 1.5rem', textAlign: 'center' },
  ctaContent: { maxWidth: 640, margin: '0 auto' },
}

function LiveStatsPanel() {
  const [stats, setStats] = useState(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    api.get('/stats').then(r => setStats(r.data.data)).catch(() => {})
    const interval = setInterval(() => setTick(t => t + 1), 3000)
    return () => clearInterval(interval)
  }, [])

  const items = [
    { label: 'Active Listings', value: stats?.activeDonations ?? '...', emoji: '🌾', color: '#e8f5e4' },
    { label: 'Meals Served', value: stats?.mealsServed?.toLocaleString() ?? '...', emoji: '🍱', color: '#fdf0eb' },
    { label: 'Donors Joined', value: stats?.totalUsers ?? '...', emoji: '🤝', color: '#fef9e7' },
    { label: 'Clubs Active', value: stats?.totalClubs ?? '...', emoji: '📍', color: '#e8f4fd' },
  ]

  return (
    <div style={lp.panel}>
      <div style={lp.panelHeader}>
        <span style={lp.dot} />
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Live Platform Stats
        </span>
      </div>

      <div style={lp.grid}>
        {items.map((item, i) => (
          <div key={i} style={{ ...lp.card, background: item.color }}>
            <div style={{ fontSize: '1.4rem' }}>{item.emoji}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: '#1a1a1a', lineHeight: 1 }}>
              {item.value}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div style={lp.recentBox}>
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase' }}>
          Recent Activity
        </div>
        {recentActivity.map((a, i) => (
          <div key={i} style={{ ...lp.actRow, opacity: tick % recentActivity.length === i ? 1 : 0.55, transition: 'opacity 0.6s ease' }}>
            <span style={{ fontSize: '1rem' }}>{a.emoji}</span>
            <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)' }}>{a.text}</span>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginLeft: 'auto' }}>{a.time}</span>
          </div>
        ))}
      </div>

      <div style={lp.fundBar}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>Monthly Goal</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--earth)', fontWeight: 700 }}>
            ₹{stats ? (stats.totalMonetaryAmount || 0).toLocaleString() : '...'} raised
          </span>
        </div>
        <div style={lp.barTrack}>
          <div style={{ ...lp.barFill, width: stats ? `${Math.min((stats.totalMonetaryAmount / 50000) * 100, 100)}%` : '0%' }} />
        </div>
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.3rem' }}>Goal: ₹50,000</div>
      </div>
    </div>
  )
}

const recentActivity = [
  { emoji: '🌾', text: 'Vegetables donated in Hyderabad', time: '2m ago' },
  { emoji: '🤝', text: 'NGO claimed 30 meal servings', time: '8m ago' },
  { emoji: '💚', text: 'Anonymous donated ₹500', time: '15m ago' },
  { emoji: '🍱', text: 'Cooked food listed in Bangalore', time: '22m ago' },
  { emoji: '📍', text: 'New club opened in Chennai', time: '1h ago' },
]

const lp = {
  panel: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 20,
    padding: '1.25rem',
    width: 300,
    backdropFilter: 'blur(12px)',
  },
  panelHeader: {
    display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem',
  },
  dot: {
    width: 8, height: 8, borderRadius: '50%',
    background: '#4ade80',
    boxShadow: '0 0 6px #4ade80',
    animation: 'pulse-ring 1.5s ease infinite',
    display: 'inline-block',
  },
  grid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem',
  },
  card: {
    borderRadius: 12, padding: '0.75rem',
    display: 'flex', flexDirection: 'column', gap: '0.25rem',
  },
  recentBox: {
    background: 'rgba(0,0,0,0.2)', borderRadius: 12,
    padding: '0.75rem', marginBottom: '1rem',
  },
  actRow: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.3rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  fundBar: { marginTop: '0.25rem' },
  barTrack: {
    height: 6, background: 'rgba(255,255,255,0.1)',
    borderRadius: 3, overflow: 'hidden',
  },
  barFill: {
    height: '100%', background: 'var(--earth)',
    borderRadius: 3, transition: 'width 1s ease',
  },
}