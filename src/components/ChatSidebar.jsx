import { useAuth } from '../context/AuthContext.jsx'
import { Wordmark } from './Logo.jsx'

export default function ChatSidebar({
  chats,
  activeId,
  onSelect,
  onNew,
  loading,
  error,
  collapsed,
  onToggle,
}) {
  const { user, logout } = useAuth()

  return (
    <aside
      className={`${
        collapsed ? 'w-0 -translate-x-full' : 'w-72 translate-x-0'
      } fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r border-brand-secondary/60 bg-surface-subtle transition-all duration-200 sm:static sm:translate-x-0`}
    >
      <div className="flex h-16 items-center justify-between border-b border-brand-secondary/60 px-4">
        <Wordmark />
        <button onClick={onToggle} className="rounded-md p-1.5 text-brand-secondary3/70 hover:bg-surface sm:hidden" aria-label="Close sidebar">
          x
        </button>
      </div>

      <div className="px-3 py-3">
        <button onClick={onNew} className="btn-primary w-full">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New chat
        </button>
      </div>

      <div className="px-3 pb-2 text-[11px] font-medium uppercase tracking-wide text-brand-secondary3/60">
        History
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-3">
        {loading && (
          <div className="px-3 py-2 text-xs text-brand-secondary3/60">Loading chats...</div>
        )}
        {error && (
          <div className="mx-2 rounded-md border border-brand-secondary bg-surface p-2 text-xs text-brand-secondary3/80">
            {error}
          </div>
        )}
        {!loading && !error && chats.length === 0 && (
          <div className="px-3 py-2 text-xs text-brand-secondary3/60">No chats yet. Start a new one above.</div>
        )}
        <ul className="space-y-0.5">
          {chats.map((c) => (
            <li key={c.chat_id}>
              <button
                onClick={() => onSelect(c.chat_id)}
                className={`group flex w-full items-start gap-2 rounded-md px-3 py-2 text-left text-sm transition ${
                  activeId === c.chat_id
                    ? 'bg-surface-raised text-white border border-brand-secondary2/40'
                    : 'text-brand-secondary3/80 hover:bg-surface hover:text-white border border-transparent'
                }`}
              >
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary3/50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm">{c.title || 'New conversation'}</div>
                  <div className="truncate text-[11px] text-brand-secondary3/50">
                    {formatDate(c.start_time)} . {c.message_count ?? 0} msg
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-brand-secondary/60 p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-xs font-medium text-white">{user?.email}</div>
            <div className="text-[11px] text-brand-secondary3/60">Signed in</div>
          </div>
          <button onClick={logout} className="btn-ghost h-8 px-2 text-xs">Sign out</button>
        </div>
      </div>
    </aside>
  )
}

function formatDate(ts) {
  if (!ts) return ''
  try {
    const d = new Date(ts)
    const today = new Date()
    if (d.toDateString() === today.toDateString()) {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}
