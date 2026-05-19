import { useEffect, useRef, useState } from 'react'
import { chatApi } from '../api/client.js'
import ChatSidebar from '../components/ChatSidebar.jsx'
import ChatInput from '../components/ChatInput.jsx'
import Logo from '../components/Logo.jsx'
import { UserMessage, AssistantMessage, TypingMessage } from '../components/ChatMessage.jsx'

const SUGGESTIONS = [
  'I want to take Monday off',
  'My laptop screen is flickering',
  'I forgot my password',
  'Request a vacation next week',
]

export default function Chat() {
  const [chats, setChats] = useState([])
  const [chatsLoading, setChatsLoading] = useState(true)
  const [chatsError, setChatsError] = useState(null)

  const [activeChatId, setActiveChatId] = useState(null)
  const [messages, setMessages] = useState([])

  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const scrollRef = useRef(null)

  useEffect(() => {
    let cancel = false
    ;(async () => {
      try {
        const data = await chatApi.listChats()
        if (cancel) return
        const list = Array.isArray(data) ? data : data.results || []
        setChats(list)
      } catch (err) {
        if (cancel) return
        if (err.response?.status === 404) {
          setChatsError('Chat history endpoint not yet available on the backend.')
        } else {
          setChatsError('Could not load chat history.')
        }
      } finally {
        if (!cancel) setChatsLoading(false)
      }
    })()
    return () => { cancel = true }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending])

  const startNewChat = () => {
    setActiveChatId(null)
    setMessages([])
  }

  const selectChat = async (chatId) => {
    setActiveChatId(chatId)
    setMessages([])
    try {
      const data = await chatApi.getChatMessages(chatId)
      const list = Array.isArray(data) ? data : data.results || []
      const flat = []
      for (const m of list) {
        flat.push({
          role: 'user',
          content: m.content,
          timestamp: m.timestamp,
          id: `u-${m.msg_id}`,
        })
        if (m.answer) {
          flat.push({
            role: 'assistant',
            content: m.answer.content,
            timestamp: m.answer.timestamp,
            metadata: m.ai_metadata,
            id: `a-${m.answer.anw_id}`,
          })
        }
      }
      setMessages(flat)
    } catch {
      setMessages([])
    }
  }

  const send = async () => {
    const content = input.trim()
    if (!content) return
    setInput('')
    const optimisticId = `tmp-${Date.now()}`
    setMessages((prev) => [
      ...prev,
      { role: 'user', content, timestamp: new Date().toISOString(), id: optimisticId },
    ])
    setSending(true)
    try {
      const res = await chatApi.sendMessage(content, activeChatId)
      if (!activeChatId && res.chat_id) {
        setActiveChatId(res.chat_id)
        setChats((prev) => [
          { chat_id: res.chat_id, start_time: res.timestamp, message_count: 1, title: content.slice(0, 40) },
          ...prev,
        ])
      } else {
        setChats((prev) =>
          prev.map((c) =>
            c.chat_id === res.chat_id
              ? { ...c, message_count: (c.message_count ?? 0) + 1 }
              : c,
          ),
        )
      }
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== optimisticId),
        {
          role: 'user',
          content: res.content,
          timestamp: res.timestamp,
          id: `u-${res.msg_id}`,
        },
        res.answer && {
          role: 'assistant',
          content: res.answer.content,
          timestamp: res.answer.timestamp,
          metadata: res.ai_metadata,
          id: `a-${res.answer.anw_id}`,
        },
      ].filter(Boolean))
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I could not reach the server. Please try again.',
          timestamp: new Date().toISOString(),
          id: `err-${Date.now()}`,
        },
      ])
    } finally {
      setSending(false)
    }
  }

  const clearActive = async () => {
    if (!activeChatId) return
    if (!confirm('Clear all messages in this chat?')) return
    try {
      await chatApi.clearChat(activeChatId)
      setMessages([])
      setChats((prev) =>
        prev.map((c) => (c.chat_id === activeChatId ? { ...c, message_count: 0 } : c)),
      )
    } catch {
      alert('Could not clear chat.')
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-brand-bg">
      <ChatSidebar
        chats={chats}
        activeId={activeChatId}
        onSelect={selectChat}
        onNew={startNewChat}
        loading={chatsLoading}
        error={chatsError}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
      />

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-brand-secondary/60 bg-brand-bg px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarCollapsed((v) => !v)}
              className="rounded-md p-1.5 text-brand-secondary3/70 hover:bg-surface sm:hidden"
              aria-label="Toggle sidebar"
            >
              =
            </button>
            <h2 className="text-sm font-medium text-white">
              {activeChatId ? 'Conversation' : 'New chat'}
            </h2>
          </div>
          {activeChatId && (
            <button onClick={clearActive} className="btn-ghost h-8 px-2 text-xs">
              Clear chat
            </button>
          )}
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-brand-bg">
          <div className="mx-auto max-w-3xl space-y-4 px-4 py-6 sm:px-6">
            {messages.length === 0 && !sending && (
              <EmptyState onPick={(t) => setInput(t)} />
            )}
            {messages.map((m) =>
              m.role === 'user' ? (
                <UserMessage key={m.id} timestamp={m.timestamp}>{m.content}</UserMessage>
              ) : (
                <AssistantMessage key={m.id} timestamp={m.timestamp} metadata={m.metadata}>
                  {m.content}
                </AssistantMessage>
              ),
            )}
            {sending && <TypingMessage />}
          </div>
        </div>

        <ChatInput value={input} onChange={setInput} onSend={send} disabled={sending} />
      </div>
    </div>
  )
}

function EmptyState({ onPick }) {
  return (
    <div className="mx-auto max-w-2xl pt-12 text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface border border-brand-secondary2/40 shadow-glow">
        <Logo className="h-7 w-7 animate-float" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">How can I help today?</h2>
      <p className="mt-1 text-sm text-brand-secondary3/80">Ask anything about HR or IT, in plain English.</p>
      <div className="mt-8 grid gap-2 sm:grid-cols-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className="card px-4 py-3 text-left text-sm text-brand-secondary3/90 hover:bg-surface-raised hover:border-brand-secondary2 hover:text-white transition"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
