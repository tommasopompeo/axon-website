import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // No `colors` extension: every color is consumed as a raw CSS custom
      // property (`var(--token)`, set in design/tokens.css) via inline
      // `style` or app/globals.css, never as a Tailwind utility class
      // (verified: zero `bg-brand`/`text-muted`-style classNames anywhere in
      // app/ or components/, and removing this block produces a byte-for-byte
      // identical build CSS) — so a theme.colors block here mapped to nothing
      // generated. `fontFamily` stays: Tailwind's own Preflight base reset
      // reads `theme('fontFamily.sans')` to set `html`'s font-family, so this
      // one *does* reach generated CSS even though no className references it.
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      borderRadius: {
        lg:   'var(--radius-lg)',
        md:   'var(--radius-md)',
        pill: 'var(--radius-pill)',
      },
      maxWidth: {
        container: 'var(--container)',
      },
    },
  },
  plugins: [],
}

export default config
