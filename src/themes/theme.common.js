import grey from '@material-ui/core/colors/grey';

export const statuses = {
  green: '#78cd51',
  orange: '#e6af5f',
  orangeDark: '#f37f3f',
  red: '#ca5c54',
  redDark: '#943028',
  blueLight: '#b9e0ed',
  grey: grey[400],
};

export const typography = {
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
};

export const overrides = {
  MuiTableCell: {
    root: {
      padding: '14px 7px 14px 7px',
    },
  },
};
