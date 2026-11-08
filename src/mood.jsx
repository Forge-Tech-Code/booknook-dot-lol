import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { DEFAULT_MOOD, MOODS } from './moods'

/**
 * Which mood the page wears, and light/dark: 'system' | 'light' | 'dark',
 * like the app's ThemeMode.
 *
 * The prerendered HTML is always the default (Lo-fi Dusk, system), and the
 * saved choice is applied only after mount, so the first client render
 * matches the HTML. The choice lives on <html data-mood data-mode>, which
 * the CSS from moods.js reads.
 */
const MoodContext = createContext(null)
const KEY = 'booknook.theme'

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (v && MOODS.some((m) => m.id === v.mood) && ['system', 'light', 'dark'].includes(v.mode)) return v
  } catch { /* private window, blocked storage: just use the default */ }
  return null
}

export function MoodProvider({ children }) {
  const [mood, setMoodState] = useState(DEFAULT_MOOD)
  const [mode, setModeState] = useState('system')
  const [systemDark, setSystemDark] = useState(null) // null until mounted

  useEffect(() => {
    const saved = load()
    if (saved) { setMoodState(saved.mood); setModeState(saved.mode) }
    // ?mood=forest&mode=dark links to one look (and lets a headless browser check each).
    const q = new URLSearchParams(window.location.search)
    if (MOODS.some((m) => m.id === q.get('mood'))) setMoodState(q.get('mood'))
    if (['system', 'light', 'dark'].includes(q.get('mode'))) setModeState(q.get('mode'))
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemDark(mq.matches)
    const on = (e) => setSystemDark(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.mood = mood
    if (mode === 'system') delete root.dataset.mode
    else root.dataset.mode = mode
    try { localStorage.setItem(KEY, JSON.stringify({ mood, mode })) } catch { /* ignore */ }
  }, [mood, mode])

  const setMood = useCallback((m) => setMoodState(m), [])
  const setMode = useCallback((m) => setModeState(m), [])
  // The scheme actually showing. null before mount in system mode: the CSS decides.
  const dark = mode === 'system' ? systemDark : mode === 'dark'

  return <MoodContext.Provider value={{ mood, mode, dark, setMood, setMode }}>{children}</MoodContext.Provider>
}

export const useMood = () => useContext(MoodContext)
