import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Logo, { Wordmark } from '../components/Logo.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/chat'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      const detail =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        'Invalid email or password.'
      setError(detail)
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
          <h1 className="text-3xl font-semibold tracking-tight text-white">Sign in</h1>
          <p className="mt-1 text-sm text-brand-secondary3/80">Welcome back. Enter your credentials to continue.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="label">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="********"
              />
            </div>

            {error && (
              <div className="rounded-md border border-brand-secondary bg-surface px-3 py-2 text-sm text-brand-secondary3">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-sm text-brand-secondary3/80">
            New to Muayien?{' '}
            <Link to="/register" className="font-medium text-brand-primary hover:text-brand-secondary3 transition">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden border-l border-brand-secondary/60 bg-surface-subtle bg-hero-glow lg:flex lg:items-center lg:justify-center">
        <Logo className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 opacity-[0.08]" />
        <Logo className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 opacity-[0.06]" />
        <div className="relative max-w-md px-12">
          <Wordmark className="mb-8" />
          <h2 className="text-3xl font-semibold leading-tight text-white">One assistant for HR and IT.</h2>
          <p className="mt-3 text-sm leading-6 text-brand-secondary3/80">
            Stop switching tabs. Muayien understands what you need and routes it to the right system, in plain English.
          </p>
          <div className="mt-8 space-y-3">
            <div className="rounded-lg border border-brand-secondary bg-surface px-4 py-3 text-sm text-brand-secondary3">
              "I need Monday off."
            </div>
            <div className="ml-8 rounded-lg bg-brand-primary px-4 py-3 text-sm font-medium text-brand-bg">
              Leave request submitted to HR, confirmation in 24 hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
