import { site } from '../siteInfo'

export default function PlayButton({ className = '' }) {
  return (
    <a href={site.playUrl} className={`btn-primary ${className}`}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
        <path d="M7 4.6v14.8c0 .8.9 1.3 1.6.9l11.7-7.4c.6-.4.6-1.4 0-1.8L8.6 3.7C7.9 3.3 7 3.8 7 4.6z" />
      </svg>
      <span>Get it on Google Play</span>
      <span className="price">{site.price}</span>
    </a>
  )
}
