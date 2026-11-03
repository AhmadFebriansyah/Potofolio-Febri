import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Saat development, jalankan fungsi di folder /api seperti di Vercel
function localApi() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) return next()
        const name = req.url.split('?')[0].replace('/api/', '')
        try {
          const mod = await server.ssrLoadModule(`/api/${name}.js`)
          await mod.default(req, res)
        } catch (err) {
          console.error(err)
          res.statusCode = 404
          res.end(JSON.stringify({ error: 'Not found' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Muat .env (mis. ANTHROPIC_API_KEY) ke process.env untuk fungsi /api saat development
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return {
    plugins: [react(), tailwindcss(), localApi()],
  }
})
