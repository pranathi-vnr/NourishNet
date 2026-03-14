import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import FoodDonations from './pages/FoodDonations'
import DonateFoodForm from './pages/DonateFoodForm'
import DonateMoneyPage from './pages/DonateMoneyPage'
import Clubs from './pages/Clubs'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import DonationDetail from './pages/DonationDetail'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donations" element={<FoodDonations />} />
          <Route path="/donations/:id" element={<DonationDetail />} />
          <Route path="/donate-food" element={<PrivateRoute><DonateFoodForm /></PrivateRoute>} />
          <Route path="/donate-money" element={<PrivateRoute><DonateMoneyPage /></PrivateRoute>} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
