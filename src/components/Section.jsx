import { motion } from 'framer-motion'

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.35, delay, ease: 'easeOut' },
})

// Kerangka semua section: nomor & judul di kiri, isi di kanan
export default function Section({ id, index, title, subtitle, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-12 md:py-20">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 border-t border-ink pt-5 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-12">
        <header className="md:sticky md:top-24 md:self-start">
          <span className="font-mono text-sm text-accent">{index}</span>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-3 text-sm leading-relaxed text-muted">{subtitle}</p>}
        </header>
        <motion.div {...fadeUp()}>{children}</motion.div>
      </div>
    </section>
  )
}
