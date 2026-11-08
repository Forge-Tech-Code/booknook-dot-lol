/**
 * URLs for files in public/. `base` is './' (see vite.config.js), so every
 * path is document-relative, and pages below the root need '../' in front.
 * Pass the page's depth; never write a root-relative '/screens/…'.
 */
export const prefix = (depth = 0) => (depth === 0 ? './' : '../'.repeat(depth))
export const asset = (path, depth = 0) => `${prefix(depth)}${path}`

/** Screenshot widths that exist in public/screens/ (see scripts/screens.py). */
export const SCREEN_WIDTHS = [360, 720]

/** srcset for screens/<mood>-<light|dark>-<screen>-<w>.webp */
export function screenSet(mood, scheme, screen, depth = 0) {
  const name = (w) => asset(`screens/${mood}-${scheme}-${screen}-${w}.webp`, depth)
  return {
    src: name(SCREEN_WIDTHS[SCREEN_WIDTHS.length - 1]),
    srcSet: SCREEN_WIDTHS.map((w) => `${name(w)} ${w}w`).join(', '),
  }
}
