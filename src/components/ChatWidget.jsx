import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiChatAlt2, HiX, HiPaperAirplane } from 'react-icons/hi'
import { profile } from '../data/portfolio.js'

const suggestions = ['Skill apa saja?', 'Pengalaman kerja', 'Lihat proyek', 'Kontak']

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Halo! 👋 Saya asisten ${profile.nickname}. Ada yang ingin ditanyakan?` },
  ])
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function send(text) {
    const message = text.trim()
    if (!message || sending) return
    setMessages((m) => [...m, { from: 'user', text: message }])
    setInput('')
    setSending(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: messages }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { from: 'bot', text: data.reply ?? 'Maaf, terjadi kesalahan.' }])
    } catch {
      setMessages((m) => [...m, { from: 'bot', text: 'Maaf, server sedang tidak bisa dihubungi.' }])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="card absolute bottom-16 right-0 flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 font-bold text-bg">
                {profile.nickname[0]}
              </span>
              <div>
                <p className="text-sm font-bold">{profile.nickname} Assistant</p>
                <p className="flex items-center gap-1 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2 text-sm ${
                      m.from === 'user'
                        ? 'rounded-br-sm bg-gradient-to-r from-accent to-accent2 text-bg'
                        : 'rounded-bl-sm border border-line bg-bg'
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              {sending && <p className="text-xs text-muted">mengetik…</p>}
              <div ref={bottomRef} />
            </div>

            <div className="flex gap-2 overflow-x-auto px-4 pb-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-muted hover:border-accent hover:text-accent"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex gap-2 border-t border-line p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pesan…"
                className="flex-1 rounded-full border border-line bg-bg px-4 py-2 text-sm outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={sending}
                aria-label="Kirim"
                className="grid h-9 w-9 place-items-center rounded-full bg-accent text-bg disabled:opacity-50"
              >
                <HiPaperAirplane className="rotate-90" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Chat"
        className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 text-2xl text-bg shadow-lg shadow-accent/30 transition hover:scale-110"
      >
        {open ? <HiX /> : <HiChatAlt2 />}
      </button>
    </div>
  )
}
