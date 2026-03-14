import { Link } from 'react-router-dom'
import { Leaf, Heart, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <div style={s.brand}>
          <div style={s.logo}><Leaf size={20} color="var(--earth)" /><span style={s.logoText}>NourishNet</span></div>
          <p style={s.tagline}>Bridging the gap between surplus food and communities in need. Together, we can end food waste and hunger.</p>
          <div style={s.madeWith}><Heart size={14} color="var(--terracotta)" fill="var(--terracotta)" /> Made with love for a hunger-free world</div>
        </div>

        <div style={s.col}>
          <div style={s.colTitle}>Platform</div>
          <Link to="/donations" style={s.link}>Browse Donations</Link>
          <Link to="/donate-food" style={s.link}>Donate Food</Link>
          <Link to="/donate-money" style={s.link}>Donate Money</Link>
          <Link to="/clubs" style={s.link}>Find Clubs</Link>
        </div>

        <div style={s.col}>
          <div style={s.colTitle}>Company</div>
          <Link to="/about" style={s.link}>About Us</Link>
          <Link to="/register" style={s.link}>Join as Donor</Link>
          <Link to="/register" style={s.link}>Join as Recipient</Link>
        </div>

        <div style={s.col}>
          <div style={s.colTitle}>Contact</div>
          <div style={s.contactItem}><Mail size={14} />hello@nourishnet.in</div>
          <div style={s.contactItem}><Phone size={14} />+91 98765 43210</div>
          <div style={s.contactItem}><MapPin size={14} />Hyderabad, India</div>
        </div>
      </div>
      <div style={s.bottom}>
        <span>© 2025 NourishNet. All rights reserved.</span>
        <span style={{ color: 'var(--muted)' }}>|</span>
        <span>Privacy Policy</span>
        <span style={{ color: 'var(--muted)' }}>|</span>
        <span>Terms of Service</span>
      </div>
    </footer>
  )
}

const s = {
  footer: { background: '#1a1a1a', color: '#ccc', marginTop: 'auto' },
  inner: { maxWidth: 1200, margin: '0 auto', padding: '3rem 1.5rem 2rem', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', gap: '2rem', '@media(max-width:768px)': { gridTemplateColumns: '1fr' } },
  brand: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  logo: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  logoText: { fontFamily: 'var(--font-display)', color: 'white', fontSize: '1.25rem', fontWeight: 700 },
  tagline: { fontSize: '0.9rem', lineHeight: 1.7, color: '#888', maxWidth: 280 },
  madeWith: { display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#888' },
  col: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  colTitle: { color: 'white', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
  link: { color: '#888', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s', lineHeight: 2 },
  contactItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#888' },
  bottom: { borderTop: '1px solid #2a2a2a', padding: '1.25rem 1.5rem', maxWidth: 1200, margin: '0 auto', display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#666', flexWrap: 'wrap' },
}
