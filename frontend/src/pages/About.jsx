import { Link } from 'react-router-dom'
import { Heart, Leaf, Users, Globe, ArrowRight, Mail } from 'lucide-react'

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          <div style={s.badge}><Leaf size={14} />Our Mission</div>
          <h1 style={s.heroTitle}>Nourishing India,<br /><em style={{ color: 'var(--earth)', fontStyle: 'italic' }}>One Meal at a Time</em></h1>
          <p style={s.heroSub}>NourishNet was born from a simple belief: no food should go to waste when people are hungry. We build technology that connects surplus food with the communities who need it most.</p>
        </div>
      </section>

      {/* Story */}
      <section style={s.section}>
        <div style={s.storyGrid}>
          <div style={s.storyText}>
            <h2 style={s.sectionTitle}>Our Story</h2>
            <p style={s.para}>Every day, tons of perfectly good food is wasted by restaurants, caterers, and households — while millions of families across India go to bed hungry. NourishNet was created to bridge this gap.</p>
            <p style={s.para}>We started in Hyderabad in 2023, connecting local restaurants with nearby NGOs. Today, we've grown into a national platform serving cities across India, with hundreds of verified donors, recipients, and collection clubs.</p>
            <p style={s.para}>Our technology makes food donation as easy as listing an item on an app — and our network ensures that food reaches those who need it within hours.</p>
          </div>
          <div style={s.storyVisual}>
            <div style={s.storyCard}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🌾</div>
              <div style={s.storyCardStat}>40%</div>
              <div style={s.storyCardLabel}>of food in India is wasted before it reaches a plate</div>
            </div>
            <div style={{ ...s.storyCard, background: 'var(--terracotta-pale)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🤲</div>
              <div style={s.storyCardStat}>194M</div>
              <div style={s.storyCardLabel}>people face food insecurity in India every day</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ ...s.section, background: 'var(--warm-white)' }}>
        <div style={s.container}>
          <h2 style={{ ...s.sectionTitle, textAlign: 'center' }}>What Drives Us</h2>
          <div style={s.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} style={s.valueCard}>
                <div style={{ ...s.valueIcon, background: v.bg }}>{v.emoji}</div>
                <h3 style={s.valueTitle}>{v.title}</h3>
                <p style={s.valuePara}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={s.section}>
        <div style={s.container}>
          <h2 style={{ ...s.sectionTitle, textAlign: 'center' }}>Built By</h2>
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '2.5rem' }}>A passionate team committed to ending food waste</p>
          <div style={s.teamGrid}>
            {team.map((t, i) => (
              <div key={i} style={s.teamCard}>
                <div style={s.teamAvatar}>{t.initials}</div>
                <div style={s.teamName}>{t.name}</div>
                <div style={s.teamRole}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact numbers */}
      <section style={s.impactSection}>
        <div style={s.container}>
          <h2 style={{ ...s.sectionTitle, textAlign: 'center', color: 'white' }}>Our Impact So Far</h2>
          <div style={s.impactGrid}>
            {[
              { num: '10,000+', label: 'Meals Redistributed' },
              { num: '500+', label: 'Active Donors' },
              { num: '80+', label: 'NGO Partners' },
              { num: '6', label: 'Cities Covered' },
            ].map((item, i) => (
              <div key={i} style={s.impactItem}>
                <div style={s.impactNum}>{item.num}</div>
                <div style={s.impactLabel}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={s.section}>
        <div style={s.contactBox}>
          <Mail size={32} color="var(--forest)" />
          <h2 style={s.sectionTitle}>Get In Touch</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', maxWidth: 480, textAlign: 'center' }}>
            Whether you're an NGO wanting to partner, a restaurant looking to donate, or just curious — we'd love to hear from you.
          </p>
          <div style={s.contactLinks}>
            <a href="mailto:hello@nourishnet.in" style={s.contactBtn}>📧 hello@nourishnet.in</a>
            <a href="tel:+919876543210" style={{ ...s.contactBtn, background: 'var(--forest-pale)', color: 'var(--forest)' }}>📞 +91 98765 43210</a>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <Link to="/register" style={s.joinBtn}>Join NourishNet <ArrowRight size={18} /></Link>
            <Link to="/donations" style={s.browseBtn}>Browse Food</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const values = [
  { emoji: '🌍', title: 'Community First', desc: 'Every decision we make is guided by what\'s best for the communities we serve — not profit.', bg: 'var(--forest-pale)' },
  { emoji: '🔗', title: 'Radical Transparency', desc: 'Donors know exactly where their food and money goes. No black boxes, no hidden fees.', bg: 'var(--terracotta-pale)' },
  { emoji: '♻️', title: 'Zero Waste', desc: 'We believe food is too valuable to waste. Every surplus meal is an opportunity to nourish someone.', bg: '#fef9e7' },
  { emoji: '🤝', title: 'Inclusive Access', desc: 'Our platform is free for donors and recipients. Good intentions shouldn\'t come with a price tag.', bg: '#e8f4fd' },
]

const team = [
  { initials: 'P', name: 'Pranathi', role: 'Founder & Developer' },
  { initials: 'S', name: 'Sruthi', role: 'Community Lead' },
  { initials: 'S', name: 'Saranya', role: 'Partnerships' },
  { initials: 'I', name: 'Indu', role: 'Operations' },
]

const s = {
  hero: { background: 'linear-gradient(160deg, #1a2e1a 0%, #2d5a27 60%, #c8a96e 100%)', padding: '5rem 1.5rem', textAlign: 'center' },
  heroInner: { maxWidth: 700, margin: '0 auto' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(200,169,110,0.2)', border: '1px solid rgba(200,169,110,0.4)', color: 'var(--earth)', padding: '0.35rem 0.9rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.5rem' },
  heroTitle: { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'white', lineHeight: 1.2, marginBottom: '1.25rem' },
  heroSub: { color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', lineHeight: 1.75 },
  section: { padding: '5rem 1.5rem' },
  container: { maxWidth: 1100, margin: '0 auto' },
  storyGrid: { maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '4rem', alignItems: 'center' },
  storyText: {},
  sectionTitle: { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginBottom: '1rem' },
  para: { color: 'var(--slate)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.97rem' },
  storyVisual: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  storyCard: { background: 'var(--forest-pale)', padding: '1.75rem', borderRadius: 20, textAlign: 'center' },
  storyCardStat: { fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--forest)', marginBottom: '0.4rem' },
  storyCardLabel: { color: 'var(--slate)', fontSize: '0.9rem', lineHeight: 1.5 },
  valuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.5rem', marginTop: '2.5rem' },
  valueCard: { background: 'white', padding: '1.75rem', borderRadius: 20, border: '1px solid var(--border)' },
  valueIcon: { width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: '1rem' },
  valueTitle: { fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.5rem' },
  valuePara: { color: 'var(--slate)', fontSize: '0.88rem', lineHeight: 1.7 },
  teamGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: '1.25rem' },
  teamCard: { background: 'white', borderRadius: 16, padding: '2rem 1rem', textAlign: 'center', border: '1px solid var(--border)' },
  teamAvatar: { width: 64, height: 64, background: 'linear-gradient(135deg,var(--forest),var(--earth))', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 700, margin: '0 auto 1rem' },
  teamName: { fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.25rem' },
  teamRole: { fontSize: '0.82rem', color: 'var(--muted)' },
  impactSection: { background: 'linear-gradient(135deg,var(--forest) 0%,#1a4a15 100%)', padding: '4rem 1.5rem' },
  impactGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '2rem', marginTop: '2.5rem', maxWidth: 900, margin: '2.5rem auto 0' },
  impactItem: { textAlign: 'center' },
  impactNum: { fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--earth)', marginBottom: '0.4rem' },
  impactLabel: { color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
  contactBox: { maxWidth: 600, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  contactLinks: { display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' },
  contactBtn: { display: 'inline-block', background: 'var(--cream)', border: '1.5px solid var(--border)', padding: '0.7rem 1.25rem', borderRadius: 10, fontWeight: 600, textDecoration: 'none', color: 'var(--charcoal)', fontSize: '0.9rem' },
  joinBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--forest)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' },
  browseBtn: { display: 'inline-flex', alignItems: 'center', background: 'white', color: 'var(--charcoal)', padding: '0.8rem 1.5rem', borderRadius: 10, fontWeight: 600, textDecoration: 'none', border: '1.5px solid var(--border)', fontSize: '0.95rem' },
}
