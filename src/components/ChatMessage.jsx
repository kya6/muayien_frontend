export function UserMessage({ children, timestamp }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%]">
        <div className="rounded-2xl rounded-br-md bg-brand-primary px-4 py-2.5 text-sm leading-6 text-brand-bg whitespace-pre-wrap break-words font-medium">
          {children}
        </div>
        {timestamp && (
          <div className="mt-1 text-right text-[11px] text-brand-secondary3/50">{formatTime(timestamp)}</div>
        )}
      </div>
    </div>
  )
}

export function AssistantMessage({ children, timestamp, metadata }) {
  return (
    <div className="flex">
      <div className="max-w-[80%]">
        <div className="rounded-2xl rounded-bl-md border border-brand-secondary bg-surface px-4 py-2.5 text-sm leading-6 text-white whitespace-pre-wrap break-words">
          {children}
        </div>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-brand-secondary3/50">
          {timestamp && <span>{formatTime(timestamp)}</span>}
          {metadata?.intent && metadata.intent !== 'Unknown' && (
            <span className="rounded bg-brand-secondary/40 px-1.5 py-0.5 font-mono text-[10px] text-brand-secondary3">
              {metadata.intent}{metadata.slot && metadata.slot !== 'None' ? ` - ${metadata.slot}` : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function TypingMessage() {
  return (
    <div className="flex">
      <div className="rounded-2xl rounded-bl-md border border-brand-secondary bg-surface px-4 py-3">
        <span className="typing-dot" />
        <span className="typing-dot ml-1" />
        <span className="typing-dot ml-1" />
      </div>
    </div>
  )
}

function formatTime(ts) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}
