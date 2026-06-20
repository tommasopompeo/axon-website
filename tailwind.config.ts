import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand:           'var(--brand)',
        'brand-hover':   'var(--brand-hover)',
        'brand-glow':    'var(--brand-glow)',
        'brand-soft':    'var(--brand-soft)',
        bg:              'var(--bg)',
        'bg-elevated':   'var(--bg-elevated)',
        surface:         'var(--surface)',
        'surface-2':     'var(--surface-2)',
        'text-primary':  'var(--text)',
        'text-muted':    'var(--text-muted)',
        'text-subtle':   'var(--text-subtle)',
        'header-bg':     'var(--header-bg)',
      },
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
