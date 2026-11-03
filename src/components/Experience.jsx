import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { experiences } from '../data/portfolio.js'
import SectionTitle from './SectionTitle.jsx'

export default function Experience() {
  const listRef = useRef(null)
  // 0 saat awal list di tengah layar, 1 saat akhir list di tengah layar
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start center', 'end center'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const headTop = useTransform(progress, (v) => `${v * 100}%`)

  return (
    <section id="experience" className="mx-auto max-w-4xl px-5 py-24">
      <SectionTitle eyebrow="Career Path" title="Work Experience" />

      <ol ref={listRef} className="relative ml-3 md:ml-0">
        {/* Garis dasar (redup) */}
        <div className="absolute left-0 top-0 h-full w-0.5 -translate-x-1/2 rounded-full bg-line md:left-1/2" />

        {/* Garis progres yang turun mengikuti scroll, dengan aliran cahaya */}
        <motion.div
          style={{ height: headTop }}
          className="timeline-flow absolute left-0 top-0 w-0.5 -translate-x-1/2 rounded-full md:left-1/2"
        />

        {/* Titik bercahaya di ujung garis */}
        <motion.div
          style={{ top: headTop }}
          className="pointer-events-none absolute left-0 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
        >
          <span className="block h-3 w-3 rounded-full bg-white shadow-[0_0_12px_4px] shadow-accent" />
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
        </motion.div>

        {experiences.map((exp, i) => {
          const left = i % 2 === 0
          return (
            <motion.li
              key={exp.role + exp.company}
              initial={{ opacity: 0, x: left ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className={`relative mb-10 pl-8 md:w-1/2 md:pl-0 ${left ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}
            >
              <div className="card p-6 transition hover:border-accent/50">
                <span className="font-mono text-xs text-accent">{exp.period}</span>
                <h3 className="mt-2 text-lg font-bold">{exp.role}</h3>
                <p className="text-sm font-semibold text-accent2">{exp.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{exp.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
