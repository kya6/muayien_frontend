import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Logo, { Wordmark } from '../components/Logo.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register(form)
      navigate('/chat', { replace: true })
    } catch (err) {
      const data = err.response?.data
      if (data && typeof data === 'object') {
        const msg = Object.entries(data)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
          .join(' . ')
        setError(msg || 'Registration failed.')
      } else {
        setError('Registration failed. The backend may not yet expose')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-brand-secondary3/70 hover:text-white transition">
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Create your account</h1>
          <p className="mt-1 text-sm text-brand-secondary3/80">Get started with Muayien in seconds.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="first" className="label">First name</label>
                <input id="first" required value={form.first_name} onChange={onChange('first_name')} className="input" />
              </div>
              <div>
                <label htmlFor="last" className="label">Last name</label>
                <input id="last" required value={form.last_name} onChange={onChange('last_name')} className="input" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="label">Work email</label>
              <input id="email" type="email" autoComplete="email" required value={form.email} onChange={onChange('email')} className="input" placeholder="you@company.com" />
            </div>
            <div>
              <label htmlFor="pw" className="label">Password</label>
              <input id="pw" type="password" autoComplete="new-password" required minLength={8} value={form.password} onChange={onChange('password')} className="input" placeholder="At least 8 characters" />
            </div>

            {error && (
              <div className="rounded-md border border-brand-secondary bg-surface px-3 py-2 text-sm text-brand-secondary3">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-sm text-brand-secondary3/80">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-brand-primary hover:text-brand-secondary3 transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden border-l border-brand-secondary/60 bg-surface-subtle bg-hero-glow lg:flex lg:items-center lg:justify-center">
        <Logo className="pointer-events-none absolute -top-16 -right-16 h-80 w-80 opacity-[0.08]" />
        <Logo className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 opacity-[0.06]" />
        <div className="relative max-w-md px-12">
          <Wordmark className="mb-8" />
          <h2 className="text-3xl font-semibold leading-tight text-white">Built for the modern digital workplace.</h2>
          <p className="mt-3 text-sm leading-6 text-brand-secondary3/80">
            A unified, intelligent interface that simplifies interactions and streamlines workflows across HRMS and ITSM.
          </p>
        </div>
      </div>
    </div>
  )
}
