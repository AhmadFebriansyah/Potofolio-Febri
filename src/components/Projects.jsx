import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HiArrowRight, HiChevronLeft, HiChevronRight, HiDocumentText, HiExternalLink } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import { projects, githubUrl } from '../data/portfolio.js'
import SectionTitle from './SectionTitle.jsx'

// pdf.js cukup besar, jadi baru dimuat saat proyek diklik
const PdfViewer = lazy(() => import('./PdfViewer.jsx'))

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
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  const navBtn =
    'grid h-12 w-12 place-items-center rounded-full bg-white text-2xl text-bg shadow-lg shadow-white/10 transition hover:scale-110 hover:bg-gradient-to-br hover:from-accent hover:to-accent2 hover:shadow-accent/40 disabled:pointer-events-none disabled:opacity-25'

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24">
      <SectionTitle eyebrow="Portfolio" title="Selected Works"/>

      <div className="mb-6 flex justify-end gap-3">
        <button onClick={() => slide(-1)} disabled={!canPrev} aria-label="Sebelumnya" className={navBtn}>
          <HiChevronLeft />
        </button>
        <button onClick={() => slide(1)} disabled={!canNext} aria-label="Berikutnya" className={navBtn}>
          <HiChevronRight />
        </button>
      </div>

      <div
        ref={trackRef}
        onScroll={updateButtons}
        className="-mx-2 flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, i) => (
          <article
            key={p.title}
            onClick={p.pdf ? () => setViewing(p) : undefined}
            className={`card group flex shrink-0 basis-full snap-start flex-col overflow-hidden transition hover:-translate-y-2 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)] ${
              p.pdf ? 'cursor-pointer' : ''
            }`}
          >
            <div className="relative overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="aspect-video w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <span className="absolute left-4 top-4 rounded-full bg-bg/80 px-3 py-1 font-mono text-xs text-accent backdrop-blur">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[11px] text-accent">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
              <div className="mt-5 flex gap-5 text-sm font-semibold">
                {p.pdf && (
                  <button className="inline-flex items-center gap-1 text-accent hover:underline">
                    <HiDocumentText /> View Details
                  </button>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
                    Live Demo <HiExternalLink />
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-white">
                    <FaGithub /> Source
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* <div className="mt-8 text-center">
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-semibold transition hover:border-accent hover:text-accent"
        >
          View More Projects <HiArrowRight className="transition group-hover:translate-x-1" />
        </a>
      </div> */}

      <Suspense fallback={null}>
        <AnimatePresence>
          {viewing && <PdfViewer url={viewing.pdf} title={viewing.title} onClose={() => setViewing(null)} />}
        </AnimatePresence>
      </Suspense>
    </section>
  )
}
