import { motion } from 'framer-motion'
import { HiArrowRight, HiLocationMarker } from 'react-icons/hi'
import { profile, socials } from '../data/portfolio.js'
import { fadeUp } from './SectionTitle.jsx'
import { Icon } from './icons.jsx'

export default function Contact() {
  const { map } = profile
  const cards = [
    socials.find((s) => s.icon === 'github'),
    { icon: 'email', label: 'Email', handle: profile.email, url: `mailto:${profile.email}` },
    { icon: 'whatsapp', label: 'WhatsApp', handle: `+${profile.whatsapp}`, url: `https://wa.me/${profile.whatsapp}` },
    ...socials.filter((s) => s.icon !== 'github'),
  ].filter(Boolean)

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
      <motion.div {...fadeUp(0)} className="mb-12 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Get In Touch</span>
        <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Contact Me</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Punya proyek atau ingin berkolaborasi? Hubungi saya di bawah ini.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Peta lokasi */}
        <motion.div {...fadeUp(0.1)} className="card relative min-h-[22rem] overflow-hidden p-0">
          <iframe
            title="Lokasi"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(map.query)}&z=14&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
          />
          <a
            href={map.url}
            target="_blank"
            rel="noreferrer"
            className="absolute left-4 top-4 flex items-center gap-2 rounded-xl border border-line bg-bg/90 px-4 py-2 backdrop-blur transition hover:border-accent"
          >
            <HiLocationMarker className="text-lg text-accent" />
            <span>
              <span className="block text-sm font-bold">{map.label}</span>
              <span className="block text-xs text-muted">{profile.location}</span>
            </span>
          </a>
        </motion.div>

        {/* Daftar kontak */}
        <div className="flex flex-col gap-4">
          {cards.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="card group flex items-center gap-4 px-5 py-4 transition hover:border-accent/50"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-bg text-xl">
                <Icon name={c.icon} colored />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">{c.label}</span>
                <span className="block truncate text-sm text-muted">{c.handle}</span>
              </span>
              <HiArrowRight className="shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-accent" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
