import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';
import {
  statuses,
  typography,
  overrides,
  bidStatuses,
} from './theme.common';

const PRIMARY_COLOR = indigo[900]; // '#04084A';
const SECONDARY_COLOR = grey[400]; // '#bdbdbd';

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
    bidStatuses,
  },
  typography,
  overrides,
});
