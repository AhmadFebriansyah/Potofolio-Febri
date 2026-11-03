import { profile, socials } from '../data/portfolio.js'
import { Icon } from './icons.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs">Built with React, Node.js & Vercel</p>
        <div className="flex gap-4 text-lg">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="hover:text-accent">
              <Icon name={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
