import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const TOKEN_KEY = 'muayien.access'
export const REFRESH_KEY = 'muayien.refresh'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach access token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-refresh on 401
let refreshing = null
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (
      error.response?.status === 401 &&
      !original._retry &&
      localStorage.getItem(REFRESH_KEY)
    ) {
      original._retry = true
      try {
        refreshing = refreshing || axios.post(`${API_URL}/token/refresh/`, {
          refresh: localStorage.getItem(REFRESH_KEY),
        })
        const { data } = await refreshing
        refreshing = null
        localStorage.setItem(TOKEN_KEY, data.access)
        original.headers.Authorization = `Bearer ${data.access}`
        return api(original)
      } catch (e) {
        refreshing = null
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(REFRESH_KEY)
        window.location.href = '/login'
        return Promise.reject(e)
      }
    }
    return Promise.reject(error)
  },
)

// --- API surface (maps 1:1 to Django endpoints) ---

export const authApi = {
  // POST /api/token/  → { access, refresh }
  login: (email, password) =>
    api.post('/token/', { email, password }).then((r) => r.data),

  // POST /api/register/  (NOTE: backend does not yet expose this — see INTEGRATION.md)
  register: (payload) => api.post('/register/', payload).then((r) => r.data),

  refresh: (refresh) =>
    api.post('/token/refresh/', { refresh }).then((r) => r.data),
}

export const chatApi = {
  // POST /api/message/   body: { content, chat_id? }
  sendMessage: (content, chatId = null) =>
    api.post('/message/', { content, chat_id: chatId }).then((r) => r.data),

  // PATCH /api/chat/<uuid>/close/
  closeChat: (chatId) =>
    api.patch(`/chat/${chatId}/close/`).then((r) => r.data),

  // DELETE /api/chat/<uuid>/clear/
  clearChat: (chatId) =>
    api.delete(`/chat/${chatId}/clear/`).then((r) => r.data),

  // GET /api/chats/  — list user's chats (backend addition needed, see INTEGRATION.md)
  listChats: () => api.get('/chats/').then((r) => r.data),

  // GET /api/chat/<uuid>/messages/  — load a chat's messages (backend addition needed)
  getChatMessages: (chatId) =>
    api.get(`/chat/${chatId}/messages/`).then((r) => r.data),
}
