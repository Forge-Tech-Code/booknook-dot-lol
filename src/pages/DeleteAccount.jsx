import Prose from '../components/Prose'
import Seo from '../components/Seo'
import { site } from '../siteInfo'

/* Google Play requires a web page for account deletion; the Play Console links here. */
export default function DeleteAccount() {
  const mail = `mailto:${site.email}?subject=${encodeURIComponent('Delete my BookNook account')}`
  return (
    <Prose title="Delete your account">
      <Seo title="Delete your account · BookNook" description="How to delete your BookNook sync account and everything stored with it." path="delete-account/" />
      <p className="lede">You only have an account if you signed in to sync. Without one, everything is on your phone, and uninstalling the app removes it.</p>

      <h2>In the app</h2>
      <ol>
        <li>Open BookNook and go to <strong>Settings</strong>.</li>
        <li>Tap <strong>Account &amp; sync</strong>.</li>
        <li>Tap <strong>Delete account</strong> and confirm.</li>
      </ol>

      <h2>Without the app</h2>
      <p>Email <a href={mail}>{site.email}</a> from the address you signed in with, and ask us to delete your BookNook
        account. We delete it and reply when it's done.</p>

      <h2>What gets deleted</h2>
      <p>Your account and everything synced with it: books, shelves, ratings, notes, cover photos and settings. It is
        removed from the server straight away, and nothing is kept. A copy on your phone stays until you uninstall
        the app.</p>
    </Prose>
  )
}
