# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The website for **BookNook**, a cozy Android reading tracker sold on Google Play for $0.99. It is served at
**https://booknook.lol/** and has three pages:

- `/`: the landing page.
- `/privacy/`: the privacy policy.
- `/delete-account/`: the account-deletion page.

The Play Console links to the last two, which is the reason this site exists (see doopnet/booknook#1 on the forge).

The app lives in `~/repositories/f0rg3t3ch@git.doopnet.cloud/booknook`, and its `CLAUDE.md` describes it.
This site borrows the app's look: its five moods, its fonts, its icon and its window scene. It is a sibling of
`../word-and-rijec-dot-com` and shares its stack and deploy setup; when something here is unclear, look there.

**Tone:** cute, cozy, simple, and very little copy. Don't add feature lists, privacy or security selling points, or
FAQ-style padding to the landing page. The screenshots and the theme picker do the talking.

## Commands

```bash
source ~/.nvm/nvm.sh        # node 24; /usr/bin/node is an old 18
npm install
npm run dev                 # http://localhost:5173
npm run build               # prerenders all three pages to dist/
npm run preview
```

There are no tests, no linter and no typechecker. `npm run build` is the only gate: it prerenders every page, so
a render error fails the build. Run it before committing.

The helpers in `scripts/` are run by hand, and their output is committed:

```bash
uv run -q --with cairosvg --with Pillow python3 scripts/build-icons.py   # PNG icons from public/favicon.svg
uv run -q --with Pillow python3 scripts/screens.py                       # raw captures -> public/screens/*.webp
uv run -q python3 scripts/make-backup.py rows.json                       # library rows -> backup zips (see Screenshots)
uv run -q --with Pillow python3 scripts/og.py                            # public/og.png from the hero (needs preview on :4317)
```

Add `?mood=forest&mode=dark` to any page URL to open it in one look. It is applied after mount like the saved
choice, so it is also how headless Firefox (`firefox --headless --screenshot`) checks each look.

## Stack

- **Vite 5**, **React 18**, **Tailwind 3**, and **vite-react-ssg** in routes mode (`src/routes.jsx`, `dirStyle: 'nested'`).
- The router is only a list of pages to build. Links between pages are plain `<a>` with relative hrefs.
- The `'*'` route in `src/routes.jsx` is load-bearing. On the github.io fallback every path starts with
  `/booknook-dot-lol/`, the real routes don't match, and React Router replaces the page with a 404 on
  hydration. The catch-all picks the page from the path's last segment instead. A new page needs an entry
  in `PAGES` there too.
- No backend, analytics or cookies. `localStorage` holds only the visitor's chosen theme.

### The relative base and pages one directory down

- `base: './'` in `vite.config.js` is load-bearing. One build serves both `booknook.lol` and the github.io
  project-pages fallback (`forge-tech-code.github.io/booknook-dot-lol/`), where an absolute `/asset` path 404s.
- `/privacy/` and `/delete-account/` sit one directory down, so their `./` paths break. Two fixes cover this:
  - The `onPageRendered` hook in `vite.config.js` rewrites Vite's own `./` refs to `../`.
  - Our own references to `public/` go through `asset(path, depth)` and `prefix(depth)` in `src/images.js`.
- `Layout` takes `depth`. `Prose` (the legal page shell) passes `depth={1}`.
- **Never write a root-relative `/…` path.**

## Theme: the app's moods

- `src/moods.js` holds the app's five moods (Lo-fi Dusk, Rainy Café, Forest Cabin, Midnight Library, Croatian
  Coast), each with a light (day) and a dark (night) palette.
- They are copied from the app's `ui/theme/Mood.kt` (`paletteFor`). **That file is the source of truth**: if the
  app's colours change, copy them here.
- The per-mood scene props (cat fur, blanket, plant, book colours) come from `CozyProps.kt`.
- `moodCss()` turns the moods into CSS custom properties keyed on `<html data-mood data-mode>`. `Layout` puts that
  CSS in a `<style>` tag. Tailwind colour names (`bg-surface`, `text-ink`, `bg-primary`, `text-on-header`…) all
  point at those variables, so one class is right in all ten looks.
- **Don't add hex colours to components.** Use the variables, or add a token to every mood.
- With no attributes (the prerendered HTML, or no JS), the page is Lo-fi Dusk and follows `prefers-color-scheme`,
  like the app's "System" theme mode. `data-mode="light|dark"` forces one look, as the picker's Day/Night does.
- `src/mood.jsx` (`MoodProvider`, `useMood`) applies the saved choice **only after mount**, so the first client
  render matches the prerendered HTML. Don't read `localStorage` or `matchMedia` during render. `dark` is `null`
  until mount in system mode, which means the CSS decides.
- Fonts are **Fredoka** (headings, `font-display`) and **Nunito** (body, `font-sans`). Both are the app's own
  variable TTFs from `booknook/app/src/main/res/font/`, subset to latin and latin-ext woff2 in `public/fonts/`.
- Corner radii are the app's shapes (12/18/26/32px, as `rounded-sm/md/lg/xl`).

## The window scene (`src/components/Scene.jsx`)

- An SVG version of the app's header scene: the sky, one view per mood, and the sill with the sleeping cat,
  blanket, plant, book stack, mug, and a candle at night. It is simplified from `AmbientScene.kt` and `CozyProps.kt`.
