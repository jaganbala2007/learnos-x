/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          main: 'var(--bg-main)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          border: 'var(--border-subtle)',
          borderAccent: 'var(--border-accent)',
          primary: 'var(--accent-primary)',
          amber: 'var(--accent-amber)',
          terracotta: 'var(--accent-terracotta)',
          sage: 'var(--accent-sage)',
          teal: 'var(--accent-teal)',
          textMain: 'var(--text-main)',
          textMuted: 'var(--text-muted)',
          textDim: 'var(--text-dim)',
        },
      },
      fontFamily: {
        serifTitle: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'editorial': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'glow-amber': '0 2px 10px rgba(217, 154, 43, 0.25)',
      },
    },
  },
  plugins: [],
};
