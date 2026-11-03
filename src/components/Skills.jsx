import { motion } from 'framer-motion'
import { skills } from '../data/portfolio.js'
import SectionTitle, { fadeUp } from './SectionTitle.jsx'
import { Icon } from './icons.jsx'

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
      <SectionTitle eyebrow="Skills & Tools" title="My Tech Stack"/>

      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((group, gi) => (
          <motion.div key={group.category} {...fadeUp(gi * 0.1)} className="card p-7">
            <h3 className="mb-5 flex items-center gap-3 text-lg font-bold">
              <span className="h-6 w-1 rounded-full bg-gradient-to-b from-accent to-accent2" />
              {group.category}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {group.items.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -4 }}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-bg/50 px-3 py-3 transition hover:border-accent/50"
                >
                  <Icon name={item.icon} colored className="shrink-0 text-2xl grayscale transition group-hover:grayscale-0" />
                  <span className="truncate text-sm font-medium">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
