import { createContext, useContext, useEffect, useState } from 'react'
import { authApi, TOKEN_KEY, REFRESH_KEY } from '../api/client.js'

const AuthContext = createContext(null)

function decodeJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      const payload = decodeJwt(token)
      if (payload) {
        setUser({
          userId: payload.user_id,
          email: payload.email || null,
        })
      }
    }
    setReady(true)
  }, [])

  const login = async (email, password) => {
    const { access, refresh } = await authApi.login(email, password)
    localStorage.setItem(TOKEN_KEY, access)
    localStorage.setItem(REFRESH_KEY, refresh)
    const payload = decodeJwt(access)
    setUser({
      userId: payload?.user_id,
      email: email,
    })
  }

  const register = async (payload) => {
    await authApi.register(payload)
    // Auto-login after register
    await login(payload.email, payload.password)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
