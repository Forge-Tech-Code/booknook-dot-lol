import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base: one build serves booknook.lol and the github.io
  // project-pages fallback (forge-tech-code.github.io/booknook-dot-lol/),
  // where an absolute '/asset' would 404. See CLAUDE.md → Deployment.
  base: './',

  ssgOptions: {
    // privacy/index.html rather than privacy.html, so pages answer on /privacy/.
    dirStyle: 'nested',
    // vite-react-ssg writes the same './assets/…' refs into every page; walk
    // them back up for pages below the root. Only href/src values starting
    // './' are touched. Same fix as ../word-and-rijec-dot-com.
    onPageRendered(route, html) {
      const depth = route.split('/').filter(Boolean).length
      if (depth === 0) return html
      return html.replace(/(\s(?:href|src)=")\.\//g, `$1${'../'.repeat(depth)}`)
    },
  },
})
