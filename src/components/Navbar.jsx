import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Wordmark } from './Logo.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 border-b border-brand-secondary/60 bg-brand-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center"><Wordmark /></Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-brand-secondary3/80">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-white' : 'hover:text-white transition'}>Home</NavLink>
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how" className="hover:text-white transition">How it works</a>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/chat" className="btn-secondary">Open chat</Link>
              <button onClick={() => { logout(); navigate('/') }} className="btn-ghost">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Sign in</Link>
              <Link to="/register" className="btn-primary">Get started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
