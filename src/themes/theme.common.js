import grey from '@material-ui/core/colors/grey';

export const statuses = {
  orange: '#e6af5f',
  orangeDark: '#f37f3f',
  redDark: '#943028',
  blueLight: '#b9e0ed',
  grey: grey[400],
  red: '#ff103e',
  blue: '#b9e0ed',
  yellow: '#eab20f',
  default: '#dddddd',
  green: '#90eb04',
};

export const bidStatuses = {
  green: {
    text: '#84d900',
    background: '#f4fde6',
  },
  blue: {
    text: '#030969',
    background: '#e8e9f7',
  },
  orange: {
    text: '#eab20f',
    background: '#fef8ef',
  },
  red: {
    text: '#ff103e',
    background: '#ffe8ec',
  },
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
