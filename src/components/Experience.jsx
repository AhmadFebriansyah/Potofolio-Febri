import { experiences } from '../data/portfolio.js'
import Section from './Section.jsx'

export default function Experience() {
  return (
    <Section id="experience" index="02" title="Work Experience">
      <ol className="divide-y divide-line">
        {experiences.map((exp) => (
          <li
            key={exp.role + exp.company}
            className="grid gap-2 py-8 first:pt-0 last:pb-0 md:grid-cols-[10.5rem_minmax(0,1fr)] md:gap-8"
          >
            <p className="font-mono text-sm text-muted">{exp.period}</p>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{exp.role}</h3>
              <p className="mt-1 font-medium text-accent">{exp.company}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{exp.description}</p>
              <p className="mt-4 font-mono text-xs leading-relaxed text-muted">{exp.tech.join(' · ')}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
