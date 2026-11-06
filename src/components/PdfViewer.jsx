import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiX } from 'react-icons/hi'
import * as pdfjsLib from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

// Menampilkan PDF sebagai gambar (canvas) — tanpa tombol download/print & klik kanan
export default function PdfViewer({ url, title, onClose }) {
  const pagesRef = useRef(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    let cancelled = false
    const task = pdfjsLib.getDocument(encodeURI(url))

    task.promise
      .then(async (pdf) => {
        const container = pagesRef.current
        const width = Math.min(container.clientWidth, 1000)
        const ratio = window.devicePixelRatio || 1
        setStatus('ready')

        for (let n = 1; n <= pdf.numPages && !cancelled; n++) {
          const page = await pdf.getPage(n)
          const base = page.getViewport({ scale: 1 })
          const viewport = page.getViewport({ scale: (width / base.width) * ratio })

          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.style.width = '100%'
          canvas.className = 'mx-auto mb-4 max-w-[1000px] border border-line'
          container.appendChild(canvas)

          await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
        }
      })
      .catch(() => !cancelled && setStatus('error'))

    return () => {
      cancelled = true
      task.destroy()
    }
  }, [url])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onContextMenu={(e) => e.preventDefault()}
      className="fixed inset-0 z-[90] flex flex-col bg-bg"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <h3 className="truncate font-bold">{title}</h3>
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="grid h-11 w-11 shrink-0 place-items-center bg-ink text-xl text-bg transition-colors hover:bg-accent"
        >
          <HiX />
        </button>
      </div>

      <div className="flex-1 select-none overflow-y-auto px-4 py-6" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {status === 'loading' && <p className="mt-20 text-center text-muted">Memuat dokumen…</p>}
        {status === 'error' && <p className="mt-20 text-center text-red-700">Dokumen gagal dimuat.</p>}
        <div ref={pagesRef} className="mx-auto max-w-[1000px]" />
      </div>
    </motion.div>
  )
}
