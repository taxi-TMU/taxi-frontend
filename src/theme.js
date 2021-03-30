import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d75f5f'
    },
    secondary: {
      main: '#a3ccc3'
    }
  },
  overrides: {
    MuiButton: {
      label: {
        color: '#ffffff',
      }
    }
  }
})

export default theme;
