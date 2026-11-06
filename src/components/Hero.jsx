import { HiArrowRight, HiDownload } from 'react-icons/hi'
import { profile, socials } from '../data/portfolio.js'
import { Icon } from './icons.jsx'

export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-5 pb-8 pt-24">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 font-mono text-sm text-muted">
        <span>{profile.location}</span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 bg-accent" aria-hidden="true" />
          Available for work
        </span>
      </div>

      <h1 className="mt-4 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
        {profile.name}
      </h1>

      <div className="mt-8 grid gap-10 border-t border-ink pt-8 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-16">
        <div>
          <p className="font-mono text-sm text-accent">{profile.roles.join(' / ')}</p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center gap-2 bg-ink px-5 font-medium text-bg transition-colors hover:bg-accent"
            >
              Explore Work <HiArrowRight aria-hidden="true" />
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex min-h-11 items-center gap-2 border border-ink px-5 font-medium transition-colors hover:bg-ink hover:text-bg"
            >
              <HiDownload aria-hidden="true" /> Download CV
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 text-sm">
            {socials.slice(0, 3).map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  <Icon name={s.icon} className="text-base" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <img
          src={profile.photo}
          alt={profile.name}
          fetchPriority="high"
          className="order-first aspect-[4/5] w-40 border border-line object-cover object-top md:order-none md:w-full"
        />
      </div>

      <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-5">
        {profile.highlights.map((h) => (
          <div key={h.label} className="flex flex-col-reverse justify-end">
            <dt className="mt-1 font-mono text-xs text-muted">{h.label}</dt>
            <dd className="text-xl font-semibold tracking-tight sm:text-2xl">{h.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
