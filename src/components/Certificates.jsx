import { lazy, Suspense, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiBadgeCheck, HiEye } from 'react-icons/hi'
import { certificates } from '../data/portfolio.js'
import SectionTitle, { fadeUp } from './SectionTitle.jsx'

const PdfViewer = lazy(() => import('./PdfViewer.jsx'))

export default function Certificates() {
  const [viewing, setViewing] = useState(null)

  return (
    <section id="certificates" className="mx-auto max-w-6xl px-5 py-24">
      <SectionTitle eyebrow="Achievements" title="Certifications" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c, i) => (
          <motion.button
            key={c.title}
            {...fadeUp(i * 0.1)}
            onClick={() => c.pdf && setViewing(c)}
            className="card group overflow-hidden text-left transition hover:-translate-y-2 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10"
          >
            <div className="relative overflow-hidden bg-white">
              <img src={c.image} alt={c.title} className="aspect-[16/10] w-full object-cover object-top transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 grid place-items-center bg-bg/70 opacity-0 transition group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-bg">
                  <HiEye /> Lihat Sertifikat
                </span>
              </span>
            </div>
            <div className="p-5">
              <p className="flex items-center gap-1 font-mono text-xs text-accent">
                <HiBadgeCheck /> {c.issuer}
              </p>
              <h3 className="mt-2 font-bold leading-snug">{c.title}</h3>
              <p className="mt-1 text-sm text-muted">{c.date}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>
          {viewing && <PdfViewer url={viewing.pdf} title={viewing.title} onClose={() => setViewing(null)} />}
        </AnimatePresence>
      </Suspense>
    </section>
  )
}
