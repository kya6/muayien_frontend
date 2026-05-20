import { useRef, useEffect } from 'react'

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 200) + 'px'
  }, [value])

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!disabled && value.trim()) onSend()
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!disabled && value.trim()) onSend()
      }}
      className="border-t border-brand-secondary/60 bg-brand-bg px-4 py-3 sm:px-6"
    >
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-brand-secondary bg-surface-subtle px-3 py-2 shadow-soft focus-within:border-brand-primary transition">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder='Ask Muayien...'
          className="flex-1 resize-none bg-transparent px-1 py-1.5 text-sm leading-6 text-white placeholder:text-brand-secondary3/40 focus:outline-none"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="btn-primary h-9 w-9 shrink-0 rounded-xl p-0"
          aria-label="Send"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l14-7-4 14-4-6-6-1z" />
          </svg>
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-brand-secondary3/40">
        Press Enter to send. Shift+Enter for newline.
      </p>
    </form>
  )
}
