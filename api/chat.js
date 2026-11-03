// Serverless function (Node.js) — otomatis jadi endpoint POST /api/chat di Vercel.
// Jika ANTHROPIC_API_KEY tersedia, jawaban dibuat oleh Claude berdasarkan data portofolio.
// Jika tidak (atau terjadi error), memakai asisten sederhana berbasis kata kunci.
import Anthropic from '@anthropic-ai/sdk'
import { profile, about, experiences, skills, projects, socials, certificates } from '../src/data/portfolio.js'

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null

// Prompt sistem dibuat sekali dari data portofolio (tetap sama antar request agar bisa di-cache)
const knowledge = {
  profile: {
    name: profile.name,
    nickname: profile.nickname,
    roles: profile.roles,
    intro: profile.intro,
    location: profile.location,
    email: profile.email,
    whatsapp: `+${profile.whatsapp}`,
    highlights: profile.highlights,
  },
  about,
  experiences,
  skills: skills.map((s) => ({ category: s.category, items: s.items.map((i) => i.name) })),
  projects: projects.map(({ title, description, tech, demo }) => ({ title, description, tech, demo })),
  certificates: certificates.map(({ title, issuer, date }) => ({ title, issuer, date })),
  socials: socials.map(({ label, url }) => ({ label, url })),
}

const SYSTEM_PROMPT = `Kamu adalah "${profile.nickname} Assistant", asisten di website portofolio milik ${profile.name}. Pengunjungnya kebanyakan rekruter, HRD, dan calon klien.

Jawab pertanyaan tentang ${profile.nickname} hanya berdasarkan data di bawah. Jika informasinya tidak ada di data, katakan terus terang bahwa kamu tidak tahu dan sarankan menghubungi ${profile.nickname} langsung lewat email atau WhatsApp. Jangan mengarang pengalaman, angka, atau detail proyek.

Gaya jawaban:
- Gunakan bahasa yang sama dengan pengunjung (Indonesia atau Inggris), ramah dan profesional.
- Ringkas: 1–4 kalimat, atau daftar pendek dengan "• " bila perlu. Jawaban ditampilkan sebagai teks biasa, jadi jangan pakai markdown seperti **tebal** atau #judul.
- Untuk pertanyaan yang tidak berhubungan dengan ${profile.nickname} atau kariernya, tolak dengan sopan dan arahkan kembali ke topik portofolio.

Data portofolio (JSON):
${JSON.stringify(knowledge, null, 2)}`

const MAX_HISTORY = 10
const MAX_CHARS = 1000

// Ubah riwayat chat dari widget menjadi format messages Claude
function toMessages(history, message) {
  const turns = (Array.isArray(history) ? history : [])
    .filter((m) => m && typeof m.text === 'string' && (m.from === 'user' || m.from === 'bot'))
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text.slice(0, MAX_CHARS) }))
  // Pesan pertama harus dari user (sapaan awal bot dibuang)
  while (turns.length && turns[0].role !== 'user') turns.shift()
  turns.push({ role: 'user', content: message })
  return turns
}

async function askClaude(history, message) {
  const response = await client.beta.messages.create({
    model: 'claude-opus-5-5',
    max_tokens: 4000,
    output_config: { effort: 'low' },
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    cache_control: { type: 'ephemeral' },
    system: SYSTEM_PROMPT,
    messages: toMessages(history, message),
  })

  if (response.stop_reason === 'refusal') {
    return `Maaf, saya tidak bisa membantu untuk pertanyaan itu. Silakan tanya seputar pengalaman, skill, atau proyek ${profile.nickname}.`
  }
  const text = response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim()
  return text || reply(message)
}

const intents = [
  {
    keys: ['halo', 'hai', 'hi', 'hello', 'pagi', 'siang', 'malam'],
    answer: () => `Halo! 👋 Saya asisten ${profile.nickname}. Tanya saja soal skill, pengalaman, proyek, atau kontak.`,
  },
  {
    keys: ['siapa', 'tentang', 'about', 'kenalan'],
    answer: () => `${profile.name} adalah seorang ${profile.role}. ${about.whoAmI}`,
  },
  {
    keys: ['skill', 'keahlian', 'stack', 'bahasa', 'teknologi', 'tools'],
    answer: () =>
      'Tech stack-nya:\n' +
      skills.map((s) => `• ${s.category}: ${s.items.map((i) => i.name).join(', ')}`).join('\n'),
  },
  {
    keys: ['pengalaman', 'kerja', 'experience', 'karir', 'career'],
    answer: () =>
      'Pengalaman kerja:\n' + experiences.map((e) => `• ${e.role} — ${e.company} (${e.period})`).join('\n'),
  },
  {
    keys: ['proyek', 'project', 'portfolio', 'portofolio', 'karya'],
    answer: () => 'Beberapa proyek:\n' + projects.map((p) => `• ${p.title}: ${p.description}`).join('\n'),
  },
  {
    keys: ['kontak', 'contact', 'email', 'hubungi', 'wa', 'whatsapp', 'sosmed'],
    answer: () =>
      `Hubungi ${profile.nickname} lewat email ${profile.email} atau WhatsApp wa.me/${profile.whatsapp}.\n` +
      socials.map((s) => `• ${s.label}: ${s.url}`).join('\n'),
  },
  {
    keys: ['hire', 'freelance', 'rekrut', 'jasa', 'harga', 'kerjasama'],
    answer: () =>
      `${profile.nickname} terbuka untuk proyek freelance maupun posisi full-time. Silakan kirim detailnya ke ${profile.email} 🙌`,
  },
]

function reply(message) {
  const text = message.toLowerCase()
  const match = intents.find((i) => i.keys.some((k) => text.includes(k)))
  if (match) return match.answer()
  return 'Maaf, saya belum paham 😅 Coba tanya tentang: skill, pengalaman, proyek, atau kontak.'
}

function readBody(req) {
  if (req.body) return Promise.resolve(typeof req.body === 'string' ? JSON.parse(req.body) : req.body)
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch (err) {
        reject(err)
      }
    })
  })
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  if (req.method !== 'POST') {
    res.statusCode = 405
    return res.end(JSON.stringify({ error: 'Method not allowed' }))
  }

  let body
  try {
    body = await readBody(req)
  } catch {
    res.statusCode = 400
    return res.end(JSON.stringify({ error: 'Body tidak valid' }))
  }

  const { message, history } = body
  if (!message || typeof message !== 'string') {
    res.statusCode = 400
    return res.end(JSON.stringify({ error: 'message wajib diisi' }))
  }
  const text = message.slice(0, 500)

  let answer
  if (client) {
    try {
      answer = await askClaude(history, text)
    } catch (err) {
      if (err instanceof Anthropic.RateLimitError) console.warn('Claude rate limited')
      else if (err instanceof Anthropic.APIError) console.error(`Claude API error ${err.status}:`, err.message)
      else console.error(err)
      answer = reply(text)
    }
  } else {
    answer = reply(text)
  }

  res.statusCode = 200
  res.end(JSON.stringify({ reply: answer }))
}
