import { motion } from 'framer-motion'
import { profile } from '../data/portfolio.js'

export default function Loader() {
  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-bg"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold md:text-6xl"
      >
        <span className="text-gradient">{profile.brand}</span>
      </motion.h1>
      <div className="h-1 w-48 overflow-hidden rounded-full bg-line">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-accent to-accent2"
        />
      </div>
      <p className="font-mono text-xs tracking-[0.3em] text-muted">PORTFOLIO LOADING</p>
    </motion.div>
  )
}
