/**
 * The app's launcher icon: an open book under a crescent moon on a dusk sky.
 * Paths copied from booknook res/drawable/ic_launcher_{background,foreground}.xml,
 * cropped to the adaptive-icon safe zone. public/favicon.svg is the same drawing.
 */
export default function Icon({ className = '', title }) {
  return (
    <svg viewBox="18 18 72 72" className={className} aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id="icon-bg" x1="0" y1="18" x2="0" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3B2F5C" />
          <stop offset="0.5" stopColor="#B0668A" />
          <stop offset="1" stopColor="#F6A58A" />
        </linearGradient>
      </defs>
      <rect x="18" y="18" width="72" height="72" rx="18" fill="url(#icon-bg)" />
      <path d="M60,26a11,11 0,1 0,12 15a9,9 0,1 1,-12 -15z" fill="#FFE3C2" />
      <path d="M27,55L27,80Q40.5,74 54,80Q67.5,74 81,80L81,55Q67.5,49 54,55Q40.5,49 27,55z" fill="#F28C6B" />
      <path d="M30,52Q42,46 53,52L53,76Q42,70 30,76z" fill="#FFF4E6" />
      <path d="M55,52Q66,46 78,52L78,76Q66,70 55,76z" fill="#FFF4E6" />
      <path d="M35,57Q41,54.5 48,57M35,62Q41,59.5 48,62M35,67Q41,64.5 48,67M60,57Q66,54.5 73,57M60,62Q66,59.5 73,62M60,67Q66,64.5 73,67"
        stroke="#D9C2CF" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  )
}
