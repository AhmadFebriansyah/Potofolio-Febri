import { skills } from '../data/portfolio.js'
import Section from './Section.jsx'

export default function Skills() {
  return (
    <Section id="skills" index="03" title="Tech Stack">
      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="font-semibold">{group.category}</h3>
            <ul className="mt-3 border-t border-line">
              {group.items.map((item) => (
                <li key={item.name} className="border-b border-line py-2 font-mono text-sm text-muted">
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
