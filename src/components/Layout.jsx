import { MoodProvider } from '../mood'
import { moodCss } from '../moods'
import { site } from '../siteInfo'
import { prefix } from '../images'
import Icon from './Icon'

const MOOD_CSS = moodCss()

/** Every page: the mood CSS, a small header, the footer. `depth` = directories below the root. */
export default function Layout({ depth = 0, header = true, children }) {
  const home = prefix(depth)
  return (
    <MoodProvider>
      <style dangerouslySetInnerHTML={{ __html: MOOD_CSS }} />
      <div className="min-h-screen bg-background text-ink">
        {header && <header className="mx-auto flex max-w-6xl items-center px-4 pt-5 sm:px-6">
          <a href={home} className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink no-underline">
            <Icon className="h-9 w-9 drop-shadow-sm" />
            BookNook
          </a>
        </header>}
        {children}
        <footer className="mx-auto max-w-6xl px-4 pb-10 pt-16 text-sm text-ink-soft sm:px-6">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href={`${home}privacy/`}>Privacy</a>
            <a href={`${home}delete-account/`}>Delete account</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </nav>
          <p className="mt-4 text-center opacity-80">
            © {new Date().getFullYear()} <a href={site.companyUrl}>{site.company}</a> · Book data from{' '}
            <a href="https://openlibrary.org">Open Library</a>
          </p>
        </footer>
      </div>
    </MoodProvider>
  )
}
