/**
 * The app's five moods, each with a day (light) and night (dark) palette.
 *
 * Source of truth: booknook/app/src/main/java/dev/forgetech/booknook/ui/theme/Mood.kt
 * (`paletteFor`) for the colours, CozyProps.kt / AmbientScene.kt for the scene
 * props. If the app's palette changes, change it here too. See CLAUDE.md → Theme.
 *
 * `id` is the app's enum name in lower case; screenshots are named after it.
 */
export const MOODS = [
  {
    id: 'dusk',
    label: 'Lo-fi Dusk',
    tagline: 'Golden hour by day, lamp-lit city by night',
    cat: { fur: '#E8A060', stripe: '#C77A3A' },
    blanket: ['#B79AD6', '#FFD2B8'],
    plant: '#5E9A6A',
    books: ['#7A2E3A', '#26375E', '#C8962E'],
    light: {
      primary: '#B4566B', onPrimary: '#FFFFFF', primaryContainer: '#FFD9DF', onPrimaryContainer: '#3F0A1A',
      secondary: '#7A5C9E', tertiary: '#E09A3E',
      background: '#FBF1EA', surface: '#FFF8F3', ink: '#3A2A35', inkSoft: '#5E4A52', outline: '#9C8790',
      skyTop: '#E9A3A8', skyMid: '#F7C9A6', skyBottom: '#FFE6BE', onHeader: '#4A2638',
      wood: '#A0705E', woodEdge: '#6E4A3E', glow: '#FFD27A', star: '#E09A3E',
    },
    dark: {
      primary: '#F6A58A', onPrimary: '#3B1F2B', primaryContainer: '#6B4A7A', onPrimaryContainer: '#FFE3D6',
      secondary: '#C9A7E8', tertiary: '#FFD38A',
      background: '#2B2340', surface: '#352B4F', ink: '#F3E6F0', inkSoft: '#CDBFDB', outline: '#8C7DA6',
      skyTop: '#2E2552', skyMid: '#8E5A8C', skyBottom: '#F6A58A', onHeader: '#FFF1E8',
      wood: '#8A5A4A', woodEdge: '#5E3B33', glow: '#FFC27A', star: '#FFD38A',
    },
  },
  {
    id: 'rainy_cafe',
    label: 'Rainy Café',
    tagline: 'Coffee, a grey cat and rain on the glass',
    cat: { fur: '#9EA6AB', stripe: '#7C858B' },
    blanket: ['#EFE3C8', '#C9B48F'],
    plant: '#4F8A5A',
    books: ['#2F6E6A', '#9C4A2A', '#EFE3C8'],
    light: {
      primary: '#3F6F73', onPrimary: '#FFFFFF', primaryContainer: '#C6E1DF', onPrimaryContainer: '#0F2E31',
      secondary: '#8A5A3B', tertiary: '#C9875A',
      background: '#EEF1EC', surface: '#F7F5F0', ink: '#2C2A27', inkSoft: '#555A55', outline: '#8D928C',
      skyTop: '#6F8C90', skyMid: '#93AEAD', skyBottom: '#C3D3CC', onHeader: '#1F2E30',
      wood: '#8B6247', woodEdge: '#5C3F2C', glow: '#FFE2B0', star: '#E0A243',
    },
    dark: {
      primary: '#8FCFCB', onPrimary: '#003734', primaryContainer: '#2C4F52', onPrimaryContainer: '#C6EEEA',
      secondary: '#E0B48F', tertiary: '#F0B27A',
      background: '#1A2326', surface: '#212C30', ink: '#E3E6E1', inkSoft: '#B7C2C0', outline: '#6E7B7B',
      skyTop: '#0F1A22', skyMid: '#1C2E36', skyBottom: '#2F4A50', onHeader: '#EEF0EA',
      wood: '#6E4C36', woodEdge: '#3B281C', glow: '#FFC27A', star: '#F0B27A',
    },
  },
  {
    id: 'forest',
    label: 'Forest Cabin',
    tagline: 'Pine, plaid blankets and fireflies',
    cat: { fur: '#A88058', stripe: '#7D5A3A' },
    blanket: ['#B5483A', '#2F4F3E'],
    plant: '#3F7A4A',
    books: ['#2F4F3E', '#B8603E', '#8AA07A'],
    light: {
      primary: '#4F7350', onPrimary: '#FFFFFF', primaryContainer: '#D2E5C7', onPrimaryContainer: '#142812',
      secondary: '#8B6B43', tertiary: '#D9A441',
      background: '#F3F1E4', surface: '#FBF9EE', ink: '#262B22', inkSoft: '#50574A', outline: '#8A9180',
      skyTop: '#F6E3B4', skyMid: '#E4E3B8', skyBottom: '#B9D3A8', onHeader: '#233322',
      wood: '#9A6B43', woodEdge: '#6A4529', glow: '#FFF3C4', star: '#D9A441',
    },
    dark: {
      primary: '#A6CFA0', onPrimary: '#11361A', primaryContainer: '#2F4D30', onPrimaryContainer: '#C9EDC0',
      secondary: '#D9B98C', tertiary: '#EFCB6B',
      background: '#151B15', surface: '#1C241C', ink: '#E1E6D9', inkSoft: '#B9C3B0', outline: '#6F7A68',
      skyTop: '#0B1424', skyMid: '#17283A', skyBottom: '#2A4038', onHeader: '#EAF0E2',
      wood: '#6B4A30', woodEdge: '#452F1E', glow: '#FFD27A', star: '#EFCB6B',
    },
  },
  {
    id: 'midnight',
    label: 'Midnight Library',
    tagline: 'Lavender dawn or a starry night',
    cat: { fur: '#41414F', stripe: '#2E2E3A' },
    blanket: ['#2E3D78', '#E5C07B'],
    plant: '#5B8A5E',
    books: ['#5E3A6E', '#26375E', '#C8962E'],
    light: {
      primary: '#4E5BA6', onPrimary: '#FFFFFF', primaryContainer: '#DEE1FF', onPrimaryContainer: '#0E1A5C',
      secondary: '#9A7A2E', tertiary: '#8B6CC0',
      background: '#F4F2FA', surface: '#FBFAFF', ink: '#23243A', inkSoft: '#4D4C63', outline: '#8A8AA0',
      skyTop: '#6A75B5', skyMid: '#B6A5D6', skyBottom: '#F7D3C3', onHeader: '#FFFFFF',
      wood: '#9C8466', woodEdge: '#6E5C48', glow: '#FFD9A8', star: '#C79A2E',
    },
    dark: {
      primary: '#9DB4FF', onPrimary: '#13204A', primaryContainer: '#2A3A6E', onPrimaryContainer: '#DCE4FF',
      secondary: '#E5C07B', tertiary: '#B79CE0',
      background: '#10162B', surface: '#172040', ink: '#D9DEF0', inkSoft: '#A9B1CC', outline: '#5D678A',
      skyTop: '#070B1C', skyMid: '#121B3D', skyBottom: '#26325E', onHeader: '#E3E7F7',
      wood: '#4A4363', woodEdge: '#262238', glow: '#E5C07B', star: '#E5C07B',
    },
  },
  {
    id: 'seaside',
    label: 'Croatian Coast',
    tagline: 'Stone towns, red roofs, the Adriatic',
    cat: { fur: '#F6F1E8', stripe: '#E39A55' },
    blanket: ['#F7F4EC', '#1C6E8C'],
    plant: '#8E74C9',
    books: ['#1C6E8C', '#C4562E', '#EFE3C8'],
    light: {
      primary: '#1C6E8C', onPrimary: '#FFFFFF', primaryContainer: '#C9EAF4', onPrimaryContainer: '#00303F',
      secondary: '#C4562E', tertiary: '#E1A93B',
      background: '#FBF8F1', surface: '#FFFDF8', ink: '#1D2A33', inkSoft: '#57606A', outline: '#9AA0A3',
      skyTop: '#5CB8E4', skyMid: '#A6DDF2', skyBottom: '#F3F0E2', onHeader: '#0E3247',
      wood: '#D8CBB0', woodEdge: '#B3A386', glow: '#FFE6A8', star: '#E1A93B',
    },
    dark: {
      primary: '#7FCBE6', onPrimary: '#003545', primaryContainer: '#1F4C5E', onPrimaryContainer: '#C9EEFA',
      secondary: '#F0A07C', tertiary: '#EBC067',
      background: '#121B24', surface: '#18242F', ink: '#E0E6EA', inkSoft: '#B2BEC6', outline: '#66737C',
      skyTop: '#141B3A', skyMid: '#3B3F6E', skyBottom: '#C7806C', onHeader: '#F0EEF5',
      wood: '#8E8270', woodEdge: '#5E5547', glow: '#FFC56E', star: '#EBC067',
    },
  },
]

