import { HiArrowRight, HiLocationMarker } from 'react-icons/hi'
import { profile, socials } from '../data/portfolio.js'
import Section from './Section.jsx'
import { Icon } from './icons.jsx'

export default function Contact() {
  const { map } = profile
  const rows = [
    socials.find((s) => s.icon === 'github'),
    { icon: 'email', label: 'Email', handle: profile.email, url: `mailto:${profile.email}` },
    { icon: 'whatsapp', label: 'WhatsApp', handle: `+${profile.whatsapp}`, url: `https://wa.me/${profile.whatsapp}` },
    ...socials.filter((s) => s.icon !== 'github'),
  ].filter(Boolean)

  return (
    <Section
      id="contact"
      index="06"
      title="Contact Me"
      subtitle="Punya proyek atau ingin berkolaborasi? Hubungi saya di bawah ini."
    >
      <div className="grid gap-10 xl:grid-cols-2">
        <ul className="border-t border-line">
          {rows.map((r) => (
            <li key={r.label} className="border-b border-line">
              <a
                href={r.url}
                target={r.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="flex min-h-11 items-center gap-3 py-3 transition-colors hover:text-accent"
              >
                <Icon name={r.icon} className="shrink-0 text-xl" />
                {/* Di HP nama dan handle bertumpuk supaya email tidak terpotong */}
                <span className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:gap-3">
                  <span className="shrink-0 font-medium sm:w-24">{r.label}</span>
                  <span className="min-w-0 truncate font-mono text-sm text-muted">{r.handle}</span>
                </span>
                <HiArrowRight aria-hidden="true" className="shrink-0" />
              </a>
            </li>
          ))}
        </ul>

        <div>
          <div className="relative h-72 overflow-hidden border border-line">
            <iframe
              title="Lokasi"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(map.query)}&z=14&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale"
            />
          </div>
          <a
            href={map.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm transition-colors hover:text-accent"
          >
            <HiLocationMarker aria-hidden="true" className="text-accent" />
            {map.label}, {profile.location}
          </a>
        </div>
      </div>
    </Section>
  )
}
