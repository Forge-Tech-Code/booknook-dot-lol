import Prose from '../components/Prose'
import Seo from '../components/Seo'
import { site } from '../siteInfo'

/*
 * The app's privacy policy. The source is booknook/PRIVACY.md: when that
 * changes, change this page in the same way (and the reverse).
 * The Play Console links here.
 */
export default function Privacy() {
  return (
    <Prose title="Privacy">
      <Seo title="Privacy · BookNook" description="What BookNook stores, where, and how to delete it." path="privacy/" />
      <p className="lede">BookNook works without an account. Until you sign in, your library stays on your phone.</p>

      <h2>If you sign in to sync</h2>
      <ul>
        <li><strong>What is stored:</strong> your email address (or your Google account's email and id), and your
          library: books, shelves, ratings, notes, photos you took for covers, and your app settings (theme, shelf order).</li>
        <li><strong>Where:</strong> a Supabase project hosted in the EU (Frankfurt). Each account can only read its own
          rows; this is enforced by the database (row level security), not just the app.</li>
        <li><strong>What is not collected:</strong> no analytics, no advertising ids, no tracking, no contacts or
          location. The camera is used only to read barcodes and take cover photos, on the phone.</li>
        <li><strong>Who else sees it:</strong> nobody. Supabase processes the data on BookNook's behalf. Searches,
          barcode lookups and cover images go to <a href="https://openlibrary.org">Open Library</a>, which sees the
          search, not who you are.</li>
      </ul>

      <h2>Payment</h2>
      <p>BookNook is bought through Google Play. Google handles the payment; the app never sees your payment details.</p>

      <h2>Deleting your data</h2>
      <ul>
        <li><strong>Sign out</strong> (Settings → Account &amp; sync): the phone stops syncing and keeps its copy.</li>
        <li><strong>Delete account</strong> (same place): deletes the account, every synced book, note, setting and
          cover photo from the server immediately. The copy on your phone stays until you uninstall the app.
          No longer have the app? See <a href="../delete-account/">Delete your account</a>.</li>
        <li>Phone backups to Google are switched off; the in-app export is the only other copy.</li>
      </ul>

      <p>Questions: <a href={`mailto:${site.email}`}>{site.email}</a></p>
    </Prose>
  )
}
