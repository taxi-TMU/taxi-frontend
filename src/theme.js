import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d75f5f',
    },
    secondary: {
      main: '#a3ccc3',
    },
    text: {
      primary: '#232F37',
      secondary: '#ffffff',
    },
  },
  typography: {
    fontSize: 16,
    h2: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 300,
    },
  },
  overrides: {
    MuiButton: {
      label: {
        color: '#ffffff',
      },
      contained: {
        border: '2px solid #d75f5f',
      },
      outlined: {
        border: '2px solid #ffffff',
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
