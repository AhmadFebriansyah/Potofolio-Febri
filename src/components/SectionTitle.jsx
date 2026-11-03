import { motion } from 'framer-motion'

export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-xl text-muted">{subtitle}</p>}
    </motion.div>
  )
}

// Animasi muncul saat di-scroll, dipakai berulang
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay },
})
