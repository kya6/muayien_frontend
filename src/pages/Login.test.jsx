// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Login from './Login'
import { AuthProvider } from '../context/AuthContext'

vi.mock('../api/client', () => ({
  authApi: {
    login: vi.fn(() => Promise.resolve({ access: 'fake.jwt.token', refresh: 'fake.refresh' })),
  },
  TOKEN_KEY: 'muayien.access',
  REFRESH_KEY: 'muayien.refresh',
}))

function renderLogin() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('Login page', () => {
  it('shows email and password fields', () => {
    renderLogin()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('calls login() when form is submitted', async () => {
    const user = userEvent.setup()
    const { authApi } = await import('../api/client')

    renderLogin()
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(authApi.login).toHaveBeenCalledWith('test@example.com', 'password123')
  })

  it('has a working browser environment', () => {
    expect(typeof window).toBe('object')
    expect(typeof localStorage).toBe('object')
  })
})