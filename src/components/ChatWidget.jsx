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
    { from: 'bot', text: `Halo! Saya asisten ${profile.nickname}. Ada yang ingin ditanyakan?` },
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-14 right-0 flex h-[28rem] max-h-[calc(100dvh-6rem)] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden border border-ink bg-surface"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <p className="text-sm font-semibold">{profile.nickname} Assistant</p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p
                    className={`max-w-[85%] whitespace-pre-line px-3 py-2 text-sm ${
                      m.from === 'user'
                        ? 'bg-ink text-bg'
                        : 'border border-line bg-bg'
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              {sending && <p className="text-xs text-muted" role="status">mengetik…</p>}
              <div ref={bottomRef} />
            </div>

            <div className="flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="shrink-0 border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
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
                aria-label="Pesan"
                className="min-w-0 flex-1 border border-line bg-bg px-3 py-2 text-base sm:text-sm"
              />
              <button
                type="submit"
                disabled={sending}
                aria-label="Kirim"
                className="grid h-11 w-11 shrink-0 place-items-center bg-ink text-bg transition-colors hover:bg-accent disabled:opacity-50"
              >
                <HiPaperAirplane className="rotate-90" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="inline-flex h-11 items-center gap-2 bg-ink px-4 text-sm font-medium text-bg transition-colors hover:bg-accent"
      >
        {open ? <HiX aria-hidden="true" /> : <HiChatAlt2 aria-hidden="true" />}
        {open ? 'Tutup' : 'Tanya asisten'}
      </button>
    </div>
  )
}
