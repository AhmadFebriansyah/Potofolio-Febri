import { lazy, Suspense, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HiEye } from 'react-icons/hi'
import { certificates } from '../data/portfolio.js'
import Section from './Section.jsx'

const PdfViewer = lazy(() => import('./PdfViewer.jsx'))

export default function Certificates() {
  const [viewing, setViewing] = useState(null)

  return (
    <Section id="certificates" index="05" title="Certifications">
      <ul className="border-t border-line">
        {certificates.map((c) => (
          <li key={c.title} className="border-b border-line">
            <button
              type="button"
              onClick={() => c.pdf && setViewing(c)}
              className="group grid min-h-11 w-full gap-1 py-4 text-left sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
            >
              <span className="font-mono text-sm text-muted">{c.date}</span>
              <span>
                <span className="block font-semibold transition-colors group-hover:text-accent">{c.title}</span>
                <span className="block text-sm text-muted">{c.issuer}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                <HiEye aria-hidden="true" /> Lihat
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Suspense fallback={null}>
        <AnimatePresence>
          {viewing && <PdfViewer url={viewing.pdf} title={viewing.title} onClose={() => setViewing(null)} />}
        </AnimatePresence>
      </Suspense>
    </Section>
  )
}
