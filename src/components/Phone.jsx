import { useMood } from '../mood'
import { screenSet } from '../images'

/**
 * A screenshot in a soft phone frame. Shows the screen in the page's current
 * mood and light/dark. In 'system' mode before JS runs, a <picture> source
 * picks the dark shot from prefers-color-scheme, so the prerendered page is
 * right too. `mood` overrides the page's mood (the "peek inside" strip).
 */
export default function Phone({ screen, mood: moodOverride, depth = 0, alt, sizes = '(min-width: 1024px) 300px, 70vw', className = '', eager = false }) {
  const { mood: pageMood, mode, dark } = useMood()
  const mood = moodOverride ?? pageMood
  const light = screenSet(mood, 'light', screen, depth)
  const night = screenSet(mood, 'dark', screen, depth)
  const forced = mode !== 'system' || dark !== null ? (dark ? night : light) : null
  const img = forced ?? light
  return (
    <div className={`phone ${className}`}>
      <picture>
        {!forced && <source media="(prefers-color-scheme: dark)" srcSet={night.srcSet} sizes={sizes} />}
        <img src={img.src} srcSet={img.srcSet} sizes={sizes} alt={alt} width="1080" height="2400"
          loading={eager ? 'eager' : 'lazy'} decoding="async" className="block h-auto w-full" />
      </picture>
    </div>
  )
}
