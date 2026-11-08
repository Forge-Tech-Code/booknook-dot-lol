import Prose from '../components/Prose'
import Seo from '../components/Seo'
import { site } from '../siteInfo'

/*
 * Terms of use for the app and its optional sync. Plain language, kept short like the privacy page.
 * The Play Console links here. Bump the date below and <lastmod> in public/sitemap.xml when the
 * wording changes.
 */
export default function Terms() {
  return (
    <Prose title="Terms">
      <Seo title="Terms · BookNook" description="The terms for using BookNook and its optional sync." path="terms/" />
      <p className="lede">
        These terms cover the BookNook app and its optional sync, both made by{' '}
        <a href={site.companyUrl}>{site.company}</a>. By using BookNook you agree to them.
      </p>
      <p>Last updated 8 November 2026.</p>

      <h2>Buying BookNook</h2>
      <p>
        BookNook is a one-time purchase through Google Play. There is no subscription and nothing to buy inside the
        app. Google Play's terms and refund policy apply to the purchase.
      </p>

      <h2>Your library is yours</h2>
      <p>
        The books, ratings, notes and photos you add belong to you. We claim no rights to them. If you sign in to
        sync, we store them only so they can sync between your phones. The <a href="../privacy/">privacy policy</a>{' '}
        says exactly what is stored and where.
      </p>

      <h2>Sync</h2>
      <ul>
        <li>Sync is optional and comes with the app at no extra cost. BookNook works fully without it.</li>
        <li>
          We run it with care, but it may sometimes be slow or unavailable, and we can't promise it never loses data.
        </li>
        <li>
          We may change sync or, if we ever have to, stop offering it. If we stop, we will tell you in advance, the
          app keeps working on your phone, and your library stays there.
        </li>
        <li>
          <strong>Keep your own backup:</strong> Settings → Backup exports your whole library to a file you keep.
        </li>
      </ul>

      <h2>Fair use</h2>
      <p>
        Please use sync for your own library. Don't try to reach other people's data, overload or attack the service,
        or use it to store things other than your books. We may close an account that does.
      </p>

      <h2>Book data</h2>
      <p>
        Search results, details and covers come from <a href="https://openlibrary.org">Open Library</a>, a free,
        community-edited catalogue. They can be incomplete or wrong, and Open Library's own terms apply to them.
      </p>

      <h2>Your account</h2>
      <p>
        You can sign out or <a href="../delete-account/">delete your account</a> at any time. Deleting it removes
        everything synced from our server.
      </p>

      <h2>Responsibility</h2>
      <p>
        BookNook is provided as it is. As far as the law allows, we are not liable for lost data or for indirect
        losses from using the app or sync. Nothing in these terms limits rights you have under the consumer law of
        the country you live in, or any responsibility that cannot be excluded by law.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The date above shows the latest version, and we will mention bigger changes in the
        app or here.
      </p>

      <p>Questions: <a href={`mailto:${site.email}`}>{site.email}</a></p>
    </Prose>
  )
}
