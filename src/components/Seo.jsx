import { Head } from 'vite-react-ssg'
import { site } from '../siteInfo'

/** Per-page <head>. index.html keeps only what every page shares. */
export default function Seo({ title, description, path = '', jsonLd }) {
  const url = `${site.url}${path}`
  const og = `${site.url}og.png`
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={og} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="BookNook: a sleeping cat on a windowsill at dusk" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={og} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Head>
  )
}
