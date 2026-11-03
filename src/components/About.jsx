import { motion } from 'framer-motion'
import { about, profile } from '../data/portfolio.js'
import SectionTitle, { fadeUp } from './SectionTitle.jsx'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <SectionTitle eyebrow="Discover" title="About Me"/>

      {/* items-stretch: tinggi foto mengikuti tinggi isi di kanan (sampai baris terakhir Personal Details) */}
      <div className="grid items-stretch gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Kiri: foto */}
        <motion.div {...fadeUp(0)} className="relative mx-auto w-full max-w-sm md:h-full">
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/30 to-accent2/30 blur-2xl" />
          <div className="overflow-hidden rounded-[1.75rem] border border-line bg-surface md:h-full">
            <img
              src={profile.photo}
              alt={profile.name}
              className="aspect-[4/5] w-full object-cover object-top md:aspect-auto md:h-full"
            />
          </div>
          <span className="pointer-events-none absolute -bottom-8 -left-4 -z-10 select-none text-7xl font-extrabold text-white/[0.04]">
            DEV
          </span>
        </motion.div>

        {/* Kanan: isi about */}
        <div>
          <div className="grid gap-10 sm:grid-cols-2">
            <motion.div {...fadeUp(0.1)}>
              <h3 className="border-b border-line pb-3 text-xl font-bold">Who Am I</h3>
              <p className="mt-4 leading-relaxed text-muted">{about.whoAmI}</p>
            </motion.div>
            <motion.div {...fadeUp(0.2)}>
              <h3 className="border-b border-line pb-3 text-xl font-bold">My Approach</h3>
              <p className="mt-4 leading-relaxed text-muted">{about.approach}</p>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.3)} className="mt-12">
            <h3 className="flex items-center gap-3 border-b border-line pb-3 text-xl font-bold">
              <span className="h-7 w-1 rounded-full bg-gradient-to-b from-accent to-accent2" />
              Personal Details
            </h3>
            <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {about.details.map((d) => (
                <div key={d.label}>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{d.label}</dt>
                  <dd className="mt-1 break-words font-semibold">{d.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
