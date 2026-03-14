import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { Package, MapPin, Clock, Info } from 'lucide-react'

const FOOD_TYPES = ['cooked', 'raw', 'packaged', 'bakery', 'fruits_vegetables', 'dairy', 'beverages', 'other']
const UNITS = ['kg', 'litres', 'servings', 'packets', 'pieces']

export default function DonateFoodForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', description: '', foodType: 'cooked',
    quantity: { amount: '', unit: 'kg' },
    expiryDate: '', isVegetarian: true, allergensInfo: '',
    pickupAddress: { street: '', city: '', state: '', pincode: '' },
    pickupTimeSlot: { from: '', to: '' },
  })

  const set = (path, val) => {
    const keys = path.split('.')
    setForm(prev => {
      const next = { ...prev }
      if (keys.length === 1) next[keys[0]] = val
      else if (keys.length === 2) next[keys[0]] = { ...next[keys[0]], [keys[1]]: val }
      return next
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const { data } = await api.post('/food-donations', form)
      toast.success('🎉 Food donation listed successfully!')
      navigate(`/donations/${data.data._id}`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to list donation.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.inner}>
        <h1 style={s.pageTitle}>List a Food Donation</h1>
        <p style={s.pageSub}>Share surplus food with communities in need</p>

        {/* Step indicator */}
        <div style={s.steps}>
          {['Food Details', 'Quantity & Expiry', 'Pickup Info'].map((label, i) => (
            <div key={i} style={s.stepWrap}>
              <div style={{ ...s.stepDot, ...(step >= i + 1 ? s.stepDotActive : {}) }}>{step > i + 1 ? '✓' : i + 1}</div>
              <span style={{ ...s.stepLabel, ...(step === i + 1 ? { color: 'var(--forest)', fontWeight: 600 } : {}) }}>{label}</span>
              {i < 2 && <div style={{ ...s.stepLine, ...(step > i + 1 ? { background: 'var(--forest)' } : {}) }} />}
            </div>
          ))}
        </div>

        <div style={s.card}>
          {step === 1 && (
            <div style={s.section}>
              <SectionHeader icon={Info} title="Food Details" />
              <div style={s.field}>
                <label style={s.label}>Title *</label>
                <input placeholder="e.g. Fresh Vegetables from Restaurant" value={form.title} onChange={e => set('title', e.target.value)} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Description *</label>
                <textarea rows={4} placeholder="Describe the food: what it is, condition, preparation..." value={form.description} onChange={e => set('description', e.target.value)} style={{ resize: 'vertical' }} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Food Type *</label>
                <div style={s.typeGrid}>
                  {FOOD_TYPES.map(t => (
                    <button key={t} type="button"
                      style={{ ...s.typeBtn, ...(form.foodType === t ? s.typeBtnActive : {}) }}
                      onClick={() => set('foodType', t)}
                    >
                      {t.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Allergen Information</label>
                <input placeholder="e.g. Contains nuts, gluten-free, etc." value={form.allergensInfo} onChange={e => set('allergensInfo', e.target.value)} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Diet Type</label>
                <div style={s.radioRow}>
                  {[true, false].map(v => (
                    <label key={String(v)} style={s.radioLabel}>
                      <input type="radio" checked={form.isVegetarian === v} onChange={() => set('isVegetarian', v)} style={{ width: 'auto' }} />
                      {v ? '🟢 Vegetarian' : '🔴 Non-Vegetarian'}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={s.section}>
              <SectionHeader icon={Package} title="Quantity & Expiry" />
              <div style={s.row}>
                <div style={s.field}>
                  <label style={s.label}>Quantity *</label>
                  <input type="number" min={0.1} step={0.1} placeholder="0" value={form.quantity.amount} onChange={e => set('quantity.amount', e.target.value)} />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Unit</label>
                  <select value={form.quantity.unit} onChange={e => set('quantity.unit', e.target.value)}>
                    {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Expiry Date & Time *</label>
                <input type="datetime-local" value={form.expiryDate} onChange={e => set('expiryDate', e.target.value)} min={new Date().toISOString().slice(0, 16)} />
              </div>
              <div style={s.row}>
                <div style={s.field}>
                  <label style={s.label}>Pickup From</label>
                  <input type="time" value={form.pickupTimeSlot.from} onChange={e => set('pickupTimeSlot.from', e.target.value)} />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Pickup To</label>
                  <input type="time" value={form.pickupTimeSlot.to} onChange={e => set('pickupTimeSlot.to', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={s.section}>
              <SectionHeader icon={MapPin} title="Pickup Address" />
              <div style={s.field}>
                <label style={s.label}>Street Address *</label>
                <input placeholder="Building, street name..." value={form.pickupAddress.street} onChange={e => set('pickupAddress.street', e.target.value)} />
              </div>
              <div style={s.row}>
                <div style={s.field}>
                  <label style={s.label}>City *</label>
                  <input placeholder="City" value={form.pickupAddress.city} onChange={e => set('pickupAddress.city', e.target.value)} />
                </div>
                <div style={s.field}>
                  <label style={s.label}>State *</label>
                  <input placeholder="State" value={form.pickupAddress.state} onChange={e => set('pickupAddress.state', e.target.value)} />
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>PIN Code</label>
                <input placeholder="500001" value={form.pickupAddress.pincode} onChange={e => set('pickupAddress.pincode', e.target.value)} />
              </div>
              <div style={s.previewBox}>
                <div style={s.previewTitle}>📋 Donation Summary</div>
                <div style={s.previewItem}><strong>Food:</strong> {form.title || '—'}</div>
                <div style={s.previewItem}><strong>Type:</strong> {form.foodType}</div>
                <div style={s.previewItem}><strong>Quantity:</strong> {form.quantity.amount} {form.quantity.unit}</div>
                <div style={s.previewItem}><strong>Expiry:</strong> {form.expiryDate ? new Date(form.expiryDate).toLocaleString() : '—'}</div>
                <div style={s.previewItem}><strong>Location:</strong> {form.pickupAddress.city || '—'}</div>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div style={s.navBtns}>
            {step > 1 && (
              <button style={s.backBtn} onClick={() => setStep(s => s - 1)} type="button">← Back</button>
            )}
            {step < 3 ? (
              <button style={s.nextBtn} onClick={() => setStep(s => s + 1)} type="button">
                Continue →
              </button>
            ) : (
              <button style={s.submitBtn} onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : '🌱 List Donation'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
      <div style={{ background: 'var(--forest-pale)', padding: '0.5rem', borderRadius: 8 }}><Icon size={20} color="var(--forest)" /></div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>{title}</h2>
    </div>
  )
}

const s = {
  page: { padding: '3rem 1.5rem', background: 'var(--cream)', minHeight: '100vh' },
  inner: { maxWidth: 680, margin: '0 auto' },
  pageTitle: { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,4vw,2.5rem)', textAlign: 'center' },
  pageSub: { textAlign: 'center', color: 'var(--muted)', margin: '0.5rem 0 2rem' },
  steps: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: '2rem' },
  stepWrap: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  stepDot: { width: 32, height: 32, border: '2px solid var(--border)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, background: 'white', color: 'var(--muted)', transition: 'all 0.2s', flexShrink: 0 },
  stepDotActive: { background: 'var(--forest)', borderColor: 'var(--forest)', color: 'white' },
  stepLabel: { fontSize: '0.82rem', color: 'var(--muted)', whiteSpace: 'nowrap' },
  stepLine: { width: 40, height: 2, background: 'var(--border)', margin: '0 0.25rem', transition: 'all 0.3s' },
  card: { background: 'white', borderRadius: 20, padding: '2rem', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' },
  section: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontWeight: 600, fontSize: '0.88rem' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  typeGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem' },
  typeBtn: { padding: '0.5rem', border: '1.5px solid var(--border)', borderRadius: 8, background: 'var(--cream)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500, textTransform: 'capitalize', transition: 'all 0.2s' },
  typeBtnActive: { background: 'var(--forest)', color: 'white', borderColor: 'var(--forest)' },
  radioRow: { display: 'flex', gap: '1.5rem' },
  radioLabel: { display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' },
  previewBox: { background: 'var(--cream)', borderRadius: 12, padding: '1.25rem', marginTop: '1rem' },
  previewTitle: { fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.9rem' },
  previewItem: { fontSize: '0.88rem', color: 'var(--slate)', marginBottom: '0.35rem' },
  navBtns: { display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' },
  backBtn: { background: 'none', border: '1.5px solid var(--border)', padding: '0.75rem 1.5rem', borderRadius: 10, fontWeight: 600, cursor: 'pointer', color: 'var(--slate)' },
  nextBtn: { background: 'var(--earth)', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginLeft: 'auto' },
  submitBtn: { background: 'var(--forest)', color: 'white', border: 'none', padding: '0.85rem 2rem', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginLeft: 'auto' },
}
