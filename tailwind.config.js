export default {
  mode: 'jit',
  content: [
    './src/presentation/pages/**/*.{js,ts,jsx,tsx,astro}',
    './src/presentation/components/**/*.{js,ts,jsx,tsx,astro}',
    './src/infrastructure/**/*.{js,ts,jsx,tsx,astro}',
  ],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      'xxl': '1400px',
    },
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        'bg-3': 'var(--bg-3)',
        fg: 'var(--fg)',
        'fg-2': 'var(--fg-2)',
        'fg-3': 'var(--fg-3)',
        rule: 'var(--rule)',
        'rule-2': 'var(--rule-2)',
        accent: 'var(--accent)',
        tint: 'var(--tint)',
      },
      fontFamily: {
        logo: ['Montserrat Subrayada'],
        title: ['Arial', 'Meiryo', 'Noto Sans Jp'],
        body: ['Meiryo', 'Arial', 'Yu Gothic', 'Roboto', 'Noto Sans Jp'],
        code: ['Source Han Code JP', 'HackGen35'],
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
        serif: ['Noto Serif JP', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
