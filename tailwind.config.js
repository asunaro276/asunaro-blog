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
      fontFamily: {
        logo: ['Montserrat Subrayada'],
        title: ['Arial', 'Meiryo', 'Noto Sans Jp'],
        body: ['Meiryo', 'Arial', 'Yu Gothic', 'Roboto', 'Noto Sans Jp'],
        code: ['Source Han Code JP', 'HackGen35']
      },
    },
  },
  plugins: [],
}
