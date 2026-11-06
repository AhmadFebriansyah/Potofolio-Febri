import { about } from '../data/portfolio.js'
import Section from './Section.jsx'

export default function About() {
  return (
    <Section id="about" index="01" title="About Me">
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
        <div>
          <h3 className="font-semibold">Who Am I</h3>
          <p className="mt-2 leading-relaxed text-muted">{about.whoAmI}</p>
        </div>
        <div>
          <h3 className="font-semibold">My Approach</h3>
          <p className="mt-2 leading-relaxed text-muted">{about.approach}</p>
        </div>
      </div>

      <dl className="mt-10 grid gap-x-12 sm:grid-cols-2">
        {about.details.map((d) => (
          <div key={d.label} className="flex justify-between gap-6 border-t border-line py-3">
            <dt className="shrink-0 font-mono text-sm text-muted">{d.label}</dt>
            <dd className="min-w-0 break-words text-right font-medium">{d.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
