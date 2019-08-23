import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import { statuses } from './theme.common';

const PRIMARY_COLOR = indigo[900]; // '#04084A';
const SECONDARY_COLOR = '#cfe207';

export default createMuiTheme({
  palette: {
    primary: {
      light: SECONDARY_COLOR,
      main: PRIMARY_COLOR,
      dark: '#04084A',
      contrastText: '#fff',
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    statuses,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    htmlFontSize: 18,
    h1: {
      fontSize: 28,
    },
    h2: {
      fontSize: 26,
    },
    h3: {
      fontSize: 22,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 18,
    },
  },
  overrides: {
    MuiTableCell: {
      root: {
        padding: '14px 7px 14px 7px',
      },
    },
  },
});
