import { createMuiTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { statuses, typography } from './theme.common';

const PRIMARY_COLOR = deepPurple[600];
const SECONDARY_COLOR = deepPurple[300];

export default createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
      contrastText: '#fff',
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    statuses,
  },
  typography,
  overrides: {
    MuiTableCell: {
      root: {
        padding: '14px 7px 14px 7px',
      },
    },
  },
});