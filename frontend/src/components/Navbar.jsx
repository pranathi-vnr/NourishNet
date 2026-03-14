import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, X, Leaf, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/')
    setDropdownOpen(false)
  }

  const navLinks = [
    { to: '/donations', label: 'Browse Food' },
    { to: '/donate-food', label: 'Donate Food' },
    { to: '/donate-money', label: 'Donate Money' },
    { to: '/clubs', label: 'Find Clubs' },
    { to: '/about', label: 'About' },
  ]

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <Leaf size={22} color="var(--forest)" />
          <span style={styles.logoText}>NourishNet</span>
        </Link>

        {/* Desktop links */}
        <div style={styles.links}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} style={{ ...styles.link, ...(isActive(l.to) ? styles.linkActive : {}) }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Auth area */}
        <div style={styles.authArea}>
          {user ? (
            <div style={{ position: 'relative' }}>
              <button style={styles.userBtn} onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div style={styles.avatar}>{user.name?.[0]?.toUpperCase()}</div>
                <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{user.name.split(' ')[0]}</span>
                <ChevronDown size={16} />
              </button>
              {dropdownOpen && (
                <div style={styles.dropdown}>
                  <div style={styles.dropdownHeader}>
                    <div style={{ fontWeight: 600 }}>{user.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{user.email}</div>
                    <div style={styles.roleBadge}>{user.role}</div>
                  </div>
                  <Link to="/dashboard" style={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <button style={{ ...styles.dropdownItem, border: 'none', background: 'none', width: '100%', textAlign: 'left', color: 'var(--terracotta)' }} onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link to="/login" style={styles.btnOutline}>Log in</Link>
              <Link to="/register" style={styles.btnFilled}>Sign up</Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button style={styles.hamburger} onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={styles.mobileMenu}>
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} style={styles.mobileLink} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" style={styles.mobileLink} onClick={() => setOpen(false)}>Dashboard</Link>
              <button style={{ ...styles.mobileLink, border: 'none', background: 'none', textAlign: 'left', color: 'var(--terracotta)', cursor: 'pointer' }} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.mobileLink} onClick={() => setOpen(false)}>Log in</Link>
              <Link to="/register" style={{ ...styles.mobileLink, color: 'var(--forest)', fontWeight: 600 }} onClick={() => setOpen(false)}>Sign up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

const styles = {
  nav: { background: 'rgba(250,247,242,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100 },
  inner: { maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', height: 64 },
  logo: { display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', flexShrink: 0 },
  logoText: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--charcoal)' },
  links: { display: 'flex', gap: '0.25rem', flex: 1, '@media(max-width:768px)': { display: 'none' } },
  link: { padding: '0.4rem 0.8rem', borderRadius: 8, fontSize: '0.9rem', color: 'var(--slate)', transition: 'all 0.2s', textDecoration: 'none', whiteSpace: 'nowrap' },
  linkActive: { background: 'var(--forest-pale)', color: 'var(--forest)', fontWeight: 600 },
  authArea: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto', flexShrink: 0 },
  btnOutline: { padding: '0.45rem 1rem', border: '1.5px solid var(--border)', borderRadius: 8, fontSize: '0.88rem', fontWeight: 500, textDecoration: 'none', color: 'var(--charcoal)', transition: 'all 0.2s' },
  btnFilled: { padding: '0.45rem 1rem', background: 'var(--forest)', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' },
  userBtn: { display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1.5px solid var(--border)', padding: '0.35rem 0.75rem', borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s' },
  avatar: { width: 28, height: 28, background: 'var(--forest)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 },
  dropdown: { position: 'absolute', right: 0, top: '110%', background: 'white', border: '1px solid var(--border)', borderRadius: 12, minWidth: 200, boxShadow: 'var(--shadow-lg)', overflow: 'hidden', zIndex: 200 },
  dropdownHeader: { padding: '1rem', borderBottom: '1px solid var(--border)', background: 'var(--cream)' },
  dropdownItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', fontSize: '0.9rem', textDecoration: 'none', color: 'var(--charcoal)', transition: 'background 0.15s' },
  roleBadge: { display: 'inline-block', marginTop: '0.25rem', padding: '0.1rem 0.5rem', background: 'var(--forest-pale)', color: 'var(--forest)', borderRadius: 4, fontSize: '0.7rem', fontWeight: 600, textTransform: 'capitalize' },
  hamburger: { display: 'none', background: 'none', border: 'none', padding: '0.25rem', marginLeft: 'auto', '@media(max-width:768px)': { display: 'flex' } },
  mobileMenu: { display: 'flex', flexDirection: 'column', padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', background: 'white', gap: '0.25rem' },
  mobileLink: { padding: '0.75rem 0.5rem', fontSize: '1rem', color: 'var(--charcoal)', textDecoration: 'none', borderBottom: '1px solid var(--border)' },
}
