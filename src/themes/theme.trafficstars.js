import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import { statuses, typography, overrides } from './theme.common';

const PRIMARY_COLOR = indigo[900]; // '#04084A';
const SECONDARY_COLOR = '#04084a';

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
    error: {
      main: '#ff103e',
    },
    text: {
      primary: '#2a2837',
    },
    background: {
      blue: '#e8e9f7',
      red: '#ffd0d9',
    },
    statuses,
  },
  typography,
  overrides,
});