export const DEFAULT_MOOD = 'dusk'
export const moodById = (id) => MOODS.find((m) => m.id === id) ?? MOODS[0]

const kebab = (k) => k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
const vars = (p) => Object.entries(p).map(([k, v]) => `--${kebab(k)}:${v}`).join(';')

/**
 * The CSS that maps <html data-mood data-mode> to custom properties.
 *
 * With no attributes (prerendered HTML, no JS) the page is Lo-fi Dusk and
 * follows the system light/dark, like the app's "System" theme mode.
 * data-mode="light" / "dark" forces one, as the app's toggle does.
 */
export function moodCss() {
  const out = []
  for (const m of MOODS) {
    const sel = m.id === DEFAULT_MOOD ? `:root:not([data-mood]),:root[data-mood="${m.id}"]` : `:root[data-mood="${m.id}"]`
    const dark = sel.split(',').map((s) => `${s}:not([data-mode="light"])`).join(',')
    const forced = sel.split(',').map((s) => `${s}[data-mode="dark"]`).join(',')
    out.push(`${sel}{${vars(m.light)};color-scheme:light}`)
    out.push(`@media (prefers-color-scheme: dark){${dark}{${vars(m.dark)};color-scheme:dark}}`)
    out.push(`${forced}{${vars(m.dark)};color-scheme:dark}`)
  }
  return out.join('\n')
}