- Parts that exist only by day or only by night carry `className="day"` or `"night"`. The CSS in `src/index.css`
  shows and hides them with the same rule as `moodCss()`, so dark mode is right without JS.
- **No randomness.** Every position is fixed, because the page is prerendered and a random layout would not
  match on hydration.
- Only one `<Scene>` may be on a page, because its gradient ids are global.
- All motion is CSS `anim-*` classes inside `@media (prefers-reduced-motion: no-preference)`. Anything new must
  be inside that block too, like the app's `LocalMotionEnabled`.

## Screenshots

`<Phone screen="home">` shows `public/screens/<mood>-<light|dark>-<screen>-<360|720>.webp`.

- Moods are `dusk`, `rainy_cafe`, `forest`, `midnight` and `seaside`.
- `home` exists for every mood and both modes, because it follows the picker.
- The "peek inside" screens (`shelf`, `stats`, `book`, `themes`) exist in every mood too.
- A `<picture>` source serves the dark shot from `prefers-color-scheme` before JS runs.

The shots show a real library: the test user's synced books, loaded into the emulator **without signing in as
them**. To redo them:

1. Read the rows, **read-only**, with the Supabase MCP (project `zyaqqteivuzapbwuhvnx`):
   - the user's `public.books` rows where `deleted_at is null`;
   - their `public.user_settings.prefs`.
2. Save them as `{"books": [...], "prefs": {...}}` in `scripts/.work/rows.json`. Never write to the server, and
   never read `notes`.
3. Run `scripts/make-backup.py`. It writes one backup zip per mood × mode, in the app's `BackupFormat.kt` v1
   format. The zips have no notes and no photo covers.
4. In the app repo, build the debug APK and boot AVD `booknook` with `-gpu swangle_indirect`. Turn the three
   animation scales to 0 and turn on SystemUI demo mode (clock 09:30, full battery).
5. Run `python3 scripts/capture-screens.py` (all looks), or name looks: `forest:dark`. For each look it:
   - pushes only that look's zip to Downloads;
   - imports it with **Replace all**;
   - captures the five screens into `scripts/.work/raw/<mood>-<mode>-<screen>.png`.

   The screens are:
   - home;
   - home scrolled to the Read shelf in spines (`shelf`);
   - stats scrolled to "Your year in books";
   - Pachinko's book page (`book`; it relies on that title being in her top 10);
   - Settings (`themes`).

   **The app must be signed out first.** A replace-import while signed in also replaces the synced account.
   `pm clear` the debug app before you start. Then import any one zip by hand, and tap **Show spines** on the
   Read shelf (a per-phone setting that backups don't carry). After that, every look shows spines there.
6. Run `scripts/screens.py`. Then run `adb shell pm clear dev.forgetech.booknook.debug`, and delete
   `scripts/.work/rows.json` and the zips.

`scripts/.work/` is gitignored, because it holds someone's real library. Keep it that way. Notes, email and the
account screen must never appear in a shot.

## Legal pages

- `src/pages/Privacy.jsx` is `booknook/PRIVACY.md` in JSX, plus a short "Payment" section (Google Play handles
  payment). **When either changes, change the other.**
- `src/pages/DeleteAccount.jsx` is the account-deletion page Play requires:
  - the in-app steps, which must match the app's Settings labels;
  - an email route to info@forge-tech.dev for people without the app.
- Bump `<lastmod>` in `public/sitemap.xml` when a page's content changes.

## What is real and what is placeholder

**Real:**
- the name, the price ($0.99, one-time), and Android 8.0+;
- the email `info@forge-tech.dev`;
- the moods and their taglines (from `Mood.kt`);
- the Play URL in `src/siteInfo.js`.

The Play URL is derived from the app's `applicationId` (`dev.forgetech.booknook`), so it is correct before the
listing is live. It 404s until then.

**Placeholder:**
- the hero line ("Your books on three little shelves…") in `src/pages/Home.jsx`;
- the captions in the `PEEK` list.

Both were drafted here and await the owner's wording.

JSON-LD (`MobileApplication`) claims only what's true. No ratings or reviews.

## Deployment

- Push to `main`, and `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages. It sets
  `enablement: true`, so it turns Pages on rather than failing.
- The repo is `Forge-Tech-Code/booknook-dot-lol` on GitHub.
- `public/CNAME` (`booknook.lol`) keeps the custom domain attached. Deleting it drops the site back to github.io
  on the next deploy.
- These files carry the origin `booknook.lol` and need the same edit if the domain changes:
  - `src/siteInfo.js`
  - `public/CNAME`
  - `public/sitemap.xml`
  - `public/robots.txt`
  - `public/404.html`: absolute URLs, because GitHub Pages serves it at any depth.

### DNS, one time

At the registrar, point the apex `booknook.lol` at GitHub Pages:

```
A     @   185.199.108.153
A     @   185.199.109.153
A     @   185.199.110.153
A     @   185.199.111.153
AAAA  @   2606:50c0:8000::153
AAAA  @   2606:50c0:8001::153
AAAA  @   2606:50c0:8002::153
AAAA  @   2606:50c0:8003::153
CNAME www forge-tech-code.github.io.
```

Then, in the repo's **Settings → Pages**, check the custom domain, wait for the DNS check to pass, and tick
**Enforce HTTPS**.
