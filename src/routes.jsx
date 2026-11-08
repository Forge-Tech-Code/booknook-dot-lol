import { useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Privacy from './pages/Privacy.jsx'
import DeleteAccount from './pages/DeleteAccount.jsx'

/**
 * The three prerendered pages. Nothing navigates through the router at
 * runtime: links between pages are plain <a> with relative hrefs, so each
 * load gets its own prerendered HTML.
 *
 * The catch-all is for the github.io fallback, where every path carries a
 * /booknook-dot-lol/ prefix the routes above don't know. Without it the
 * client router finds no match and swaps the page for a 404 on hydration.
 * It picks the page by the path's last segment, so it renders the same thing
 * as the prerendered file. vite-react-ssg does not prerender '*'.
 */
const PAGES = { privacy: Privacy, 'delete-account': DeleteAccount }

function ByPath() {
  const last = useLocation().pathname.split('/').filter(Boolean).pop()
  const Page = PAGES[last] ?? Home
  return <Page />
}

export const routes = [
  { path: '/', element: <Home /> },
  { path: 'privacy', element: <Privacy /> },
  { path: 'delete-account', element: <DeleteAccount /> },
  { path: '*', element: <ByPath /> },
]
