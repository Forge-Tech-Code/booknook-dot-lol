import Layout from './Layout'

/** A legal page: one card of readable prose, one directory below the root. */
export default function Prose({ title, children }) {
  return (
    <Layout depth={1}>
      <main className="mx-auto max-w-2xl px-4 pt-10 sm:px-6">
        <article className="prose-card">
          <h1 className="font-display text-4xl font-semibold text-ink">{title}</h1>
          {children}
        </article>
      </main>
    </Layout>
  )
}
