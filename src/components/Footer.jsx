import { profile, socials } from '../data/portfolio.js'
import { Icon } from './icons.jsx'

export default function Footer() {
  return (
    <footer className="mx-auto mt-8 max-w-6xl px-5 pb-16 md:pb-0">
      <div className="flex flex-col gap-3 border-t border-ink py-6 text-sm text-muted md:flex-row md:items-center md:justify-between md:pr-44">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs">Built with React, Node.js & Vercel</p>
        <ul className="flex flex-wrap gap-x-5">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 py-2 hover:text-accent">
                <Icon name={s.icon} />
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
