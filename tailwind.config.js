module.exports = {
  mode: 'jit',
  content: [
    'src/pages/**/*.{js,ts,jsx,tsx,astro}',
    'src/components/**/*.{js,ts,jsx,tsx,astro}',
    'src/libs/parse/*.{js,ts,jsx,tsx,astro}',
  ],
  important: true,
  theme: {
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
  corePlugins: {
    preflight: false,
  },
}
