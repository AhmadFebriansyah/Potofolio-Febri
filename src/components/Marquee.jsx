import { profile } from '../data/portfolio.js'

export default function Marquee() {
  const items = Array.from({ length: 8 }, (_, i) =>
    i % 2 === 0 ? `Hello, I'm ${profile.nickname}` : profile.role,
  )

  return (
    <div className="relative my-16 -rotate-2 border-y border-line bg-gradient-to-r from-accent/10 via-accent2/10 to-accent/10 py-4">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((text, i) => (
          <span key={i} className="mx-6 flex items-center gap-6 whitespace-nowrap text-xl font-bold md:text-2xl">
            <span className={i % 2 ? 'text-gradient' : ''}>{text}</span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
