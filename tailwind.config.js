/** @type {import('tailwindcss').Config} */
// Colours are CSS variables set per mood and light/dark by src/moods.js,
// so one class (`bg-surface`) is right in all ten looks.
const v = (name) => `var(--${name})`
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: v('primary'),
        'on-primary': v('on-primary'),
        'primary-container': v('primary-container'),
        'on-primary-container': v('on-primary-container'),
        secondary: v('secondary'),
        tertiary: v('tertiary'),
        background: v('background'),
        surface: v('surface'),
        ink: { DEFAULT: v('ink'), soft: v('ink-soft') },
        outline: v('outline'),
        'on-header': v('on-header'),
      },
      fontFamily: {
        display: ['Fredoka', 'ui-rounded', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      // The app's Material shapes: 12 / 18 / 26 / 32 dp.
      borderRadius: { sm: '12px', md: '18px', lg: '26px', xl: '32px' },
      boxShadow: {
        soft: '0 2px 8px -3px rgb(0 0 0 / 0.14), 0 16px 36px -18px rgb(0 0 0 / 0.28)',
        lift: '0 10px 24px -10px rgb(0 0 0 / 0.28), 0 40px 70px -30px rgb(0 0 0 / 0.40)',
      },
    },
  },
  plugins: [],
}
