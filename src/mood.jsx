import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { DEFAULT_MODE, DEFAULT_MOOD, MOODS } from './moods'

/**
 * Which mood the page wears, and light/dark: 'system' | 'light' | 'dark',
 * like the app's ThemeMode.
 *
 * The prerendered HTML is always the default (DEFAULT_MOOD in DEFAULT_MODE),
 * and the saved choice is applied only after mount, so the first client render
 * matches the HTML. The choice lives on <html data-mood data-mode>, which
 * the CSS from moods.js reads.
 *
 * Only a choice made in the picker is saved. (v1 of the key also saved the
 * untouched default, so it is not read: it would hide the new default.)
 */
const MoodContext = createContext(null)
const KEY = 'booknook.theme.v2'

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (v && MOODS.some((m) => m.id === v.mood) && ['system', 'light', 'dark'].includes(v.mode)) return v
  } catch { /* private window, blocked storage: just use the default */ }
  return null
}

export function MoodProvider({ children }) {
  const [mood, setMoodState] = useState(DEFAULT_MOOD)
  const [mode, setModeState] = useState(DEFAULT_MODE)
  const [systemDark, setSystemDark] = useState(null) // null until mounted
  const chosen = useRef(false) // set once the visitor picks a look

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
    root.dataset.mode = mode
    if (!chosen.current) return
    try { localStorage.setItem(KEY, JSON.stringify({ mood, mode })) } catch { /* ignore */ }
  }, [mood, mode])

  const setMood = useCallback((m) => { chosen.current = true; setMoodState(m) }, [])
  const setMode = useCallback((m) => { chosen.current = true; setModeState(m) }, [])
  // The scheme actually showing. null before mount in system mode: the CSS decides.
  const dark = mode === 'system' ? systemDark : mode === 'dark'

  return <MoodContext.Provider value={{ mood, mode, dark, setMood, setMode }}>{children}</MoodContext.Provider>
}

export const useMood = () => useContext(MoodContext)
