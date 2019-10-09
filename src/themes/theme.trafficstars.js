import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import { statuses, typography } from './theme.common';

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
    statuses,
  },
  typography,
});
