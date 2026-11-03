// Loading screen hanya tampil sekali per sesi browser (tab baru = tampil lagi)
const KEY = 'intro-seen'

function readFirstVisit() {
  try {
    const first = !sessionStorage.getItem(KEY)
    sessionStorage.setItem(KEY, '1')
    return first
  } catch {
    return true
  }
}

export const SHOW_INTRO = readFirstVisit()
export const INTRO_MS = 1000
// Jeda animasi Hero supaya muncul setelah loading selesai
export const HERO_DELAY = SHOW_INTRO ? INTRO_MS / 1000 : 0
