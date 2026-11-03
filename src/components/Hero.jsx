import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight, HiDownload } from 'react-icons/hi'
import { profile, socials } from '../data/portfolio.js'
import { Icon } from './icons.jsx'
import { HERO_DELAY } from '../intro.js'

function useTypewriter(words, speed = 80, pause = 1600) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    const done = !deleting && text === word
    const cleared = deleting && text === ''
    const delay = done ? pause : deleting ? speed / 2 : speed

    const t = setTimeout(() => {
      if (done) return setDeleting(true)
      if (cleared) {
        setDeleting(false)
        return setIndex((i) => i + 1)
      }
      setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, words, speed, pause])

  return text
}

export default function Hero() {
  const typed = useTypewriter(profile.roles)

  return (
    <section id="home" className="relative flex min-h-screen items-center pb-16 pt-24">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-accent2/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: HERO_DELAY }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Available for work
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Hi, I&apos;m <span className="text-gradient">{profile.nickname}</span>
          </h1>
          <p className="mt-4 h-8 font-mono text-lg text-accent md:text-xl">
            {typed}
            <span className="cursor-blink">|</span>
          </p>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent2 px-6 py-3 font-semibold text-bg shadow-lg shadow-accent/20 transition hover:scale-105"
            >
              Explore Work <HiArrowRight className="transition group-hover:translate-x-1" />
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-semibold transition hover:border-accent hover:text-accent"
            >
              <HiDownload /> Download CV
            </a>
          </div>

          <div className="mt-8 flex gap-3">
            {socials.slice(0, 3).map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-lg text-muted transition hover:-translate-y-1 hover:border-accent hover:text-accent"
              >
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: HERO_DELAY + 0.2 }}
          className="relative mx-auto w-full max-w-xs"
        >
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-accent to-accent2 opacity-60 blur-xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface">
            <img
              src={profile.photo}
              alt={profile.name}
              className="h-[min(52vh,26rem)] w-full object-cover object-top"
            />
          </div>

          <div className="absolute -bottom-6 left-1/2 flex w-[110%] -translate-x-1/2 justify-between gap-2">
            {profile.highlights.map((h, i) => (
              <motion.div
                key={h.label}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                className="card flex-1 px-3 py-3 text-center"
              >
                <p className="text-xl font-extrabold text-gradient">{h.value}</p>
                <p className="text-[11px] leading-tight text-muted">{h.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
