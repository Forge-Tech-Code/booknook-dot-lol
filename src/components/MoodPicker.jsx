import { MOODS } from '../moods'
import { useMood } from '../mood'

/** Five little round windows, one per mood, plus the app's System/Light/Dark choice. */
export default function MoodPicker() {
  const { mood, mode, setMood, setMode } = useMood()
  const current = MOODS.find((m) => m.id === mood)
  return (
    <div>
      <div role="radiogroup" aria-label="Theme" className="flex flex-wrap justify-center gap-3 sm:gap-5">
        {MOODS.map((m) => {
          const on = m.id === mood
          return (
            <button key={m.id} type="button" role="radio" aria-checked={on} onClick={() => setMood(m.id)}
              className={`mood-chip group ${on ? 'is-on' : ''}`}>
              <span className="mood-window" aria-hidden="true">
                <span className="mood-sky" style={{ background: `linear-gradient(${m.light.skyTop}, ${m.light.skyMid} 55%, ${m.light.skyBottom})` }} />
                <span className="mood-sky" style={{ background: `linear-gradient(${m.dark.skyTop}, ${m.dark.skyMid} 55%, ${m.dark.skyBottom})`, clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
                <span className="mood-sill" style={{ background: m.light.wood }} />
              </span>
              <span className="text-sm font-bold">{m.label}</span>
            </button>
          )
        })}
      </div>
      <p className="mt-5 min-h-[1.5em] text-center text-ink-soft" aria-live="polite">{current.tagline}</p>
      <div role="radiogroup" aria-label="Light or dark" className="mx-auto mt-4 flex w-max gap-1 rounded-full bg-surface p-1 shadow-soft">
        {[['system', 'System'], ['light', 'Day'], ['dark', 'Night']].map(([id, label]) => (
          <button key={id} type="button" role="radio" aria-checked={mode === id} onClick={() => setMode(id)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${mode === id ? 'bg-primary text-on-primary' : 'text-ink-soft hover:text-ink'}`}>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
