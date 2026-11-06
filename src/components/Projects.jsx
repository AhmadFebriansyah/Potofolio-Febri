import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight, HiDocumentText, HiExternalLink } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../data/portfolio.js'
import Section from './Section.jsx'

// pdf.js cukup besar, jadi baru dimuat saat proyek diklik
const PdfViewer = lazy(() => import('./PdfViewer.jsx'))

const link = 'inline-flex min-h-11 items-center gap-1.5 font-medium text-accent underline underline-offset-4'
const navBtn =
  'grid h-11 w-11 place-items-center border border-ink text-xl transition-colors hover:bg-ink hover:text-bg disabled:pointer-events-none disabled:opacity-30'

export default function Projects() {
  const trackRef = useRef(null)
  const [viewing, setViewing] = useState(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  function updateButtons() {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateButtons()
    window.addEventListener('resize', updateButtons)
    return () => window.removeEventListener('resize', updateButtons)
  }, [])

  // Geser sejauh satu kartu
  function slide(dir) {
    const el = trackRef.current
    const card = el.firstElementChild
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <Section id="projects" index="04" title="Selected Works">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-mono text-sm text-muted">{projects.length} proyek</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => slide(-1)} disabled={!canPrev} aria-label="Proyek sebelumnya" className={navBtn}>
            <HiChevronLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => slide(1)} disabled={!canNext} aria-label="Proyek berikutnya" className={navBtn}>
            <HiChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Kartu berikutnya sengaja mengintip di HP sebagai tanda bisa digeser */}
      <div
        ref={trackRef}
        onScroll={updateButtons}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <article
            key={p.title}
            onClick={p.pdf ? () => setViewing(p) : undefined}
            className={`group flex shrink-0 basis-[85%] snap-start flex-col sm:basis-[calc((100%-1.5rem)/2)] md:basis-[85%] lg:basis-[calc((100%-1.5rem)/2)] ${
              p.pdf ? 'cursor-pointer' : ''
            }`}
          >
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="aspect-video w-full border border-line bg-surface object-cover object-top"
            />
            <h3 className="mt-4 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
              {p.title}
            </h3>
            <p className="mt-2 flex-1 leading-relaxed text-muted">{p.description}</p>
            <p className="mt-3 font-mono text-xs leading-relaxed text-muted">{p.tech.join(' · ')}</p>
            <div className="mt-2 flex flex-wrap gap-x-5 text-sm">
              {p.pdf && (
                <button type="button" className={link}>
                  <HiDocumentText aria-hidden="true" /> View Details
                </button>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className={link}>
                  Live Demo <HiExternalLink aria-hidden="true" />
                </a>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer" className={link}>
                  <FaGithub aria-hidden="true" /> Source
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>
          {viewing && <PdfViewer url={viewing.pdf} title={viewing.title} onClose={() => setViewing(null)} />}
        </AnimatePresence>
      </Suspense>
    </Section>
  )
}
