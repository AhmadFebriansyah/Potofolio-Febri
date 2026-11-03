import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ChatWidget from './components/ChatWidget.jsx'
import Certificates from './components/Certificates.jsx'
import { Analytics } from '@vercel/analytics/react'
import { SHOW_INTRO, INTRO_MS } from './intro.js'

export default function App() {
  const [loading, setLoading] = useState(SHOW_INTRO)

  useEffect(() => {
    if (!SHOW_INTRO) return
    const t = setTimeout(() => setLoading(false), INTRO_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <Analytics />
    </>
  )
}
