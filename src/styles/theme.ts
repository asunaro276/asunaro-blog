import { createTheme } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

export const titleFontTheme = createTheme({
  typography: {
    fontFamily: ['Montserrat Subrayada', 'Roboto', 'Noto Sans JP', 'sans-serif'].join(','),
  },
})

export const basicTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: blueGrey[400],
      dark: blueGrey[600],
      light: blueGrey[100],
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Meiryo',
      'Arial',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      'Noto Sans JP',
      'sans-serif'
    ].join(','),
  },
})
