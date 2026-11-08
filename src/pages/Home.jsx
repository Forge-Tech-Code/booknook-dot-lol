import Layout from '../components/Layout'
import Scene from '../components/Scene'
import Phone from '../components/Phone'
import MoodPicker from '../components/MoodPicker'
import PlayButton from '../components/PlayButton'
import Seo from '../components/Seo'
import { useMood } from '../mood'
import { site } from '../siteInfo'

// The "peek inside" strip: screen name (file slug) and its caption.
const PEEK = [
  ['shelf', 'Spines'],
  ['stats', 'Your year in stacks'],
  ['book', 'Notes & stars'],
  ['themes', 'Five nooks'],
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: site.name,
  url: site.url,
  operatingSystem: 'Android 8.0+',
  applicationCategory: 'LifestyleApplication',
  installUrl: site.playUrl,
  offers: { '@type': 'Offer', price: site.priceValue, priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: site.company, url: site.companyUrl },
}

function Window() {
  const { mood } = useMood()
  return (
    <div className="window">
      <Scene moodId={mood} className="absolute inset-0 h-full w-full" />
      <h1 className="absolute left-5 top-4 font-display text-5xl font-semibold text-on-header drop-shadow-sm sm:left-8 sm:top-6 sm:text-7xl">
        BookNook
      </h1>
    </div>
  )
}

export default function Home() {
  return (
    <Layout header={false}>
      <Seo
        title="BookNook: a cozy reading tracker for Android"
        description="Keep the books you've read, are reading and want to read on three little shelves, in a cozy window nook. One-time $0.99 on Google Play."
        jsonLd={jsonLd}
      />
      <main>
        <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 pt-4 sm:px-6 sm:pt-6 lg:grid-cols-[1fr_320px] lg:gap-14">
          <div>
            <Window />
            <div className="pt-8 text-center lg:text-left">
              <p className="mx-auto max-w-xl font-display text-2xl leading-snug text-ink sm:text-3xl lg:mx-0">
                A cozy little reading nook. Shelves for your books, and a cup of tea.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 lg:items-start">
                <PlayButton />
                <p className="text-sm text-ink-soft opacity-70">Android 8.0 and up · one-time purchase, no ads</p>
              </div>
            </div>
          </div>
          <div className="mx-auto w-64 sm:w-72 lg:w-full">
            <Phone screen="home" eager alt="BookNook's home screen: a window scene above shelves of book covers and spines" />
          </div>
          <div className="rounded-xl bg-surface px-4 py-7 shadow-soft sm:px-8 lg:col-span-2">
            <h2 className="text-center font-display text-2xl text-ink">Pick your nook</h2>
            <div className="mt-5"><MoodPicker /></div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl pt-20" aria-labelledby="peek">
          <h2 id="peek" className="px-4 text-center font-display text-3xl text-ink sm:px-6">A peek inside</h2>
          <ul className="peek mt-8">
            {PEEK.map(([screen, caption]) => (
              <li key={screen}>
                <Phone screen={screen} alt={caption} sizes="(min-width: 1024px) 240px, 60vw" />
                <p className="mt-3 text-center font-display text-lg text-ink-soft">{caption}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  )
}
